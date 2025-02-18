const User = require('../model/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register controller
const register = async (req, res) => {
    const { full_name, email, phone_number, user_pass, user_level } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.login(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Register the user
        const result = await User.register({ full_name, email, phone_number, user_pass, user_level });
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Login controller
const login = async (req, res) => {
    const { email, user_pass } = req.body; // The credentials entered by the user

    try {
        // Find user by email
        const user = await User.login(email);

        // If user is not found, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Ensure that the user_pass (input password) is compared with the hashed password (from the database)
        const isMatch = await bcrypt.compare(user_pass, user.USER_PASS); // bcrypt requires the plain password (user_pass) and the hash (user.USER_PASS)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.ID }, 'your_secret_key', { expiresIn: '1h' });

        // Respond with the token and user details
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.ID,
                full_name: user.FULL_NAME,
                email: user.EMAIL,
                user_level: user.USER_LEVEL
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { register, login };
