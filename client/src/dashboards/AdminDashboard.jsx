import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const AdminDashboard = () => {
  const { logOut } = useAuth();

  return (
    <div>
      <h2>Welcome, Admin! Here's your admin dashboard.</h2>
      <button onClick={logOut} className="logout-btn">Logout</button>
    </div>
  );
};

export default AdminDashboard;
