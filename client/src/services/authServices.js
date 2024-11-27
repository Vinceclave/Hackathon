import axios from 'axios';

// Login the user and store the JWT in localStorage
export const login = async (username, userpass) => {
    try {
      // Send the request to the backend
      const response = await axios.post('http://localhost:5015/login', {
        username,
        userpass,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8', // Ensure the correct content type
        },
      });
  
      // Log the entire response to see its structure
      console.log('Login response:', response);  // <-- This is critical to verify response format
      
      // Make sure the response contains the token
      if (response && response.data && response.data.token) {
        return response.data;  // Return the entire response data including token
      } else {
        throw new Error('Token not received from server');
      }
  
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  
// Get the JWT from localStorage
export const getToken = () => {
  return localStorage.getItem('jwt');
};

// Logout the user by clearing the JWT
export const logout = () => {
  localStorage.removeItem('jwt');
};

// Verify the token
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  // Optionally, you could decode the token and check for expiration here
  return true; // Simple check, you might want to add more logic
};
