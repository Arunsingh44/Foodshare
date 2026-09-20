const mongoose = require('mongoose');

const FOOD_CATEGORIES = [
  'Cooked Food',
  'Raw Food',
  'Bakery',
  'Vegetables',
  'Fruits',
  'Beverages',
  'Packaged Food',
  'Dairy',
  'Desserts',
];

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    foodName: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      enum: FOOD_CATEGORIES,
      required: [true, 'Food category is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    quantity: {
      value: { type: Number, required: [true, 'Quantity value is required'], min: 1 },
      unit: {
        type: String,
        enum: ['servings', 'kg', 'plates', 'packets', 'liters'],
        default: 'servings',
      },
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    cookedTime: { type: Date },
    expiryTime: {
      type: Date,
      required: [true, 'Expiry time is required'],
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: 'Expiry time must be in the future',
      },
    },
    pickupTime: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    pickupAddress: {
      type: String,
      required: [true, 'Pickup address is required'],
      trim: true,
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: (coords) => coords.length === 2,
          message: 'Coordinates must be [longitude, latitude]',
        },
      },
    },
    status: {
      type: String,
      enum: ['available', 'requested', 'accepted', 'collected', 'delivered', 'expired', 'cancelled'],
      default: 'available',
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // NGO or Volunteer user
      default: null,
    },
    acceptedByRole: {
      type: String,
      enum: ['ngo', 'volunteer', null],
      default: null,
    },
    freshnessScore: {
      type: Number, // 0-100, computed by AI freshness indicator
      min: 0,
      max: 100,
      default: 100,
    },
    isDuplicateSuspected: { type: Boolean, default: false },
    servesEstimate: { type: Number, default: 0 }, // estimated number of people fed
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

donationSchema.index({ location: '2dsphere' });
donationSchema.index({ status: 1, expiryTime: 1 });
donationSchema.index({ category: 1 });
donationSchema.index({ donor: 1 });
donationSchema.index({ foodName: 'text', description: 'text' });

donationSchema.statics.CATEGORIES = FOOD_CATEGORIES;

module.exports = mongoose.model('Donation', donationSchema);
