const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get secret from environment
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Function to create a JWT
const generateJWT = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION, // Set expiration time
    });
};

// Function to verify a JWT
const verifyJWT = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null; // Return null if verification fails
    }
};

module.exports = { generateJWT, verifyJWT };