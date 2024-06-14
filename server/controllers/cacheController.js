const Cache = require('../models/cacheModel');
const handlerFactory = require('./handlerFactory');

exports.getAllCaches = handlerFactory.getAll(Cache);
exports.getCache = handlerFactory.getOne(Cache);
exports.updateCache = handlerFactory.updateOne(Cache);
exports.deleteCache = handlerFactory.deleteOne(Cache);
exports.createCache = handlerFactory.createOne(Cache);
