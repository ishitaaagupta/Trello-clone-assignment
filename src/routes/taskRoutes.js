const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', getAllTasks); // Get all tasks
router.get('/:id', getTaskById); // Get a task by ID
router.post('/', createTask); // Create a new task
router.put('/:id', updateTask); // Update a task by ID
router.delete('/:id', deleteTask); // Delete a task by ID

module.exports = router;
