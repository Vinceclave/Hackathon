import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const Customer = () => {
  const { logOut } = useAuth();

  return (
    <div>
      <h1>Welcome, Customer!</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Customer;
