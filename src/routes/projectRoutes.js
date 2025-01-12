const express = require('express');
const { getAllProjects, createProject } = require('../controllers/projectController');
const upload = require('../middlewares/uploadImage');

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', upload.single('coverImage'), createProject);

module.exports = router;