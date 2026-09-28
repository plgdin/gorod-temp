import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Anchor, Clock, Ship } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutUs.css';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const STATS: StatItem[] = [
  {
    value: '12+',
    label: 'YEARS OF SERVICE',
    desc: 'Proven operational pedigree',
    icon: ShieldCheck,
  },
  {
    value: '2,500+',
    label: 'VESSELS ATTENDED',
    desc: 'Tankers, bulkers & container carriers',
    icon: Ship,
  },
  {
    value: '14+',
    label: 'PORTS COVERED',
    desc: 'Black Sea & Danube deep-water ports',
    icon: Anchor,
  },
  {
    value: '24/7',
    label: 'DISPATCH DESK',
    desc: 'Real-time port call monitoring',
    icon: Clock,
  },
];

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const backdropAccentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const backdropAccent = backdropAccentRef.current;
    if (!section || !imageContainer) return;

    const ctx = gsap.context(() => {
      // 1. Picture smoothly pulled in from the right as user scrolls
      gsap.fromTo(
        imageContainer,
        {
          x: 180,
          opacity: 0.35,
          scale: 0.94,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.2,
          },
        }
      );

      // Smooth subtle shift for the pastel backdrop accent
      if (backdropAccent) {
        gsap.fromTo(
          backdropAccent,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 25%',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Narrative and stats entrance
      gsap.from('.about-anim-fade', {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          onEnter: () => setHasAnimated(true),
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Smooth counter animation for numeric stats
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1600;
    const startTime = performance.now();
    const targets = [12, 2500, 14];

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        0: Math.round(targets[0] * ease),
        1: Math.round(targets[1] * ease),
        2: Math.round(targets[2] * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasAnimated]);

  return (
    <section id="about" ref={sectionRef} className="about-section-ref">
      {/* Hidden SVG Definition for Custom Shaped Image Clip Path */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="aboutVesselClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0.28,0 
                     L 0.94,0 
                     C 0.98,0 1,0.02 1,0.06 
                     L 1,0.92 
                     C 1,0.96 0.98,1 0.94,1 
                     L 0.35,1 
                     C 0.28,1 0.22,0.95 0.18,0.88 
                     L 0.02,0.52 
                     C -0.01,0.47 -0.01,0.43 0.02,0.38 
                     L 0.18,0.08 
                     C 0.21,0.02 0.24,0 0.28,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="about-ref-container" ref={contentRef}>
        {/* Top Grid: Left Narrative + Right Shaped Vessel Image */}
        <div className="about-top-grid">
          {/* Left Narrative Column */}
          <div className="about-narrative-col">
            <span className="about-eyebrow-tag about-anim-fade">ABOUT GOROD</span>

            <h2 className="about-main-headline about-anim-fade">
              Connecting<br />
              Businesses<br />
              <span className="about-main-headline-italic">Across Oceans</span>
            </h2>

            <div className="about-headline-divider about-anim-fade" aria-hidden="true" />

            <p className="about-lead-paragraph about-anim-fade">
              Gorod International Agency Pvt Ltd is a representation-oriented company for overseas business clients and is a fully multimodal logistics agency. We provide end-to-end, cost-effective, and reliable solutions that keep global trade moving.
            </p>

            {/* 4-Column Horizontal Stats Row */}
            <div className="about-stats-row about-anim-fade">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                let displayVal = stat.value;
                if (hasAnimated) {
                  if (i === 0) displayVal = `${counts[0]}+`;
                  if (i === 1) displayVal = `${counts[1].toLocaleString()}+`;
                  if (i === 2) displayVal = `${counts[2]}+`;
                }

                return (
                  <div key={i} className="about-stat-item">
                    <div className="about-stat-icon-box">
                      <Icon size={19} strokeWidth={2} />
                    </div>
                    <div className="about-stat-number">{displayVal}</div>
                    <div className="about-stat-title">{stat.label}</div>
                    <p className="about-stat-caption">{stat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Shaped Image with Smooth Scroll Pull-In Animation */}
          <div className="about-image-wrapper">
            <div
              ref={backdropAccentRef}
              className="about-image-backdrop-accent"
              aria-hidden="true"
            />
            <div ref={imageContainerRef} className="about-image-container">
              <img
                src="/images/about-vessel-port.jpg"
                alt="Gorod Marine commercial container ship berthed at deep-water seaport terminal"
                className="about-vessel-photo"
              />
            </div>
          </div>
        </div>

        {/* Bottom Banner: Our Vision Dossier */}
        <div className="about-vision-banner about-anim-fade">
          <div className="about-vision-left">
            <span className="about-vision-tag">OUR VISION</span>
            <h3 className="about-vision-heading">
              The New Gateway<br />
              to a <span className="about-vision-heading-italic">New India</span>
            </h3>
            <div className="about-vision-divider" aria-hidden="true" />
          </div>

          <div className="about-vision-vertical-rule" aria-hidden="true" />

          <div className="about-vision-right">
            <p className="about-vision-paragraph">
              Our vision is to be an indispensable partner to companies worldwide and provide earth’s most customer-centric solutions to our clients. We achieve this by representing companies in Shipping Agency services, Import &amp; Export Services, Aviation Services, Multimodal Logistics, and support to NGOs and United Nation RELIEF.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
