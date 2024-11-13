// db.js
const sql = require('mssql/msnodesqlv8');
const config = require('./config'); // Import the configuration

async function connectDB() {
    try {
        await sql.connect(config)
        console.log("Database connected");
    } catch (err) {
        console.log("Database connnection failed: ", err);
    }
};


// Export the function
module.exports = { sql, connectDB };
