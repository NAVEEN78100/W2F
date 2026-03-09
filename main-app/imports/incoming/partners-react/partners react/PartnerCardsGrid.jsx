import React from 'react';
import PartnerCard from './PartnerCard';

const PartnerCardsGrid = ({ cards, onCardClick }) => {
  return (
    <section className="partners">
      <div className="partners-head">
        <h2>Partnership Opportunities</h2>
        <p>Choose a category to start your partnership journey</p>
      </div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <PartnerCard
            key={index}
            card={card}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </section>
  );
};

export default PartnerCardsGrid;