import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaSearch } from 'react-icons/fa';

// Register the required chart elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ManageMember = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5015/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();

        // Log the response structure for debugging
        console.log(data);

        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
          setFilteredAppointments(data.appointments); // Initialize filteredAppointments with all data
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

  // If data is still loading
  if (loading) return <div>Loading appointments...</div>;

  // If there was an error while fetching data
  if (error) return <div>Error: {error}</div>;

  // Filter appointments based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = appointments.filter((appointment) => {
      return (
        appointment.CUST_ID.toString().includes(term) ||
        appointment.SERVICE_ID.toString().includes(term) ||
        new Date(appointment.APPOINTMENT_DATE).toLocaleDateString().includes(term)
      );
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to the first page when a search is made
  };

  // Paginate the appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Process data for the graph (appointments per day)
  const appointmentsPerDay = filteredAppointments.reduce((acc, appointment) => {
    const appointmentDate = new Date(appointment.APPOINTMENT_DATE).toLocaleDateString();
    if (acc[appointmentDate]) {
      acc[appointmentDate] += 1;
    } else {
      acc[appointmentDate] = 1;
    }
    return acc;
  }, {});

  // Prepare data for the Bar chart
  const chartData = {
    labels: Object.keys(appointmentsPerDay), // X-axis: appointment dates
    datasets: [
      {
        label: 'Appointments Per Day',
        data: Object.values(appointmentsPerDay), // Y-axis: count of appointments per date
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color of the bars
        borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
        borderWidth: 1,
      },
    ],
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Appointments</h1>

      {/* Search Bar */}
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search by Customer ID, Service ID, or Date"
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch className="ml-2 text-gray-500" />
      </div>

      {/* Displaying Graph */}
      <div className="mb-6">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `Appointments: ${context.raw} on ${context.label}`;
                  },
                },
              },
            },
          }}
        />
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Appointment ID</th>
              <th className="px-6 py-3 text-left">Customer ID</th>
              <th className="px-6 py-3 text-left">Service ID</th>
              <th className="px-6 py-3 text-left">Appointment Date</th>
              <th className="px-6 py-3 text-left">Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <tr key={appointment.APPOINTMENT_ID} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{appointment.APPOINTMENT_ID}</td>
                  <td className="px-6 py-4">{appointment.CUST_ID}</td>
                  <td className="px-6 py-4">{appointment.SERVICE_ID}</td>
                  <td className="px-6 py-4">{new Date(appointment.APPOINTMENT_DATE).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(appointment.APPOINTMENT_TIME).toLocaleTimeString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l-md"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageMember;
