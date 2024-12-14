import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  XIcon, 
  CheckIcon, 
  SaveIcon 
} from 'lucide-react';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({
    service_name: '',
    description: '',
    amount: '',
  });
  const [addForm, setAddForm] = useState({
    service_name: '',
    description: '',
    amount: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      await axios.delete(`http://localhost:5015/api/delete-service/${serviceID}`);
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
    try {
      await axios.put(
        `http://localhost:5015/api/update-service/${serviceID}`,
        editForm
      );
      alert('Service updated successfully');
      setEditingService(null);
      fetchServices();
    } catch (error) {
      alert('Error updating service');
    }
  };

  // Handle Add Form Changes
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add New Service
  const handleAddSubmit = async () => {
    try {
      await axios.post('http://localhost:5015/api/add-service', addForm);
      alert('Service added successfully');
      setIsAddModalOpen(false);
      setAddForm({ service_name: '', description: '', amount: '' });
      fetchServices();
    } catch (error) {
      alert('Error adding service');
    }
  };

  if (loading) return <p className="text-center text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-sm">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Services </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition duration-200"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Service
        </button>
      </div>

      {/* Service Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-4 py-3 text-left">Service ID</th>
              <th className="px-4 py-3 text-left">Service Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.SERVICE_ID} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{service.SERVICE_ID}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.SERVICE_NAME}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.DESCRIPTION}</td>
                <td className="px-4 py-3 text-sm text-gray-700">${service.AMOUNT}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="flex items-center px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 mr-2"
                    onClick={() => handleEditClick(service)}
                  >
                    <EditIcon className="mr-1 h-3 w-3" />
                    Edit
                  </button>
                  <button
                    className="flex items-center px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(service.SERVICE_ID)}
                  >
                    <TrashIcon className="mr-1 h-3 w-3" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Service</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="service_name" className="block text-sm font-medium text-gray-600 mb-1">Service Name</label>
                <input
                  type="text"
                  name="service_name"
                  id="service_name"
                  value={editForm.service_name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={editForm.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={editForm.amount}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingService(null)}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={() => handleEditSubmit(editingService)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Service</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="service_name" className="block text-sm font-medium text-gray-600 mb-1">Service Name</label>
                <input
                  type="text"
                  name="service_name"
                  id="service_name"
                  value={addForm.service_name}
                  onChange={handleAddFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={addForm.description}
                  onChange={handleAddFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={addForm.amount}
                  onChange={handleAddFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleAddSubmit}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;