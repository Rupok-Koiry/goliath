const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Please provide your _id',
  },
  software: {
    type: String,
    required: 'Please provide your software',
  },
  version: {
    type: String,
    required: 'Please provide your version',
  },
  details: {
    type: String,
    required: 'Please provide your details',
  },
});

const Cache = mongoose.model('Cache', cacheSchema);

module.exports = Cache;
