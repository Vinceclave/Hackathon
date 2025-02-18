// Login.js
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import axios from 'axios'; // Import axios to make HTTP requests
import { Link, useNavigate } from 'react-router-dom'; // For navigation after successful login

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For navigation to dashboard or home page after successful login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
        // Send login request with email and password
        const response = await axios.post('http://localhost:5015/api/users/login', {
            email: formData.email,
            user_pass: formData.password // Ensure you're sending this field correctly
        });

        // Assuming response contains the token and user details
        localStorage.setItem('authToken', response.data.token);

        // Redirect to dashboard or homepage
        navigate('/dashboard');
    } catch (err) {
        setError(err.response ? err.response.data.message : 'Login failed, please try again.');
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 shadow-md rounded-md bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
