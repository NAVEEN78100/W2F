import React, { useState, useEffect, useRef } from 'react';
import PartnerLeadForm from './PartnerLeadForm';

const PartnerDrawer = ({ open, partner, termsHtml, onClose, onSubmitSuccess }) => {
  const drawerRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className={`backdrop ${open ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        ref={drawerRef}
        className={`drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
        aria-hidden={!open}
      >
        <div className="drawer-header">
          <div className="drawer-img-wrapper">
            <img
              id="drawerImg"
              src={partner.imageUrl}
              alt={partner.title}
              className="drawer-img"
            />
          </div>
          <div>
            <h2 id="drawerTitle">{partner.title}</h2>
            <p className="drawer-sub">Eligibility & Requirements</p>
          </div>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close drawer"
            data-close
          >
            ×
          </button>
        </div>

        <div className="drawer-body">
          <div
            id="drawerTerms"
            className="drawer-terms"
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />

          <PartnerLeadForm
            category={partner.category}
            onSuccess={onSubmitSuccess}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
};

export default PartnerDrawer;