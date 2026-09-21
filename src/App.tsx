import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
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

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isHeroReady, setIsHeroReady] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const reportsEl = document.getElementById('reports');
      const portalEl = document.getElementById('portal');

      let inLight = false;
      if (reportsEl) {
        const rect = reportsEl.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          inLight = true;
        }
      }
      if (portalEl) {
        const rect = portalEl.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          inLight = true;
        }
      }
      setIsLightSection(inLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        isLightSection={isLightSection}
        isReady={isHeroReady}
      />
      <NavigationMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <Hero onReady={() => setIsHeroReady(true)} />
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
