import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StarkResearch: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedSectRef = useRef<HTMLDivElement>(null);
  const img0Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedSect = pinnedSectRef.current;
    if (!section || !pinnedSect) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSect,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const w = window.innerWidth;

      if (img0Ref.current) {
        tl.fromTo(
          img0Ref.current,
          { x: w + 200 },
          { x: -w - 600, ease: 'none', duration: 2.2 },
          0
        );
      }
      if (img1Ref.current) {
        tl.fromTo(
          img1Ref.current,
          { x: w + 400 },
          { x: -w - 850, ease: 'none', duration: 2.2 },
          0.35
        );
      }
      if (img2Ref.current) {
        tl.fromTo(
          img2Ref.current,
          { x: w + 400 },
          { x: -w - 850, ease: 'none', duration: 2.2 },
          0.8
        );
      }
      if (img3Ref.current) {
        tl.fromTo(
          img3Ref.current,
          { x: w + 200 },
          { x: -w - 650, ease: 'none', duration: 2.2 },
          1.3
        );
      }

      if (title1Ref.current) {
        tl.to(title1Ref.current, { x: 100, ease: 'none', duration: 2.5 }, 0);
      }
      if (title3Ref.current) {
        tl.to(title3Ref.current, { x: 140, ease: 'none', duration: 2.5 }, 0);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="horizontal-scroll-images research">
      <div ref={pinnedSectRef} className="horizontal-scroll-images__pinned-sect research">
        <div className="horizontal-scroll-images__pinned-sect-header">
          <div className="horizontal-scroll-images__pinned-sect-header-text --title-0">
            GOROD
          </div>
          <div ref={title1Ref} className="horizontal-scroll-images__pinned-sect-header-text --title-1">
            RESEARCH
          </div>
          <div className="horizontal-scroll-images__pinned-sect-header-text --title-2">
            TANK AND BULK
          </div>
          <div ref={title3Ref} className="horizontal-scroll-images__pinned-sect-header-text --title-3">
            ANALYTICS
          </div>
        </div>

        <div className="horizontal-scroll-images__pinned-sect-images">
          <div ref={img0Ref} className="horizontal-scroll-images__pinned-sect-img research --img-0">
            <img src="/images/research-1.png" alt="Gorod Research 1" loading="lazy" />
          </div>
          <div ref={img1Ref} className="horizontal-scroll-images__pinned-sect-img research --img-1">
            <img src="/images/research-2.jpg" alt="Gorod Research 2" loading="lazy" />
          </div>
          <div ref={img2Ref} className="horizontal-scroll-images__pinned-sect-img research --img-2">
            <img src="/images/research-3.jpg" alt="Gorod Research 3" loading="lazy" />
          </div>
          <div ref={img3Ref} className="horizontal-scroll-images__pinned-sect-img research --img-3">
            <img src="/images/research-4.png" alt="Gorod Research 4" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="fw-container">
        <div className="horizontal-scroll-images__info research">
          <div className="horizontal-scroll-images__info-text">
            <p>
              We created and now developing new project, which contains all shipments
              referring to grains, steels, vegoils, meal, fuel and on your demand we
              could start any other commodity. Moreover system has other useful info
              (Port/Terminals restrictions, DAs...
            </p>
          </div>

          <div className="horizontal-scroll-images__info-footer">
            <a
              href="https://stark-research.net/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
            >
              www.gorod-research.net
            </a>

            <a
              href="https://apps.apple.com/ua/app/stark-research-all-about-cargoes/id1161899864"
              target="_blank"
              rel="noopener noreferrer"
              className="appstore-badge"
            >
              <span>Available on the</span>
              <strong>App Store</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
