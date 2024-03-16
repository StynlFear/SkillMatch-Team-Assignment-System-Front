import React from 'react';

const DeletePopup = ({ onClose, onDelete }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete?</p>
          <div className="popup-buttons">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
