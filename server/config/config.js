require('dotenv').config(); 

var config = { 
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    driver: process.env.DB_DRIVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true', // Convert string to boolean
    }
};

module.exports = config;