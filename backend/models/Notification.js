const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'donation_accepted',
        'donation_collected',
        'donation_delivered',
        'donation_expired',
        'volunteer_assigned',
        'ngo_verified',
        'ngo_rejected',
        'new_request',
        'system',
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedDonation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    relatedRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
