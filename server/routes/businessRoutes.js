// routes/businessRoutes.js
const express = require('express');
const { createBusiness } = require('../controller/businessController');
const router = express.Router();

router.post('/businesses', createBusiness);

module.exports = router;
