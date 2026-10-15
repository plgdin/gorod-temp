import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ArrowRight, Anchor } from 'lucide-react';
import { CustomDropdown } from '../components/ui/CustomDropdown';

const portOptions = [
  { value: 'Mumbai / JNPT', label: 'Mumbai / JNPT' },
  { value: 'Cochin', label: 'Cochin' },
  { value: 'Vizhinjam / Trivandrum', label: 'Vizhinjam / Trivandrum' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Visakhapatnam', label: 'Visakhapatnam' },
  { value: 'Mundra', label: 'Mundra' },
  { value: 'Kandla', label: 'Kandla' },
  { value: 'Kolkata / Haldia', label: 'Kolkata / Haldia' },
  { value: 'Other Indian Port', label: 'Other Indian Port' },
];

const serviceOptions = [
  { value: 'Port Agency & Husbandry', label: 'Port Agency & Husbandry' },
  { value: 'Cargo Supervision & Tallying', label: 'Cargo Supervision & Tallying' },
  { value: 'Bunkering & Technical Supply', label: 'Bunkering & Technical Supply' },
  { value: 'Crew Support & Repatriation', label: 'Crew Support & Repatriation' },
  { value: 'PDA Coordination', label: 'PDA Coordination' },
];

interface PortLocation {
  name: string;
  x: number;
  y: number;
  primary: boolean;
  anchor: 'start' | 'end' | 'middle';
  dx: number;
  dy: number;
}

/* Major commercial and deep-sea ports across the Indian coastline */
const PORT_LOCATIONS: PortLocation[] = [
  { name: 'Mundra', x: 110, y: 74, primary: true, anchor: 'end', dx: -8, dy: -4 },
  { name: 'Kandla', x: 119, y: 66, primary: false, anchor: 'start', dx: 8, dy: -6 },
  { name: 'Mumbai / JNPT', x: 179, y: 125, primary: true, anchor: 'end', dx: -8, dy: 3 },
  { name: 'Mormugao', x: 198, y: 176, primary: false, anchor: 'end', dx: -8, dy: 3 },
  { name: 'New Mangalore', x: 220, y: 213, primary: false, anchor: 'end', dx: -8, dy: 3 },
  { name: 'Cochin', x: 250, y: 256, primary: true, anchor: 'end', dx: -8, dy: 0 },
  { name: 'Vizhinjam (HQ)', x: 265, y: 280, primary: true, anchor: 'end', dx: -8, dy: 9 },
  { name: 'Tuticorin', x: 293, y: 274, primary: false, anchor: 'start', dx: 8, dy: 6 },
  { name: 'Chennai', x: 339, y: 210, primary: true, anchor: 'start', dx: 8, dy: -2 },
  { name: 'Ennore', x: 340, y: 198, primary: false, anchor: 'start', dx: 8, dy: -4 },
  { name: 'Krishnapatnam', x: 345, y: 169, primary: false, anchor: 'start', dx: 8, dy: 0 },
  { name: 'Visakhapatnam', x: 404, y: 142, primary: true, anchor: 'start', dx: 8, dy: 0 },
  { name: 'Paradip', x: 477, y: 104, primary: false, anchor: 'start', dx: 8, dy: -4 },
  { name: 'Kolkata / Haldia', x: 507, y: 79, primary: true, anchor: 'start', dx: 8, dy: -4 },
];

/* SVG vectors for Indian peninsula landmass and coastline */
const INDIA_LAND_PATH = "M 84,0 L 527,0 L 526.8,81.9 L 507.4,78.9 L 485.8,86.3 L 477.1,104.0 L 446.9,111.4 L 427.4,129.1 L 403.7,142.3 L 379.9,154.1 L 371.3,164.4 L 345.4,168.8 L 336.7,193.9 L 338.9,210.1 L 328.1,227.8 L 328.1,244.0 L 313.0,251.4 L 317.3,266.1 L 293.5,273.5 L 278.4,283.8 L 265.4,279.4 L 261.1,273.5 L 256.8,266.1 L 250.3,255.8 L 241.7,238.1 L 230.9,227.8 L 222.2,214.5 L 220.1,207.2 L 207.1,185.1 L 198.5,176.2 L 187.7,152.6 L 183.4,133.5 L 179.0,124.6 L 176.9,108.4 L 174.7,86.3 L 174.7,77.5 L 163.9,83.4 L 155.3,93.7 L 133.7,95.2 L 114.2,84.8 L 109.9,74.5 L 118.6,65.7 L 101.3,67.2 L 88.3,59.8 L 94.8,52.4 L 84.0,42.1 Z";
const INDIA_COAST_STROKE = "M 84.0,42.1 L 94.8,52.4 L 88.3,59.8 L 101.3,67.2 L 118.6,65.7 L 109.9,74.5 L 114.2,84.8 L 133.7,95.2 L 155.3,93.7 L 163.9,83.4 L 174.7,77.5 L 174.7,86.3 L 176.9,108.4 L 179.0,124.6 L 183.4,133.5 L 187.7,152.6 L 198.5,176.2 L 207.1,185.1 L 220.1,207.2 L 222.2,214.5 L 230.9,227.8 L 241.7,238.1 L 250.3,255.8 L 256.8,266.1 L 261.1,273.5 L 265.4,279.4 L 278.4,283.8 L 293.5,273.5 L 317.3,266.1 L 313.0,251.4 L 328.1,244.0 L 328.1,227.8 L 338.9,210.1 L 336.7,193.9 L 345.4,168.8 L 371.3,164.4 L 379.9,154.1 L 403.7,142.3 L 427.4,129.1 L 446.9,111.4 L 477.1,104.0 L 485.8,86.3 L 507.4,78.9 L 526.8,81.9";
const SRI_LANKA_PATH = "M 332.4,260.2 L 349.7,266.1 L 369.1,276.4 L 371.3,295.6 L 358.3,311.8 L 345.4,316.2 L 334.6,313.3 L 328.1,300.0 L 328.1,277.9 Z";

/* Primary coastal shipping route connecting key hubs */
const SHIPPING_LANE_PATH = "M 110,74 L 179,125 L 250,256 L 265,280 L 293,274 L 339,210 L 404,142 L 477,104 L 507,79";

export const Footer: React.FC = () => {
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    vessel: '',
    port: 'Mumbai / JNPT',
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
        {/* Section 03 Eyebrow */}
        <div className="footer__eyebrow">
          <span className="eyebrow-line" />
          <span>03 / CONTACT</span>
        </div>

        {/* Logo + Tagline Header */}
        <div className="footer__logo-header">
          <img
            src="/images/gorod-marine-white.png"
            alt="Gorod International Agency"
            className="footer__logo-img"
          />
          <span className="footer__logo-divider" aria-hidden="true" />
          <span className="footer__logo-tagline">International Maritime Agency</span>
        </div>

        <div className="footer__main-grid">
          {/* Left Column: Brand, CTA, Links & Contact Details — all inside frosted glass */}
          <div className="footer__left-pane">
            <div className="footer__glass-card">
              <div className="footer__brand-block">
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

              {/* Navigation & Operations Links */}
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
                    <li><span>Mumbai &bull; Cochin</span></li>
                    <li><span>Vizhinjam &bull; Chennai</span></li>
                    <li><span>24/7 Dispatch Desk</span></li>
                  </ul>
                </div>
              </div>

              {/* Contacts Row */}
              <div className="footer__contact-row-inline">
                <div className="footer__contact-header">
                  <div className="footer__contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="footer__contact-main">
                    <h4 className="footer__contact-title">Head Office</h4>
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

              {/* Copyright Notice */}
              <div className="footer__card-copyright">
                &copy; {new Date().getFullYear()} Gorod International Agency Pvt Ltd. All rights reserved.
              </div>
            </div>
          </div>

          {/* Right Column: CTA & Quote Submission Form + Interactive Port Map */}
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

            {/* Interactive Map — Service Ports */}
            <div className="footer__map-card">
              <div className="footer__map-header">
                <Anchor size={16} className="footer__map-header-icon" />
                <h4 className="footer__map-title">Service Port Network</h4>
                <span className="footer__map-badge">{PORT_LOCATIONS.length} Ports</span>
              </div>
              <div className="footer__map-svg-wrap">
                <svg
                  viewBox="0 0 600 320"
                  className="footer__map-svg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Water fill (Indian Ocean, Arabian Sea, Bay of Bengal) */}
                  <rect x="0" y="0" width="600" height="320" rx="12" fill="rgba(7, 24, 32, 0.65)" />

                  {/* Grid lines */}
                  {[100, 200, 300, 400, 500].map((x) => (
                    <line key={`vl-${x}`} x1={x} y1="0" x2={x} y2="320" stroke="rgba(103,171,175,0.06)" strokeWidth="0.5" />
                  ))}
                  {[64, 128, 192, 256].map((y) => (
                    <line key={`hl-${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(103,171,175,0.06)" strokeWidth="0.5" />
                  ))}

                  {/* Indian Subcontinent Landmass */}
                  <path
                    d={INDIA_LAND_PATH}
                    fill="rgba(103, 171, 175, 0.08)"
                    stroke="rgba(103, 171, 175, 0.16)"
                    strokeWidth="1"
                  />

                  {/* Indian Coastline Stroke */}
                  <path
                    d={INDIA_COAST_STROKE}
                    fill="none"
                    stroke="rgba(103, 171, 175, 0.45)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Sri Lanka */}
                  <path
                    d={SRI_LANKA_PATH}
                    fill="rgba(103, 171, 175, 0.09)"
                    stroke="rgba(103, 171, 175, 0.35)"
                    strokeWidth="1"
                  />

                  {/* Major Coastal Shipping Lane */}
                  <path
                    d={SHIPPING_LANE_PATH}
                    fill="none"
                    stroke="rgba(103, 171, 175, 0.22)"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />

                  {/* Ocean / Sea Region Labels */}
                  <text
                    x="95" y="210"
                    textAnchor="middle"
                    fill="rgba(103, 171, 175, 0.18)"
                    fontSize="12.5"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    ARABIAN SEA
                  </text>

                  <text
                    x="475" y="210"
                    textAnchor="middle"
                    fill="rgba(103, 171, 175, 0.18)"
                    fontSize="12.5"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    BAY OF BENGAL
                  </text>

                  <text
                    x="290" y="312"
                    textAnchor="middle"
                    fill="rgba(103, 171, 175, 0.18)"
                    fontSize="11.5"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    INDIAN OCEAN
                  </text>

                  {/* Port pins */}
                  {PORT_LOCATIONS.map((port) => {
                    const isHovered = hoveredPort === port.name;
                    const r = port.primary ? 5.5 : 3.8;
                    return (
                      <g
                        key={port.name}
                        onMouseEnter={() => setHoveredPort(port.name)}
                        onMouseLeave={() => setHoveredPort(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Pulse ring for primary ports */}
                        {port.primary && (
                          <circle
                            cx={port.x} cy={port.y} r={r + 5}
                            fill="none"
                            stroke="rgba(103, 171, 175, 0.45)"
                            strokeWidth="1"
                            className="footer__map-pulse"
                          />
                        )}
                        {/* Glow */}
                        <circle
                          cx={port.x} cy={port.y}
                          r={isHovered ? r + 4 : r + 2}
                          fill={port.primary ? 'rgba(103, 171, 175, 0.25)' : 'rgba(103, 171, 175, 0.12)'}
                        />
                        {/* Dot */}
                        <circle
                          cx={port.x} cy={port.y}
                          r={isHovered ? r + 1.2 : r}
                          fill={port.primary ? '#67abaf' : 'rgba(103, 171, 175, 0.65)'}
                          stroke={isHovered ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                          strokeWidth={isHovered ? 1.5 : 0.6}
                          style={{ transition: 'all 0.25s ease' }}
                        />
                        {/* Label */}
                        {(isHovered || port.primary) && (
                          <text
                            x={port.x + (port.dx || 0)}
                            y={port.y + (port.dy || -8)}
                            textAnchor={port.anchor || 'middle'}
                            fill={isHovered ? '#ffffff' : 'rgba(255,255,255,0.9)'}
                            fontSize={isHovered ? '10.5' : '9'}
                            fontFamily="'Articulat CF', sans-serif"
                            fontWeight={port.primary ? '700' : '500'}
                            style={{ transition: 'all 0.25s ease', textShadow: '0 2px 6px rgba(0,0,0,0.95)' }}
                          >
                            {port.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
