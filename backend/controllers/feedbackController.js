const Feedback = require('../models/Feedback');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = asyncHandler(async (req, res) => {
  const { category, subject, message } = req.body;
  const feedback = await Feedback.create({
    user: req.user._id,
    category,
    subject,
    message,
  });
  res.status(201).json({ success: true, feedback });
});

// @desc    Admin: get all feedback
// @route   GET /api/feedback
// @access  Private (admin)
const getAllFeedback = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const feedback = await Feedback.find(filter).populate('user', 'name email').sort('-createdAt');
  res.status(200).json({ success: true, count: feedback.length, feedback });
});

// @desc    Admin: update feedback status
// @route   PUT /api/feedback/:id
// @access  Private (admin)
const updateFeedbackStatus = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return next(new AppError('Feedback not found', 404));

  feedback.status = req.body.status || feedback.status;
  feedback.adminNotes = req.body.adminNotes ?? feedback.adminNotes;
  await feedback.save();

  res.status(200).json({ success: true, feedback });
});

module.exports = { submitFeedback, getAllFeedback, updateFeedbackStatus };
