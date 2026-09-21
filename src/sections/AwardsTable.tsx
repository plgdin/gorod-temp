import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoundButton } from '../components/RoundButton';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { year: '2017', award: 'National Maritime Rating' },
  { year: '2018', award: 'Ship agent 2018 in Ukraine' },
  { year: '2019', award: 'National Maritime Rating' },
  { year: '2020', award: 'Industry Leader 2020' },
  { year: '2021', award: 'Agent of the Year' },
];

export const AwardsTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      const lines = tableRef.current?.querySelectorAll('.js-row-line');
      if (!lines || lines.length === 0) return;

      const simpleTableAnim = gsap.timeline().to(lines, {
        width: '100%',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      ScrollTrigger.create({
        trigger: tableRef.current,
        start: 'top 80%',
        onEnter: () => simpleTableAnim.restart(),
        onEnterBack: () => simpleTableAnim.restart(),
        onLeaveBack: () => {
          gsap.set(lines, { width: '0%' });
        },
      });
    }, tableRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="simple-table-section">
      <div ref={tableRef} className="simple-table">
        <div className="simple-table__row --header">
          <div>Year</div>
          <div>Award</div>
        </div>
        <div className="simple-table__row-line js-row-line" style={{ width: '0%' }} />

        {awards.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="simple-table__row">
              <div>{item.year}</div>
              <div>{item.award}</div>
            </div>
            <div className="simple-table__row-line js-row-line" style={{ width: '0%' }} />
          </React.Fragment>
        ))}

        <div className="simple-table__btn-wrap">
          <RoundButton label="About" href="#about" />
        </div>
      </div>
    </section>
  );
};
