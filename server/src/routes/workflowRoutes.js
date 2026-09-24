const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const {
  createWorkflowSchema,
  updateWorkflowSchema,
  toggleWorkflowSchema,
  testWorkflowSchema
} = require('../validators/workflowValidator');

router.use(protect); // All workflow routes require authentication

router.route('/')
  .get(workflowController.getWorkflows)
  .post(validate(createWorkflowSchema), workflowController.createWorkflow);

router.route('/:id')
  .get(workflowController.getWorkflowById)
  .put(validate(updateWorkflowSchema), workflowController.updateWorkflow)
  .delete(workflowController.deleteWorkflow);

router.patch('/:id/toggle', validate(toggleWorkflowSchema), workflowController.toggleWorkflowActive);
router.post('/:id/test', validate(testWorkflowSchema), workflowController.testWorkflow);

module.exports = router;
