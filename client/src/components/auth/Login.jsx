import React, { useState } from 'react';
import { login } from '../../services/authServices';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting
  
    // First, validate the form fields
    let errors = { username: '', password: '' };
    if (!username) {
      errors.username = 'Username is required!';
    }
    if (!password) {
      errors.password = 'Password is required!';
    }
  
    // If there are validation errors, set them and return early
    if (errors.username || errors.password) {
      setFormErrors(errors);
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    // Clear previous error messages
    setErrorMessage('');
    setFormErrors({ username: '', password: '' });
  
    try {
      // Call the login function (assumes it's an async function like an API call)
      const response = await login(username, password);
  
      // Check if the response contains a token
      if (response && response.token) {
        // Store JWT token in localStorage (or cookies)
        localStorage.setItem('jwt', response.token);
  
        // Redirect to dashboard or another page after successful login
        window.location.href = '/dashboard'; // Redirect manually
      } else {
        throw new Error('No token returned from server');
      }
  
    } catch (error) {
      // Catch any error that occurs during login or from the server
      setErrorMessage(error.message || 'An error occurred during login');
    }
  };
  

  return (
    <div className='font-poppins p-6'>
      <h2 className='font-bold text-4xl lg:text-5xl mb-6'>Login Trimly</h2>

      <form onSubmit={handleLogin} className='space-y-4'>
        <div className='space-y-8 mb-8'>
            {/* Username Field */}
            <div className='relative'>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className='px-4 py-2 w-full border border-gray-300 rounded-md'
            />
            {formErrors.username && <p className='absolute -bottom-6 right-0 text-red-700 font-bold text-xs lg:text-sm'>{formErrors.username}</p>}
            </div>

            {/* Password Field */}
            <div className='relative'>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className='px-4 py-2 w-full border border-gray-300 rounded-md'
            />
            {formErrors.password && <p className='absolute -bottom-6 right-0 text-red-700 font-bold text-xs lg:text-sm'>{formErrors.password}</p>}
            </div>
        </div>
        {/* General Error Message */}
        {errorMessage && <p className='text-center text-red-700 font-bold text-xs lg:text-sm'>{errorMessage}</p>}

        <button className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md mt-4 hover:bg-blue-700 transition duration-300' type="submit">
          Log In
        </button>
      </form>

      {/* Sign-Up Link */}
      <div className='mt-4'>
        <p className='text-sm text-center'>
          Don't have an account?{' '}
          <a href="/signup" className='text-blue-600 hover:text-blue-700'>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
