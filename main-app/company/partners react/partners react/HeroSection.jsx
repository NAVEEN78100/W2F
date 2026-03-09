import React from 'react';

const HeroSection = ({ title, tagline }) => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>{title}</h1>
            <p>{tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;