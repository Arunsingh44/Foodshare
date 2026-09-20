const User = require('../models/User');
const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const Request = require('../models/Request');
const Report = require('../models/Report');
const asyncHandler = require('../middleware/asyncHandler');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all users with optional role/search filter
// @route   GET /api/admin/users
// @access  Private (admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const { role, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];

  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    users: users.map((u) => u.toSafeObject()),
  });
});

// @desc    Ban or unban a user
// @route   PUT /api/admin/users/:id/ban
// @access  Private (admin)
const toggleBanUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  if (user.role === 'admin') return next(new AppError('Cannot ban an admin account', 400));

  user.isBanned = !user.isBanned;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, isBanned: user.isBanned });
});

// @desc    Delete a user account
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  if (user.role === 'admin') return next(new AppError('Cannot delete an admin account', 400));

  await user.deleteOne();
  res.status(200).json({ success: true, message: 'User deleted' });
});

// @desc    Get all donations for moderation
// @route   GET /api/admin/donations
// @access  Private (admin)
const getAllDonationsAdmin = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};
  const skip = (Number(page) - 1) * Number(limit);

  const [donations, total] = await Promise.all([
    Donation.find(filter).populate('donor', 'name email').sort('-createdAt').skip(skip).limit(Number(limit)),
    Donation.countDocuments(filter),
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

// @desc    Force-cancel a donation (moderation action)
// @route   PUT /api/admin/donations/:id/cancel
// @access  Private (admin)
const cancelDonationAdmin = asyncHandler(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) return next(new AppError('Donation not found', 404));

  donation.status = 'cancelled';
  await donation.save();

  res.status(200).json({ success: true, donation });
});

// @desc    Dashboard analytics summary (cards + chart data)
// @route   GET /api/admin/analytics
// @access  Private (admin)
const getAnalytics = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalDonors,
    totalNGOs,
    totalVolunteers,
    totalDonations,
    deliveredDonations,
    pendingNGOVerifications,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'donor' }),
    User.countDocuments({ role: 'ngo' }),
    User.countDocuments({ role: 'volunteer' }),
    Donation.countDocuments(),
    Donation.countDocuments({ status: 'delivered' }),
    NGO.countDocuments({ verificationStatus: 'pending' }),
  ]);

  // Estimate meals saved from delivered donations' quantity.value
  const mealsAgg = await Donation.aggregate([
    { $match: { status: 'delivered' } },
    { $group: { _id: null, totalServings: { $sum: '$quantity.value' } } },
  ]);
  const mealsSaved = mealsAgg[0]?.totalServings || 0;

  // Rough CO2 saved estimate: 2.5kg CO2e avoided per meal rescued (illustrative constant)
  const co2SavedKg = Math.round(mealsSaved * 2.5);

  // Donations per month for the last 6 months (trend chart)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyTrend = await Donation.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const categoryBreakdown = await Donation.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({
    success: true,
    analytics: {
      totalUsers,
      totalDonors,
      totalNGOs,
      totalVolunteers,
      totalDonations,
      deliveredDonations,
      pendingNGOVerifications,
      mealsSaved,
      co2SavedKg,
      monthlyTrend,
      categoryBreakdown,
    },
  });
});

// @desc    Generate and store a report snapshot
// @route   POST /api/admin/reports
// @access  Private (admin)
const generateReport = asyncHandler(async (req, res) => {
  const { reportType, periodStart, periodEnd } = req.body;

  const donationsInPeriod = await Donation.countDocuments({
    createdAt: { $gte: new Date(periodStart), $lte: new Date(periodEnd) },
  });
  const deliveredInPeriod = await Donation.countDocuments({
    status: 'delivered',
    createdAt: { $gte: new Date(periodStart), $lte: new Date(periodEnd) },
  });

  const report = await Report.create({
    generatedBy: req.user._id,
    reportType,
    periodStart,
    periodEnd,
    data: { donationsInPeriod, deliveredInPeriod },
  });

  res.status(201).json({ success: true, report });
});

module.exports = {
  getAllUsers,
  toggleBanUser,
  deleteUser,
  getAllDonationsAdmin,
  cancelDonationAdmin,
  getAnalytics,
  generateReport,
};
