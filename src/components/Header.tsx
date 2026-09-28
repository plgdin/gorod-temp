import React, { useState, useEffect } from 'react';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  isLightSection?: boolean;
  isReady?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  menuOpen,
  onToggleMenu,
  isLightSection = false,
  isReady = false,
}) => {
  const [scrollDown, setScrollDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [startPosition, setStartPosition] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setStartPosition(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isPastTop = currentScrollY > 40;

      setIsScrolled(isPastTop);

      if (isPastTop && currentScrollY > 100 && currentScrollY > lastScrollY && !menuOpen) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  return (
    <header
      id="header"
      className={`header ${startPosition ? '--start-position' : ''} ${
        isReady ? '--ready' : ''
      } ${scrollDown ? '--scroll-down' : ''} ${
        menuOpen ? '--menu-opened' : ''
      } ${isScrolled || isLightSection ? '--scrolled' : ''}`}
    >
      <div className="header__top">
        <div className="header__logo">
          <a href="/" className="logo --pc" aria-label="Gorod Marine">
            <img
              src="/images/gorod-marine-white.png"
              alt="Gorod Marine"
              className="logo-img logo-img--white"
            />
            <img
              src="/images/gorod-marine-black.png"
              alt="Gorod Marine"
              className="logo-img logo-img--black"
            />
          </a>
        </div>

        <nav className="header__nav-links">
          <a href="#about" className="header__nav-item">About Us</a>
          <a href="#services" className="header__nav-item">Services</a>
          <a href="#contact" className="header__nav-item">Contact</a>
        </nav>

        <div className="header__actions">
          <a href="#contact" className="header__enquire-btn">
            <span>Enquire Now</span>
            <span className="header__enquire-arrow">→</span>
          </a>

          <div
            className={`header__burger ${menuOpen ? '--open' : ''}`}
            onClick={onToggleMenu}
            aria-label="Toggle Navigation"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onToggleMenu()}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="18" x2="24" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

