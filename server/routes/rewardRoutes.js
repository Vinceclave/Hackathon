// routes/rewardRoutes.js
const express = require('express');
const { createReward } = require('../controller/rewardController');
const router = express.Router();

router.post('/rewards', createReward);

module.exports = router;
