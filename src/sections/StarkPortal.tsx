import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StarkPortal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedSectRef = useRef<HTMLDivElement>(null);
  const img0Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
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
          end: '+=250%',
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
          0.4
        );
      }
      if (img2Ref.current) {
        tl.fromTo(
          img2Ref.current,
          { x: w + 400 },
          { x: -w - 850, ease: 'none', duration: 2.2 },
          0.9
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
    <section id="portal" ref={sectionRef} className="horizontal-scroll-images portal">
      <div ref={pinnedSectRef} className="horizontal-scroll-images__pinned-sect portal">
        <div className="horizontal-scroll-images__pinned-sect-header">
          <div className="horizontal-scroll-images__pinned-sect-header-text --title-0">
            STARK
          </div>
          <div ref={title1Ref} className="horizontal-scroll-images__pinned-sect-header-text --title-1">
            PORTAL
          </div>
          <div className="horizontal-scroll-images__pinned-sect-header-text --title-2">
            FOR AGENTS
          </div>
          <div ref={title3Ref} className="horizontal-scroll-images__pinned-sect-header-text --title-3">
            AND CLIENTS
          </div>
        </div>

        <div className="horizontal-scroll-images__pinned-sect-images">
          <div ref={img0Ref} className="horizontal-scroll-images__pinned-sect-img portal --img-0">
            <img src="/images/portal-1.png" alt="Stark Portal 1" loading="lazy" />
          </div>
          <div ref={img1Ref} className="horizontal-scroll-images__pinned-sect-img portal --img-1">
            <img src="/images/portal-2.png" alt="Stark Portal 2" loading="lazy" />
          </div>
          <div ref={img2Ref} className="horizontal-scroll-images__pinned-sect-img portal --img-2">
            <img src="/images/portal-3.jpg" alt="Stark Portal 3" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="fw-container">
        <div className="horizontal-scroll-images__info portal">
          <div className="horizontal-scroll-images__info-text">
            <p>
              We have created and are developing the Stark Portal project, which
              contains all documents, proposals, cost calculations, etc for the
              efficient operation of the broker. Moreover system has other useful
              information (Port/Terminal restrictions, DAs...
            </p>
          </div>

          <div className="horizontal-scroll-images__info-footer">
            <a
              href="https://portal.starkshipping.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
            >
              www.portal.starkshipping.net
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
