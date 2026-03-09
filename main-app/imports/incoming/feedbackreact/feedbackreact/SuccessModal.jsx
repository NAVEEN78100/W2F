import React, { useEffect } from 'react';

const SuccessModal = ({ open, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="success-modal"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="modal-icon">✓</div>
        <h2>Thank You!</h2>
        <p>Your feedback has been received successfully.</p>
        <div className="modal-message">
          <p>
            We appreciate you taking the time to share your thoughts with us. 
            Our team will review your feedback and get back to you if needed.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;