import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Hero } from './sections/Hero';
import { AboutUs } from './sections/AboutUs';
import { Services } from './sections/Services';
import { Footer } from './sections/Footer';
import { SeamlessVideo } from './components/SeamlessVideo';
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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const handleWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleWindowLoad);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl as HTMLElement, {
          offset: -70,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('load', handleWindowLoad);
      document.removeEventListener('click', handleAnchorClick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 1 Single Continuous Video Background for the entire website (100% Native Resolution, 0 Seams) */}
      <div className="global-ocean-bg" aria-hidden="true">
        <SeamlessVideo
          src="/images/water-flow.mp4"
          mobileSrc="/images/water-flow-mobile.mp4"
          webpSrc="/images/water-flow.webp"
          webpMobileSrc="/images/water-flow-mobile.webp"
          poster="/images/water-flow-poster.jpg"
          className="global-ocean-bg__video"
        />
        <div className="global-ocean-bg__tint" />
      </div>

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
      </main>

      <Footer />
    </>
  );
}

export default App;
