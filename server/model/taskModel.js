// model/taskModel.js
const { sql } = require('../config/db');

class Task {
    static async createTask(taskData) {
        const { task_name, description, task_type, created_by } = taskData;

        const result = await sql.query`
            INSERT INTO TASKS (TASK_NAME, DESCRIPTION, TASK_TYPE, CREATED_BY)
            VALUES (${task_name}, ${description}, ${task_type}, ${created_by});
        `;

        return {
            task_name,
            description,
            task_type,
            created_by,
            created_at: new Date(),
            status: 'Pending'
        };
    }

    static async getTasks() {
        const { recordset } = await sql.query`
            SELECT * FROM TASKS;
        `;
        return recordset;
    }
}

module.exports = Task;
