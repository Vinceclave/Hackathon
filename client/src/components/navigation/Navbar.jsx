import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  // Assuming points are passed down as a prop or fetched from a state (e.g., Redux, Context API)
  const points = 1800; // Example points, this would come from user state or context

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Navigation Links */}
        <ul className="ml-auto flex space-x-6">
          {/* My Tasks */}
          <li>
            <Link
              to="/my-tasks"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              My Tasks
            </Link>
          </li>

          {/* Available Tasks */}
          <li>
            <Link
              to="/available-tasks"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Available Tasks
            </Link>
          </li>

          {/* Create Task */}
          <li>
            <Link
              to="/create-task"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Create Task
            </Link>
          </li>

          {/* Spend Points */}
          <li>
            <Link
              to="/spend-points"
              className="text-lg hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Spend Points
            </Link>
          </li>

          {/* Points */}
          <li className="flex items-center space-x-2">
            <span className="text-lg">
              Points: <span className="font-semibold">{points}</span>
            </span>
          </li>

          {/* Log-out */}
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
