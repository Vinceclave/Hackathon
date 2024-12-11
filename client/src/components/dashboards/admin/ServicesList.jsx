import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null); // Track which service is being edited
  const [editForm, setEditForm] = useState({
    service_name: '',
    description: '',
    amount: '',
  });

  // Fetch services from the backend
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

  // Handle Delete
  const handleDelete = async (serviceID) => {
    try {
        console.log(serviceID)

      await axios.delete(`http://localhost:5015/api/delete-service/:${serviceID}`);
      alert('Service deleted successfully');
      fetchServices();
    } catch (error) {
      alert('Error occurred while deleting service');
    }
  };

  // Handle Edit - Open edit form
  const handleEditClick = (service) => {
    setEditingService(service.SERVICE_ID);
    setEditForm({
      service_name: service.SERVICE_NAME,
      description: service.DESCRIPTION,
      amount: service.AMOUNT,
    });
  };

  // Handle changes in the edit form fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the edited data
  const handleEditSubmit = async (serviceID) => {
    console.log(serviceID   )
    try {
      await axios.put(
        `http://localhost:5015/api/update-service/:${serviceID}`,
        editForm
      );
      alert('Service updated successfully');
      setEditingService(null);
      fetchServices();
    } catch (error) {
      alert('Error updating service');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Services List</h1>

      {/* Service Table */}
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.SERVICE_ID}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {service.SERVICE_ID}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {service.SERVICE_NAME}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {service.DESCRIPTION}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                ${service.AMOUNT}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  style={{ marginRight: '5px' }}
                  onClick={() => handleEditClick(service)}
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: '5px' }}
                  onClick={() => handleDelete(service.SERVICE_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form Modal */}
      {editingService && (
        <div
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '5px',
            maxWidth: '400px',
            marginBottom: '20px',
            boxShadow: '2px 2px 5px gray',
          }}
        >
          <h3>Edit Service</h3>
          <label>
            Service Name:
            <input
              type="text"
              name="service_name"
              value={editForm.service_name}
              onChange={handleFormChange}
              style={{ marginBottom: '10px' }}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleFormChange}
              style={{ marginBottom: '10px' }}
            />
          </label>
          <br />
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={editForm.amount}
              onChange={handleFormChange}
              style={{ marginBottom: '10px' }}
            />
          </label>
          <br />
          <button onClick={() => handleEditSubmit(editingService)}>Submit</button>
          <button
            onClick={() => {
              setEditingService(null);
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
