const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getMyDonations,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');
const { createDonationValidation } = require('../validation/donationValidation');

router
  .route('/')
  .get(getDonations)
  .post(
    protect,
    authorize('donor'),
    upload.array('images', 5),
    createDonationValidation,
    validateRequest,
    createDonation
  );

router.get('/my-donations', protect, authorize('donor'), getMyDonations);

router
  .route('/:id')
  .get(getDonationById)
  .put(protect, authorize('donor'), updateDonation)
  .delete(protect, deleteDonation);

module.exports = router;
