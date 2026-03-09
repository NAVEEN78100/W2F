import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackSection = ({ cards, onCardClick }) => {
  return (
    <section className="feedback">
      <div className="container">
        <div className="card-grid">
          {cards.map((card, index) => (
            <FeedbackCard 
              key={index} 
              card={card} 
              onClick={() => onCardClick(card)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
