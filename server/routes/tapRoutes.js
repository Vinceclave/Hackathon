// routes/tapRoutes.js
const express = require('express');
const { createTap } = require('../controller/tapController');
const router = express.Router();

router.post('/taps', createTap);

module.exports = router;
