const axios = require('axios');

// Define the login function to be exported for use in an Express route
module.exports.login = async (req, res) => {
    const { username, userpass } = req.query; // Access the query params from the incoming request
    console.log(username, userpass)
    try {
        // Make a GET request to the external login service with username and userpass
        const response = await axios.get('https://localhost:5015/login', {
            params: {
                username: username,
                userpass: userpass
            }
        });

        // Send the response from the external server back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        // Handle any error that occurs during the Axios request
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
};
