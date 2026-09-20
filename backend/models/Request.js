const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedByRole: {
      type: String,
      enum: ['ngo', 'volunteer'],
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'in_transit', 'collected', 'delivered', 'cancelled'],
      default: 'pending',
    },
    message: { type: String, maxlength: 500 },
    respondedAt: { type: Date },
    collectedAt: { type: Date },
    deliveredAt: { type: Date },
    proofOfDelivery: {
      url: { type: String },
      public_id: { type: String },
    },
    distanceKm: { type: Number },
  },
  { timestamps: true }
);

requestSchema.index({ donation: 1 });
requestSchema.index({ requestedBy: 1, status: 1 });
requestSchema.index({ donor: 1, status: 1 });

module.exports = mongoose.model('Request', requestSchema);
