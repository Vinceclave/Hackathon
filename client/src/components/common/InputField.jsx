import React from "react";

const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ariaDescription,
  ariaInvalid,
  label,
  icon, // Optional icon (e.g., calendar, clock)
}) => {
  return (
    <div className="form_control mb-6">
      {/* Label with an optional icon */}
      <label
        htmlFor={id}
        className="block text-lg font-medium text-primary mb-2"
      >
        {label}
        {icon && <span className="ml-2 text-accent">{icon}</span>} {/* Icon color */}
      </label>

      {/* Input Field */}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-describedby={ariaDescription}
        aria-invalid={ariaInvalid}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
          ${error ? 'border-accent' : 'border-muted'} 
          focus:ring-background`}
      />

      {/* Error Message */}
      {error && (
        <div id={ariaDescription} className="text-accent text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
