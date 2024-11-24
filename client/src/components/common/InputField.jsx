// InputField.js
import React from 'react';

const InputField = ({ id, label, type, value, onChange, icon: Icon, placeholder }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="text-lg font-medium text-gray-600">{label}</label>
      <div className="flex items-center mt-2 border-2 border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
        {Icon && <Icon className="text-gray-500 mr-2" />}
        <input
          type={type}
          id={id}
          name={id}
          className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;
