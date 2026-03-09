import React from 'react';
import { getCategoryDisplay, getCategoryClass } from '../data/feedbackData';

const CardDrawer = ({ card, isOpen, onClose }) => {
  if (!card) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`} id="drawer">
      <button className="back-link" onClick={onClose}>
        Back
      </button>
      
      <div className="drawer-content">
        <div className="detail-card-jeton">
          <div className="drawer-header-flex">
            <div className="drawer-header-image-col">
              <img 
                src={card.imageUrl} 
                alt={card.title} 
                className="drawer-main-image" 
              />
            </div>
            <div className="drawer-header-content-col">
              <span className={`category-tag ${getCategoryClass(card.category)}`}>
                {getCategoryDisplay(card.category)}
              </span>
              <h2 className="drawer-main-title">{card.title}</h2>
              <div className="date">{formatDate(card.publishDate)}</div>
            </div>
          </div>
          
          <div 
            className="detail-card-body-jeton" 
            dangerouslySetInnerHTML={{ __html: card.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDrawer;
