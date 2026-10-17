import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { CustomDropdown } from '../components/ui/CustomDropdown';
import { PortMap } from '../components/PortMap';

const portOptions = [
  { value: 'Mumbai / JNPT', label: 'Mumbai / JNPT' },
  { value: 'Cochin', label: 'Cochin' },
  { value: 'Vizhinjam / Trivandrum', label: 'Vizhinjam / Trivandrum' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Visakhapatnam', label: 'Visakhapatnam' },
  { value: 'Mundra', label: 'Mundra' },
  { value: 'Kandla', label: 'Kandla' },
  { value: 'Kolkata / Haldia', label: 'Kolkata / Haldia' },
  { value: 'Mormugao', label: 'Mormugao' },
  { value: 'New Mangalore', label: 'New Mangalore' },
  { value: 'Tuticorin', label: 'Tuticorin' },
  { value: 'Ennore', label: 'Ennore' },
  { value: 'Krishnapatnam', label: 'Krishnapatnam' },
  { value: 'Paradip', label: 'Paradip' },
  { value: 'Other Indian Port', label: 'Other Indian Port' },
];

const serviceOptions = [
  { value: 'Port Agency & Husbandry', label: 'Port Agency & Husbandry' },
  { value: 'Cargo Supervision & Tallying', label: 'Cargo Supervision & Tallying' },
  { value: 'Bunkering & Technical Supply', label: 'Bunkering & Technical Supply' },
  { value: 'Crew Support & Repatriation', label: 'Crew Support & Repatriation' },
  { value: 'PDA Coordination', label: 'PDA Coordination' },
];

export const Footer: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    vessel: '',
    port: 'Mumbai / JNPT',
    service: '',
    eta: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="footer">
      <div className="fw-container footer__container">
        {/* Section 03 Eyebrow */}
        <div className="footer__eyebrow">
          <span className="eyebrow-line" />
          <span>03 / CONTACT</span>
        </div>

        {/* Logo + Tagline Header & Copyright on Top */}
        <div className="footer__logo-header">
          <div className="footer__logo-brand">
            <img
              src="/images/gorod-marine-white.png"
              alt="Gorod International Agency"
              className="footer__logo-img"
            />
            <span className="footer__logo-divider" aria-hidden="true" />
            <span className="footer__logo-tagline">International Maritime Agency</span>
          </div>
          <div className="footer__top-copyright">
            &copy; {new Date().getFullYear()} Gorod International Agency Pvt Ltd. All rights reserved.
          </div>
        </div>

        <div className="footer__main-grid">
          {/* Left Column: Brand (outside glass), Head Office Contacts Card, Real Map */}
          <div className="footer__left-pane">
            {/* Content outside the glassy box */}
            <div className="footer__brand-block">
              <div className="footer__cta-badge">MARITIME REPRESENTATION &amp; PORT OPERATIONS</div>
              <h2 className="footer__cta-headline">
                Our Representation.<br />
                Your Operations.<br />
                Every City.
              </h2>
              <p className="footer__brand-tagline">
                European standards in port agency, vessel husbandry, bunkering, and 24/7 PDA coordination across commercial Indian deep-sea ports.
              </p>
            </div>

            {/* Head Office Contacts Section (Glassy Card) */}
            <div className="footer__contact-card">
              <div className="footer__contact-office">
                <div className="footer__contact-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="footer__contact-info">
                  <h4 className="footer__contact-title">Head Office</h4>
                  <p className="footer__contact-address">
                    TC: 95/238 (13), Anamugham, Poonthi Road,<br />
                    Anayara P.O, Trivandrum, Kerala, India - PIN: 695029
                  </p>
                </div>
              </div>
              <div className="footer__contact-links">
                <a href="tel:+919480512223" className="footer__contact-link">
                  <Phone size={14} className="footer__contact-link-icon" />
                  <span>+91 9480512223</span>
                </a>
                <a href="mailto:info@gorodagency.com" className="footer__contact-link">
                  <Mail size={14} className="footer__contact-link-icon" />
                  <span>info@gorodagency.com</span>
                </a>
              </div>
            </div>

            {/* Real Interactive Map placed right below Head Office */}
            <PortMap
              selectedPort={formState.port}
              onSelectPort={(portName) => setFormState((prev) => ({ ...prev, port: portName }))}
            />
          </div>

          {/* Right Column: CTA & Quote Submission Form (Equal Height & Parallel) */}
          <div id="inquiry-form" className="footer__right-pane">
            <div className="contact-form-pane footer-form-card">
              {submitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={52} className="success-icon" />
                  <h3 className="success-title">Port Agency Request Received</h3>
                  <p className="success-text">
                    Thank you, <strong>{formState.name || 'Captain / Representative'}</strong>. Your nomination inquiry for{' '}
                    <strong>{formState.vessel || 'your vessel'}</strong> at <strong>{formState.port}</strong> has been logged with our 24/7 desk.
                  </p>
                  <p className="success-subtext">
                    Our duty operations officer will review your port call itinerary and revert with proforma disbursements (PDA) shortly.
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
                        port: 'Mumbai / JNPT',
                        service: '',
                        eta: '',
                        notes: '',
                      });
                    }}
                    style={{ marginTop: '24px', maxWidth: '280px', marginInline: 'auto' }}
                  >
                    SUBMIT ANOTHER REQUEST
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="agency-form">
                  <div className="form-header-group">
                    <div className="form-eyebrow">PORT AGENCY</div>
                    <div className="form-heading-row">
                      <h3 className="form-heading">Agency Nomination / PDA Request</h3>
                      <span className="form-heading-accent" />
                    </div>
                    <p className="form-subheading">Fill in your port call specifications below for immediate operations turnaround.</p>
                  </div>

                  <div className="form-fields-container">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="footer-name" className="form-label">Full Name / Title *</label>
                        <input
                          id="footer-name"
                          type="text"
                          required
                          placeholder="e.g. Captain James Vance"
                          className="form-input"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="footer-email" className="form-label">Corporate Email *</label>
                        <input
                          id="footer-email"
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
                        <label htmlFor="footer-vessel" className="form-label">Vessel Name &amp; IMO</label>
                        <input
                          id="footer-vessel"
                          type="text"
                          placeholder="e.g. M/V GOROD VOYAGER (IMO 9XXXXXX)"
                          className="form-input"
                          value={formState.vessel}
                          onChange={(e) => setFormState({ ...formState, vessel: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="footer-port" className="form-label">Destination Port</label>
                        <CustomDropdown
                          id="footer-port"
                          options={portOptions}
                          value={formState.port}
                          onChange={(val) => setFormState({ ...formState, port: val })}
                          placeholder="Select port..."
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="footer-service" className="form-label">Service Type</label>
                        <CustomDropdown
                          id="footer-service"
                          options={serviceOptions}
                          value={formState.service}
                          onChange={(val) => setFormState({ ...formState, service: val })}
                          placeholder="Select service type"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="footer-eta" className="form-label">Estimated Date of Arrival (ETA)</label>
                        <div className="input-with-icon">
                          <input
                            id="footer-eta"
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

                    <div className="form-group form-group--full">
                      <label htmlFor="footer-notes" className="form-label">Cargo / Call Specifications (Optional)</label>
                      <textarea
                        id="footer-notes"
                        rows={3}
                        placeholder="Cargo type, expected draft, bunker specs, or husbandry requirements..."
                        className="form-input form-textarea"
                        value={formState.notes}
                        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-footer-action">
                    <button type="submit" className="btn-form-submit">
                      <span>SUBMIT PORT CALL REQUEST</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
