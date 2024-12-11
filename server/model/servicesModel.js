const { sql } = require('../config/db');

class Services {
  // Insert a new service
  static async insertService(data) {
    const { type, name, desc, amount } = data;

    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[sp_ManageServices] 
          @OperationType = ${type},
          @ServiceName = ${name},
          @Description = ${desc},
          @Amount = ${amount}
      `;
      return recordset;
    } catch (error) {
      console.error('Insert Error:', error);
      throw error;
    }
  }

  // Update a service
  static async editService(data) {
    const { type, serviceID, name, desc, amount } = data;
    console.log(serviceID)

    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[sp_ManageServices]
          @OperationType = ${type},
          @ServiceID = ${serviceID},
          @ServiceName = ${name},
          @Description = ${desc},
          @Amount = ${amount}
      `;
      return recordset;
    } catch (error) {
      console.error('Update Error:', error);
      throw error;
    }
  }

  // Delete a service
  static async deleteService(data) {
    const { type, serviceID } = data;

    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[sp_ManageServices]
          @OperationType = ${type},
          @ServiceID = ${serviceID}
      `;
      return recordset;
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  }

  // Read/Get all services
  static async readServices() {
    try {
      const { recordset } = await sql.query`
        EXEC [dbo].[sp_ManageServices]
          @OperationType = 'GET'
      `;
      return recordset;
    } catch (error) {
      console.error('Read Error:', error);
      throw error;
    }
  }
}

module.exports = Services;
