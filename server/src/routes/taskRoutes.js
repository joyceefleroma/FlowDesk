const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const {
  createTaskSchema,
  updateTaskSchema,
  updateStatusSchema,
  addSubtaskSchema,
  toggleSubtaskSchema
} = require('../validators/taskValidator');

router.use(protect); // All task routes require authentication

router.route('/')
  .get(taskController.getTasks)
  .post(validate(createTaskSchema), taskController.createTask);

router.route('/:id')
  .get(taskController.getTaskById)
  .put(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

router.patch('/:id/status', validate(updateStatusSchema), taskController.updateTaskStatus);

router.post('/:id/subtasks', validate(addSubtaskSchema), taskController.addSubtask);
router.patch('/:id/subtasks/:subtaskId', validate(toggleSubtaskSchema), taskController.toggleSubtask);
router.delete('/:id/subtasks/:subtaskId', taskController.deleteSubtask);

module.exports = router;
