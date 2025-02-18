// routes/redemptionRoutes.js
const express = require('express');
const { createRedemption } = require('../controller/redemptionController');
const router = express.Router();

router.post('/redemptions', createRedemption);

module.exports = router;
