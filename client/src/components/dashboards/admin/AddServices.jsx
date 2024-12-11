import React, { useState } from 'react';

const AddServices = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add New Service</h2>
      <p className="text-gray-600 mb-4">Fill out the form below to add a new service.</p>

      {/* Form Container */}
      <div className="space-y-4">
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Service Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount ($)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddServices;
