import React from 'react';
import { heroData } from '../data/grievanceData';

const HeaderSection = () => {
  return (
    <div className="jeton-orange-header">
      <div className="logo-container">
        <img src="/wwf-logo.jpg" alt="WWF Logo" className="wwf-logo" />
      </div>
      <section className="hero">
        <div className="container">
          <h1>{heroData.title}</h1>
          <p>{heroData.tagline}</p>
        </div>
      </section>
    </div>
  );
};

export default HeaderSection;
