const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  toggleBanUser,
  deleteUser,
  getAllDonationsAdmin,
  cancelDonationAdmin,
  getAnalytics,
  generateReport,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/ban', toggleBanUser);
router.delete('/users/:id', deleteUser);

router.get('/donations', getAllDonationsAdmin);
router.put('/donations/:id/cancel', cancelDonationAdmin);

router.get('/analytics', getAnalytics);
router.post('/reports', generateReport);

module.exports = router;
