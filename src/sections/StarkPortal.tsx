import React from 'react';

const portalScreens = [
  '/images/portal-1.png',
  '/images/portal-2.png',
  '/images/portal-3.jpg',
];

export const StarkPortal: React.FC = () => {
  return (
    <section id="portal" className="portal-section">
      <div className="fw-container">
        <div className="portal-title">
          <div>STARK</div>
          <div className="portal-title --item-1">PORTAL</div>
          <div>FOR AGENTS</div>
          <div className="portal-title --item-1">AND CLIENTS</div>
        </div>

        <div className="horizontal-cards">
          {portalScreens.map((img, idx) => (
            <div key={idx} className="horizontal-card">
              <img
                src={img}
                alt={`Stark Portal dashboard preview ${idx + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="research-info">
          <p className="research-desc">
            We have created and are developing the Stark Portal project, which
            contains all documents, proposals, cost calculations, etc for the
            efficient operation of the broker. Moreover system has other useful
            information (Port/Terminal restrictions, DAs...
          </p>

          <div className="research-footer">
            <a
              href="https://portal.starkshipping.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="site-link"
            >
              www.portal.starkshipping.net
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
