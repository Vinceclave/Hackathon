import React, { useState, useEffect } from 'react';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5015/api/appointments'); // Ensure full URL
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        if (data.appointments && Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        } else {
          setError('Appointments data is not in the expected format.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Delete appointment by ID
  const deleteAppointment = async () => {
    try {
      const response = await fetch(`http://localhost:5015/api/appointments/${appointmentToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Remove the deleted appointment from the state
      setAppointments(appointments.filter(appointment => appointment.APPOINTMENT_ID !== appointmentToDelete));
      setShowDeleteConfirm(false); // Close confirmation modal
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to download the appointments as CSV
  const downloadCSV = () => {
    const csvRows = [];
    const headers = ['Appointment ID', 'Customer ID', 'Service ID', 'Date', 'Time'];
    csvRows.push(headers.join(','));

    appointments.forEach(appointment => {
      const row = [
        appointment.APPOINTMENT_ID,
        appointment.CUST_ID,
        appointment.SERVICE_ID,
        new Date(appointment.APPOINTMENT_DATE).toLocaleDateString(),
        new Date(appointment.APPOINTMENT_TIME).toLocaleTimeString(),
      ];
      csvRows.push(row.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="text-center text-xl text-muted">Loading appointments...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-primary">Appointments</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={downloadCSV}
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/80 focus:outline-none transition duration-200"
        >
          Download Report
        </button>
      </div>

      {appointments && appointments.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left table-auto">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-white">Appointment ID</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Customer ID</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Service ID</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Date</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Time</th>
                <th className="px-6 py-3 text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.APPOINTMENT_ID} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{appointment.APPOINTMENT_ID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{appointment.CUST_ID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{appointment.SERVICE_ID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(appointment.APPOINTMENT_DATE).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(appointment.APPOINTMENT_TIME).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setAppointmentToDelete(appointment.APPOINTMENT_ID);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No appointments found.</p>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black   bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-primary mb-4">Are you sure you want to delete this appointment?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteAppointment}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
