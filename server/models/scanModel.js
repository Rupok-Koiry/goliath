const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scan_name: {
    type: String,
    required: 'Please provide your scan_name',
  },
  scan_targets: [
    {
      type: String,
      required: 'Please provide your scan_targets',
    },
  ],
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'error'],
    default: 'in_progress',
  },
  enrich: {
    type: Boolean,
    default: false,
  },
  scan_count: {
    type: Number,
  },
  scanned: {
    type: Number,
  },
  score: {
    type: Number,
  },
});

const Scan = mongoose.model('Scan', scanSchema);

module.exports = Scan;
