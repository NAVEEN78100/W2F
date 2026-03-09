import React from 'react';

const FooterSection = () => {
  return (
    <>
      {/* Footer Section */}
      <section className="footer-section">
        <div className="footer-container">
          {/* Footer Links Grid */}
          <div className="footer-links-grid">
            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Press</a>
                <a href="#" className="footer-link">Blog</a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Products</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Features</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">Security</a>
                <a href="#" className="footer-link">Updates</a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Resources</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Documentation</a>
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Community</a>
                <a href="#" className="footer-link">Contact</a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Cookie Policy</a>
                <a href="#" className="footer-link">Compliance</a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Connect</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">LinkedIn</a>
                <a href="#" className="footer-link">Facebook</a>
                <a href="#" className="footer-link">Instagram</a>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-certifications">
              <div className="cert-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <div className="cert-text">
                <div>ISO</div>
                <div>27001</div>
              </div>
            </div>
            
            <div className="footer-social">
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.15-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.04-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.7 1.8-1.56 2.46-2.55z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.75 8.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM18 17h-2.5v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17H10v-7h2.5v.99c.53-.52 1.25-.99 2.25-.99 1.52 0 2.75 1.23 2.75 2.75V17z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WWF Section */}
      <section className="wwf-section">
        <div className="wwf-container">
          <div className="wwf-header">
            <div className="wwf-language">
              <div className="language-icon">🌐</div>
              <span>EN</span>
            </div>
            <div className="wwf-credit">
              Made by <span className="credit-name">BINI</span>
            </div>
          </div>
          
          <div className="wwf-logo-container">
            <h1 className="wwf-logo">WWF</h1>
          </div>
          
          <div className="wwf-cards-grid">
            <div className="wwf-card wildlife-card">
              <div className="wwf-card-overlay"></div>
              <div className="wwf-card-content">
                <div className="wwf-card-icon">🐾</div>
                <h3 className="wwf-card-title">Wildlife Protection</h3>
                <p className="wwf-card-text">
                  Protecting endangered species and their habitats worldwide
                </p>
              </div>
              <div className="wwf-card-footer">
                <div className="wwf-badge">
                  <div className="badge-icon">🌍</div>
                  <span className="badge-text">Global Initiative</span>
                </div>
              </div>
            </div>
            
            <div className="wwf-card marine-card">
              <div className="wwf-card-overlay"></div>
              <div className="wwf-card-content">
                <div className="wwf-card-icon">🌊</div>
                <h3 className="wwf-card-title">Marine Conservation</h3>
                <p className="wwf-card-text">
                  Preserving ocean ecosystems and marine biodiversity
                </p>
              </div>
              <div className="wwf-card-footer">
                <div className="wwf-badge">
                  <div className="badge-icon">🐋</div>
                  <span className="badge-text">Ocean Protection</span>
                </div>
              </div>
            </div>
            
            <div className="wwf-card climate-card">
              <div className="wwf-card-overlay"></div>
              <div className="wwf-card-content">
                <div className="wwf-card-icon">🌱</div>
                <h3 className="wwf-card-title">Climate Action</h3>
                <p className="wwf-card-text">
                  Fighting climate change through sustainable solutions
                </p>
              </div>
              <div className="wwf-card-footer">
                <div className="wwf-badge">
                  <div className="badge-icon">♻️</div>
                  <span className="badge-text">Sustainability</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wwf-footer-text">
            <p>
              © 2025 | World Wildlife Fund is dedicated to protecting wildlife and their habitats 
              worldwide. WWF operates in over 100 countries and is supported by millions of members globally.
            </p>
            <p>
              WWF is committed to conservation, research, and advocacy to ensure a sustainable future 
              for our planet. Join us in our mission to create a world where people and nature thrive together.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterSection;
