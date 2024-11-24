import React from 'react';

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="flex justify-between mb-6">
      <button
        className={`w-1/2 py-2 text-lg font-semibold text-white rounded-l-lg ${role === 'customer' ? 'bg-blue-600' : 'bg-gray-300'}`}
        onClick={() => setRole('customer')}
      >
        Customer
      </button>
      <button
        className={`w-1/2 py-2 text-lg font-semibold text-white rounded-r-lg ${role === 'barber' ? 'bg-blue-600' : 'bg-gray-300'}`}
        onClick={() => setRole('barber')}
      >
        Barber
      </button>
    </div>
  );
};

export default RoleToggle;
