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
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <InputField
          id="name"
          name="name"
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          error={error}
        />

        {/* Email Input */}
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={error}
        />

        {/* Password Input */}
        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={error}
        />

        {/* Submit Button with an Icon */}
        <Button isLoading={isLoading} disabled={isLoading} icon={<FaUser />}>
          Register
        </Button>
      </form>

      {/* Link to Login Page */}
      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
