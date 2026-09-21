import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { CustomDropdown } from '../components/ui/CustomDropdown';

const portOptions = [
  { value: 'Odesa', label: 'Odesa', badge: 'UA ODS' },
  { value: 'Chornomorsk', label: 'Chornomorsk', badge: 'UA ILK' },
  { value: 'Pivdennyi', label: 'Pivdennyi / Yuzhny', badge: 'UA YUZ' },
  { value: 'Izmail', label: 'Izmail Danube', badge: 'UA IZM' },
  { value: 'Reni', label: 'Reni Danube', badge: 'UA REN' },
  { value: 'Other', label: 'Other Black Sea Port' },
];

const serviceOptions = [
  { value: 'Port Agency & Husbandry', label: 'Port Agency & Full Husbandry' },
  { value: 'Cargo Supervision & Tallying', label: 'Cargo Supervision & Tallying' },
  { value: 'Bunkering & Technical Supply', label: 'Bunkering & Technical Supply' },
  { value: 'Crew Change & Repatriation', label: 'Crew Change & Repatriation' },
  { value: 'Draft Survey & Marine Inspection', label: 'Draft Survey & Marine Inspection' },
  { value: 'Proforma Disbursement Account (PDA) Only', label: 'Proforma Disbursement Account (PDA) Only' },
];

export const ContactCTA: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    vessel: '',
    port: 'Odesa',
    service: 'Port Agency & Husbandry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-contact">
      <div className="section-contact__inner">
        {/* Call to Action Banner */}
        <div className="contact-cta-banner">
          <div className="contact-cta-banner__content">
            <p className="cta-tagline">Maritime Representation &amp; Port Operations</p>
            <h2 className="cta-headline">Our Representation. Your Operations. Every City.</h2>
            <p className="cta-sub">
              Port agency, vessel husbandry, cargo supervision, bunkering, crew support, and PDA coordination from one reliable 24/7 operations desk.
            </p>
          </div>
          <div className="contact-cta-banner__action">
            <a href="#inquiry-form" className="btn-primary">
              Submit Port Call Request
            </a>
          </div>
        </div>

        {/* Form and Contact Details Grid */}
        <div id="inquiry-form" className="contact-grid">
          {/* Left: Contact Information Cards */}
          <div className="contact-info-pane">
            <div className="contact-card --highlight">
              <div className="contact-card__icon-box">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="contact-card__title">Head Office</h3>
                <p className="contact-card__text" style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#334155' }}>
                  TC : 95/238 (13), Anamugham, Poonthi Road,<br />
                  Anayara P.O, Trivandrum, Kerala, India<br />
                  PIN: 695029.
                </p>
                <div className="contact-card__links" style={{ marginTop: '12px' }}>
                  <a href="tel:+919480512223" className="contact-link">
                    <Phone size={15} /> +91 9480512223
                  </a>
                  <a href="mailto:info@gorodagency.com" className="contact-link">
                    <Mail size={15} /> info@gorodagency.com
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon-box">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="contact-card__title">24/7 Operations Desk</h3>
                <p className="contact-card__text">
                  Direct round-the-clock coordination for vessel arrivals, pilot bookings, and emergency husbandry across all ports.
                </p>
                <div className="contact-card__links">
                  <a href="tel:+919480512223" className="contact-link">
                    <Phone size={15} /> +91 9480512223
                  </a>
                  <a href="mailto:info@gorodagency.com" className="contact-link">
                    <Mail size={15} /> info@gorodagency.com
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon-box">
                <Send size={22} />
              </div>
              <div>
                <h3 className="contact-card__title">Connect & Social Links</h3>
                <p className="contact-card__text">Follow Gorod Agency for maritime updates, industry insights, and regional announcements:</p>
                <div className="contact-card__social-links" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      background: '#0077b5',
                      color: '#ffffff',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '15px',
                      textDecoration: 'none'
                    }}
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      background: '#1877f2',
                      color: '#ffffff',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '17px',
                      textDecoration: 'none'
                    }}
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      background: '#1da1f2',
                      color: '#ffffff',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                    aria-label="Twitter"
                  >
                    &#x1D54F;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Agency Inquiry Form */}
          <div className="contact-form-pane">
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={48} className="success-icon" />
                <h3 className="success-title">Port Agency Request Received</h3>
                <p className="success-text">
                  Thank you, <strong>{formState.name}</strong>. Our duty agent has received your vessel inquiry for{' '}
                  <strong>{formState.vessel || 'your vessel'}</strong> at <strong>{formState.port}</strong> and will transmit the Proforma Disbursement Account (PDA) shortly.
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      vessel: '',
                      port: 'Odesa',
                      service: 'Port Agency & Husbandry',
                      message: '',
                    });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="agency-form">
                <h3 className="form-heading">Agency Nomination / PDA Request</h3>
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
                    <label htmlFor="vessel" className="form-label">Vessel Name & IMO</label>
                    <input
                      id="vessel"
                      type="text"
                      placeholder="e.g. M/V GOROD VOYAGER (IMO 9876543)"
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

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service Type</label>
                  <CustomDropdown
                    id="service"
                    options={serviceOptions}
                    value={formState.service}
                    onChange={(val) => setFormState({ ...formState, service: val })}
                    placeholder="Select required service..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Voyage Notes / Specific Requests</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Provide ETA, expected cargo quantity, draft details or special husbandry requests..."
                    className="form-textarea"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-submit">
                  <Send size={16} /> Submit Port Call Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
