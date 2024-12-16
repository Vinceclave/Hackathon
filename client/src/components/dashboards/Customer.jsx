import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Customer = () => {
  const { logOut } = useAuth();
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.userID) {
    throw new Error('No user data found');
  }

  const userID = userData.userID;

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5015/api/services');
      setServices(response.data.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Error fetching services. Please try again.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle opening the modal with service details
  const handleDetailsClick = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
    setAppointmentDate('');
    setAppointmentTime('');
    setError('');
  };

  // Validate the selected date and time for the appointment
  const validateAppointment = () => {
    if (!appointmentDate || !appointmentTime) {
      setError('Please select both a date and a time.');
      return false;
    }

    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const currentDateTime = new Date();
    
    if (appointmentDateTime <= currentDateTime) {
      setError('Please select a future date and time.');
      return false;
    }

    return true;
  };

  // Submit the appointment form
  const handleSubmitAppointment = async () => {
    if (!validateAppointment()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Correct payload keys to match backend expectation
      const payload = {
        appointmentDate,
        appointmentTime,
        custId: userID,            // Changed from customerId to custId
        serviceId: selectedService.SERVICE_ID, 
        status: 'Booked'
      };

      console.log('Appointment Payload:', payload); // Debugging log

      const response = await axios.post('http://localhost:5015/api/appointments', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Server Response:', response.data); // Debugging log

      setLoading(false);
      alert('Your appointment has been scheduled!');
      handleCloseModal();
    } catch (err) {
      setLoading(false);
      console.error('Full Appointment Error:', err.response ? err.response.data : err);
      
      // More informative error handling
      const errorMessage = err.response?.data?.message || 
                           'Error scheduling your appointment. Please try again.';
      setError(errorMessage);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-5 py-3 bg-white shadow-md border-b">
        <Link to="/" className="text-lg font-primary text-primary hover:text-accent transition duration-150">Trimly</Link>
        <button onClick={logOut} className="text-sm text-accent hover:text-primary transition">Logout</button>
      </header>

      <main className="container mx-auto px-6 pt-6 pb-8 max-w-7xl">
        <h1 className="text-xl font-primary text-primary mb-6">Our Services</h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.SERVICE_ID} className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">{service.SERVICE_NAME}</h2>
              <p className="text-sm text-gray-500 mb-2">{service.DESCRIPTION}</p>
              <p className="text-sm font-bold text-primary mb-4">${service.AMOUNT}</p>
              <button
                className="w-full px-4 py-2 text-secondary bg-white border border-accent hover:bg-accent text-muted rounded-md text-sm"
                onClick={() => handleDetailsClick(service)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Appointment */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedService.SERVICE_NAME}</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedService.DESCRIPTION}</p>
            <p className="text-lg font-bold text-primary mb-6">${selectedService.AMOUNT}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Appointment Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Appointment Time</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={handleTimeChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="text-accent hover:text-primary font-medium text-sm"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                onClick={handleSubmitAppointment}
                className={`px-4 py-2 text-white ${loading ? 'bg-gray-500' : 'bg-accent'} rounded-md`}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
