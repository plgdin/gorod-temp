import React from 'react';
import '../styles/coming-soon.css';

export const ComingSoon: React.FC = () => {
  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        {/* Client GOROD MARINE Logo */}
        <div className="maintenance-logo-wrap">
          <img
            src="/images/gorod-logo-white.svg"
            alt="GOROD MARINE"
            className="maintenance-logo"
          />
        </div>

        {/* Status Badge */}
        <div className="maintenance-badge">
          <span className="maintenance-badge-dot" />
          <span>UNDER MAINTENANCE</span>
        </div>

        {/* Main Heading */}
        <h1 className="maintenance-title">LAUNCHING SOON</h1>


      </div>
    </div>
  );
};
