import React from 'react';
import { getCategoryDisplay, getCategoryClass } from '../data/feedbackData';

const FeedbackCard = ({ card, onClick }) => {
  return (
    <article className="feedback-card" onClick={onClick}>
      <div className="img-wrap">
        <span className={`category-tag ${getCategoryClass(card.category)}`}>
          {getCategoryDisplay(card.category)}
        </span>
        <img src={card.imageUrl} alt={card.title} />
      </div>
      <div className="card-body">
        <h3>{card.title}</h3>
        <p>{card.subtitle}</p>
      </div>
    </article>
  );
};

export default FeedbackCard;
