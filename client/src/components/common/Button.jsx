// Button.js
import React from 'react';

const Button = ({ text, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
