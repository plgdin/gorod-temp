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
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
