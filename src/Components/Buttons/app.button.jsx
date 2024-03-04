import React from 'react';

function AppButton({ onClick, children }) {
  return (
    <div>
      <button class="apps-login-button" onClick={onClick}>{children}</button>
    </div>
  );
}

export default  AppButton;