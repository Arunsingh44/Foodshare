const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const allowedFields = ['name', 'phone', 'address', 'city', 'location', 'darkModePreference'];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user: user.toSafeObject() });
});

// @desc    Upload/replace avatar image
// @route   PUT /api/users/avatar
// @access  Private
const updateAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new AppError('No image file provided', 400));

  const user = await User.findById(req.user._id);

  if (user.avatar && user.avatar.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  const uploaded = await uploadToCloudinary(req.file.buffer, 'foodshare/avatars');
  user.avatar = uploaded;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, avatar: user.avatar });
});

// @desc    Change password (while logged in)
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) return next(new AppError('Current password is incorrect', 401));

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
});

// @desc    Get public profile of any user (donor/ngo/volunteer)
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('name city avatar role createdAt volunteerStats');
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, user });
});

module.exports = { updateProfile, updateAvatar, changePassword, getUserById };
