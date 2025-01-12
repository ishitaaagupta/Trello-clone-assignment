const Task = require('../models/Task');
const Project = require('../models/Project');

// Add Task to Project
exports.addTask = async (req, res) => {
  const { projectId, title, description, assignedUser, dueDate } = req.body;
  try {
    const task = new Task({ title, description, assignedUser, dueDate });
    await task.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }
    project.tasks.push(task);
    await project.save();

    res.status(201).send({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(400).send({ message: 'Error adding task', error });
  }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    task.status = status;
    await task.save();
    res.send({ message: 'Task status updated', task });
  } catch (error) {
    res.status(400).send({ message: 'Error updating task status', error });
  }
};