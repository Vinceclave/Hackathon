import React from 'react';
import Button from '../../common/Button'; // Import the Button component

const RoleSelection = ({ handleRoleSelection }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium text-primary mb-6">Please select your role:</h3>
      
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => handleRoleSelection('barber')} 
        >
          Barber
        </Button>
        <Button 
          onClick={() => handleRoleSelection('customer')} 
        >
          Customer
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
