import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import GrievanceForm from './GrievanceForm';
import CTASection from './CTASection';
import FooterSection from './FooterSection';
import PoliciesDrawer from './PoliciesDrawer';
import ConfirmationModal from './ConfirmationModal';

const GrievancePage = () => {
  const [showPoliciesDrawer, setShowPoliciesDrawer] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleOpenPolicies = () => {
    setShowPoliciesDrawer(true);
  };

  const handleClosePolicies = () => {
    setShowPoliciesDrawer(false);
  };

  const handleShowConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="grievance-page">
      <HeaderSection />
      <GrievanceForm 
        onOpenPolicies={handleOpenPolicies}
        onShowConfirmation={handleShowConfirmation}
      />
      <CTASection />
      <FooterSection />
      
      <PoliciesDrawer 
        isOpen={showPoliciesDrawer}
        onClose={handleClosePolicies}
      />
      
      <ConfirmationModal 
        isOpen={showConfirmationModal}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
};

export default GrievancePage;
