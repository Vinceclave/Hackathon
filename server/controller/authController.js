const bcrypt = require('bcrypt');
const User = require('../models/authModel');

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