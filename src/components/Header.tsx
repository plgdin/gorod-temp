import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  isLightSection?: boolean;
  isReady?: boolean;
}

const isElementOverLight = (el: HTMLElement | null): boolean => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
    return false;
  }

  // 1. Direct bounding box check against known light panels (like Brochure Middle Panel)
  const lightPanels = document.querySelectorAll<HTMLElement>(
    '.fold-brochure__panel--middle, .tri-panel--selector, [data-theme="light"], .light-bg'
  );
  for (let i = 0; i < lightPanels.length; i++) {
    const pRect = lightPanels[i].getBoundingClientRect();
    if (
      x >= pRect.left &&
      x <= pRect.right &&
      y >= pRect.top &&
      y <= pRect.bottom
    ) {
      return true;
    }
  }

  // 2. Dynamic check via elementsFromPoint to inspect underlying background luminance
  const elements = document.elementsFromPoint(x, y);
  for (const item of elements) {
    if (item.closest('#header') || item.closest('header')) continue;

    let curr: Element | null = item;
    while (curr && curr !== document.body && curr !== document.documentElement) {
      const style = window.getComputedStyle(curr);
      const bg = style.backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
          if (a > 0.4) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.65;
          }
        }
      }
      curr = curr.parentElement;
    }
    break;
  }

  return false;
};

export const Header: React.FC<HeaderProps> = ({
  menuOpen,
  onToggleMenu: _onToggleMenu,
  isLightSection = false,
  isReady = false,
}) => {
  const [startPosition, setStartPosition] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const aboutRef = useRef<HTMLAnchorElement>(null);
  const servicesRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const enquireRef = useRef<HTMLAnchorElement>(null);

  const [overLight, setOverLight] = useState({
    about: false,
    services: false,
    contact: false,
    logo: false,
    enquire: false,
  });

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
      setIsScrolled(currentScrollY > 60);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const checkOverLight = () => {
      const newAbout = isElementOverLight(aboutRef.current);
      const newServices = isElementOverLight(servicesRef.current);
      const newContact = isElementOverLight(contactRef.current);
      const newLogo = isElementOverLight(logoRef.current);
      const newEnquire = isElementOverLight(enquireRef.current);

      setOverLight((prev) => {
        if (
          prev.about === newAbout &&
          prev.services === newServices &&
          prev.contact === newContact &&
          prev.logo === newLogo &&
          prev.enquire === newEnquire
        ) {
          return prev;
        }
        return {
          about: newAbout,
          services: newServices,
          contact: newContact,
          logo: newLogo,
          enquire: newEnquire,
        };
      });
    };

    const handleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        checkOverLight();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate, { passive: true });

    const lenis = (window as unknown as { __lenis?: { on: (evt: string, cb: () => void) => void; off: (evt: string, cb: () => void) => void } }).__lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleUpdate);
    }

    handleUpdate();
    const timer = setTimeout(handleUpdate, 400);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleUpdate);
      }
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

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

  const anyNavOverLight = !isScrolled && (overLight.about || overLight.services || overLight.contact);

  return (
    <header
      id="header"
      className={`header ${startPosition ? '--start-position' : ''} ${
        isReady ? '--ready' : ''
      } ${menuOpen ? '--menu-opened' : ''} ${
        isScrolled || isLightSection ? '--scrolled' : ''
      }`}
    >
      <div className="header__top">
        <div ref={logoRef} className={`header__logo ${!isScrolled && overLight.logo ? '--over-light' : ''}`}>
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

        <nav className={`header__nav-links ${anyNavOverLight ? '--over-light' : ''}`}>
          <a
            ref={aboutRef}
            href="#about"
            className={`header__nav-item ${activeSection === 'about' ? '--active' : ''} ${!isScrolled && overLight.about ? '--over-light' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'about')}
          >
            About Us
          </a>
          <a
            ref={servicesRef}
            href="#services"
            className={`header__nav-item ${activeSection === 'services' ? '--active' : ''} ${!isScrolled && overLight.services ? '--over-light' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'services')}
          >
            Services
          </a>
          <a
            ref={contactRef}
            href="#contact"
            className={`header__nav-item ${activeSection === 'contact' ? '--active' : ''} ${!isScrolled && overLight.contact ? '--over-light' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        <div className="header__actions">
          <a
            ref={enquireRef}
            href="#contact"
            className={`header__enquire-btn ${!isScrolled && overLight.enquire ? '--over-light' : ''}`}
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            <span>Nominate Now</span>
            <span className="header__enquire-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
};

