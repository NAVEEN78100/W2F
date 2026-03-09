import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>
            <span className="highlight">1 million</span> users,<br />
            plus you.
          </h2>
          <p>It only takes few seconds to get started.</p>
          <div className="cta-buttons">
            <a href="#" className="app-badge" aria-label="Download on App Store">
              <img src="/images/app-store-badge.svg" alt="Download on the App Store" />
            </a>
            <a href="#" className="app-badge" aria-label="Get it on Google Play">
              <img src="/images/google-play-badge.svg" alt="Get it on Google Play" />
            </a>
          </div>
          <p className="cta-footer">It only takes few seconds to get started.</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;