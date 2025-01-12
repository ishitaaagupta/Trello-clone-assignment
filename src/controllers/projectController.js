const Project = require('../models/Project');

// Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.send({ projects });
  } catch (error) {
    res.status(400).send({ message: 'Error fetching projects', error });
  }
};

// Create Project
exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = new Project({
      title,
      description,
      coverImage: req.file ? req.file.path : null,
    });
    await project.save();
    res.status(201).send({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(400).send({ message: 'Error creating project', error });
  }
};
