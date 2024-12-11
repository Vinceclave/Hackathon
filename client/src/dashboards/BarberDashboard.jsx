import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const BarberDashboard = () => {
  const { logOut } = useAuth();

  return (
    <div>
      <h2>Welcome, Barber! Here's your barber dashboard.</h2>
      <button onClick={logOut} className="logout-btn">Logout</button>
    </div>
  );
};

export default BarberDashboard;
