const { sql } = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password, userType, firstname, lastname, phonenum, schedule } = req.query;

        // Check for existing username
        const existingUserResult = await sql.query`
            SELECT * FROM USERS WHERE USERNAME = ${username}
        `;

        if (existingUserResult.recordset.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash the password and insert the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const userResult = await sql.query`
            INSERT INTO USERS (USERNAME, PASSWORD_HASH, USERTYPE) 
            OUTPUT INSERTED.USER_ID
            VALUES (${username}, ${hashedPassword}, ${userType})
        `;

        const userId = userResult.recordset[0].USER_ID;

        // Insert into the appropriate table based on userType
        const userTable = userType === 'Customer' ? 'CUSTOMER' : 'BARBER';
        const additionalColumns = userType === 'Customer' 
            ? `(FIRSTNAME, LASTNAME, PHONENUM, USER_ID)` 
            : `(FIRSTNAME, LASTNAME, SCHEDULE, USER_ID)`;
        
        const additionalValues = userType === 'Customer' 
            ? `(${firstname}, ${lastname}, ${phonenum}, ${userId})`
            : `(${firstname}, ${lastname}, ${schedule}, ${userId})`;

        await sql.query`
            INSERT INTO ${userTable} ${sql.raw(additionalColumns)} 
            VALUES ${sql.raw(additionalValues)}
        `;

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



const login = async (req, res) => {
    const { username, password } = req.query;

    try {
        const { recordset } = await sql.query`
            SELECT * FROM USERS WHERE USERNAME = ${username}
        `;
        const user = recordset[0];

        if (user && await bcrypt.compare(password, user.PASSWORD_HASH)) {
            return res.status(200).json({ message: "Login successful", userId: user.USER_ID });
        }

        res.status(401).json({ message: "Invalid username or password" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login}