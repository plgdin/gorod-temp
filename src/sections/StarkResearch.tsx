import React from 'react';

const researchScreens = [
  '/images/research-1.png',
  '/images/research-2.jpg',
  '/images/research-3.jpg',
  '/images/research-4.png',
];

export const StarkResearch: React.FC = () => {
  return (
    <section id="research" className="research-section">
      <div className="fw-container">
        <div className="research-title">
          <div>STARK</div>
          <div className="research-title --item-1">RESEARCH</div>
          <div>TANK AND BULK</div>
          <div className="research-title --item-1">ANALYTICS</div>
        </div>

        <div className="horizontal-cards">
          {researchScreens.map((img, idx) => (
            <div key={idx} className="horizontal-card">
              <img src={img} alt={`Stark Research interface preview ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="research-info">
          <p className="research-desc">
            We created and now developing new project, which contains all
            shipments referring to grains, steels, vegoils, meal, fuel and on your
            demand we could start any other commodity. Moreover system has other
            useful info (Port/Terminals restrictions, DAs...
          </p>

          <div className="research-footer">
            <a
              href="https://stark-research.net/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
            >
              www.stark-research.net
            </a>

            <a
              href="https://apps.apple.com/ua/app/stark-research-all-about-cargoes/id1161899864"
              target="_blank"
              rel="noopener noreferrer"
              className="appstore-badge"
            >
              <span>Available on the</span>
              <strong>App Store</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
