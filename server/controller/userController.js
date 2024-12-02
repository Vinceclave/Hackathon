const { sql } = require('../config/db')
const { generateJWT } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const User = require('../model/authModel'); // Import the user model

const register = async (req, res) => {
    const { username, userpass, userType, firstname, lastname, phonenum, schedule } = req.body;
    console.log(username, userpass, userType, firstname, lastname, phonenum, schedule);
  
    try {
      // Validate input
      if (
        !username?.trim() || username.length < 3 || username.length > 30 ||
        !userpass?.trim() || userpass.length < 6 ||
        !['barber', 'customer'].includes(userType) ||
        !firstname?.trim() || firstname.length < 1 || firstname.length > 30 ||
        !lastname?.trim() || lastname.length < 1 || lastname.length > 30 ||
        (userType === 'customer' && (!phonenum || !/^\d{10}$/.test(phonenum))) ||
        (userType === 'barber' && (!Array.isArray(schedule) || schedule.length === 0))
      ) {
        return res.status(400).json({ status: 400, message: 'Invalid input. Check all fields.' });
      }
  
      // If user is a barber, join the schedule array into a comma-separated string
      const scheduleString = userType === 'barber' && Array.isArray(schedule) ? schedule.join(', ') : '';
  
      // Call the register method of the User model
      const user = await User.register({
        username, userpass, userType, firstname, lastname, phonenum, schedule: scheduleString
      });
  
      if (user.ErrorCode === -1) {
        return res.status(400).json({ status: 400, message: 'Invalid user type. Please choose either "barber" or "customer".' });
      }
  
      if (user.ErrorCode === -2) {
        return res.status(400).json({ status: 400, message: 'Username already exists. Please choose a different username.' });
      }
  
      if (user.ErrorCode === 1) {
        return res.status(200).json({ status: 200, message: 'Registration successful!' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
  };
  
  const login = async (req, res) => {
    const { username, userpass } = req.body; // Get data from the request body

    try {
        console.log('Username:', username); // Log username to ensure it's being passed
        console.log('Userpass:', userpass); // Log password to ensure it's being passed

        if (!username || !userpass) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Static admin check (username and password hardcoded)
        if (username === 'admin' && userpass === 'admin123') {
            // If the username and password match the static admin credentials
            const token = generateJWT(1); // You can create a static user ID for the admin, e.g., 1
            return res.status(200).json({
                status: 200,
                message: 'Login successful!',
                token,
                username: 'admin',
                userID: 1, // Static user ID for admin
                userType: 'admin',
                isAdmin: true
            });
        }

        // Fetch user data from the database (assuming a query returns the correct user)
        const record = await User.login(username);

        if (!record || !record.StoredPasswordHash) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(userpass, record.StoredPasswordHash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT if authentication is successful
        const token = generateJWT(record.UserId);

        // Check if the user is an admin
        const isAdmin = record.UserType === 'admin';

        return res.status(200).json({
            status: 200,
            message: 'Login successful!',
            token,
            username: record.Username,
            userID: record.UserId,
            userType: record.UserType,
            isAdmin
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { register, login}