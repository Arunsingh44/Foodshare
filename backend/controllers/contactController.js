const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json({ success: true, message: 'Message sent successfully', contact });
});

// @desc    Admin: get all contact messages
// @route   GET /api/contact
// @access  Private (admin)
const getAllContactMessages = asyncHandler(async (req, res) => {
  const { isResolved } = req.query;
  const filter = {};
  if (isResolved !== undefined) filter.isResolved = isResolved === 'true';

  const messages = await Contact.find(filter).sort('-createdAt');
  res.status(200).json({ success: true, count: messages.length, messages });
});

// @desc    Admin: mark a contact message resolved
// @route   PUT /api/contact/:id/resolve
// @access  Private (admin)
const resolveContactMessage = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return next(new AppError('Message not found', 404));

  contact.isResolved = true;
  contact.respondedBy = req.user._id;
  await contact.save();

  res.status(200).json({ success: true, contact });
});

module.exports = { submitContactForm, getAllContactMessages, resolveContactMessage };
