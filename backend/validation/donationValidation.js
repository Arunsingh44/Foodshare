const { body } = require('express-validator');
const Donation = require('../models/Donation');

const createDonationValidation = [
  body('foodName').trim().notEmpty().withMessage('Food name is required').isLength({ max: 100 }),
  body('category').isIn(Donation.CATEGORIES).withMessage('Invalid food category'),
  body('description').optional().isLength({ max: 1000 }),
  body('quantity.value').isFloat({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('quantity.unit')
    .optional()
    .isIn(['servings', 'kg', 'plates', 'packets', 'liters'])
    .withMessage('Invalid quantity unit'),
  body('expiryTime')
    .isISO8601()
    .withMessage('Expiry time must be a valid date')
    .custom((value) => new Date(value) > new Date())
    .withMessage('Expiry time must be in the future'),
  body('pickupTime.start').isISO8601().withMessage('Pickup start time must be a valid date'),
  body('pickupTime.end').isISO8601().withMessage('Pickup end time must be a valid date'),
  body('pickupAddress').trim().notEmpty().withMessage('Pickup address is required'),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates must be [longitude, latitude]'),
];

module.exports = { createDonationValidation };
