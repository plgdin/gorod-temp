import React, { useEffect, useState } from 'react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ship tilts and rotates as user scrolls
  const shipRotation = Math.min(42 + scrollY * 0.08, 90);
  const shipTranslateY = Math.min(scrollY * 0.35, 300);

  return (
    <section id="main-screen" className="main-screen">
      <div className="main-screen__main">
        <div className="main-screen__main-title">
          <div>MORE</div>
        </div>
        <div className="main-screen__main-title">
          <div>THAN</div>
        </div>
        <div className="main-screen__main-title">
          <div>JUST A PORT</div>
        </div>
        <div className="main-screen__main-title">
          <div>AGENT</div>
        </div>
      </div>

      <div
        className="ships"
        style={{
          transform: `translate(-50%, -50%) translateY(${shipTranslateY}px) rotate(${shipRotation}deg)`,
        }}
      >
        <img
          src="/images/ship.png"
          alt="Commercial tanker vessel"
          className="ships__tanker"
        />
      </div>

      <div className="anim-text">
        <div className="fw-container">
          <p className="anim-text__desc">
            We come not for one year, we enjoy what we are doing, we are fully
            independent, handling all types of ships and we really want to bring
            to Ukraine — European standards of port call handling and we want our
            clients to feel that Ukraine — is changing, the service here — is
            changing and people here — are changing.
          </p>
        </div>
      </div>
    </section>
  );
};
