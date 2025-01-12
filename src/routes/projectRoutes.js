const express = require('express');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Protected routes for projects
router.get('/', protect, getAllProjects); // Get all projects
router.get('/:id', protect, getProjectById); // Get a project by ID
router.post('/', protect, createProject); // Create a new project
router.put('/:id', protect, updateProject); // Update a project by ID
router.delete('/:id', protect, deleteProject); // Delete a project by ID

module.exports = router;
