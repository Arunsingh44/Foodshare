const Donation = require('../models/Donation');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const { computeFreshnessScore, isDuplicateDonation } = require('../utils/aiHelpers');

// @desc    Create a new donation (donor only)
// @route   POST /api/donations
// @access  Private (donor)
const createDonation = asyncHandler(async (req, res, next) => {
  const {
    foodName,
    category,
    description,
    quantity,
    cookedTime,
    expiryTime,
    pickupTime,
    pickupAddress,
    location,
  } = req.body;

  // Upload images if provided
  let images = [];
  if (req.files && req.files.length > 0) {
    images = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, 'foodshare/donations'))
    );
  }

  const freshnessScore = computeFreshnessScore({ cookedTime, expiryTime });

  // Duplicate detection: check this donor's donations from the last 2 hours
  const recentDonations = await Donation.find({
    donor: req.user._id,
    createdAt: { $gte: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  }).select('foodName createdAt');

  const donationDraft = { foodName, createdAt: new Date() };
  const isDuplicateSuspected = isDuplicateDonation(donationDraft, recentDonations);

  const donation = await Donation.create({
    donor: req.user._id,
    foodName,
    category,
    description,
    quantity,
    images,
    cookedTime,
    expiryTime,
    pickupTime,
    pickupAddress,
    location,
    freshnessScore,
    isDuplicateSuspected,
  });

  res.status(201).json({ success: true, donation });
});

// @desc    Get all donations with search/filter/sort/pagination
// @route   GET /api/donations
// @access  Public
const getDonations = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    city,
    status,
    maxDistanceKm,
    lng,
    lat,
    sort = '-createdAt',
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (search) {
    query.$text = { $search: search };
  }
  if (category) query.category = category;
  if (status) query.status = status;
  else query.status = { $ne: 'cancelled' };

  if (lng && lat) {
    query.location = {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: (parseFloat(maxDistanceKm) || 25) * 1000,
      },
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [donations, total] = await Promise.all([
    Donation.find(query)
      .populate('donor', 'name city avatar')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Donation.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: donations.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    donations,
  });
});

// @desc    Get single donation by ID
// @route   GET /api/donations/:id
// @access  Public
const getDonationById = asyncHandler(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id)
    .populate('donor', 'name city phone avatar')
    .populate('acceptedBy', 'name phone');

  if (!donation) {
    return next(new AppError('Donation not found', 404));
  }

  res.status(200).json({ success: true, donation });
});

// @desc    Update a donation (owner only)
// @route   PUT /api/donations/:id
// @access  Private (donor - owner)
const updateDonation = asyncHandler(async (req, res, next) => {
  let donation = await Donation.findById(req.params.id);

  if (!donation) return next(new AppError('Donation not found', 404));
  if (donation.donor.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this donation', 403));
  }
  if (['collected', 'delivered'].includes(donation.status)) {
    return next(new AppError('Cannot edit a donation that has already been collected', 400));
  }

  const allowedFields = [
    'foodName',
    'category',
    'description',
    'quantity',
    'cookedTime',
    'expiryTime',
    'pickupTime',
    'pickupAddress',
    'location',
  ];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) donation[field] = req.body[field];
  });

  donation.freshnessScore = computeFreshnessScore({
    cookedTime: donation.cookedTime,
    expiryTime: donation.expiryTime,
  });

  await donation.save();
  res.status(200).json({ success: true, donation });
});

// @desc    Delete a donation (owner or admin only)
// @route   DELETE /api/donations/:id
// @access  Private (donor - owner, or admin)
const deleteDonation = asyncHandler(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) return next(new AppError('Donation not found', 404));

  const isOwner = donation.donor.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this donation', 403));
  }

  await Promise.all(donation.images.map((img) => deleteFromCloudinary(img.public_id)));
  await donation.deleteOne();

  res.status(200).json({ success: true, message: 'Donation deleted' });
});

// @desc    Get all donations made by the logged-in donor
// @route   GET /api/donations/my-donations
// @access  Private (donor)
const getMyDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({ donor: req.user._id }).sort('-createdAt');
  res.status(200).json({ success: true, count: donations.length, donations });
});

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getMyDonations,
};
