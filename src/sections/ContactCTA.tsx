import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { CustomDropdown } from '../components/ui/CustomDropdown';

const portOptions = [
  { value: 'Odesa', label: 'Odesa' },
  { value: 'Chornomorsk', label: 'Chornomorsk' },
  { value: 'Pivdennyi', label: 'Pivdennyi' },
  { value: 'Izmail', label: 'Izmail' },
  { value: 'Reni', label: 'Reni' },
  { value: 'Other', label: 'Other' },
];

const serviceOptions = [
  { value: 'Port Agency & Husbandry', label: 'Port Agency & Husbandry' },
  { value: 'Cargo Supervision & Tallying', label: 'Cargo Supervision & Tallying' },
  { value: 'Bunkering & Technical Supply', label: 'Bunkering & Technical Supply' },
  { value: 'Crew Support & Repatriation', label: 'Crew Support & Repatriation' },
  { value: 'PDA Coordination', label: 'PDA Coordination' },
];

export const ContactCTA: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    vessel: '',
    port: 'Odesa',
    service: '',
    eta: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-contact">
      {/* Maritime Representation & Port Operations Hero Banner */}
      <div className="contact-hero-banner">
        <div className="contact-hero-banner__content">
          <div className="contact-hero-banner__tagline-row">
            <span className="cta-tagline">MARITIME REPRESENTATION &amp; PORT OPERATIONS</span>
            <span className="cta-tagline-line" />
          </div>
          <h2 className="cta-headline">
            Our Representation.<br />
            Your Operations.<br />
            Every City.
          </h2>
          <p className="cta-sub">
            Port agency, vessel husbandry, cargo supervision, bunkering, crew support, and PDA coordination from one reliable 24/7 operations desk.
          </p>
          <a href="#inquiry-form" className="banner-cta-btn">
            <span>SUBMIT PORT CALL REQUEST</span>
            <span className="banner-cta-btn__divider" />
            <span className="banner-cta-btn__arrow">→</span>
          </a>
        </div>
      </div>

      {/* Form and Contact Details Grid Area */}
      <div id="inquiry-form" className="contact-body">
        <div className="contact-grid">
          {/* Left Column: Office & 24/7 Desk Cards */}
          <div className="contact-info-pane">
            {/* Card 1: Head Office */}
            <div className="contact-card --office">
              <div className="contact-card__main">
                <div className="contact-card__icon-box --office-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-card__details">
                  <h3 className="contact-card__title">Head Office</h3>
                  <p className="contact-card__address">
                    TC : 95/238 (13), Anamugham, Poonthi Road,<br />
                    Anayara P.O, Trivandrum, Kerala, India<br />
                    PIN: 695029.
                  </p>
                </div>
              </div>

              {/* Watermark India Map with Trivandrum Pinpoint */}
              <div className="india-map-watermark" aria-hidden="true">
                <svg
                  viewBox="0 0 170 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="india-map-svg"
                >
                  <defs>
                    <pattern id="indiaDotGrid" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                      <circle cx="3.5" cy="3.5" r="0.9" fill="rgba(94, 234, 212, 0.28)" />
                    </pattern>
                  </defs>
                  {/* Subtle Subcontinent Silhouette */}
                  <path
                    d="M82 12 C88 18, 93 24, 96 32 C104 38, 114 42, 122 46 C128 50, 134 52, 142 52 C148 56, 150 63, 145 68 C138 72, 130 73, 124 76 C118 79, 112 83, 108 90 C105 97, 98 104, 94 114 C90 125, 84 140, 78 156 C74 167, 70 177, 68 184 C66 186, 63 182, 62 174 C58 158, 54 144, 52 130 C50 118, 48 108, 42 98 C36 88, 30 84, 24 82 C18 80, 14 75, 20 68 C26 62, 36 64, 44 66 C52 66, 60 62, 64 54 C68 46, 70 34, 72 22 Z"
                    fill="url(#indiaDotGrid)"
                    stroke="rgba(94, 234, 212, 0.25)"
                    strokeWidth="1.2"
                  />
                  {/* Glowing Marker for Trivandrum */}
                  <circle cx="67" cy="174" r="8" fill="rgba(56, 189, 248, 0.25)" />
                  <circle cx="67" cy="174" r="3.5" fill="#38bdf8" />
                  <circle cx="67" cy="174" r="1.5" fill="#ffffff" />
                </svg>
                <div className="india-map-label">
                  <span className="label-city">TRIVANDRUM</span>
                  <span className="label-state">KERALA, INDIA</span>
                </div>
              </div>

              {/* Bottom Direct Contacts */}
              <div className="contact-card__links">
                <a href="tel:+919480512223" className="contact-link --office-link">
                  <Phone size={14} /> <span>+91 9480512223</span>
                </a>
                <a href="mailto:info@gorodagency.com" className="contact-link --office-link">
                  <Mail size={14} /> <span>info@gorodagency.com</span>
                </a>
              </div>
            </div>

            {/* Card 2: 24/7 Operations Desk */}
            <div className="contact-card --desk">
              <div className="contact-card__content-row">
                <div className="contact-card__main">
                  <div className="contact-card__icon-box --desk-icon">
                    <Clock size={22} />
                  </div>
                  <div className="contact-card__details">
                    <h3 className="contact-card__title --dark">24/7 Operations Desk</h3>
                    <p className="contact-card__text">
                      Direct round-the-clock coordination for vessel arrivals, pilot bookings, and emergency husbandry across all ports.
                    </p>
                  </div>
                </div>

                {/* 24/7 Dashed Circular Dial */}
                <div className="desk-dial-wrap" aria-hidden="true">
                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                    <circle
                      cx="42"
                      cy="42"
                      r="36"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="2.5 3.5"
                      strokeLinecap="round"
                    />
                    <text
                      x="42"
                      y="48"
                      textAnchor="middle"
                      fill="#062837"
                      fontSize="17"
                      fontWeight="700"
                      letterSpacing="0.02em"
                      fontFamily="inherit"
                    >
                      24/7
                    </text>
                  </svg>
                </div>
              </div>

              {/* Bottom Direct Contacts */}
              <div className="contact-card__links">
                <a href="tel:+919480512223" className="contact-link --desk-link">
                  <Phone size={14} /> <span>+91 9480512223</span>
                </a>
                <a href="mailto:info@gorodagency.com" className="contact-link --desk-link">
                  <Mail size={14} /> <span>info@gorodagency.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Agency Nomination / PDA Request Form */}
          <div className="contact-form-pane">
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={46} className="success-icon" />
                <h3 className="success-title">Port Agency Request Received</h3>
                <p className="success-text">
                  Thank you, <strong>{formState.name || 'Captain / Representative'}</strong>. Your nomination inquiry for{' '}
                  <strong>{formState.vessel || 'your vessel'}</strong> at <strong>{formState.port}</strong> has been logged with our 24/7 desk.
                </p>
                <button
                  type="button"
                  className="btn-form-submit"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      vessel: '',
                      port: 'Odesa',
                      service: '',
                      eta: '',
                    });
                  }}
                  style={{ marginTop: '20px', maxWidth: '280px', marginInline: 'auto' }}
                >
                  SUBMIT ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="agency-form">
                <div className="form-heading-row">
                  <h3 className="form-heading">Agency Nomination / PDA Request</h3>
                  <span className="form-heading-accent" />
                </div>
                <p className="form-subheading">Fill in your port call specifications below.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name / Title *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Captain James Vance"
                      className="form-input"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Corporate Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="ops@shippingcompany.com"
                      className="form-input"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vessel" className="form-label">Vessel Name &amp; IMO</label>
                    <input
                      id="vessel"
                      type="text"
                      placeholder="e.g. M/V GOROD VOYAGER (IMO 9XXXXXX)"
                      className="form-input"
                      value={formState.vessel}
                      onChange={(e) => setFormState({ ...formState, vessel: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="port" className="form-label">Destination Port</label>
                    <CustomDropdown
                      id="port"
                      options={portOptions}
                      value={formState.port}
                      onChange={(val) => setFormState({ ...formState, port: val })}
                      placeholder="Select port..."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service Type</label>
                    <CustomDropdown
                      id="service"
                      options={serviceOptions}
                      value={formState.service}
                      onChange={(val) => setFormState({ ...formState, service: val })}
                      placeholder="Select service type"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eta" className="form-label">Estimated Date of Arrival (ETA)</label>
                    <div className="input-with-icon">
                      <input
                        id="eta"
                        type="text"
                        placeholder="DD / MM / YYYY"
                        className="form-input"
                        value={formState.eta}
                        onChange={(e) => setFormState({ ...formState, eta: e.target.value })}
                      />
                      <Calendar size={17} className="input-icon" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-form-submit">
                  <span>SUBMIT PORT CALL REQUEST</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
