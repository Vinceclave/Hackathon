import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            MyApp
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/create-appointment"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Create Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
