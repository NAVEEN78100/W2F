import React from 'react';
import { grievancePolicies } from '../data/grievanceData';

const PoliciesDrawer = ({ isOpen, onClose }) => {
  const handleAccept = () => {
    // Check the checkbox in the form
    const checkbox = document.getElementById('acceptPolicies');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.disabled = false;
    }
    onClose();
  };

  return (
    <>
      <div 
        className={`policies-drawer ${isOpen ? 'open' : ''}`}
        id="policiesDrawer"
      >
        <div className="policies-drawer-header">
          <h3>Grievance Policies</h3>
          <button
            className="policies-drawer-close"
            id="closePoliciesDrawer"
            onClick={onClose}
            aria-label="Close policies drawer"
          >
            ×
          </button>
        </div>

        <div className="policies-drawer-body">
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
            {grievancePolicies}
          </div>
        </div>

        <div className="policies-drawer-footer">
          <button
            id="acceptPoliciesBtn"
            className="btn-primary"
            onClick={handleAccept}
          >
            Accept Policies
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="policies-backdrop show"
          id="policiesBackdrop"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default PoliciesDrawer;
