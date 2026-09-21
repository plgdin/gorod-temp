import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoundButton } from '../components/RoundButton';

gsap.registerPlugin(ScrollTrigger);

export const Partners: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const titles = sectionRef.current?.querySelectorAll('.partners__title');
      const img = sectionRef.current?.querySelector('.partners__img');
      if (!titles || titles.length < 3) return;

      const tl = gsap.timeline()
        .to(titles[0], { xPercent: 30 }, 0)
        .to(titles[1], { xPercent: -20 }, 0)
        .to(titles[2], { xPercent: 40 }, 0);

      if (img) {
        tl.to(img, { yPercent: -30 }, 0);
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        animation: tl,
        scrub: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="partners" ref={sectionRef} className="partners-section">
      <div className="fw-container">
        <div className="partners__header">
          <div className="partners__title --item-0">PARTNERS</div>
          <div className="partners__title --item-1">OF NEPTUNE</div>
          <div className="partners__title --item-2">LINES</div>
        </div>

        <div className="partners__wrap">
          <div className="partners__img">
            <img
              src="/images/partners.jpg"
              alt="Neptune Lines ro-ro vessel"
              loading="lazy"
            />
          </div>

          <p className="partners__info-text">
            Dear Sirs, we are pleased to announce that since 04th of October 2019
            Gorod Shipping LLC is acting as Liner Agent of Neptune Lines. Service
            will be provided by means of Gorod Shipping headquarters located in
            Chornomorsk Port. We are open for Your transportation requirements of
            Ro-Ro, heavy lifts, project cargoes in both export and import
            directions.
          </p>

          <RoundButton label="More" href="#partners" />
        </div>
      </div>
    </section>
  );
};
