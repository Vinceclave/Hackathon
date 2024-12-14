import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const Sidebar = () => {
  const { logOut, role } = useAuth(); // Get role and logout function from the context

  return (
    <div className="fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 shadow-md z-50 flex flex-col h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-center">Trimly</h2>
        <hr className="border-gray-600 mt-2" />
      </div>
      
      {/* Navigation Menu - Dynamically Render Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {role === 'admin' && (
            <>
              {/* Admin menu */}
              <li>
                <Link
                  to="/admin/manage-member"
                  className="block px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Manage Members
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/add-services"
                  className="block px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Add Services
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/view-appointments"
                  className="block px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  View Appointments
                </Link>
              </li>
            </>
          )}

          {role === 'barber' && (
            <>
              {/* Barber menu */}
              <li>
                <Link
                  to="/barber/add-specialization"
                  className="block px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/barber/view-appointments"
                  className="block px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  View Appointments
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="mt-auto mb-4">
        <button
          onClick={logOut}
          className="block w-full text-center px-3 py-2 bg-secondary text-accent hover:bg-accent hover:text-secondary rounded-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
