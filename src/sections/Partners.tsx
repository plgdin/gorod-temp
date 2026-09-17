import React from 'react';
import { RoundButton } from '../components/RoundButton';

export const Partners: React.FC = () => {
  return (
    <section id="partners" className="partners-section">
      <div className="fw-container">
        <div className="partners__header">
          <div className="partners__title">PARTNERS</div>
          <div className="partners__title --item-1">OF NEPTUNE</div>
          <div className="partners__title">LINES</div>
        </div>

        <div className="partners__wrap">
          <div className="partners__img">
            <img
              src="/images/partners.jpg"
              alt="Neptune Lines ro-ro vessel"
              loading="lazy"
            />
          </div>

          <p className="partners__info-text">
            Dear Sirs, we are pleased to announce that since 04th of October 2019
            Stark Shipping LLC is acting as Liner Agent of Neptune Lines. Service
            will be provided by means of Stark Shipping headquarters located in
            Chornomorsk Port. We are open for Your transportation requirements of
            Ro-Ro, heavy lifts, project cargoes in both export and import
            directions.
          </p>

          <RoundButton label="More" href="#partners" />
        </div>
      </div>
    </section>
  );
};
