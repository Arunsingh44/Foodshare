const Volunteer = require('../models/Volunteer');
const Donation = require('../models/Donation');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Create/update volunteer profile
// @route   POST /api/volunteers/profile
// @access  Private (volunteer)
const upsertVolunteerProfile = asyncHandler(async (req, res) => {
  const { vehicleType, maxDistanceKm, availability, isAvailableNow } = req.body;

  const volunteer = await Volunteer.findOneAndUpdate(
    { user: req.user._id },
    { vehicleType, maxDistanceKm, availability, isAvailableNow },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({ success: true, volunteer });
});

// @desc    Get volunteer profile for logged-in user
// @route   GET /api/volunteers/profile
// @access  Private (volunteer)
const getMyVolunteerProfile = asyncHandler(async (req, res, next) => {
  const volunteer = await Volunteer.findOne({ user: req.user._id });
  if (!volunteer) return next(new AppError('Volunteer profile not found', 404));
  res.status(200).json({ success: true, volunteer });
});

// @desc    Nearby donations available for volunteer pickup
// @route   GET /api/volunteers/nearby-pickups
// @access  Private (volunteer)
const getNearbyPickups = asyncHandler(async (req, res, next) => {
  const { lng, lat, maxDistanceKm = 10 } = req.query;
  if (!lng || !lat) {
    return next(new AppError('lng and lat query params are required', 400));
  }

  const donations = await Donation.find({
    status: 'available',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: parseFloat(maxDistanceKm) * 1000,
      },
    },
  }).populate('donor', 'name city');

  res.status(200).json({ success: true, count: donations.length, donations });
});

// @desc    Leaderboard of top volunteers by reward points
// @route   GET /api/volunteers/leaderboard
// @access  Public
const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await Volunteer.find()
    .populate('user', 'name avatar city')
    .sort('-rewardPoints')
    .limit(20);

  res.status(200).json({ success: true, leaderboard });
});

module.exports = {
  upsertVolunteerProfile,
  getMyVolunteerProfile,
  getNearbyPickups,
  getLeaderboard,
};
