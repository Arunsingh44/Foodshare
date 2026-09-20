const Review = require('../models/Review');
const Donation = require('../models/Donation');
const Volunteer = require('../models/Volunteer');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Leave a review after a donation is delivered
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res, next) => {
  const { donationId, revieweeId, rating, comment } = req.body;

  const donation = await Donation.findById(donationId);
  if (!donation) return next(new AppError('Donation not found', 404));
  if (donation.status !== 'delivered') {
    return next(new AppError('Reviews can only be left after delivery is complete', 400));
  }

  const review = await Review.create({
    donation: donationId,
    reviewer: req.user._id,
    reviewee: revieweeId,
    rating,
    comment,
  });

  // Update volunteer's aggregate rating if applicable
  const volunteer = await Volunteer.findOne({ user: revieweeId });
  if (volunteer) {
    const reviews = await Review.find({ reviewee: revieweeId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    volunteer.rating.average = Number(avg.toFixed(2));
    volunteer.rating.count = reviews.length;
    await volunteer.save();
  }

  res.status(201).json({ success: true, review });
});

// @desc    Get reviews for a specific user (as reviewee)
// @route   GET /api/reviews/user/:userId
// @access  Public
const getReviewsForUser = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ reviewee: req.params.userId })
    .populate('reviewer', 'name avatar')
    .sort('-createdAt');

  res.status(200).json({ success: true, count: reviews.length, reviews });
});

module.exports = { createReview, getReviewsForUser };
