import React from 'react';

const HeroSection = ({ onOpenModal }) => {
  return (
    <section className="hero">
      <div className="hero-flex-row">
        <div className="hero-text-block">
          <h1>Product Updates</h1>
          <p>Here, you'll find everything we're building to make your experience faster, safer, and more powerful.</p>
        </div>
        <div className="btn-block">
          <button className="btn-questions" onClick={onOpenModal}>
            Any Questions?
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
