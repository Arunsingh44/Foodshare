const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    organizationName: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      trim: true,
    },
    registrationDocument: {
      url: { type: String },
      public_id: { type: String },
    },
    description: { type: String, maxlength: 1500 },
    website: { type: String, trim: true },
    yearsOfOperation: { type: Number, min: 0 },
    focusAreas: [{ type: String }], // e.g. ["Hunger relief", "Elderly care"]
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verificationNotes: { type: String },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    stats: {
      totalCollected: { type: Number, default: 0 },
      totalMealsDistributed: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

ngoSchema.index({ verificationStatus: 1 });

module.exports = mongoose.model('NGO', ngoSchema);
