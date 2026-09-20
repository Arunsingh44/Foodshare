const express = require('express');
const router = express.Router();
const {
  updateProfile,
  updateAvatar,
  changePassword,
  getUserById,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, upload.single('avatar'), updateAvatar);
router.put('/change-password', protect, changePassword);
router.get('/:id', getUserById);

module.exports = router;
