// routes/taskRoutes.js
const express = require('express');
const { createTask } = require('../controller/taskController');
const router = express.Router();

router.post('/tasks', createTask);

module.exports = router;
