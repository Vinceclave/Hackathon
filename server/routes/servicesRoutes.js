const express = require('express');
const manageServiceController = require('../controller/serviceController');

const router = express.Router();

// Insert Service
router.post('/insert', manageServiceController.insert);

// Update Service
router.put('/update', manageServiceController.update);

// Delete Service
router.delete('/delete', manageServiceController.delete);

// Get All Services
router.get('/all', manageServiceController.getAll);

module.exports = router;
