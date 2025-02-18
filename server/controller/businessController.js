// controller/businessController.js
const Business = require('../model/businessModel');

const createBusiness = async (req, res) => {
    const { business_name, owner_name, email, phone_number, business_type } = req.body;

    try {
        if (!business_name || !owner_name || !email || !phone_number || !business_type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const business = await Business.createBusiness({ business_name, owner_name, email, phone_number, business_type });

        return res.status(201).json({ message: 'Business created successfully!', business });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', details: error.message });
    }
};

module.exports = { createBusiness };
