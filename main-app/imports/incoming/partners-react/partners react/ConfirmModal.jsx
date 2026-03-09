import React, { useEffect } from 'react';

const ConfirmationModal = ({ open, onClose }) => {
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
      id="confirmationModal"
      className={`confirmation-modal ${open ? 'show' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="modal-content">
        <button
          id="modalClose"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="modal-icon">✓</div>
        <h2>Thank you for your interest in becoming our partner!</h2>
        <p>We've received your partnership application and our team will review your details.</p>
        <div className="modal-steps">
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will verify your business details</li>
            <li>You'll receive an email within 2-3 business days</li>
            <li>Complete any additional requirements if needed</li>
            <li>Start your partnership journey with us!</li>
          </ol>
        </div>
        <p className="modal-note">
          <strong>Note:</strong> Please ensure your contact details are accurate for smooth communication.
        </p>
        <button
          id="modalOk"
          className="btn btn-primary"
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;