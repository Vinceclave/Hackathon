import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';

const BarberDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main Content Area with dynamic flex */}
      <div className="flex-1 ml-64 bg-gray-50 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Barber</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BarberDashboard;
