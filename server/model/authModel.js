const { sql } = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    // Method to register a new user
    static async register(userData) {
        const { full_name, email, phone_number, user_pass, user_level } = userData;
        const hashedPassword = await bcrypt.hash(user_pass, 10); // Hash the password

        const query = `
            INSERT INTO USERS (FULL_NAME, EMAIL, PHONE_NUMBER, USER_PASS, USER_LEVEL)
            VALUES (@FullName, @Email, @PhoneNumber, @UserPass, @UserLevel);
        `;

        try {
            const request = new sql.Request();
            
            // Add parameters to the query
            request.input('FullName', sql.NVarChar, full_name);
            request.input('Email', sql.NVarChar, email);
            request.input('PhoneNumber', sql.NVarChar, phone_number);
            request.input('UserPass', sql.NVarChar, hashedPassword); // Save the hashed password
            request.input('UserLevel', sql.NVarChar, user_level);

            await request.query(query);
            return { message: 'User registered successfully' };
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    // Method to login a user
    static async login(email) {
        const query = `
            SELECT * FROM USERS WHERE EMAIL = @Email;
        `;

        try {
            const request = new sql.Request();
            request.input('Email', sql.NVarChar, email);
            const result = await request.query(query);

            // If no user is found, return null
            if (result.recordset.length === 0) {
                return null;
            }

            return result.recordset[0]; // Return the user record
        } catch (error) {
            throw new Error('Error logging in user: ' + error.message);
        }
    }
}

module.exports = User;
