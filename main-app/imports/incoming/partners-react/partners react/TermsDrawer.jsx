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
        id="termsDrawerBackdrop"
        className="terms-backdrop"
        onClick={onClose}
        style={{ display: open ? 'block' : 'none' }}
      />
      <div
        id="termsDrawer"
        className={`terms-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="terms-drawer-header">
          <h3>Terms and Conditions</h3>
          <button
            id="closeTermsDrawer"
            className="close-btn"
            onClick={onClose}
            aria-label="Close terms drawer"
          >
            ×
          </button>
        </div>
        <div className="terms-drawer-body">
          <h4>Sample Terms and Policies</h4>
          <p>
            By becoming a partner, you agree to maintain quality standards, 
            comply with local regulations, and provide accurate business information.
          </p>
          <p>
            Partnership terms may vary based on category and location. Our team 
            will review your application and contact you with specific requirements.
          </p>
        </div>
        <div className="terms-drawer-footer">
          <button
            id="acceptTermsBtnDrawer"
            className="btn btn-primary"
            onClick={onAccept}
          >
            Accept Terms
          </button>
        </div>
      </div>
    </>
  );
};

export default TermsDrawer;