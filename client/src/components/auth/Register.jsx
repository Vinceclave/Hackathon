import React, { useState } from 'react';
import { HiUser, HiPhone, HiMail, HiLockClosed } from 'react-icons/hi';
import InputField from '../common/InputField';
import RoleToggle from '../common/RoleToggle';
import Button from '../common/Button'; // Import the reusable button
import { Link } from 'react-router-dom'; // Import Link for routing

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role is 'customer'
  const [schedule, setSchedule] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !phoneNum || !email || !password) {
      setError('Please fill in all the fields');
      return;
    }
    if (role === 'barber' && !schedule) {
      setError('Please provide your schedule if registering as a barber');
      return;
    }
    setError('');
    console.log('Form submitted:', { firstname, lastname, phoneNum, email, password, role, schedule });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f3ee] p-5 lg:p-12">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-2xl sm:text-5xl font-extrabold text-gray-800 text-center mb-5">
          Register for Trimly
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-5">
            {error}
          </div>
        )}

        {/* Role Toggle */}
        <RoleToggle role={role} setRole={setRole} />

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="firstname"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            icon={HiUser}
          />

          <InputField
            id="lastname"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            icon={HiUser}
          />

          <InputField
            id="phoneNum"
            label="Phone Number"
            type="text"
            placeholder="Enter your phone number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            icon={HiPhone}
          />

          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={HiMail}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={HiLockClosed}
          />

          {/* Barber Schedule (Only if Barber is selected) */}
          {role === 'barber' && (
            <div className="relative">
              <label htmlFor="schedule" className="text-lg font-medium text-gray-600">Work Schedule</label>
              <div className="flex items-center mt-2 border-2 border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  id="schedule"
                  name="schedule"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your schedule"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            text="Register"
            color="blue"
            className="mt-4"
          />
        </form>

        {/* Link to Login Page */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
