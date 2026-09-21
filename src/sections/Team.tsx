import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoundButton } from '../components/RoundButton';

gsap.registerPlugin(ScrollTrigger);

export const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const titles = sectionRef.current?.querySelectorAll('.team__title');
      const img = sectionRef.current?.querySelector('.team__img');
      if (!titles || titles.length < 3) return;

      const tl = gsap.timeline()
        .to(titles[0], { xPercent: -20 }, 0)
        .to(titles[1], { xPercent: 25 }, 0)
        .to(titles[2], { xPercent: -35 }, 0);

      if (img) {
        tl.to(img, { yPercent: -25 }, 0);
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
    <section id="team" ref={sectionRef} className="team-section">
      <div className="fw-container">
        <div className="team__title --item-0">TEAM WORK</div>
        <div className="team__title --item-1">NOT ONE MAN</div>
        <div className="team__title --item-2">SHOW</div>

        <div className="team__wrap">
          <div className="team__img">
            <img src="/images/team.jpg" alt="Gorod Shipping team" loading="lazy" />
          </div>

          <RoundButton label="Team" href="#team" />
        </div>
      </div>
    </section>
  );
};
