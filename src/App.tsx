import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Hero } from './sections/Hero';
import { AboutUs } from './sections/AboutUs';
import { Services } from './sections/Services';
import { ContactCTA } from './sections/ContactCTA';
import { Footer } from './sections/Footer';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isHeroReady, setIsHeroReady] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHeroReady = useCallback(() => {
    setIsHeroReady(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
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

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        isLightSection={false}
        isReady={isHeroReady}
      />
      <NavigationMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <Hero onReady={handleHeroReady} />
        <AboutUs />
        <Services />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
