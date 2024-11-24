const { sql } = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, userpass, userType, firstname, lastname, phonenum, schedule } = req.query;

        // Hash the password and execute stored procedure
        const hashedPassword = await bcrypt.hash(userpass, 10);
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

        const { recordset } = await sql.query`
          EXEC dbo.RegisterUser 
            @UserName = ${username}, @UserPass = ${hashedPassword},
            @UserType = ${userType}, @FirstName = ${firstname}, 
            @LastName = ${lastname}, @PhoneNum = ${phonenum || null},
            @Schedule = ${schedule || null};
        `;

        const errorCode = recordset[0]?.ErrorCode;

        if (errorCode === -1) {
            return res.status(400).json({ status: 400, message: 'Invalid user type. Please choose either "barber" or "customer".' });
        }
        if (errorCode === -2) {
            return res.status(400).json({ status: 400, message: 'Username already exists. Please choose a different username.' });
        }
        if (errorCode === 1) {
            return res.status(200).json({ status: 200, message: 'Registration successful!' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'An error occurred. Try again later.', details: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, userpass } = req.query;

        if (!username || !userpass) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const hashedPassword = await bcrypt.hash(userpass, 10);

        const { recordset } = await sql.query`
            EXEC dbo.Login_User 
                @User_Name = ${username}, 
                @User_Pass = ${hashedPassword}
        `;
        

        const errorCode = recordset[0]?.ErrorCode;

        if (errorCode === 0) {
            return res.status(400).json({ status: 400, message: 'Invalid username or password' });
        }
        if (errorCode === -1) {
            return res.status(400).json({ status: 400, message: 'Invalid username or password' });
        }
        if (errorCode === 1) {
            return res.status(200).json({ status: 200, message: 'Login successful!' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = login;


module.exports = { register, login}