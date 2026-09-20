const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ['bike', 'car', 'bicycle', 'on_foot', 'other'],
      default: 'on_foot',
    },
    maxDistanceKm: { type: Number, default: 10 },
    availability: {
      type: String,
      enum: ['weekdays', 'weekends', 'evenings', 'anytime'],
      default: 'anytime',
    },
    isAvailableNow: { type: Boolean, default: true },
    completedDeliveries: { type: Number, default: 0 },
    rewardPoints: { type: Number, default: 0 },
    badges: [{ type: String }], // e.g. "First Delivery", "50 Meals Saved"
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
