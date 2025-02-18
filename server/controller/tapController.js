// controller/rewardController.js
const Reward = require('../model/rewardModel');

const createReward = async (req, res) => {
    const { reward_name, reward_type, points_required, sponsored_by } = req.body;

    try {
        if (!reward_name || !reward_type || !points_required || !sponsored_by) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const reward = await Reward.createReward({ reward_name, reward_type, points_required, sponsored_by });

        return res.status(201).json({ message: 'Reward created successfully!', reward });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', details: error.message });
    }
};

module.exports = { createReward };
