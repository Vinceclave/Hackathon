const { sql } = require('../config/db');
const { generateJWT } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const User = require('../model/authModel'); // Import the updated user model

// Register method
const register = async (req, res) => {
    const { full_name, userpass, user_level, email, phone_number } = req.body;

    try {
        // Validate input
        if (
            !full_name?.trim() || full_name.length < 3 || full_name.length > 255 ||
            !userpass?.trim() || userpass.length < 6 ||
            !['Beginner', 'Contributor', 'Leader'].includes(user_level) ||
            !email?.trim() || !/\S+@\S+\.\S+/.test(email) ||
            !phone_number?.trim() || !/^\d{10}$/.test(phone_number)
        ) {
            return res.status(400).json({ status: 400, message: 'Invalid input. Check all fields.' });
        }

        // Call the register method of the User model
        const user = await User.register({
            full_name, userpass, user_level, email, phone_number
        });

        if (!user) {
            return res.status(400).json({ status: 400, message: 'Username already exists or other error occurred.' });
        }

        return res.status(200).json({ status: 200, message: 'Registration successful!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

// Login method
const login = async (req, res) => {
  const { email, userpass } = req.body; // Get email and password from the request body

  try {
      // Check if email and password are provided
      if (!email || !userpass) {
          return res.status(400).json({ message: 'Email and password are required' });
      }

      // Fetch user data from the database by email
      const record = await User.login(email);

      if (!record) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(userpass, record.USER_PASS);  // Make sure you're comparing with USER_PASS

      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT if authentication is successful
      const token = generateJWT(record.ID); // Assuming your user model has an ID field

      // Check if the user is an admin (you can define your own admin check based on user level)
      const isAdmin = record.USER_LEVEL === 'LEADER'; // Assuming 'LEADER' is the admin level

      // Return success response with the token and user details
      return res.status(200).json({
          status: 200,
          message: 'Login successful!',
          token,
          full_name: record.FULL_NAME,
          userID: record.ID,
          user_level: record.USER_LEVEL,
          isAdmin
      });

  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
