// model/tapModel.js
const { sql } = require('../config/db');

class Tap {
    static async createTap(tapData) {
        const { task_id, nominator_id, nominee_id } = tapData;

        const result = await sql.query`
            INSERT INTO TAPS (TASK_ID, NOMINATOR_ID, NOMINEE_ID)
            VALUES (${task_id}, ${nominator_id}, ${nominee_id});
        `;

        return {
            task_id,
            nominator_id,
            nominee_id,
            nomination_date: new Date(),
            status: 'Pending'
        };
    }

    static async getTaps() {
        const { recordset } = await sql.query`
            SELECT * FROM TAPS;
        `;
        return recordset;
    }
}

module.exports = Tap;
