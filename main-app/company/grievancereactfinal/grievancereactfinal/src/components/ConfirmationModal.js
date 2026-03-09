import React from 'react';

const ConfirmationModal = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`confirmation-modal ${isOpen ? 'show' : ''}`}
      id="confirmationModal"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3>Grievance Submitted Successfully!</h3>
          <button
            className="modal-close"
            id="modalClose"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>
            Thank you for submitting your grievance!
          </p>
          <p>
            We've received your concern and a confirmation email has been sent to your email address.
          </p>
          <p>
            <strong>Next Steps:</strong>
          </p>
          <ul>
            <li>We will review your grievance within 30 days</li>
            <li>You will receive updates via email</li>
            <li>If urgent, contact us at grievance@wwf.com</li>
          </ul>
        </div>

        <div className="modal-footer">
          <button
            id="modalOk"
            className="btn-primary"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
