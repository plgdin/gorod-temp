import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '../components/Preloader';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onReady?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReady }) => {
  const mainScreenRef = useRef<HTMLElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const titleTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const giantBgTextRef = useRef<HTMLDivElement>(null);

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const ship = shipRef.current;
    const titles = titleTextsRef.current.filter(Boolean) as HTMLDivElement[];
    const mainScreen = mainScreenRef.current;
    const introSection = introSectionRef.current;
    const giantBgText = giantBgTextRef.current;
    if (!ship || titles.length === 0 || !mainScreen) return;

    // Helper functions for typography positions
    const getHeroOffsets = (idx: number, el: HTMLElement) => {
      const parentWidth = el.parentElement ? el.parentElement.clientWidth : window.innerWidth;
      const elWidth = el.clientWidth;
      return idx % 2 === 0 ? parentWidth - elWidth : 0;
    };

    const getCenterOffset = (el: HTMLElement) => {
      const parentWidth = el.parentElement ? el.parentElement.clientWidth : window.innerWidth;
      return (parentWidth - el.clientWidth) / 2;
    };

    // Subtle mouse follow / parallax on ship
    const handleMouseMove = (e: MouseEvent) => {
      if (!ship || !isReady) return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * -16;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * -16;
      gsap.to(ship, {
        x: `+=${xOffset * 0.08}`,
        y: `+=${yOffset * 0.08}`,
        duration: 1.2,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Lock scrolling during cinematic intro sequence
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 992px)').matches;

      if (isMobile) {
        // Mobile choreography
        const mobileTl = gsap.timeline();
        mobileTl
          .fromTo(
            ship,
            {
              scale: 1.1,
              opacity: 1,
              y: -window.innerHeight,
              rotateZ: 0,
              xPercent: -50,
              yPercent: -50,
            },
            {
              xPercent: -50,
              yPercent: -50,
              y: 0,
              scale: 1.1,
              duration: 2.2,
              ease: 'power2.out',
            },
            0.5
          )
          .fromTo(
            titles,
            {
              yPercent: 100,
              y: 0,
              x: (_, target) => getCenterOffset(target),
            },
            {
              duration: 0.8,
              ease: 'power2.out',
              yPercent: 0,
              y: 0,
              stagger: 0.15,
            },
            1.6
          )
          .to(
            '.main-screen__preloader',
            {
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => setIsPreloaderDone(true),
            },
            2.2
          )
          .to(
            ship,
            {
              scale: 1,
              rotateZ: -20,
              duration: 1.1,
              ease: 'power2.inOut',
              onStart: () => {
                setIsReady(true);
                onReady?.();
              },
              onComplete: () => {
                document.body.style.overflow = '';
                ScrollTrigger.refresh();
              },
            },
            2.2
          );
        return;
      }

      // ============================================================
      // DESKTOP MODULAR TIMELINE ARCHITECTURE (Frames A through G)
      // ============================================================

      // Set Initial Composed Hero State (FRAME A)
      gsap.set(ship, {
        opacity: 1,
        scale: 0.82,
        rotateZ: 55,
        x: () => window.innerWidth / 2,
        xPercent: -50,
        yPercent: -50,
        y: 0,
      });

      gsap.set(titles, {
        opacity: 1,
        y: 0,
        yPercent: 0,
        x: (idx, target) => getHeroOffsets(idx, target as HTMLElement),
      });

      const headerEl = document.getElementById('header');
      if (headerEl) {
        gsap.set(headerEl, {
          opacity: 1,
          visibility: 'visible',
        });
      }

      gsap.set('.main-screen__preloader', {
        opacity: 0,
        scale: 0.75,
      });

      // 1. FRAME A: Initial Composed Hero Hold
      const createInitialHeroTimeline = () => {
        const tl = gsap.timeline();
        // Stable cinematic composition hold
        tl.to({}, { duration: 2.2 });
        return tl;
      };

      // 2. FRAME B: Hero Dissolve into Empty Dark Navy Canvas
      const createHeroDissolveTimeline = () => {
        const tl = gsap.timeline();
        // Titles slide and fade out with breathing room
        tl.to(
          titles,
          {
            opacity: 0,
            yPercent: 35,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power2.in',
          },
          0
        );

        // Ship dissolves out
        tl.to(
          ship,
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.8,
            ease: 'power2.in',
          },
          0
        );

        // Header dissolves
        const headerEl = document.getElementById('header');
        if (headerEl) {
          tl.to(
            headerEl,
            {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.out',
            },
            0.1
          );
        }

        // Deliberate reset on empty dark canvas
        tl.to({}, { duration: 0.3 });
        return tl;
      };

      // 3. FRAME B continued: Navigation Marker & Plotting Points Scene
      const createNavigationSceneTimeline = () => {
        const tl = gsap.timeline();
        // Navigation marker & plotting points fade in at precise center
        tl.to(
          '.main-screen__preloader',
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0
        );

        // Marker rotates very slowly with restrained elegance
        tl.to(
          '.main-screen__preloader-center',
          {
            rotateZ: 25,
            scale: 1.06,
            duration: 2.2,
            ease: 'sine.inOut',
          },
          0
        );

        return tl;
      };

      // 4. FRAME C & D: Horizontal Ship Enters from LEFT
      const createShipTransitTimeline = () => {
        const tl = gsap.timeline();
        // Position ship just offscreen left, strictly horizontal
        tl.set(
          ship,
          {
            opacity: 0,
            scale: 1.05,
            rotateZ: 0,
            x: () => -window.innerWidth * 0.35,
            xPercent: -50,
            yPercent: -50,
            y: 0,
          },
          0
        );

        // Fade in rapidly as it begins horizontal transit
        tl.to(
          ship,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out',
          },
          0.1
        );

        // Ship glides smoothly across towards center, passing through the stationary marker
        tl.to(
          ship,
          {
            x: () => window.innerWidth / 2,
            duration: 2.5,
            ease: 'power3.inOut',
          },
          0.1
        );

        return tl;
      };

      // 5. FRAME E & F: Typography Reveal Around Vessel + Poster Hold
      const createTypographyRevealTimeline = () => {
        const tl = gsap.timeline();
        // Position titles centered for poster reveal
        tl.set(
          titles,
          {
            x: (_, target) => getCenterOffset(target as HTMLElement),
            yPercent: 110,
            y: 0,
            opacity: 1,
          },
          0
        );

        // Staggered clipped reveal from overflow:hidden
        tl.to(
          titles,
          {
            yPercent: 0,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            stagger: 0.12,
          },
          0.1
        );

        // FRAME F: Stable poster hold (ship + typography form finished art frame)
        tl.to({}, { duration: 1.5 });

        return tl;
      };

      // 6. FRAME G: Return to Hero Composition
      const createReturnHeroTimeline = () => {
        const tl = gsap.timeline();

        // Marker dissolves and shrinks
        tl.to(
          '.main-screen__preloader',
          {
            opacity: 0,
            scale: 0.65,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => setIsPreloaderDone(true),
          },
          0
        );

        // Ship smoothly rotates to 55° and scales to 0.82 around its center
        tl.to(
          ship,
          {
            rotateZ: 55,
            scale: 0.82,
            duration: 1.4,
            ease: 'power2.inOut',
          },
          0
        );

        // Titles glide smoothly outwards into the spaced editorial hero layout
        titles.forEach((el, idx) => {
          tl.to(
            el,
            {
              x: getHeroOffsets(idx, el),
              yPercent: 0,
              y: 0,
              duration: 1.3,
              ease: 'power2.inOut',
            },
            0.05 * idx
          );
        });

        // Header fades smoothly back in
        const headerEl = document.getElementById('header');
        if (headerEl) {
          tl.to(
            headerEl,
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            },
            0.3
          );
        }

        return tl;
      };

      // 7. FRAME H: Scroll Transition Timeline (Pre-registered on mount for stable layout)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainScreen,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Ship moves upward and rotates to 90°
      scrollTl.to(
        ship,
        {
          y: -window.innerHeight * 0.38,
          rotateZ: 90,
          scale: 0.72,
          duration: 1,
          ease: 'power1.inOut',
        },
        0
      );

      // 2. Large hero typography travels WITH the ship (slower, deliberate translation)
      scrollTl.to(
        titles,
        {
          y: -70,
          opacity: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: 'power1.in',
        },
        0.25
      );

      // 3. Introduction paragraph reveals at center-right after titles drift
      if (introSection) {
        scrollTl.fromTo(
          introSection,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.45
        );
      }

      // 4. Enormous background typography scrolls horizontally with parallax
      if (giantBgText) {
        scrollTl.fromTo(
          giantBgText,
          {
            x: '-20vw',
            opacity: 0,
          },
          {
            x: '12vw',
            opacity: 1,
            duration: 0.8,
            ease: 'none',
          },
          0.15
        );
      }

      // ============================================================
      // ASSEMBLE MASTER TIMELINE
      // ============================================================
      const masterTl = gsap.timeline({
        onComplete: () => {
          setIsReady(true);
          onReady?.();
          document.body.style.overflow = '';
          ScrollTrigger.refresh();
        },
      });
      (window as any).__masterTl = masterTl;

      masterTl
        .add(createInitialHeroTimeline())
        .add(createHeroDissolveTimeline())
        .add(createNavigationSceneTimeline())
        .add(createShipTransitTimeline(), '-=1.0')
        .add(createTypographyRevealTimeline(), '-=0.5')
        .add(createReturnHeroTimeline());

      // If user scrolls during the cinematic intro, immediately progress to ready state
      const handleUserScroll = () => {
        if (masterTl && masterTl.progress() < 1) {
          masterTl.progress(1);
        }
      };
      window.addEventListener('wheel', handleUserScroll, { passive: true, once: true });
      window.addEventListener('touchstart', handleUserScroll, { passive: true, once: true });
    }, mainScreen);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onReady]);

  const titles = ['More', 'than', 'just a port', 'agent'];

  return (
    <section id="main-screen" ref={mainScreenRef} className="main-screen">
      {/* Central Navigation Marker & Plotting Dots */}
      <Preloader isDone={isPreloaderDone} />

      {/* Main Oversized Typography */}
      <div className="main-screen__main">
        {titles.map((text, idx) => (
          <div key={idx} className={`main-screen__main-title translation-block --line-${idx}`}>
            <div
              ref={(el) => {
                titleTextsRef.current[idx] = el;
              }}
              className="main-screen__main-title-text"
            >
              {text}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Visual: Cutout Cargo Vessel */}
      <div ref={shipRef} className="ships">
        <img
          src="/images/ship.png"
          alt="Commercial tanker vessel"
          className="ships__tanker lazyloaded"
        />
      </div>

      {/* Editorial Introduction Section (Revealed on Scroll) */}
      <div ref={introSectionRef} className="hero-intro-content">
        <p className="hero-intro-text">
          We come not for one year, we enjoy what we are doing, we are fully
          independent, handling all types of ships and we really want to bring
          to Ukraine — European standards of port call handling and we want our
          clients to feel that Ukraine — is changing, the service here — is
          changing and people here — are changing.
        </p>
      </div>

      {/* Enormous Background Typography Graphic (Parallax Scrub) */}
      <div ref={giantBgTextRef} className="hero-giant-bg-text">
        <span>FULL PORT AGENCY</span>
        <span className="hero-giant-dot">•</span>
        <span>STARK SHIPPING</span>
      </div>
    </section>
  );
};
