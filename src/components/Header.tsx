import React, { useState, useEffect } from 'react';

interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  isLightSection?: boolean;
  isReady?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  menuOpen,
  onToggleMenu: _onToggleMenu,
  isLightSection = false,
  isReady = false,
}) => {
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
    const updateContrast = () => {
      const header = document.getElementById('header');
      if (!header) return;

      const isOnLightSurface = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(0, Math.min(window.innerWidth - 1, bounds.left + bounds.width / 2));
        const y = Math.max(0, Math.min(window.innerHeight - 1, bounds.top + bounds.height / 2));
        const underHeader = document.elementsFromPoint(x, y).filter(
          (candidate) => candidate !== header && !header.contains(candidate)
        );

        for (const candidate of underHeader) {
          let current: Element | null = candidate;
          while (current && current !== document.documentElement) {
            const background = window.getComputedStyle(current).backgroundColor;
            const channels = background.match(/[\d.]+/g)?.map(Number);
            if (channels && channels.length >= 3) {
              const alpha = channels.length > 3 ? channels[3] : 1;
              if (alpha >= 0.5) {
                const luminance = (0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]) / 255;
                return luminance > 0.68;
              }
            }
            current = current.parentElement;
          }
        }

        return false;
      };

      const navItems = Array.from(header.querySelectorAll<HTMLElement>('.header__nav-item'));
      const navIsOverLight = navItems.some(isOnLightSurface);
      navItems.forEach((item) => item.classList.toggle('--over-light', navIsOverLight));

      header
        .querySelectorAll<HTMLElement>('.header__enquire-btn, .header__logo .logo')
        .forEach((item) => item.classList.toggle('--over-light', isOnLightSurface(item)));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);
      updateContrast();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
        <div className="header__logo">
          <a href="/" className="logo --pc" aria-label="Gorod Marine">
            <img
              src="/images/gorod-marine-white.png"
              alt="Gorod Marine"
              className="logo-img logo-img--white"
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
            <span>Nominate Now</span>
            <span className="header__enquire-arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
};

