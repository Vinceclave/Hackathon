// components/routing/RoleBasedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider'; // Ensure the path is correct

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role } = useAuth();

  // Check if the user's role is included in the allowed roles
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
};

export default RoleBasedRoute;
