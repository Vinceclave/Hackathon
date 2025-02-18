import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import InputField from '../common/InputField';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
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

    // Simulate login logic (replace with actual logic)
    setTimeout(() => {
      setIsLoading(false);
      // Simulate error response
      setError('Login failed. Please check your credentials.');
    }, 2000);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

      <form onSubmit={handleSubmit}>
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
          Log In
        </Button>
      </form>

      {/* Link to Register Page */}
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
