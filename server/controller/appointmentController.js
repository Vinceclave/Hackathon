const Appointment = require('../model/appointmentModel'); // Import the Appointment model

// Controller for creating a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime, custId, serviceId, status } = req.body;

        // Comprehensive validation
        if (!appointmentDate) {
            return res.status(400).json({ message: 'Appointment date is required.' });
        }
        if (!appointmentTime) {
            return res.status(400).json({ message: 'Appointment time is required.' });
        }
        if (!custId) {
            return res.status(400).json({ message: 'Customer ID is required.' });
        }
        if (!serviceId) {
            return res.status(400).json({ message: 'Service ID is required.' });
        }
        if (!status) {
            return res.status(400).json({ message: 'Appointment status is required.' });
        }

        // Create the appointment using the Appointment model
        const newAppointment = await Appointment.create({
            appointmentDate,
            appointmentTime,
            custId,
            serviceId,
            status
        });

        // Return the newly created appointment
        return res.status(201).json({ 
            message: 'Appointment created successfully', 
            appointment: newAppointment 
        });
    } catch (err) {
        console.error('Error creating appointment:', err);
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};  

// Controller to get an appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(400).json({ message: 'Appointment ID is required.' });
        }

        // Get the appointment using the Appointment model
        const appointment = await Appointment.getById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        return res.status(200).json({ appointment });
    } catch (err) {
        console.error('Error fetching appointment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { appointmentId, appointmentDate, appointmentTime, custId, serviceId, status } = req.body;

        // Check if required fields are provided
        if (!appointmentId || !appointmentDate || !appointmentTime || !custId || !serviceId || !status) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Update the appointment using the Appointment model
        const updatedAppointment = await Appointment.update({
            appointmentId,
            appointmentDate,
            appointmentTime,
            custId,
            serviceId,
            status
        });

        return res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (err) {
        console.error('Error updating appointment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        if (!appointmentId) {
            return res.status(400).json({ message: 'Appointment ID is required.' });
        }

        // Delete the appointment using the Appointment model
        const deletedAppointment = await Appointment.delete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        return res.status(200).json({ message: 'Appointment deleted successfully', appointmentId: deletedAppointment });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to fetch all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments using the Appointment model
        const allAppointments = await Appointment.getAll();

        if (allAppointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found.' });
        }

        return res.status(200).json({ appointments: allAppointments });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
