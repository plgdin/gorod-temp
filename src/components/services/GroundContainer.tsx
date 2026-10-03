import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceItem } from '@/types/services';

interface GroundContainerProps {
  service: ServiceItem;
  isLifted: boolean;
  onSelect: (service: ServiceItem) => void;
  index: number;
}

export const GroundContainer: React.FC<GroundContainerProps> = ({
  service,
  isLifted,
  onSelect,
  index,
}) => {
  const Icon = service.icon;

  if (isLifted) {
    return (
      <div className="dock-container-bay --vacant" aria-label={`Bay ${service.number} hoisted`}>
        {/* Empty Dock Bay with guidance tracks and amber dock lights */}
        <div className="dock-bay-pad">
          <div className="bay-track-line" />
          <div className="bay-lock-recess --left" />
          <div className="bay-lock-recess --right" />
          <div className="bay-ambient-spot" />
          <div className="bay-status-tag">
            <span className="bay-pulse-dot" />
            <span>BAY {service.number} • HOISTED OVERHEAD</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="ground-container-item"
      onClick={() => onSelect(service)}
      aria-label={`Select and lift ${service.title}`}
    >
      {/* Dock Floor Spotlight when hovering */}
      <div className="ground-spotlight" />

      {/* The White Shipping Container Chassis */}
      <div className="ground-container-chassis">
        <img
          src="/images/services/white-container.png"
          alt={`${service.title} Container`}
          className="ground-container-bg-img"
          draggable={false}
        />

        {/* Realistic Overlay with Dark Industrial / White Maritime Contrast & Markings */}
        <div className="ground-container-overlay">
          {/* Top Brand Bar */}
          <div className="ground-top-bar">
            <div className="ground-gorod-mark">
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                <path
                  d="M 20 4 L 36 12 L 36 28 L 20 36 L 4 28 L 4 12 Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path d="M 20 12 L 28 16 L 28 24 L 20 28 L 12 24 L 12 16 Z" fill="currentColor" />
              </svg>
              <span>GOROD</span>
            </div>
            <span className="ground-iso-code">0{index + 1} / 05</span>
          </div>

          {/* Main Service Content */}
          <div className="ground-content-body">
            <div className="ground-title-group">
              <h3 className="ground-service-title">{service.shortTitle || service.title}</h3>
              <p className="ground-service-summary">{service.summary}</p>
            </div>

            {/* Service Icon */}
            <div className="ground-service-icon-wrap">
              <Icon size={28} strokeWidth={1.5} className="ground-service-icon" />
            </div>
          </div>

          {/* Bottom Action Footer with Arrow Button */}
          <div className="ground-footer-bar">
            <div className="ground-click-hint">
              <span className="hint-label">CLICK TO LIFT</span>
            </div>
            <div className="ground-arrow-btn">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
