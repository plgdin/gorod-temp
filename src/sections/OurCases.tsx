import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseItem {
  title: string;
  img: string;
  href: string;
  xPercent: number;
  yPercent: number;
  z: number;
  rotateY?: number;
}

const cases: CaseItem[] = [
  {
    title: 'Neptune Odyssey under was discharged with the record speed',
    img: '/images/case-1.jpg',
    href: '#cases',
    xPercent: -28,
    yPercent: 4,
    z: -500,
    rotateY: -5,
  },
  {
    title: 'Bon voyage Zhen Hua 33',
    img: '/images/case-2.jpg',
    href: '#cases',
    xPercent: 12,
    yPercent: -16,
    z: -1500,
    rotateY: 5,
  },
  {
    title: 'Neptune Lines Shipping and Managing Enterprises S.A.',
    img: '/images/case-3.jpg',
    href: '#cases',
    xPercent: -32,
    yPercent: -24,
    z: -2000,
    rotateY: -4,
  },
  {
    title: 'Grand opening ceremony!',
    img: '/images/case-4.jpg',
    href: '#cases',
    xPercent: 18,
    yPercent: 10,
    z: -3500,
    rotateY: 10,
  },
  {
    title: 'Kherson port, Ukraine',
    img: '/images/case-5.jpg',
    href: '#cases',
    xPercent: -22,
    yPercent: 16,
    z: -4200,
    rotateY: -6,
  },
  {
    title: 'Nika-Tera terminal',
    img: '/images/case-6.jpg',
    href: '#cases',
    xPercent: 20,
    yPercent: -18,
    z: -5000,
    rotateY: 5,
  },
  {
    title: 'The first shipment of meal to China ever',
    img: '/images/case-7.jpg',
    href: '#cases',
    xPercent: -30,
    yPercent: -6,
    z: -3500,
    rotateY: 4,
  },
  {
    title: 'Neptune terminal (Pivdennyi port)',
    img: '/images/case-8.jpg',
    href: '#cases',
    xPercent: 14,
    yPercent: 14,
    z: -5000,
    rotateY: -5,
  },
];

export const OurCases: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;
    if (!section || !items) return;

    const ctx = gsap.context(() => {
      // 1. Pinned viewport for Our Cases
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          anticipatePin: 1,
        },
      });

      // 2. 3D Camera Travel scrub timeline
      const flightTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: '+=400%',
          scrub: 0.7,
        },
      });

      // Continuous 3D keyframe motion matching real website
      flightTl.to(
        items,
        {
          keyframes: [
            {
              xPercent: 0,
              yPercent: -100,
              z: -3000,
              duration: 0.5,
              ease: 'power1.out',
            },
            {
              xPercent: 0,
              yPercent: 40,
              z: 7500,
              duration: 4,
              ease: 'none',
            },
          ],
        },
        0
      );

      // Subtle rotation dynamics on individual cards
      const cardEls = items.querySelectorAll('.our-cases__card');
      cardEls.forEach((cardEl, idx) => {
        const tiltX = (idx % 2 === 0 ? 1 : -1) * (3 + (idx % 3) * 2);
        const tiltY = (idx % 2 === 0 ? -1 : 1) * (5 + (idx % 2) * 3);
        flightTl.to(
          cardEl,
          {
            rotateX: tiltX,
            rotateY: tiltY,
            duration: 4,
            ease: 'power1.inOut',
          },
          0
        );
      });

      // Title subtle parallax drift
      flightTl.to(
        '.our-cases__title',
        {
          yPercent: -60,
          opacity: 0.35,
          duration: 1.5,
          ease: 'power1.out',
        },
        0
      );

      // Bottom description subtle rise
      flightTl.fromTo(
        '.our-cases__desc-wrap',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        2.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cases" ref={sectionRef} className="our-cases">
      <div ref={containerRef} className="our-cases__container">
        <div className="our-cases__title-wrap">
          <h2 className="our-cases__title">OUR CASES</h2>
        </div>

        <div className="our-cases__items-wrap">
          <div ref={itemsRef} className="our-cases__items">
            {cases.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`our-cases__card --item-${idx}`}
                style={{
                  transform: `translate3d(${item.xPercent}vw, ${item.yPercent}vh, ${item.z}px) rotateY(${item.rotateY || 0}deg)`,
                }}
              >
                <div className="our-cases__photo">
                  <img src={item.img} alt={item.title} loading="lazy" />
                </div>
                <span className="our-cases__label">{item.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="our-cases__desc-wrap">
          <p className="our-cases__desc">
            Company is fast growing Port Agency In Ukraine, established in 2014
            and focused on new standards of performance and providing of unique
            information. Own offices located in main Ukrainian sea and river
            ports. Company is a leader in providing of Market analytics
            research and export/import statistics for clients.
          </p>
        </div>
      </div>
    </section>
  );
};
