const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
      type: String,
      enum: ['bug', 'feature_request', 'general', 'complaint'],
      default: 'general',
    },
    subject: { type: String, required: true, maxlength: 150 },
    message: { type: String, required: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['open', 'in_review', 'resolved', 'closed'],
      default: 'open',
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
