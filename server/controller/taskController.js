// controller/taskController.js
const Task = require('../model/taskModel');

const createTask = async (req, res) => {
    const { task_name, description, task_type, created_by } = req.body;

    try {
        if (!task_name || !description || !task_type || !created_by) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const task = await Task.createTask({ task_name, description, task_type, created_by });

        return res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', details: error.message });
    }
};

module.exports = { createTask };
