import React from 'react';

function SubMitButton({ onClick, children, className, style, maxWidth }) {
  const buttonStyle = {
    ...style,
    maxWidth: maxWidth || 'none' 
  };

  return (
    <button
      className={`default-button ${className}`}
      type="button"
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

export default SubMitButton;
