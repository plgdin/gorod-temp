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
      const heroEl = document.getElementById('main-screen');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      // Only switch to scrolled state when user scrolls out of the hero section
      const isPastHero = currentScrollY > heroHeight - 100;

      setIsScrolled(isPastHero);

      if (isPastHero && currentScrollY > 100 && currentScrollY > lastScrollY && !menuOpen) {
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

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleActiveTrack = () => {
      const scrollY = window.scrollY;
      const viewMiddle = scrollY + 200;

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const contactEl = document.getElementById('contact');

      if (contactEl && viewMiddle >= contactEl.offsetTop - 120) {
        setActiveSection('contact');
      } else if (servicesEl && viewMiddle >= servicesEl.offsetTop - 120) {
        setActiveSection('services');
      } else if (aboutEl && viewMiddle >= aboutEl.offsetTop - 120) {
        setActiveSection('about');
      } else {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleActiveTrack, { passive: true });
    handleActiveTrack();
    return () => window.removeEventListener('scroll', handleActiveTrack);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, options: Record<string, unknown>) => void } }).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, { duration: 1.2, offset: -70 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
          <a
            href="#about"
            className={`header__nav-item ${activeSection === 'about' ? '--active' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'about')}
          >
            About Us
          </a>
          <a
            href="#services"
            className={`header__nav-item ${activeSection === 'services' ? '--active' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'services')}
          >
            Services
          </a>
          <a
            href="#contact"
            className={`header__nav-item ${activeSection === 'contact' ? '--active' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        <div className="header__actions">
          <a
            href="#contact"
            className="header__enquire-btn"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
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

