import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoundButton } from '../components/RoundButton';

gsap.registerPlugin(ScrollTrigger);

const reports = [
  {
    date: '13.05.2022',
    title: 'Top shippers, charterers Meal/Cake from Ukraine in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '23.04.2022',
    title: 'Top grain terminals of Ukraine — market share, export dynamics in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '10.04.2022',
    title: 'Ship-to-ship transshipment of Ukrainian vegoil in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '30.03.2022',
    title: 'Monthly export data/export structure of grain Ukraine in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '10.03.2022',
    title: 'Monthly date and structure vegoil export from Ukraine in 2020-2021 marketing year',
    href: '#reports',
  },
];

export const Analytics: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const expanderRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const expander = expanderRef.current;
    const titleWrap = titleWrapRef.current;
    const content = contentRef.current;
    if (!section || !expander || !titleWrap || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Expand the background sheet from letter I
      tl.fromTo(
        expander,
        {
          scaleX: 0.015,
          scaleY: 0.08,
          borderRadius: '40px',
        },
        {
          scaleX: 1,
          scaleY: 1,
          borderRadius: '0px',
          ease: 'power2.inOut',
          duration: 1,
        }
      );

      // Title fades out as the expansion floods the screen
      tl.to(
        titleWrap,
        {
          opacity: 0,
          scale: 0.95,
          ease: 'power1.out',
          duration: 0.4,
        },
        0.35
      );

      // Fade in the analytical reports inside the light background
      tl.fromTo(
        content,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.8,
        },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reports" ref={sectionRef} className="analytics-section">
      {/* Expanding flood background */}
      <div ref={expanderRef} className="analytics-expander" />

      {/* Hero Title with letter I expansion origin */}
      <div ref={titleWrapRef} className="analytics-hero-title">
        <h2 className="scale-title__title">
          <span>ANALYT</span>
          <span className="scale-title__stem">I</span>
          <span>CS</span>
        </h2>
      </div>

      {/* Revealed content in light theme */}
      <div ref={contentRef} className="analytics-content">
        <div className="fw-container">
          <div className="news__title">
            <div className="news__title-item">RECENT</div>
            <div className="news__title-item">ANALYTICAL</div>
            <div className="news__title-item">REPORTS</div>
          </div>

          <div className="news__reports">
            <div className="news__row-line" />
            {reports.map((item, idx) => (
              <React.Fragment key={idx}>
                <a href={item.href} className="news__row">
                  <div className="news__date">{item.date}</div>
                  <div className="news__text">{item.title}</div>
                </a>
                <div className="news__row-line" />
              </React.Fragment>
            ))}
          </div>

          <div className="news__btn-wrap">
            <RoundButton label="All reports" dark href="#reports" />
          </div>
        </div>
      </div>
    </section>
  );
};
