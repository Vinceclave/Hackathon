const { sql } = require('../config/db');
const bcrypt = require('bcrypt');

class User {

    // Method to register
    static async register(userData) {
        const {
            username, userpass, userType, firstname, lastname, phonenum, schedule
        } = userData;   

        const hashedPassword = await bcrypt.hash(userpass, 10);

        const { recordset } = await sql.query`
            EXEC dbo.RegisterUser 
            @UserName = ${username}, 
            @UserPass = ${hashedPassword},
            @UserType = ${userType}, 
            @FirstName = ${firstname}, 
            @LastName = ${lastname}, 
            @PhoneNum = ${phonenum || null},
            @Schedule = ${schedule || null};
        `;

        return recordset[0]; 
    }

    // Method to Login
    static async login(username) {
        const { recordset } = await sql.query`
            EXEC dbo.login_user @USER_NAME = ${username};
        `
        return recordset[0]; // Return the user record from the stored procedure
    }

    // Additional methods can be added as necessary (e.g., for updating user info)

}

module.exports = User;