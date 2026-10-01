import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
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

export const Footer: React.FC = () => {
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
    <footer id="contact" className="footer">
      <div className="fw-container footer__container">
        <div className="footer__main-grid">
          {/* Left Column: Brand, CTA, Links & Contact Details */}
          <div className="footer__left-pane">
            <div className="footer__brand-block">
              <img
                src="/images/gorod-marine-white.png"
                alt="Gorod Marine"
                className="footer__logo-img"
              />
              <div className="footer__cta-badge">MARITIME REPRESENTATION &amp; PORT OPERATIONS</div>
              <h2 className="footer__cta-headline">
                Our Representation.<br />
                Your Operations.<br />
                Every City.
              </h2>
              <p className="footer__brand-tagline">
                European standards in port agency, vessel husbandry, bunkering, and 24/7 PDA coordination across Ukrainian &amp; Black Sea ports.
              </p>
            </div>

            {/* Navigation & Operations Links (Moved UP) */}
            <div className="footer__links-row">
              <div className="footer__nav-group">
                <h4 className="footer__nav-title">Navigation</h4>
                <ul className="footer__links">
                  <li><a href="#">Home</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#services">Our Services</a></li>
                  <li><a href="#contact">Contact &amp; PDA</a></li>
                </ul>
              </div>

              <div className="footer__nav-group">
                <h4 className="footer__nav-title">Operations</h4>
                <ul className="footer__links">
                  <li><span>Odesa &bull; Chornomorsk</span></li>
                  <li><span>Pivdennyi &bull; Danube Ports</span></li>
                  <li><span>24/7 Dispatch Desk</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: CTA & Quote Submission Form + Contacts Card Right Below */}
          <div id="inquiry-form" className="footer__right-pane">
            <div className="contact-form-pane footer-form-card">
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

                  <button type="submit" className="btn-form-submit">
                    <span>SUBMIT PORT CALL REQUEST</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Contacts Card (Right Below the CTA, Without 24/7 Tag) */}
            <div className="footer__contacts-card">
              <div className="footer__contact-header">
                <div className="footer__contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="footer__contact-main">
                  <div className="footer__contact-title-row">
                    <h4 className="footer__contact-title">Head Office</h4>
                  </div>
                  <p className="footer__contact-address">
                    TC : 95/238 (13), Anamugham, Poonthi Road,<br />
                    Anayara P.O, Trivandrum, Kerala, India &bull; PIN: 695029
                  </p>
                </div>
              </div>

              <div className="footer__contact-actions">
                <a href="tel:+919480512223" className="footer__contact-action-btn">
                  <Phone size={15} />
                  <span>+91 9480512223</span>
                </a>
                <a href="mailto:info@gorodagency.com" className="footer__contact-action-btn">
                  <Mail size={15} />
                  <span>info@gorodagency.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
