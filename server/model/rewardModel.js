// model/rewardModel.js
const { sql } = require('../config/db');

class Reward {
    static async createReward(rewardData) {
        const { reward_name, reward_type, points_required, sponsored_by } = rewardData;

        const result = await sql.query`
            INSERT INTO REWARDS (REWARD_NAME, REWARD_TYPE, POINTS_REQUIRED, SPONSORED_BY)
            VALUES (${reward_name}, ${reward_type}, ${points_required}, ${sponsored_by});
        `;

        return {
            reward_name,
            reward_type,
            points_required,
            sponsored_by,
            availability_status: 'Active'
        };
    }

    static async getRewards() {
        const { recordset } = await sql.query`
            SELECT * FROM REWARDS;
        `;
        return recordset;
    }
}

module.exports = Reward;
