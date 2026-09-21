import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Preloader } from '../components/Preloader';

interface HeroProps {
  onReady?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReady }) => {
  const mainScreenRef = useRef<HTMLElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const titleTextsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const ship = shipRef.current;
    const titles = titleTextsRef.current.filter(Boolean) as HTMLDivElement[];
    const mainScreen = mainScreenRef.current;
    if (!ship || titles.length === 0 || !mainScreen) return;



    const ctx = gsap.context(() => {
      // Ensure header is visible
      const headerEl = document.getElementById('header');
      if (headerEl) {
        gsap.set(headerEl, {
          opacity: 1,
          visibility: 'visible',
        });
      }

      // Initial state: Ship starts off-screen to the left, ready to sail in
      gsap.set(ship, {
        opacity: 0,
        x: -window.innerWidth * 0.75,
      });

      gsap.set(titles, {
        opacity: 0,
        y: (idx) => (idx < 2 ? -28 : 28),
      });

      // Preloader active in center
      gsap.set('.main-screen__preloader', {
        opacity: 1,
        scale: 1,
      });

      // Entrance sequence
      const entranceTl = gsap.timeline({
        onComplete: () => {
          onReadyRef.current?.();
          // Ship remains completely static once in center (no hover/bobbing)
        },
      });

      entranceTl
        // 1. Compass rotates
        .to(
          '.main-screen__preloader-center',
          {
            rotateZ: 45,
            scale: 1.05,
            duration: 1.2,
            ease: 'sine.inOut',
          },
          0
        )
        // 2. Preloader fades out as ship approaches
        .to(
          '.main-screen__preloader',
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => setIsPreloaderDone(true),
          },
          0.8
        )
        // 3. Ship smoothly sails in from the left into the exact center
        .to(
          ship,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out',
          },
          0.2
        )
        .to(
          ship,
          {
            x: 0,
            duration: 2.0,
            ease: 'power3.out',
          },
          0.2
        )
        // 4. Hero titles emerge to frame the vessel
        .to(
          titles,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power2.out',
          },
          1.2
        );

      // Fast-forward on quick scroll/touch
      const handleUserScroll = () => {
        if (entranceTl.progress() < 1) {
          entranceTl.progress(1);
        }
      };
      window.addEventListener('wheel', handleUserScroll, { passive: true, once: true });
      window.addEventListener('touchstart', handleUserScroll, { passive: true, once: true });
    }, mainScreen);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="main-screen"
      ref={mainScreenRef}
      className="main-screen"
      style={{
        backgroundColor: '#0a1d24',
        backgroundImage: `url('/images/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Central Navigation Marker & Plotting Dots */}
      <Preloader isDone={isPreloaderDone} />

      {/* Main Oversized Typography Framing the Center */}
      <div className="main-screen__main">
        <div className="main-screen__row --top">
          <div className="main-screen__main-title translation-block --line-0">
            <div
              ref={(el) => {
                titleTextsRef.current[0] = el;
              }}
              className="main-screen__main-title-text"
            >
              Representing
            </div>
          </div>
          <div className="main-screen__main-title translation-block --line-1">
            <div
              ref={(el) => {
                titleTextsRef.current[1] = el;
              }}
              className="main-screen__main-title-text"
            >
              Business
            </div>
          </div>
        </div>

        <div className="main-screen__row --bottom">
          <div className="main-screen__main-title translation-block --line-2">
            <div
              ref={(el) => {
                titleTextsRef.current[2] = el;
              }}
              className="main-screen__main-title-text"
            >
              Across
            </div>
          </div>
          <div className="main-screen__main-title translation-block --line-3">
            <div
              ref={(el) => {
                titleTextsRef.current[3] = el;
              }}
              className="main-screen__main-title-text"
            >
              Cities
            </div>
          </div>
        </div>
      </div>

      {/* Primary Visual: Gorod Cutout Container Vessel (Centered) */}
      <div ref={shipRef} className="ships">
        <div className="ships__glow" />
        <img
          src="/images/Gorod.png"
          alt="Gorod Cargo Vessel Logo"
          className="ships__tanker"
        />
      </div>
    </section>
  );
};
