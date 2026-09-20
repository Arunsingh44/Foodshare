const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportType: {
      type: String,
      enum: ['monthly_summary', 'ngo_activity', 'donor_activity', 'volunteer_activity', 'custom'],
      required: true,
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    data: { type: mongoose.Schema.Types.Mixed }, // snapshot of aggregated metrics
    fileUrl: { type: String }, // optional exported PDF/CSV
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
