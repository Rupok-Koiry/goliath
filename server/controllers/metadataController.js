const Metadata = require('../models/metadataModel');
const handlerFactory = require('./handlerFactory');
exports.getAllMetadata = handlerFactory.getAll(Metadata);
exports.getMetadata = handlerFactory.getOne(Metadata);
exports.updateMetadata = handlerFactory.updateOne(Metadata);
exports.deleteMetadata = handlerFactory.deleteOne(Metadata);
exports.createMetadata = handlerFactory.createOne(Metadata);
