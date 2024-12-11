const Services = require('../model/services');

const manageServiceController = {
  async insert(req, res) {
    try {
      const { serviceName, description, amount } = req.body;
  
      // Validate required fields
      if (!serviceName || !description || !amount) {
        return res.status(400).json({
          error: 'serviceName, description, and amount are required fields.',
        });
      }
  
      const result = await Services.insertService(req.body);
  
      res.status(200).json({
        message: 'Service successfully inserted',
        data: result,
      });
    } catch (error) {
      console.error('Insert error', error);
      res.status(500).json({ error: error.message });
    }
  },
  

  async update(req, res) {
    try {
      const result = await Services.updateService(req.body);
      res.status(200).json({
        message: 'Service successfully updated',
        data: result,
      });
    } catch (error) {
      console.error('Update error', error);
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await Services.deleteService(req.body);
      res.status(200).json({
        message: 'Service successfully deleted',
        data: result,
      });
    } catch (error) {
      console.error('Delete error', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const result = await Services.getAllServices();
      res.status(200).json({
        message: 'Services retrieved successfully',
        data: result,
      });
    } catch (error) {
      console.error('Get all services error', error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = manageServiceController;
