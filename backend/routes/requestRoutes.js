const express = require('express');
const router = express.Router();
const {
  createRequest,
  acceptRequest,
  rejectRequest,
  markCollected,
  markDelivered,
  getMyRequests,
} = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('ngo', 'volunteer'), createRequest);
router.get('/my-requests', protect, getMyRequests);
router.put('/:id/accept', protect, authorize('donor'), acceptRequest);
router.put('/:id/reject', protect, authorize('donor'), rejectRequest);
router.put('/:id/collect', protect, authorize('ngo', 'volunteer'), markCollected);
router.put('/:id/deliver', protect, authorize('volunteer'), markDelivered);

module.exports = router;
