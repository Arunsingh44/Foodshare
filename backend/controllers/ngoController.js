const NGO = require('../models/NGO');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const { uploadToCloudinary } = require('../config/cloudinary');
const createNotification = require('../utils/createNotification');

// @desc    Register NGO profile (user must already have role 'ngo')
// @route   POST /api/ngos/register
// @access  Private (ngo)
const registerNGO = asyncHandler(async (req, res, next) => {
  const existing = await NGO.findOne({ user: req.user._id });
  if (existing) {
    return next(new AppError('NGO profile already exists for this account', 400));
  }

  const { organizationName, registrationNumber, description, website, yearsOfOperation, focusAreas } =
    req.body;

  let registrationDocument;
  if (req.file) {
    registrationDocument = await uploadToCloudinary(req.file.buffer, 'foodshare/ngo-documents');
  }

  const ngo = await NGO.create({
    user: req.user._id,
    organizationName,
    registrationNumber,
    description,
    website,
    yearsOfOperation,
    focusAreas,
    registrationDocument,
  });

  req.user.ngoVerificationStatus = 'pending';
  await req.user.save({ validateBeforeSave: false });

  res.status(201).json({ success: true, ngo });
});

// @desc    Get all NGOs (with optional verification filter)
// @route   GET /api/ngos
// @access  Public
const getNGOs = asyncHandler(async (req, res) => {
  const { verificationStatus } = req.query;
  const query = {};
  if (verificationStatus) query.verificationStatus = verificationStatus;

  const ngos = await NGO.find(query).populate('user', 'name email city phone avatar');
  res.status(200).json({ success: true, count: ngos.length, ngos });
});

// @desc    Get single NGO profile
// @route   GET /api/ngos/:id
// @access  Public
const getNGOById = asyncHandler(async (req, res, next) => {
  const ngo = await NGO.findById(req.params.id).populate('user', 'name email city phone avatar');
  if (!ngo) return next(new AppError('NGO not found', 404));
  res.status(200).json({ success: true, ngo });
});

// @desc    Admin: verify or reject an NGO
// @route   PUT /api/ngos/:id/verify
// @access  Private (admin)
const verifyNGO = asyncHandler(async (req, res, next) => {
  const { decision, notes } = req.body; // decision: 'verified' | 'rejected'
  if (!['verified', 'rejected'].includes(decision)) {
    return next(new AppError('Decision must be either "verified" or "rejected"', 400));
  }

  const ngo = await NGO.findById(req.params.id);
  if (!ngo) return next(new AppError('NGO not found', 404));

  ngo.verificationStatus = decision;
  ngo.verificationNotes = notes;
  ngo.verifiedBy = req.user._id;
  ngo.verifiedAt = Date.now();
  await ngo.save();

  await User.findByIdAndUpdate(ngo.user, { ngoVerificationStatus: decision });

  await createNotification({
    user: ngo.user,
    type: decision === 'verified' ? 'ngo_verified' : 'ngo_rejected',
    title: decision === 'verified' ? 'NGO Verified' : 'NGO Verification Rejected',
    message:
      decision === 'verified'
        ? 'Your NGO has been verified and can now accept donations.'
        : `Your NGO verification was rejected. ${notes || ''}`,
  });

  res.status(200).json({ success: true, ngo });
});

module.exports = { registerNGO, getNGOs, getNGOById, verifyNGO };
