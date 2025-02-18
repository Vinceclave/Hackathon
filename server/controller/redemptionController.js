// controller/redemptionController.js
const Redemption = require('../model/redemptionModel');

const createRedemption = async (req, res) => {
    const { user_id, reward_id } = req.body;

    try {
        if (!user_id || !reward_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const redemption = await Redemption.createRedemption({ user_id, reward_id });

        return res.status(201).json({ message: 'Redemption created successfully!', redemption });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', details: error.message });
    }
};

module.exports = { createRedemption };
