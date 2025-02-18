// controller/tapController.js
const Tap = require('../model/tapModel');

const createTap = async (req, res) => {
    const { task_id, nominator_id, nominee_id } = req.body;

    try {
        if (!task_id || !nominator_id || !nominee_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const tap = await Tap.createTap({ task_id, nominator_id, nominee_id });

        return res.status(201).json({ message: 'Tap created successfully!', tap });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', details: error.message });
    }
};

module.exports = { createTap };
