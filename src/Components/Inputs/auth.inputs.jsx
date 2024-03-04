import React from 'react';

function Input({ type, value, onChange, placeholder, className, style, maxWidth }) {
  const inputStyle = {
    ...style,
    maxWidth: maxWidth ? maxWidth : '350px' // Set maxWidth to the provided value or default to '300px'
  };

  return (
    <div>
      <input
        className={`default-input ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

export default Input;
