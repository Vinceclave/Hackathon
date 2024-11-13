// userRoutes.js
const express = require('express');
const { register, login } = require('../controller/userController');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
