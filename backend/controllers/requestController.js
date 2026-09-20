const Request = require('../models/Request');
const Donation = require('../models/Donation');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const createNotification = require('../utils/createNotification');
const { getDistanceKm } = require('../utils/geoUtils');

// @desc    NGO or Volunteer requests to collect a donation
// @route   POST /api/requests
// @access  Private (ngo, volunteer)
const createRequest = asyncHandler(async (req, res, next) => {
  const { donationId, message } = req.body;

  const donation = await Donation.findById(donationId).populate('donor', 'name email');
  if (!donation) return next(new AppError('Donation not found', 404));
  if (donation.status !== 'available') {
    return next(new AppError('This donation is no longer available', 400));
  }

  const existing = await Request.findOne({
    donation: donationId,
    requestedBy: req.user._id,
    status: { $in: ['pending', 'accepted', 'in_transit'] },
  });
  if (existing) {
    return next(new AppError('You already have an active request for this donation', 400));
  }

  const distanceKm = Number(
    getDistanceKm(donation.location.coordinates, req.user.location.coordinates).toFixed(2)
  );

  const request = await Request.create({
    donation: donationId,
    requestedBy: req.user._id,
    requestedByRole: req.user.role,
    donor: donation.donor._id,
    message,
    distanceKm,
  });

  donation.status = 'requested';
  await donation.save();

  await createNotification({
    user: donation.donor._id,
    type: 'new_request',
    title: 'New pickup request',
    message: `${req.user.name} would like to collect your donation "${donation.foodName}".`,
    relatedDonation: donation._id,
    relatedRequest: request._id,
  });

  res.status(201).json({ success: true, request });
});

// @desc    Donor accepts a request
// @route   PUT /api/requests/:id/accept
// @access  Private (donor - owner of the donation)
const acceptRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate('donation');
  if (!request) return next(new AppError('Request not found', 404));
  if (request.donor.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to respond to this request', 403));
  }
  if (request.status !== 'pending') {
    return next(new AppError('This request has already been responded to', 400));
  }

  request.status = 'accepted';
  request.respondedAt = Date.now();
  await request.save();

  const donation = request.donation;
  donation.status = 'accepted';
  donation.acceptedBy = request.requestedBy;
  donation.acceptedByRole = request.requestedByRole;
  await donation.save();

  // Reject all other pending requests for this donation
  await Request.updateMany(
    { donation: donation._id, _id: { $ne: request._id }, status: 'pending' },
    { status: 'rejected', respondedAt: Date.now() }
  );

  await createNotification({
    user: request.requestedBy,
    type: 'donation_accepted',
    title: 'Request accepted',
    message: `Your request to collect "${donation.foodName}" was accepted.`,
    relatedDonation: donation._id,
    relatedRequest: request._id,
  });

  res.status(200).json({ success: true, request });
});

// @desc    Donor rejects a request
// @route   PUT /api/requests/:id/reject
// @access  Private (donor - owner of the donation)
const rejectRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate('donation');
  if (!request) return next(new AppError('Request not found', 404));
  if (request.donor.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to respond to this request', 403));
  }
  if (request.status !== 'pending') {
    return next(new AppError('This request has already been responded to', 400));
  }

  request.status = 'rejected';
  request.respondedAt = Date.now();
  await request.save();

  // Reopen the donation if no other pending requests exist
  const otherPending = await Request.countDocuments({
    donation: request.donation._id,
    status: 'pending',
  });
  if (otherPending === 0) {
    request.donation.status = 'available';
    await request.donation.save();
  }

  res.status(200).json({ success: true, request });
});

// @desc    Mark donation as collected (by NGO/volunteer who accepted it)
// @route   PUT /api/requests/:id/collect
// @access  Private (ngo, volunteer - the requester)
const markCollected = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate('donation');
  if (!request) return next(new AppError('Request not found', 404));
  if (request.requestedBy.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this request', 403));
  }
  if (request.status !== 'accepted') {
    return next(new AppError('Request must be accepted before it can be marked collected', 400));
  }

  request.status = 'collected';
  request.collectedAt = Date.now();
  await request.save();

  request.donation.status = 'collected';
  await request.donation.save();

  await createNotification({
    user: request.donor,
    type: 'donation_collected',
    title: 'Donation collected',
    message: `Your donation "${request.donation.foodName}" has been collected.`,
    relatedDonation: request.donation._id,
    relatedRequest: request._id,
  });

  res.status(200).json({ success: true, request });
});

// @desc    Mark donation as delivered (by volunteer)
// @route   PUT /api/requests/:id/deliver
// @access  Private (volunteer - the requester)
const markDelivered = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate('donation');
  if (!request) return next(new AppError('Request not found', 404));
  if (request.requestedBy.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this request', 403));
  }
  if (request.status !== 'collected') {
    return next(new AppError('Request must be collected before it can be marked delivered', 400));
  }

  request.status = 'delivered';
  request.deliveredAt = Date.now();
  await request.save();

  request.donation.status = 'delivered';
  await request.donation.save();

  if (req.user.role === 'volunteer') {
    req.user.volunteerStats.completedDeliveries += 1;
    req.user.volunteerStats.rewardPoints += 10;
    await req.user.save({ validateBeforeSave: false });
  }

  res.status(200).json({ success: true, request });
});

// @desc    Get requests relevant to logged-in user (as donor or as requester)
// @route   GET /api/requests/my-requests
// @access  Private
const getMyRequests = asyncHandler(async (req, res) => {
  const asDonor = req.query.as === 'donor';
  const filter = asDonor ? { donor: req.user._id } : { requestedBy: req.user._id };

  const requests = await Request.find(filter)
    .populate('donation')
    .populate('requestedBy', 'name phone')
    .populate('donor', 'name phone')
    .sort('-createdAt');

  res.status(200).json({ success: true, count: requests.length, requests });
});

module.exports = {
  createRequest,
  acceptRequest,
  rejectRequest,
  markCollected,
  markDelivered,
  getMyRequests,
};
