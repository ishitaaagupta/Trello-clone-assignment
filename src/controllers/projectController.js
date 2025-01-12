const Project = require('../models/projectModel');

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get Project By ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
};

// Create Project
const createProject = async (req, res) => {
  const { title, description, coverImage } = req.body;
  try {
    if (!title || !description || !coverImage) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const project = await Project.create({ title, description, coverImage });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
};

// Update Project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, coverImage } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, coverImage },
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
