import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role, isLoading } = useAuth();

  // If still loading, show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no role is set, redirect to login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Check if the current role is allowed
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleBasedRoute;