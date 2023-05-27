import React, { useEffect } from 'react';
import "../styles/modal.css"

function Modal(props) {
  const { onClose, children } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <div className="modal-header">
          <h2>Notifications</h2>
          <button className="modal-close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
