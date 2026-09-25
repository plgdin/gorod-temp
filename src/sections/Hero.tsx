import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Preloader } from '../components/Preloader';

interface HeroProps {
  onReady?: () => void;
}

interface VesselItem {
  id: string;
  name: string;
  word: string;
  imageSrc: string;
  alt: string;
}

const VESSELS: VesselItem[] = [
  {
    id: 'carrier',
    name: 'Carrier',
    word: 'Carriers',
    imageSrc: '/images/Gorod.png',
    alt: 'Gorod Container Carrier Vessel',
  },
  {
    id: 'tanker',
    name: 'Tanker',
    word: 'Tankers',
    imageSrc: '/images/Gorod_tanker.png',
    alt: 'Gorod Oil Tanker Vessel',
  },
  {
    id: 'cruise',
    name: 'Cruise',
    word: 'Cruises',
    imageSrc: '/images/Gorod_cruise.png',
    alt: 'Gorod Cruise Ship Vessel',
  },
  {
    id: 'tugboat',
    name: 'Tugboat',
    word: 'Tugboats',
    imageSrc: '/images/Gorod_tug.png',
    alt: 'Gorod Port Tugboat Vessel',
  },
];

export const Hero: React.FC<HeroProps> = ({ onReady }) => {
  const mainScreenRef = useRef<HTMLElement>(null);
  const vesselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordRepresentingRef = useRef<HTMLDivElement>(null);
  const wordAcrossRef = useRef<HTMLDivElement>(null);
  const wordSeasRef = useRef<HTMLDivElement>(null);

  const loopTlRef = useRef<gsap.core.Timeline | null>(null);

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const vessels = vesselRefs.current.filter(Boolean) as HTMLDivElement[];
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const wordRepresenting = wordRepresentingRef.current;
    const wordAcross = wordAcrossRef.current;
    const wordSeas = wordSeasRef.current;
    const mainScreen = mainScreenRef.current;

    if (
      vessels.length !== VESSELS.length ||
      words.length !== VESSELS.length ||
      !wordRepresenting ||
      !wordAcross ||
      !wordSeas ||
      !mainScreen
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

      const getExitDistance = () => Math.max(window.innerWidth * 1.25, 1400);

      // Initial state: Carrier starts off-screen to the left, others wait off-screen to the left
      vessels.forEach((vessel) => {
        gsap.set(vessel, {
          opacity: 1,
          x: () => -getExitDistance(),
        });
      });

      // Word reveal initial states
      gsap.set([wordRepresenting, words[0]], {
        opacity: 0,
        y: -28,
      });

      gsap.set([wordAcross, wordSeas], {
        opacity: 0,
        y: 28,
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

      // Continuous loop cycling through all 4 vessels sailing forward to the right (bow-first)
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

          // 1. Current vessel rests in center for 3.0s
          loopTl.to({}, { duration: 3.0 });

          // 2. Mark departure point
          loopTl.addLabel(label);

          // 3. Word flip: current flips up and out snappily
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

          // 4. Next word flips in smoothly from below
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
              immediateRender: false,
            },
            `${label}+=0.25`
          );

          // 5. Reset current word for next round
          loopTl.set(
            currentWord,
            {
              rotateX: -90,
              y: 15,
              opacity: 0,
              immediateRender: false,
            },
            `${label}+=0.8`
          );

          // 6. Current vessel sails forward off to the RIGHT
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

          // 7. Reset current vessel back off-screen to the left once exited
          loopTl.set(
            currentVessel,
            {
              x: () => -getExitDistance(),
              immediateRender: false,
            },
            `${label}+=${exitDuration}`
          );

          // 8. Next vessel seamlessly enters from the left as current clears screen
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
              immediateRender: false,
            },
            `${label}+=0.85`
          );
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
              ref={wordRepresentingRef}
              className="main-screen__main-title-text"
            >
              Representing
            </div>
          </div>
          <div className="main-screen__main-title translation-block --line-1">
            <div className="main-screen__flipper">
              <span className="main-screen__flipper-spacer" aria-hidden="true">
                Tugboats
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
        </div>

        <div className="main-screen__row --bottom">
          <div className="main-screen__main-title translation-block --line-2">
            <div
              ref={wordAcrossRef}
              className="main-screen__main-title-text"
            >
              Across
            </div>
          </div>
          <div className="main-screen__main-title translation-block --line-3">
            <div
              ref={wordSeasRef}
              className="main-screen__main-title-text"
            >
              Seas
            </div>
          </div>
        </div>
      </div>

      {/* Primary Visual: Multi-Vessel Presentation (Carrier, Tanker, Cruise, Tugboat) */}
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
    </section>
  );
};
