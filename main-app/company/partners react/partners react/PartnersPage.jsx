import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import PartnerCardsGrid from './components/PartnerCardsGrid';
import PartnerDrawer from './components/PartnerDrawer';
import ConfirmationModal from './components/ConfirmationModal';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import './styles/partnerships.css';
import './styles/sections.css';

const PartnersPage = () => {
  const [pageData, setPageData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch partners page data from API
    fetchPartnersData();
  }, []);

  const fetchPartnersData = async () => {
    try {
      const response = await fetch('/api/partnerships');
      const data = await response.json();
      setPageData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching partners data:', error);
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedPartner(card);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPartner(null);
  };

  const handleSubmitSuccess = () => {
    setDrawerOpen(false);
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setSelectedPartner(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!pageData) {
    return <div className="error">Failed to load page data</div>;
  }

  return (
    <div className="partners-page">
      <HeroSection 
        title={pageData.heroTitle} 
        tagline={pageData.heroTagline} 
      />
      
      <div className="container">
        <PartnerCardsGrid 
          cards={pageData.cards} 
          onCardClick={handleCardClick} 
        />
      </div>

      <CTASection />
      <FooterSection />

      {selectedPartner && (
        <PartnerDrawer
          open={drawerOpen}
          partner={selectedPartner}
          termsHtml={pageData.termsHtml[selectedPartner.category]}
          onClose={handleCloseDrawer}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}

      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
};

export default PartnersPage;