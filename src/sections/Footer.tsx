import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, deg: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top - cy;

    const tiltx = dy / cy;
    const tilty = -dx / cx;
    const radius = Math.sqrt(tiltx * tiltx + tilty * tilty);
    const deg = radius * 22;

    setTilt({ x: tiltx, y: tilty, deg });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, deg: 0 });
  };

  return (
    <footer id="footer" className="footer">
      <div
        className="footer__main"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#about" className="footer__link">
          ABOUT
        </a>

        <div
          className="footer__image"
          style={{
            transform: `translate(-50%, -50%) rotate3d(${tilt.x}, ${tilt.y}, 0, ${tilt.deg}deg)`,
          }}
        >
          <img src="/images/about-footer.jpg" alt="About Stark Shipping" />
        </div>
      </div>

      <div className="fw-container">
        <div className="footer__content">
          <div className="copyright">
            <span>&copy; 2014–2026. Stark Shipping</span>
          </div>
          <div className="developer">
            Site developed by{' '}
            <a
              href="https://solar-digital.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SOLAR Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
