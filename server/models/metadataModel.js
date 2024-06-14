const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema(
  {
    scans_count: {
      type: Number,
      required: 'Please provide your scans_count',
    },
    scanned_targets: {
      type: Number,
      required: 'Please provide your scanned_targets',
    },
    vulnerable_hosts: {
      type: Number,
      required: 'Please provide your vulnerable_hosts',
    },
    scanned_scans: {
      type: Number,
      required: 'Please provide your scanned_scans',
    },
    unscanned_scans: {
      type: Number,
      required: 'Please provide your unscanned_scans',
    },
    scan_cvss_score: {
      type: Number,
      required: 'Please provide your scan_cvss_score',
    },
    low_score: {
      type: Number,
      required: 'Please provide your low_score',
    },
    medium_score: {
      type: Number,
      required: 'Please provide your medium_score',
    },
    high_score: {
      type: Number,
      required: 'Please provide your high_score',
    },
    insert_time: {
      type: Number,
      required: 'Please provide your insert_time',
    },
  },
  { collection: 'metadata' }
);

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;
