import React from 'react';
import { useAuth } from '../hooks/AuthProvider'; // Use the Auth context

const Dashboard = () => {

  return (
    <div>asdasd
      <h1>Welcome to your Dashboard</h1>
    </div>
      <button onClick={logOut}>Logout</button>
  );
};

export default Dashboard;
