import React, { useState } from 'react';
import "../../css/pop.css"
const EditPopup = ({ onClose, onConfirm }) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2>Confirmation</h2>
          <p>Are you sure you want to go to the edit page?</p>
          <div className="popup-buttons">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
