const express = require('express');
const {
  insertServices,
  editServices,
  deleteServices,
  getAllServices,
} = require('../controller/servicesController');

const router = express.Router();

// Route to insert a new service
router.post('/add-service', insertServices);

// Route to update a service
router.put('/update-service/:serviceID', editServices);

// Route to delete a service
router.delete('/delete-service/:serviceID', deleteServices);

// Route to read all services
router.get('/services', getAllServices);

module.exports = router;
