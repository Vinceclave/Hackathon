import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Example icon, you can change this to any icon you want

const Button = ({ children, isLoading, disabled, icon, ...props }) => {
  return (
    <button
      className={`w-full py-2 px-4 rounded-md 
        ${disabled || isLoading ? 'bg-muted text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-accent'}
        font-secondary text-lg flex items-center justify-center`} // Added flex to center icon and text
      disabled={disabled || isLoading} // Disable button if it's loading or disabled
      {...props}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2" /> // Show loading spinner if isLoading
      ) : (
        icon && <span className="mr-2">{icon}</span> // If there's an icon, display it
      )}
      {isLoading ? "Please wait..." : children} {/* Show loading text or children */}
    </button>
  );
};

export default Button;
