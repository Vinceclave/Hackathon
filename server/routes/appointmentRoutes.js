// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController'); // Import your Appointment Controller

// Route to create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// Route to get an appointment by ID
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Route to update an appointment
router.put('/appointments', appointmentController.updateAppointment);

// Route to delete an appointment
router.delete('/appointments/:id', appointmentController.deleteAppointment);

// Route to get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

module.exports = router;
