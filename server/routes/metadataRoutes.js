const express = require('express');
const metadataController = require('../controllers/metadataController');
const router = express.Router();

// Route for getting all Metadata and creating a new Metadata
router
  .route('/')
  .get(metadataController.getAllMetadata)
  .post(metadataController.createMetadata);

// Route for getting, updating, and deleting a specific Metadata
router
  .route('/:id')
  .get(metadataController.getMetadata)
  .patch(metadataController.updateMetadata)
  .delete(metadataController.deleteMetadata);

module.exports = router;
