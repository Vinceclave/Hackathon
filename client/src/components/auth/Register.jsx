import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import Axios for HTTP requests

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    user_pass: '',
    user_level: 'user', // You can adjust the default user level if needed
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      // Send registration request to backend API
      const response = await axios.post('http://localhost:5000/api/users/register', formData);

      // On success, show success message and redirect to login
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      // Handle error if request fails
      setError(err.response ? err.response.data.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column (Form Section) */}
      <div className="lg:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="user_pass"
                value={formData.user_pass}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 text-center">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Optional Image Section) */}
      <div className="lg:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <img src="src/assets/register-logo.png" alt="Register" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default Register;
