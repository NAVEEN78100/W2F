import React from 'react';

const PartnerCard = ({ card, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="partner-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Apply for ${card.title} partnership`}
      data-category={card.category}
      data-title={card.title}
    >
      <div className="card-img">
        <img src={card.imageUrl} alt={card.title} />
      </div>
      <div className="card-body">
        <h3>{card.title}</h3>
        <p>{card.subtitle}</p>
      </div>
    </div>
  );
};

export default PartnerCard;