const Services = require('../model/servicesModel');

// Insert Service
const insertServices = async (req, res) => {
  const { service_name, description, amount } = req.body; // Extract from request body
  console.log(service_name, description, amount)

  if (!service_name || !description || !amount) {
    return res.status(400).json({
      message: 'Missing required fields: service_name, description, and amount are required',
    });
  }

  const data = {
    type: 'INSERT',
    name: service_name,
    desc: description,
    amount: parseFloat(amount),
  };

  try {
    const result = await Services.insertService(data);
    res.status(201).json({
      message: 'Service inserted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while inserting the service',
      error: error.message,
    });
  }
};

// Update Service
const editServices = async (req, res) => {
  const { serviceID } = req.params;
  const { service_name, description, amount } = req.body;
  console.log(service_name,description, amount)

  if (!service_name || !description || !amount) {
    return res.status(400).json({
      message: 'Missing required fields: name, description, and amount are required',
    });
  }

  const data = {
    type: 'UPDATE',
    serviceID: parseInt(serviceID.split(':').join('')),
    service_name,
    desc: description,
    amount: parseFloat(amount),
  };

  console.log(data.serviceID)
  try {
    const result = await Services.editService(data);
    res.status(200).json({
      message: 'Service updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the service',
      error: error.message,
    });
  }
};

// Delete Service
const deleteServices = async (req, res) => {
    const { serviceID } = req.params; // Extract the serviceID from route parameters
  
    console.log('Received serviceID:', serviceID);
  
    if (!serviceID) {
      return res.status(400).json({
        message: 'Missing serviceID parameter',
      });
    }
  
    const data = {
      type: 'DELETE',
      serviceID: parseInt(serviceID.split(':').join('')), // Ensure it's converted to integer
    };
  
    console.log('Deleting with data:', data);
  
    try {
      const result = await Services.deleteService(data);
      res.status(200).json({
        message: 'Service deleted successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error during deletion:', error);
      res.status(500).json({
        message: 'An error occurred while deleting the service',
        error: error.message,
      });
    }
  };
  
  

// Get All Services
const getAllServices = async (req, res) => {
  try {
    const result = await Services.readServices();
    res.status(200).json({
      message: 'Services retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving services',
      error: error.message,
    });
  }
};

module.exports = {
  insertServices,
  editServices,
  deleteServices,
  getAllServices,
};
