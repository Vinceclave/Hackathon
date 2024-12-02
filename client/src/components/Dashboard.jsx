import React from 'react';
import { useAuth } from '../hooks/AuthProvider'; // Use the Auth context

const Dashboard = () => {
  const { logOut } = useAuth();

  return (
    <div>asdasd
      <h1>Welcome to your Dashboard</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
