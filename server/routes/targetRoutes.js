const express = require('express');
const targetController = require('../controllers/targetController');
const router = express.Router();

// Route for getting all Targets and creating a new Target
router.get('/stats', targetController.getTargetStats);

router
  .route('/')
  .get(targetController.getAllTargets)
  .post(targetController.createTarget);

// Route for getting, updating, and deleting a specific Target
router
  .route('/:id')
  .get(targetController.getTarget)
  .patch(targetController.updateTarget)
  .delete(targetController.deleteTarget);

module.exports = router;
