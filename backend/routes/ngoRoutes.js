const express = require('express');
const router = express.Router();
const { registerNGO, getNGOs, getNGOById, verifyNGO } = require('../controllers/ngoController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', protect, authorize('ngo'), upload.single('registrationDocument'), registerNGO);
router.get('/', getNGOs);
router.get('/:id', getNGOById);
router.put('/:id/verify', protect, authorize('admin'), verifyNGO);

module.exports = router;
