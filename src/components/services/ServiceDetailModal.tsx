import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, Globe2 } from 'lucide-react';
import type { ServiceItem } from '@/types/services';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const Icon = service.icon;

  return (
    <div className="service-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="service-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="modal-header">
          <div className="modal-header-tag">
            <span className="modal-num">{service.number}</span>
            <span className="modal-category">{service.category}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Title */}
        <div className="modal-hero">
          <div className="modal-hero-icon" style={{ borderColor: service.accentColor }}>
            <Icon size={32} color={service.accentColor} />
          </div>
          <div className="modal-hero-text">
            <h2 className="modal-title">{service.title}</h2>
            <p className="modal-tagline">{service.tagline}</p>
          </div>
        </div>

        {/* Detailed Description */}
        <p className="modal-desc">{service.description}</p>

        {/* Performance Metrics Grid */}
        <div className="modal-metrics-grid">
          {service.metrics.map((m, idx) => (
            <div key={idx} className="modal-metric-card">
              <div className="modal-metric-val" style={{ color: service.accentColor }}>
                {m.value}
              </div>
              <div className="modal-metric-lbl">{m.label}</div>
              {m.detail && <div className="modal-metric-detail">{m.detail}</div>}
            </div>
          ))}
        </div>

        {/* Capabilities Checklist */}
        <div className="modal-section-title">ENGINEERED CAPABILITIES & STANDARDS</div>
        <div className="modal-capabilities-grid">
          {service.capabilities.map((cap, idx) => (
            <div key={idx} className="modal-capability-item">
              <CheckCircle2 size={16} color={service.accentColor} className="cap-icon" />
              <span>{cap}</span>
            </div>
          ))}
        </div>

        {/* Value Props Strip */}
        <div className="modal-trust-strip">
          <div className="trust-item">
            <ShieldCheck size={16} />
            <span>ISO 9001:2015 Marine Certified</span>
          </div>
          <div className="trust-item">
            <Clock size={16} />
            <span>24/7 Real-Time Port Operations</span>
          </div>
          <div className="trust-item">
            <Globe2 size={16} />
            <span>Global Port Agency Network</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-action-btn --secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="modal-action-btn --primary"
            onClick={() => {
              onClose();
              const contactEl = document.getElementById('contact');
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Book Service / Request Freight Rate</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
