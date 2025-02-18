// model/businessModel.js
const { sql } = require('../config/db');

class Business {
    static async createBusiness(businessData) {
        const { business_name, owner_name, email, phone_number, business_type } = businessData;

        const result = await sql.query`
            INSERT INTO BUSINESSES (BUSINESS_NAME, OWNER_NAME, EMAIL, PHONE_NUMBER, BUSINESS_TYPE)
            VALUES (${business_name}, ${owner_name}, ${email}, ${phone_number}, ${business_type});
        `;

        return {
            business_name,
            owner_name,
            email,
            phone_number,
            business_type
        };
    }

    static async getBusinesses() {
        const { recordset } = await sql.query`
            SELECT * FROM BUSINESSES;
        `;
        return recordset;
    }
}

module.exports = Business;
