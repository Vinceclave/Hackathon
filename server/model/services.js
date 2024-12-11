const { sql } = require('../config/db');

class Services {
  // Method to Insert a Service
  static async insertService(data) {
    const { serviceName, description, amount } = data;
  
    console.log({ serviceName, description, amount }); // Log before query to ensure data is valid
  
    const { recordset } = await sql.query`
      EXEC sp_ManageServices 
        @OperationType = 'INSERT',
        @ServiceName = ${serviceName}, 
        @Description = ${description}, 
        @Amount = ${amount};
    `;
  
    return recordset[0];
  }

  // Method to Update a Service
  static async updateService({ serviceID, serviceName, description, amount }) {
    const { recordset } = await sql.query`
      EXEC sp_ManageServices 
        @OperationType = 'UPDATE',
        @ServiceID = ${serviceID},
        @ServiceName = ${serviceName}, 
        @Description = ${description}, 
        @Amount = ${amount};
    `;
    return recordset[0];
  }

  // Method to Delete a Service
  static async deleteService({ serviceID }) {
    const { recordset } = await sql.query`
      EXEC sp_ManageServices 
        @OperationType = 'DELETE',
        @ServiceID = ${serviceID};
    `;
    return recordset[0];
  }

  // Method to Get All Services
  static async getAllServices() {
    const { recordset } = await sql.query`
      EXEC sp_ManageServices 
        @OperationType = 'GET';
    `;
    return recordset; 
  }
}

module.exports = Services;
