import React from 'react';
import BrochureFold from '../components/BrochureFold';

export const Services: React.FC = () => {
  return (
    <section id="services" className="section-services">
      <div className="section-services__inner">
        <div className="services-title-row">
          <div className="services-heading">
            <div className="services-eyebrow">
              <span className="eyebrow-line" />
              <span>02 / SERVICES REGISTER</span>
            </div>
            <h2 className="services-main-title">
              Every call.
              <br />
              <em>Considered.</em>
            </h2>
          </div>
          <p className="services-lead-text">
            From first notice to final departure, the details make the difference. Explore how we support your vessel with responsive shore-side agency.
          </p>
        </div>

        <BrochureFold />
      </div>
    </section>
  );
};

export default Services;
