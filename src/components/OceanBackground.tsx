import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SectionSlice {
  id: number;
  base: string;
  hd: string;
}

// 4 high-resolution 1672x941 background sections
const SECTIONS: SectionSlice[] = [
  { id: 1, base: '/images/section1.png', hd: '/images/section1.webp' },
  { id: 2, base: '/images/section2.png', hd: '/images/section2.webp' },
  { id: 3, base: '/images/section3.png', hd: '/images/section3.webp' },
  { id: 4, base: '/images/section4.png', hd: '/images/section4.webp' },
];

const RAW_W = 1672;
const RAW_H = 941;
const ASPECT = RAW_W / RAW_H; // ~1.776833

export const OceanBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let targetWidth = window.innerWidth;
    let targetHeight = window.innerHeight;
    let maxTravel = 0;

    const updateSizing = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Each section covers at least vh to fill viewport height
      // and at least vw to fill viewport width without distortion
      const secH = Math.max(vh, Math.round(vw / ASPECT));
      const secW = Math.max(vw, Math.round(secH * ASPECT));

      // Overlap between adjacent sections for smooth seamless gradient blend
      const blendOverlap = Math.round(Math.min(80, secH * 0.08));

      // Total track height is 4 sections minus 3 overlaps
      const totalTrackH = secH * 4 - blendOverlap * 3;
      maxTravel = Math.max(0, totalTrackH - vh);

      targetWidth = secW;
      targetHeight = totalTrackH;

      track.style.width = `${targetWidth}px`;
      track.style.height = `${targetHeight}px`;

      // Position each slice seamlessly with its feather blend overlap
      SECTIONS.forEach((_, idx) => {
        const sliceEl = sliceRefs.current[idx];
        if (!sliceEl) return;

        const sliceTop = idx === 0 ? 0 : idx * (secH - blendOverlap);
        sliceEl.style.top = `${sliceTop}px`;
        sliceEl.style.height = `${secH}px`;
        sliceEl.style.width = `${targetWidth}px`;
      });

      updatePosition();
    };

    const updatePosition = (e?: { scroll?: number; progress?: number }) => {
      if (!track) return;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, docHeight - vh);
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Progress from 0 (top of Hero) to 1 (bottom of Footer port)
      const progress = typeof e?.progress === 'number'
        ? Math.min(1, Math.max(0, e.progress))
        : Math.min(1, Math.max(0, scrollY / maxScroll));

      const translateY = -progress * maxTravel;
      track.style.transform = `translate3d(-50%, ${translateY}px, 0)`;
    };

    const onNativeScroll = () => updatePosition();
    const onLenisScroll = (e: { scroll?: number; progress?: number }) => updatePosition(e);

    updateSizing();

    const checkLenis = () => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.on('scroll', onLenisScroll);
        return true;
      }
      return false;
    };

    let lenisAttached = checkLenis();
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    if (!lenisAttached) {
      pollInterval = setInterval(() => {
        if (checkLenis()) {
          if (pollInterval) clearInterval(pollInterval);
        }
      }, 50);
    }

    window.addEventListener('scroll', onNativeScroll, { passive: true });
    window.addEventListener('resize', updateSizing, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateSizing();
    });
    resizeObserver.observe(document.body);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      window.removeEventListener('scroll', onNativeScroll);
      window.removeEventListener('resize', updateSizing);
      resizeObserver.disconnect();
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.off('scroll', onLenisScroll);
      }
    };
  }, []);

  return (
    <div className="fixed-ocean-bg" aria-hidden="true" ref={containerRef}>
      <div className="fixed-ocean-bg__track" ref={trackRef}>
        {SECTIONS.map((sec, idx) => (
          <div
            key={sec.id}
            ref={(el) => {
              sliceRefs.current[idx] = el;
            }}
            className={`ocean-slice-wrap ocean-slice-${sec.id}`}
          >
            <picture>
              <source srcSet={sec.hd} type="image/webp" />
              <img
                src={sec.base}
                alt=""
                className="ocean-slice-img"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>
      <div className="fixed-ocean-bg__overlay" />
    </div>
  );
};

export default OceanBackground;
