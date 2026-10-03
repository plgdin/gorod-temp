import React from 'react';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import type { ServiceItem, CraneState } from '@/types/services';
import { ServiceGraphic } from './ServiceGraphic';

interface LiftedContainerProps {
  service: ServiceItem;
  craneState: CraneState;
  onExplore: (service: ServiceItem) => void;
  onLower: () => void;
  containerWidth: number;
}

export const LiftedContainer: React.FC<LiftedContainerProps> = ({
  service,
  craneState,
  onExplore,
  onLower,
  containerWidth,
}) => {
  const isHoisted = craneState === 'hoisted';

  return (
    <div
      className={`lifted-container-chassis ${isHoisted ? '--hoisted' : ''}`}
      style={{ width: `${containerWidth}px` }}
    >
      {/* Overhead Amber Spotlights shining down */}
      <div className="container-overhead-spotlight" />
      <div className="container-overhead-spotlight --right" />

      {/* ISO Shipping Container Box Surface */}
      <div className="container-box-face">
        {/* Realistic Corrugated Container Texture Base */}
        <div className="container-corrugation-texture" />
        <div className="container-metal-sheen" />

        {/* Top/Bottom Structural ISO Frame Beams */}
        <div className="container-iso-frame-top">
          <div className="iso-corner-block --left" />
          <div className="iso-spec-code">GORU 892041 45G1 • 40FT HIGH CUBE</div>
          <div className="iso-corner-block --right" />
        </div>

        {/* Content Layout on Container Face */}
        <div className="container-face-inner">
          {/* Left Column: Brand, Service Info & Actions */}
          <div className="container-face-left">
            <div className="container-brand-row">
              <div className="container-logo-mark">
                <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M 20 4 L 36 12 L 36 28 L 20 36 L 4 28 L 4 12 Z"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  <path
                    d="M 20 12 L 28 16 L 28 24 L 20 28 L 12 24 L 12 16 Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="container-logo-text">GOROD</span>
              </div>
              <span className="container-service-num">{service.number}</span>
            </div>

            <div className="container-title-group">
              <span className="container-category-badge">{service.category}</span>
              <h2 className="container-service-title">{service.title}</h2>
              <p className="container-service-tagline">{service.tagline}</p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="container-metrics-row">
              {service.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="container-metric-item">
                  <span className="metric-val">{m.value}</span>
                  <span className="metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="container-actions-row">
              <button
                type="button"
                className="container-explore-btn"
                onClick={() => onExplore(service)}
                aria-label={`Explore ${service.title}`}
              >
                <span>Explore</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="container-quote-btn"
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Request Quote</span>
                <ExternalLink size={13} />
              </button>

              <button
                type="button"
                className="container-lower-btn"
                onClick={onLower}
                title="Lower container to dock"
              >
                <ChevronDown size={14} />
                <span>Lower</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Tech Graphic HUD (Globe / Transport / Warehouse / Customs / Project) */}
          <div className="container-face-right">
            <ServiceGraphic type={service.graphicType} accentColor={service.accentColor} />
          </div>
        </div>

        {/* Bottom ISO Container Structural Sill */}
        <div className="container-iso-frame-bottom">
          <div className="iso-corner-block --left" />
          <div className="iso-forklift-pocket --left" />
          <div className="iso-tare-info">MAX PAYLOAD: 30,480 KG | TARE: 3,740 KG | CARGO CAPACITY: 76.4 CBM</div>
          <div className="iso-forklift-pocket --right" />
          <div className="iso-corner-block --right" />
        </div>
      </div>

      {/* Amber Ground Glow under container */}
      <div className="container-ground-ambient-glow" />
    </div>
  );
};
