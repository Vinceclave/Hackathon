// In the User model, ensure the column name matches 'user_pass'
const { sql } = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    // Register method (for completeness)
    static async register(userData) {
        const { full_name, userpass, user_level, email, phone_number } = userData;
        const hashedPassword = await bcrypt.hash(userpass, 10);

        const result = await sql.query`
            INSERT INTO USERS (FULL_NAME, EMAIL, PHONE_NUMBER, USER_PASS, USER_LEVEL, POINTS_EARNED, TOTAL_TAPS_COMPLETED)
            VALUES (${full_name}, ${email}, ${phone_number}, ${hashedPassword}, ${user_level}, 0, 0);
        `;

        return {
            full_name,
            email,
            phone_number,
            user_level,
            points_earned: 0,
            total_taps_completed: 0
        };
    }

    // Login method
    static async login(email) {
        const { recordset } = await sql.query`
            SELECT * FROM USERS WHERE EMAIL = ${email};
        `;
        return recordset[0]; // Return the user record from the database
    }
}

module.exports = User;
