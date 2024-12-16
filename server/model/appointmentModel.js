const { sql } = require('../config/db');

// Define operation type constants for maintainability
const OperationType = Object.freeze({
  FETCHALL: 'FetchAll',  // Fetch all appointments
  INSERT: 'Insert',      // Insert an appointment
  UPDATE: 'Update',      // Update an appointment
  DELETE: 'Delete',      // Delete an appointment
  FIND: 'Read'           // Find an appointment by ID
});

class Appointment {
  /**
   * Fetch all appointments from the database.
   */
  static async getAll() {
    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[ManageAppointments]
          @Operation = ${OperationType.FETCHALL}
      `;
      return recordset; // Return the list of appointments
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
      throw new Error('Failed to fetch appointments');
    }
  }

  /**
   * Fetch appointment details by ID.
   */
  static async getById(appointmentId) {
    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[ManageAppointments]
          @Operation = ${OperationType.FIND},
          @APPOINTMENT_ID = ${appointmentId}
      `;
      if (recordset.length === 0) {
        console.log('No appointment found with the provided ID.');
        return null;
      }
      return recordset[0]; // Return the first result if found
    } catch (error) {
      console.error('Error finding appointment:', error.message);
      throw new Error('Failed to find appointment');
    }
  }

  /**
   * Create a new appointment.
   */
  static async create(appointmentData) {
    const { appointmentDate, appointmentTime, custId, serviceId, status } = appointmentData;
    
    try {
      console.log('Creating Appointment with Data:', appointmentData); // Debugging log

      const { recordset } = await sql.query`
        EXEC [dbo].[ManageAppointments]
          @Operation = 'Insert',
          @APPOINTMENT_DATE = ${appointmentDate},
          @APPOINTMENT_TIME = ${appointmentTime},
          @CUST_ID = ${custId},
          @SERVICE_ID = ${serviceId},
          @STATUS = ${status}
      `;

      console.log('Recordset from Appointment Creation:', recordset); // Debugging log

      if (recordset && recordset.length > 0) {
        console.log('Appointment created successfully.');
        return { appointmentId: recordset[0].AppointmentID };
      } else {
        console.error('Failed to create appointment.');
        throw new Error('Failed to create appointment');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error(error.message || 'Failed to create appointment');
    }
  }
  
  /**
   * Update an existing appointment.
   */
  static async update(appointmentId, appointmentData) {
    const { appointmentDate, appointmentTime, custId, serviceId, status } = appointmentData;

    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[ManageAppointments]
          @Operation = ${OperationType.UPDATE},
          @APPOINTMENT_ID = ${appointmentId},
          @APPOINTMENT_DATE = ${appointmentDate},
          @APPOINTMENT_TIME = ${appointmentTime},
          @CUST_ID = ${custId},
          @SERVICE_ID = ${serviceId},
          @STATUS = ${status}
      `;

      if (recordset && recordset.length > 0) {
        console.log('Appointment updated successfully.');
        return { appointmentId, message: 'Appointment updated successfully' };
      } else {
        console.log('No appointment found or updated.');
        return { appointmentId, message: 'No appointment found or updated' };
      }
    } catch (error) {
      console.error('Error updating appointment:', error.message);
      throw new Error('Failed to update appointment');
    }
  }

  /**
   * Delete an appointment.
   */
  static async delete(appointmentId) {
    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[ManageAppointments]
          @Operation = ${OperationType.DELETE},
          @APPOINTMENT_ID = ${appointmentId}
      `;

      if (recordset && recordset.length > 0) {
        console.log('Appointment deleted successfully.');
        return { appointmentId, message: 'Appointment deleted successfully' };
      } else {
        console.log('Failed to delete the appointment. Transaction rolled back.');
        return { appointmentId, message: 'Failed to delete the appointment' };
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
      throw new Error('Failed to delete appointment');
    }
  }
}

module.exports = Appointment;
