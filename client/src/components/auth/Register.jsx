import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import InputField from '../common/InputField';
import Button from '../common/Button';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Register = () => {
  // State to handle form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    // Simulate registration logic (replace with actual logic)
    setTimeout(() => {
      setIsLoading(false);
      // Simulate error response
      setError('Registration failed. Please try again.');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column (Form Section) */}
      <div className="lg:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
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
      
      {/* Right Column (Additional Content or Image Section) */}
      <div className="lg:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        {/* Replace this with your image */}
        <img src="src/assets/register-logo.png" alt="Register" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default Register;
