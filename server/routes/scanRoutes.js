const express = require('express');
const scanController = require('../controllers/scanController');
const router = express.Router();

// Route for getting all Scans and creating a new Scan
router
  .route('/')
  .get(scanController.getAllScans)
  .post(scanController.createScan);

// Route for getting, updating, and deleting a specific Scan
router.route('/generate-pdf').post(scanController.generateMultiplePdfs);
router
  .route('/:id')
  .get(scanController.getScan)
  .patch(scanController.updateScan)
  .delete(scanController.deleteScan);

module.exports = router;
