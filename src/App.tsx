import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Preloader } from './components/Preloader';
import { Hero } from './sections/Hero';
import { SkewRibbon } from './sections/SkewRibbon';
import { OurCases } from './sections/OurCases';
import { AwardsTable } from './sections/AwardsTable';
import { Analytics } from './sections/Analytics';
import { StarkResearch } from './sections/StarkResearch';
import { Partners } from './sections/Partners';
import { StarkPortal } from './sections/StarkPortal';
import { Team } from './sections/Team';
import { Footer } from './sections/Footer';
import './styles/globals.css';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    // Initial preloader duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const reportsEl = document.getElementById('reports');
      const portalEl = document.getElementById('portal');
      const scrollPos = window.scrollY + 74;

      let inLight = false;
      if (reportsEl) {
        const top = reportsEl.offsetTop;
        const bottom = top + reportsEl.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          inLight = true;
        }
      }
      if (portalEl) {
        const top = portalEl.offsetTop;
        const bottom = top + portalEl.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          inLight = true;
        }
      }
      setIsLightSection(inLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        isLightSection={isLightSection}
      />
      <NavigationMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <Hero />
        <SkewRibbon />
        <OurCases />
        <AwardsTable />
        <Analytics />
        <StarkResearch />
        <Partners />
        <StarkPortal />
        <Team />
      </main>

      <Footer />
    </>
  );
}

export default App;
