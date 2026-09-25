import React from 'react';

export const Footer: React.FC = () => {

  return (
    <footer id="footer" className="footer">
      <div className="fw-container footer__container">
        <div className="footer__top-row">
          <div className="footer__brand">
            <img
              src="/images/gorod-marine-logo.png"
              alt="Gorod Marine"
              className="footer__logo-img"
            />
            <p className="footer__brand-tagline">
              European standards in maritime port agency across Ukrainian & Black Sea ports.
            </p>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Navigation</h4>
            <ul className="footer__links">
              <li><a href="#">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#contact">Contact & PDA</a></li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Operations</h4>
            <ul className="footer__links">
              <li><span>Odesa &bull; Chornomorsk</span></li>
              <li><span>Pivdennyi &bull; Danube Ports</span></li>
              <li><span>24/7 Dispatch Desk</span></li>
              <li><a href="mailto:agency@gorodshipping.com">agency@gorodshipping.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom-row">
          <div className="copyright">
            <span>&copy; 2014&ndash;2026 Gorod Shipping. All rights reserved.</span>
          </div>
          <div className="developer">
            Independent Marine Agency Services
          </div>
        </div>
      </div>
    </footer>
  );
};
