// model/redemptionModel.js
const { sql } = require('../config/db');

class Redemption {
    static async createRedemption(redemptionData) {
        const { user_id, reward_id } = redemptionData;

        const result = await sql.query`
            INSERT INTO REDEMPTIONS (USER_ID, REWARD_ID)
            VALUES (${user_id}, ${reward_id});
        `;

        return {
            user_id,
            reward_id,
            redeemed_at: new Date(),
            status: 'Pending'
        };
    }

    static async getRedemptions() {
        const { recordset } = await sql.query`
            SELECT * FROM REDEMPTIONS;
        `;
        return recordset;
    }
}

module.exports = Redemption;
