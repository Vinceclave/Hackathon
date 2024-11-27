const { sql } = require('../config/db')
const { generateJWT } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const User = require('../model/authModel'); // Import the user model


// REGISTER CONTROLLER
const register = async (req, res) => {
    const { username, userpass, userType, firstname, lastname, phonenum, schedule } = req.query;

    try {
        // Validate input
        if (
          !username?.trim() || username.length < 3 || username.length > 30 ||
          !userpass?.trim() || userpass.length < 6 ||
          !['barber', 'customer'].includes(userType) ||
          !firstname?.trim() || firstname.length < 1 || firstname.length > 30 ||
          !lastname?.trim() || lastname.length < 1 || lastname.length > 30 ||
          (userType === 'customer' && (!phonenum || !/^\d{10}$/.test(phonenum))) ||
          (userType === 'barber' && !schedule?.trim())
        ) {
          return res.status(400).json({ status: 400, message: 'Invalid input. Check all fields.' });
        }
            // Call the register method of the User model
            const user = await User.register({
                username, userpass, userType, firstname, lastname, phonenum, schedule
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
}

// LOGIN CONTROLLER
const login = async (req, res) => {
    const { username, userpass } = req.body; // Get data from the request body
    
    try {
        console.log('Username:', username); // Log username to ensure it's being passed
        console.log('Userpass:', userpass); // Log password to ensure it's being passed

        if (!username || !userpass) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const record = await User.login(username); // Get user from DB

        console.log('User Record:', record); // Log the user record to check if it's valid

        if (!record || !record.StoredPasswordHash) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if password matches the stored hash
        const isMatch = await bcrypt.compare(userpass, record.StoredPasswordHash);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // If authentication is successful, create and return the JWT token
        const token = generateJWT(record.UserId);
        return res.status(200).json({
            status: 200,
            message: 'Login successful!',
            token,
            username: record.Username,
            userID: record.UserId
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { register, login}