import React from 'react';
import { RoundButton } from '../components/RoundButton';

export const Team: React.FC = () => {
  return (
    <section id="team" className="team-section">
      <div className="fw-container">
        <div className="team__title">TEAM WORK</div>
        <div className="team__title --item-1">NOT ONE MAN</div>
        <div className="team__title">SHOW</div>

        <div className="team__wrap">
          <div className="team__img">
            <img src="/images/team.jpg" alt="Stark Shipping team" loading="lazy" />
          </div>

          <RoundButton label="Team" href="#team" />
        </div>
      </div>
    </section>
  );
};
