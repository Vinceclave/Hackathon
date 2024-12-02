import React from 'react';

const Button = ({ children, isLoading, disabled, ...props }) => {
  return (
    <button
      className={`w-full py-2 px-4 rounded-md 
        ${disabled || isLoading ? 'bg-muted text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-accent'}
        font-secondary text-lg`}
      disabled={disabled || isLoading} // Disable button if it's loading or disabled
      {...props}
    >
      {isLoading ? "Please wait..." : children} {/* Show loading text or children */}
    </button>
  );
};

export default Button;
