import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  { text: 'Ships repair', icon: '/icons/icn_01.svg' },
  { text: 'Full Port Agency', icon: '/icons/icn_02.svg' },
  { text: 'Protecting Agency', icon: '/icons/icn_03.svg' },
  { text: "Ship's supply", icon: '/icons/icn_04.svg' },
];

const row2 = [
  { text: "Ship's supply", icon: '/icons/icn_08.svg' },
  { text: 'Crew chance', icon: '/icons/icn_07.svg' },
  { text: 'Cleaning holds/tanks', icon: '/icons/icn_06.svg' },
  { text: 'Ships repair', icon: '/icons/icn_05.svg' },
];

const row3 = [
  { text: 'Cleaning holds/tanks', icon: '/icons/icn_11.svg' },
  { text: 'Ships repair', icon: '/icons/icn_10.svg' },
  { text: 'Full Port Agency', icon: '/icons/icn_09.svg' },
];

export const SkewRibbon: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    const r3 = row3Ref.current;
    if (!section || !r1 || !r2 || !r3) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      tl.to(r1, { x: '-12vw', ease: 'none' }, 0)
        .to(r2, { x: '14vw', ease: 'none' }, 0)
        .to(r3, { x: '-10vw', ease: 'none' }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="animated-skew-texts">
      <div className="animated-skew-texts__container">
        {/* Row 1 */}
        <div ref={row1Ref} className="animated-skew-texts__row-wrap --row-1" style={{ animation: 'marquee 35s linear infinite' }}>
          {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
            <div key={`r1-${idx}`} className="animated-skew-texts__row">
              <span className="animated-skew-texts__text">{item.text}</span>
              <span className="animated-skew-texts__icon">
                <img src={item.icon} alt="" />
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div ref={row2Ref} className="animated-skew-texts__row-wrap --row-2" style={{ animation: 'marquee-reverse 28s linear infinite' }}>
          {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
            <div key={`r2-${idx}`} className="animated-skew-texts__row">
              <span className="animated-skew-texts__text">{item.text}</span>
              <span className="animated-skew-texts__icon">
                <img src={item.icon} alt="" />
              </span>
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div ref={row3Ref} className="animated-skew-texts__row-wrap --row-3" style={{ animation: 'marquee 40s linear infinite' }}>
          {[...row3, ...row3, ...row3, ...row3, ...row3].map((item, idx) => (
            <div key={`r3-${idx}`} className="animated-skew-texts__row">
              <span className="animated-skew-texts__text">{item.text}</span>
              <span className="animated-skew-texts__icon">
                <img src={item.icon} alt="" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
