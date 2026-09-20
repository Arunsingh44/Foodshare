const express = require('express');
const router = express.Router();
const {
  upsertVolunteerProfile,
  getMyVolunteerProfile,
  getNearbyPickups,
  getLeaderboard,
} = require('../controllers/volunteerController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/profile')
  .post(protect, authorize('volunteer'), upsertVolunteerProfile)
  .get(protect, authorize('volunteer'), getMyVolunteerProfile);

router.get('/nearby-pickups', protect, authorize('volunteer'), getNearbyPickups);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
