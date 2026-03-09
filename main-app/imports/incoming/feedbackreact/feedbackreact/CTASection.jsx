import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>
            Ready to improve your <span className="highlight">experience?</span>
          </h2>
          <p>Share your ideas and help us build a better product</p>
          <div className="cta-buttons">
            <a href="#feedback-form" className="btn btn-primary">
              Send Feedback
            </a>
            <a href="#learn-more" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;