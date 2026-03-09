import React, { useState } from 'react';
import HeroSection from './HeroSection';
import FeedbackSection from './FeedbackSection';
import CTASection from './CTASection';
import FooterSection from './FooterSection';
import CardDrawer from './CardDrawer';
import ContactFormModal from './ContactFormModal';
import { feedbackCards } from '../data/feedbackData';

const FeedbackPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('Feedback');

  const handleCardClick = (card) => {
    if (card.category === 'ReportProblem') {
      setIsDrawerOpen(false);
      setSelectedCard(null);
      setModalCategory('ReportProblem');
      setIsModalOpen(true);
      return;
    }
    setSelectedCard(card);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  const handleOpenModal = () => {
    setModalCategory('Feedback');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="feedback-page">
      <HeroSection onOpenModal={handleOpenModal} />
      <FeedbackSection cards={feedbackCards} onCardClick={handleCardClick} />
      <CTASection />
      <FooterSection />
      
      <CardDrawer 
        card={selectedCard} 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
      />
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        initialCategory={modalCategory}
      />
    </div>
  );
};

export default FeedbackPage;
