import React, { useState, useEffect } from 'react';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  isLightSection?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  menuOpen,
  onToggleMenu,
  isLightSection = false,
}) => {
  const [scrollDown, setScrollDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !menuOpen) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  return (
    <header
      id="header"
      className={`header --ready ${scrollDown ? '--scroll-down' : ''} ${
        menuOpen ? '--menu-opened' : ''
      } ${isLightSection && !menuOpen ? '--dark-compact' : ''}`}
    >
      <div className="header__top">
        <div className="header__logo">
          <a href="/" className="logo --pc">
            <img src="/icons/logo-pc.svg" alt="Stark Shipping" />
          </a>
        </div>

        <a
          className="header__link --portal"
          target="_blank"
          rel="noopener noreferrer"
          href="https://portal.starkshipping.net/login"
        >
          <span className="header__link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 35.7 35.7"
            >
              <path
                d="M26.4 35.7H9.2C4.1 35.7 0 31.5 0 26.4V9.2C0 4.1 4.1 0 9.2 0h17.2c5.1 0 9.2 4.1 9.2 9.2v17.2C35.7 31.5 31.5 35.7 26.4 35.7zM9.2 1.5c-4.3 0-7.8 3.5-7.8 7.8v17.2c0 4.3 3.5 7.8 7.8 7.8h17.2c4.3 0 7.8-3.5 7.8-7.8V9.2c0-4.3-3.5-7.8-7.8-7.8H9.2z"
                fill="currentColor"
              />
              <rect x="17.1" y="10" width="1.5" height="15.7" fill="currentColor" />
              <rect x="24.9" y="15.8" width="1.5" height="9.9" fill="currentColor" />
              <rect x="9.4" y="15.8" width="1.5" height="9.9" fill="currentColor" />
            </svg>
          </span>
          <span className="header__link-label">Login to Stark Portal</span>
        </a>

        <a
          className="header__link --research"
          target="_blank"
          rel="noopener noreferrer"
          href="https://stark-research.net/"
        >
          <span className="header__link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="28"
              viewBox="0 0 29 41.7"
            >
              <path
                d="M14.5 41.7C6.5 41.7 0 35.2 0 27.2c0-2.6 0.7-5.2 2-7.4l1.3 0.8c-1.2 2-1.8 4.3-1.8 6.6 0 7.2 5.8 13 13 13s13-5.8 13-13c0-2.4-0.7-4.8-1.9-6.8l1.3-0.8c1.4 2.3 2.1 4.9 2.1 7.6C29 35.2 22.5 41.7 14.5 41.7z"
                fill="currentColor"
              />
              <polygon
                points="26.1 21.2 14.5 2.8 2.9 21.2 1.7 20.4 14.5 0 27.3 20.4 "
                fill="currentColor"
              />
              <polygon
                points="27.6 26.8 14.5 20.5 1.3 26.8 0.7 25.4 14.5 18.8 28.3 25.4 "
                fill="currentColor"
              />
              <rect x="13.7" y="19.9" width="1.5" height="21" fill="currentColor" />
            </svg>
          </span>
          <span className="header__link-label">Login to Stark Research</span>
        </a>

        <div
          className={`header__burger ${menuOpen ? '--open' : ''}`}
          onClick={onToggleMenu}
          aria-label="Toggle Navigation"
          role="button"
        >
          <svg width="40" height="40" viewBox="0 0 48 48">
            <line x1="6" y1="18" x2="42" y2="18" strokeWidth="2.5" />
            <line x1="6" y1="30" x2="42" y2="30" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </header>
  );
};
