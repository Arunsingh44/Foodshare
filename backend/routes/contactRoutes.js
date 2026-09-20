const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactMessages,
  resolveContactMessage,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitContactForm);
router.get('/', protect, authorize('admin'), getAllContactMessages);
router.put('/:id/resolve', protect, authorize('admin'), resolveContactMessage);

module.exports = router;
