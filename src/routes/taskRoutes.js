const express = require('express');
const { addTask, updateTaskStatus } = require('../controllers/taskController');

const router = express.Router();

router.post('/', addTask);
router.patch('/status', updateTaskStatus);

module.exports = router;
