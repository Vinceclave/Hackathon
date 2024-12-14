import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSpecialization = ({ barberId }) => {
  const [specialization, setSpecialization] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5015/api/services');
      const fetchedServices = Array.isArray(response.data.data) ? response.data.data : [];
      setServices(fetchedServices);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Could not fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    setSpecialization(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      setError('Please select a service');
      return;
    }

    try {
      // Assuming there's an endpoint to add specialization to a barber's profile
      await axios.post(`http://localhost:5015/api/barbers/${barberId}/specializations`, {
        specialization,
        serviceId: selectedService,
      });
      setSuccess('Specialization added successfully');
      setSpecialization('');
      setSelectedService('');
    } catch (err) {
      console.error('Error adding specialization:', err);
      setError('Could not add specialization');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-3xl font-bold mb-4 text-center">Add Specialization</h2>
          <input
            type="text"
            value={specialization}
            onChange={handleInputChange}
            placeholder="Enter specialization"
            className="p-3 mb-4 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading ? (
            <div className="text-center text-gray-500">Loading services...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="p-3 mb-4 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a service</option>
              {services.map((service) => (
                <option key={service.SERVICE_ID} value={service.SERVICE_ID}>
                  {service.SERVICE_NAME}
                </option>
              ))}
            </select>
          )}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200">
            Add
          </button>
          {error && <div className="text-center text-red-500 mt-4">{error}</div>}
          {success && <div className="text-center text-green-500 mt-4">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddSpecialization;
