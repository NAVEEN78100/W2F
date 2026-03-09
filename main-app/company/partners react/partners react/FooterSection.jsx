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
              © 2025 | World Wildlife Fund is dedicated to protecting wildlife and their 
              habitats worldwide. WWF operates in over 100 countries and is supported by 
              millions of members globally.
            </p>
            <p>
              WWF is committed to conservation, research, and advocacy to ensure a 
              sustainable future for our planet. Join us in our mission to create a 
              world where people and nature thrive together.
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
              © 2025 | World Wildlife Fund is dedicated to protecting wildlife and their 
              habitats worldwide. WWF operates in over 100 countries and is supported by 
              millions of members globally.
            </p>
            <p>
              WWF is committed to conservation, research, and advocacy to ensure a 
              sustainable future for our planet. Join us in our mission to create a 
              world where people and nature thrive together.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;