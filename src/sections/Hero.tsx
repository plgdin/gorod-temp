import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '../components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export interface VesselItem {
  id: string;
  name: string;
  word: string;
  imageSrc: string;
  alt: string;
}

export const VESSELS: VesselItem[] = [
  {
    id: 'carrier',
    name: 'Carrier',
    word: 'CARRIERS',
    imageSrc: '/images/Gorod.png',
    alt: 'Gorod Container Carrier Vessel',
  },
  {
    id: 'bulker',
    name: 'Bulker',
    word: 'BULKERS',
    imageSrc: '/images/Gorod_bulker.png',
    alt: 'Gorod Bulk Carrier Vessel',
  },
  {
    id: 'tanker',
    name: 'Tanker',
    word: 'TANKERS',
    imageSrc: '/images/Gorod_tanker.png',
    alt: 'Gorod Oil Tanker Vessel',
  },
  {
    id: 'cruise',
    name: 'Cruise',
    word: 'CRUISES',
    imageSrc: '/images/Gorod_cruise.png',
    alt: 'Gorod Cruise Ship Vessel',
  },
];

export interface HeroProps {
  onReady?: () => void;
  onVesselChange?: (vessel: VesselItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onReady, onVesselChange }) => {
  const mainScreenRef = useRef<HTMLElement>(null);
  const vesselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordRepresentingRef = useRef<HTMLDivElement>(null);
  const wordAcrossRef = useRef<HTMLDivElement>(null);
  const wordSeasRef = useRef<HTMLDivElement>(null);

  const loopTlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const onVesselChangeRef = useRef(onVesselChange);
  onVesselChangeRef.current = onVesselChange;

  useEffect(() => {
    onVesselChangeRef.current?.(VESSELS[0]);
  }, []);

  useEffect(() => {
    const mainScreen = mainScreenRef.current;
    if (!mainScreen) return;

    const vessels = Array.from(mainScreen.querySelectorAll<HTMLDivElement>('.ships__vessel'));
    const words = Array.from(mainScreen.querySelectorAll<HTMLSpanElement>('.main-screen__flipper-word'));
    const wordRepresenting = wordRepresentingRef.current;
    const wordAcross = wordAcrossRef.current;
    const wordSeas = wordSeasRef.current;

    if (
      vessels.length !== VESSELS.length ||
      words.length !== VESSELS.length ||
      !wordRepresenting ||
      !wordAcross ||
      !wordSeas
    )
      return;

    const ctx = gsap.context(() => {
      // Ensure header is visible
      const headerEl = document.getElementById('header');
      if (headerEl) {
        gsap.set(headerEl, {
          opacity: 1,
          visibility: 'visible',
        });
      }

      const getExitDistance = () => Math.max(window.innerWidth * 1.6, 2500);

      // Initial state: Carrier starts off-screen to the left, others wait off-screen to the left hidden
      vessels.forEach((vessel, idx) => {
        gsap.set(vessel, {
          opacity: idx === 0 ? 1 : 0,
          x: () => -getExitDistance(),
        });
      });

      // Word reveal initial states
      gsap.set(wordRepresenting, {
        opacity: 0,
        y: -28,
      });

      gsap.set([words[0], wordAcross, wordSeas], {
        opacity: 0,
        y: 28,
      });

      gsap.set(['.main-screen__sub-row', '.main-screen__bottom-bar'], {
        opacity: 0,
        y: 20,
      });

      // Words 1..N start hidden and flipped out
      words.slice(1).forEach((word) => {
        gsap.set(word, {
          opacity: 0,
          rotateX: -90,
          y: 15,
        });
      });

      // Preloader active in center
      gsap.set('.main-screen__preloader', {
        opacity: 1,
        scale: 1,
      });

      // Continuous loop cycling seamlessly through all vessels
      const startVesselLoop = () => {
        loopTlRef.current?.kill();

        const loopTl = gsap.timeline({ repeat: -1 });
        loopTlRef.current = loopTl;

        for (let i = 0; i < VESSELS.length; i++) {
          const currentVessel = vessels[i];
          const currentWord = words[i];
          const nextIdx = (i + 1) % VESSELS.length;
          const nextVessel = vessels[nextIdx];
          const nextWord = words[nextIdx];

          const label = `cycle_${i}`;
          loopTl.addLabel(label);

          // 1. Current word flips up and out snappily
          loopTl.to(
            currentWord,
            {
              rotateX: 90,
              y: -15,
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in',
            },
            label
          );

          // 2. Current vessel sails forward off to the RIGHT
          const exitDuration = 1.3;
          loopTl.to(
            currentVessel,
            {
              x: () => getExitDistance(),
              duration: exitDuration,
              ease: 'power2.in',
            },
            label
          );

          // 3. Next word flips in smoothly from below
          loopTl.fromTo(
            nextWord,
            {
              rotateX: -90,
              y: 15,
              opacity: 0,
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'back.out(1.3)',
            },
            `${label}+=0.2`
          );

          loopTl.call(
            () => {
              setActiveIdx(nextIdx);
              onVesselChangeRef.current?.(VESSELS[nextIdx]);
            },
            [],
            `${label}+=0.25`
          );

          // 4. Reset current word for next round once flipped out
          loopTl.set(
            currentWord,
            {
              rotateX: -90,
              y: 15,
              opacity: 0,
            },
            `${label}+=0.8`
          );

          // 5. Reset current vessel back off-screen to the left once fully exited and hide it
          loopTl.set(
            currentVessel,
            {
              x: () => -getExitDistance(),
              opacity: 0,
            },
            `${label}+=${exitDuration}`
          );

          // 6. Next vessel seamlessly enters from the left with continuous overlap (no empty ocean gap)
          loopTl.fromTo(
            nextVessel,
            {
              x: () => -getExitDistance(),
              opacity: 1,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
            },
            `${label}+=0.45`
          );

          // 7. Next vessel rests in center for 3.0s before the subsequent cycle begins
          loopTl.to({}, { duration: 3.0 });
        }
      };

      // Entrance sequence
      const entranceTl = gsap.timeline({
        onComplete: () => {
          onReadyRef.current?.();
          startVesselLoop();
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
        // 3. First vessel (Carrier) smoothly sails in from left into center (moving right, forward)
        .fromTo(
          vessels[0],
          {
            x: () => -getExitDistance(),
            opacity: 1,
          },
          {
            x: 0,
            opacity: 1,
            duration: 2.0,
            ease: 'power3.out',
            immediateRender: false,
          },
          0.2
        )
        // 4. Hero titles emerge to frame the vessel
        .to(
          [wordRepresenting, words[0], wordAcross, wordSeas],
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power2.out',
          },
          1.2
        )
        .to(
          ['.main-screen__sub-row', '.main-screen__bottom-bar'],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          1.4
        )
        // 5. Initial Carrier rests in center for 3.0s before departure loop begins
        .to({}, { duration: 3.0 });

      // Pause Hero carousel when scrolled out of view, resume when back in view
      ScrollTrigger.create({
        trigger: mainScreen,
        start: 'top top',
        end: 'bottom top',
        onLeave: () => loopTlRef.current?.pause(),
        onEnterBack: () => loopTlRef.current?.play(),
      });

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
      loopTlRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="main-screen"
      ref={mainScreenRef}
      className="main-screen"
      style={{
        background: 'transparent',
      }}
    >
      {/* Central Navigation Marker & Plotting Dots */}
      <Preloader isDone={isPreloaderDone} />

      {/* Main Oversized Typography Framing the Center */}
      <div className="main-screen__main">
        <div className="main-screen__row --top">
          <div className="main-screen__main-title translation-block --line-0">
            <div
              ref={wordRepresentingRef}
              className="main-screen__main-title-text"
            >
              Representing
            </div>
          </div>
        </div>

        <div className="main-screen__row --bottom">
          <div className="main-screen__main-title translation-block --line-1">
            <div className="main-screen__flipper">
              <span className="main-screen__flipper-spacer" aria-hidden="true">
                CARRIERS
              </span>
              {VESSELS.map((vessel, idx) => (
                <span
                  key={vessel.id}
                  ref={(el) => {
                    wordRefs.current[idx] = el;
                  }}
                  className={`main-screen__main-title-text main-screen__flipper-word --${vessel.id}`}
                >
                  {vessel.word}
                </span>
              ))}
            </div>
          </div>

          <div className="main-screen__main-title translation-block --line-2">
            <div className="main-screen__main-title-text">
              <span ref={wordAcrossRef} style={{ display: 'inline-block' }}>Across</span>{' '}
              <span ref={wordSeasRef} style={{ display: 'inline-block' }}>Seas</span>
            </div>
          </div>
        </div>

        {/* Sub-row: Maritime agency text on left, Explore button on right */}
        <div className="main-screen__sub-row">
          <div className="main-screen__subtitle">
            Maritime agency and operational support<br />
            for vessel owners and operators worldwide.
          </div>

          <a href="#services" className="main-screen__explore" aria-label="Explore our services">
            <div className="main-screen__explore-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
            <div className="main-screen__explore-text">
              <span>EXPLORE</span>
              <span>OUR SERVICES</span>
            </div>
          </a>
        </div>
      </div>

      {/* Primary Visual: Multi-Vessel Presentation (Carrier, Bulker, Tanker, Cruise) */}
      <div className="ships">
        <div className="ships__glow" />
        {VESSELS.map((vessel, idx) => (
          <div
            key={vessel.id}
            ref={(el) => {
              vesselRefs.current[idx] = el;
            }}
            className={`ships__vessel --${vessel.id}`}
          >
            <img
              src={vessel.imageSrc}
              alt={vessel.alt}
              className="ships__tanker"
            />
          </div>
        ))}
      </div>

      {/* Bottom Timeline & Pagination Bar */}
      <div className="main-screen__bottom-bar">
        <div className="main-screen__dots">
          {VESSELS.map((_, idx) => (
            <span
              key={idx}
              className={`main-screen__dot ${activeIdx === idx ? '--active' : ''}`}
            />
          ))}
        </div>
        <div className="main-screen__line" />
        <div className="main-screen__numbers">
          {VESSELS.map((_, idx) => (
            <span
              key={idx}
              className={`main-screen__num ${activeIdx === idx ? '--active' : ''}`}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
