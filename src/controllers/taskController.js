const Task = require('../models/taskModel');

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get Task By ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task details' });
  }
};

// Create Task
const createTask = async (req, res) => {
  const { title, description, assignedUser, dueDate } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const task = await Task.create({ title, description, assignedUser, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedUser, dueDate, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedUser, dueDate, status },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
