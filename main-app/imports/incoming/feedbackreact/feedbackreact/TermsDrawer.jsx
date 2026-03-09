import React, { useEffect } from 'react';

const TermsDrawer = ({ open, onClose, onAccept }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="terms-backdrop"
        onClick={onClose}
        style={{ display: open ? 'block' : 'none' }}
      />
      <div
        className={`terms-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="terms-header">
          <h3>Terms and Conditions</h3>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close terms"
          >
            ×
          </button>
        </div>
        <div className="terms-body">
          <h4>Feedback & Feature Request Terms</h4>
          <p>
            By submitting feedback, you agree that:
          </p>
          <ul>
            <li>Your feedback may be used to improve our services</li>
            <li>You have the right to the information you provide</li>
            <li>Your contact information will be kept confidential</li>
            <li>We may contact you for clarification on your feedback</li>
          </ul>

          <h4>Bug Bounty Terms</h4>
          <p>
            For security reports:
          </p>
          <ul>
            <li>Do not publicly disclose the vulnerability</li>
            <li>Allow us 30 days to address the issue</li>
            <li>Rewards depend on severity and impact</li>
            <li>We may use your report for security research</li>
          </ul>

          <p>
            By accepting these terms, you acknowledge that you have read and agreed to our 
            privacy policy and terms of service.
          </p>
        </div>
        <div className="terms-footer">
          <button
            className="btn btn-primary"
            onClick={onAccept}
          >
            I Agree
          </button>
        </div>
      </div>
    </>
  );
};

export default TermsDrawer;