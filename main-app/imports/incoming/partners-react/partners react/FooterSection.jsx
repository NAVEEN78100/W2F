import React from 'react';

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="language">EN</span>
            <div className="brand-info">
              <span>Made by BINI</span>
              <h3>WWF</h3>
            </div>
          </div>
        </div>

        <div className="footer-cards">
          <div className="footer-card">
            <div className="card-icon">🦁</div>
            <h4>Wildlife Protection</h4>
            <p>Protecting endangered species and their habitats worldwide</p>
            <span className="card-badge">🌍 Global Initiative</span>
          </div>

          <div className="footer-card">
            <div className="card-icon">🐋</div>
            <h4>Marine Conservation</h4>
            <p>Preserving ocean ecosystems and marine biodiversity</p>
            <span className="card-badge">🌊 Ocean Protection</span>
          </div>

          <div className="footer-card">
            <div className="card-icon">🌱</div>
            <h4>Climate Action</h4>
            <p>Fighting climate change through sustainable solutions</p>
            <span className="card-badge">♻️ Sustainability</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>
              © 2025 | Wander With Food (W2F) connects food lovers with unique culinary experiences across cities. Discover, explore, and taste your way through local favorites and hidden gems.
            </p>
            <p>
              W2F is built to help people find great food, support local vendors, and turn every meal into an experience worth sharing.
            </p>
          </div>

          <div className="footer-highlights">
            <div className="highlight-item">
              <span className="icon">🦁</span>
              <p>Protecting endangered species and their habitats worldwide</p>
            </div>
            <div className="highlight-item">
              <span className="icon">🐋</span>
              <p>Preserving ocean ecosystems and marine biodiversity</p>
            </div>
            <div className="highlight-item">
              <span className="icon">🌱</span>
              <p>Fighting climate change through sustainable solutions</p>
            </div>
          </div>

          <div className="footer-copyright">
            <p>
              © 2025 | Wander With Food (W2F) connects food lovers with unique culinary experiences across cities. Discover, explore, and taste your way through local favorites and hidden gems.
            </p>
            <p>
              W2F is built to help people find great food, support local vendors, and turn every meal into an experience worth sharing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;