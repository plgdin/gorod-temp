import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ArrowRight, Anchor } from 'lucide-react';
import { CustomDropdown } from '../components/ui/CustomDropdown';

export type CoastRegion = 'West' | 'South' | 'East';

export interface PortData {
  id: string;
  name: string;
  coast: CoastRegion;
  x: number;
  y: number;
  primary: boolean;
  anchor: 'start' | 'end' | 'middle';
  dx: number;
  dy: number;
}

/* Single Source of Truth: All 14 Indian Commercial Ports */
export const INDIAN_PORTS: PortData[] = [
  // West Coast
  { id: 'mundra', name: 'Mundra', coast: 'West', x: 110, y: 74, primary: true, anchor: 'end', dx: -8, dy: -4 },
  { id: 'kandla', name: 'Kandla', coast: 'West', x: 119, y: 66, primary: false, anchor: 'start', dx: 8, dy: -8 },
  { id: 'mumbai', name: 'Mumbai / JNPT', coast: 'West', x: 179, y: 125, primary: true, anchor: 'end', dx: -8, dy: 3 },
  { id: 'mormugao', name: 'Mormugao', coast: 'West', x: 198, y: 176, primary: false, anchor: 'end', dx: -8, dy: 3 },
  { id: 'mangalore', name: 'New Mangalore', coast: 'West', x: 220, y: 213, primary: false, anchor: 'end', dx: -8, dy: 3 },

  // South Coast
  { id: 'cochin', name: 'Cochin', coast: 'South', x: 250, y: 256, primary: true, anchor: 'end', dx: -8, dy: -1 },
  { id: 'vizhinjam', name: 'Vizhinjam (HQ)', coast: 'South', x: 265, y: 280, primary: true, anchor: 'end', dx: -8, dy: 10 },
  { id: 'tuticorin', name: 'Tuticorin', coast: 'South', x: 293, y: 274, primary: false, anchor: 'start', dx: 8, dy: 8 },

  // East Coast
  { id: 'chennai', name: 'Chennai', coast: 'East', x: 339, y: 210, primary: true, anchor: 'start', dx: 8, dy: -2 },
  { id: 'ennore', name: 'Ennore', coast: 'East', x: 340, y: 198, primary: false, anchor: 'start', dx: 8, dy: -8 },
  { id: 'krishnapatnam', name: 'Krishnapatnam', coast: 'East', x: 345, y: 169, primary: false, anchor: 'start', dx: 8, dy: 0 },
  { id: 'visakhapatnam', name: 'Visakhapatnam', coast: 'East', x: 404, y: 142, primary: true, anchor: 'start', dx: 8, dy: 0 },
  { id: 'paradip', name: 'Paradip', coast: 'East', x: 477, y: 104, primary: false, anchor: 'start', dx: 8, dy: -4 },
  { id: 'kolkata', name: 'Kolkata / Haldia', coast: 'East', x: 507, y: 79, primary: true, anchor: 'start', dx: 8, dy: -4 },
];

const portOptions = [
  ...INDIAN_PORTS.map((p) => ({ value: p.name, label: p.name })),
  { value: 'Other Indian Port', label: 'Other Indian Port' },
];

const serviceOptions = [
  { value: 'Port Agency & Husbandry', label: 'Port Agency & Husbandry' },
  { value: 'Cargo Supervision & Tallying', label: 'Cargo Supervision & Tallying' },
  { value: 'Bunkering & Technical Supply', label: 'Bunkering & Technical Supply' },
  { value: 'Crew Support & Repatriation', label: 'Crew Support & Repatriation' },
  { value: 'PDA Coordination', label: 'PDA Coordination' },
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

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="fw-container footer__container">
        {/* Section 03 Eyebrow */}
        <div className="footer__eyebrow">
          <span className="eyebrow-line" />
          <span>03 / CONTACT</span>
        </div>

        <div className="footer__main-grid">
          {/* Left Column: Brand, 24/7 Dispatch Desk & Grouped Operations inside Frosted Glass Card */}
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
                  European standards in port agency, vessel husbandry, bunkering, and 24/7 PDA coordination across Indian &amp; global commercial ports.
                </p>
              </div>

              {/* Prominent 24/7 Dispatch Desk & WhatsApp Link */}
              <div className="footer__dispatch-block">
                <div className="footer__dispatch-header">
                  <div className="footer__dispatch-live-badge">
                    <span className="dispatch-live-pulse" />
                    <span>24/7 DISPATCH DESK</span>
                  </div>
                  <span className="footer__dispatch-tagline">Immediate Vessel &amp; Port Coordination</span>
                </div>

                <div className="footer__dispatch-actions">
                  <a href="tel:+919480512223" className="footer__dispatch-btn dispatch-call-btn">
                    <div className="dispatch-btn-icon">
                      <Phone size={17} />
                    </div>
                    <div className="dispatch-btn-info">
                      <span className="dispatch-btn-label">Call Operations 24/7</span>
                      <span className="dispatch-btn-value">+91 9480512223</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919480512223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__dispatch-btn dispatch-wa-btn"
                  >
                    <div className="dispatch-btn-icon wa-accent">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div className="dispatch-btn-info">
                      <span className="dispatch-btn-label">Instant Messaging</span>
                      <span className="dispatch-btn-value">Chat on WhatsApp</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Operations Port Network Grouped by Coast with Interactive Map Hover Sync */}
              <div className="footer__operations-group-block">
                <div className="operations-group-header">
                  <span className="operations-group-title">PORT NETWORK OPERATIONS</span>
                  <span className="operations-group-count">{INDIAN_PORTS.length} Ports Connected</span>
                </div>

                <div className="operations-coasts-grid">
                  {(['West', 'South', 'East'] as const).map((coast) => {
                    const coastPorts = INDIAN_PORTS.filter((p) => p.coast === coast);
                    return (
                      <div key={coast} className="operations-coast-row">
                        <span className="coast-badge">{coast} Coast</span>
                        <div className="coast-chips-wrap">
                          {coastPorts.map((port) => {
                            const isSelected = hoveredPort === port.name;
                            return (
                              <button
                                type="button"
                                key={port.id}
                                className={`port-chip ${isSelected ? 'port-chip--active' : ''} ${port.primary ? 'port-chip--primary' : ''}`}
                                onMouseEnter={() => setHoveredPort(port.name)}
                                onMouseLeave={() => setHoveredPort(null)}
                                onClick={() => {
                                  setHoveredPort(port.name);
                                  setFormState((prev) => ({ ...prev, port: port.name }));
                                }}
                              >
                                <span className="port-chip-dot" />
                                <span className="port-chip-name">{port.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Head Office Contacts with real tel: and mailto: links */}
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
            </div>
          </div>

          {/* Right Column: CTA Submission Form + Interactive Port Map */}
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
                        port: 'Mumbai / JNPT',
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
                <span className="footer__map-badge">{INDIAN_PORTS.length} Ports</span>
              </div>
              <div className="footer__map-svg-wrap">
                <svg
                  viewBox="0 0 600 320"
                  className="footer__map-svg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Water fill (Indian Ocean, Arabian Sea, Bay of Bengal) */}
                  <rect x="0" y="0" width="600" height="320" rx="12" fill="rgba(6, 20, 28, 0.75)" />

                  {/* Grid lines */}
                  {[100, 200, 300, 400, 500].map((x) => (
                    <line key={`vl-${x}`} x1={x} y1="0" x2={x} y2="320" stroke="rgba(103,171,175,0.08)" strokeWidth="0.5" />
                  ))}
                  {[64, 128, 192, 256].map((y) => (
                    <line key={`hl-${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(103,171,175,0.08)" strokeWidth="0.5" />
                  ))}

                  {/* Indian Subcontinent Landmass */}
                  <path
                    d={INDIA_LAND_PATH}
                    fill="rgba(103, 171, 175, 0.12)"
                    stroke="rgba(103, 171, 175, 0.22)"
                    strokeWidth="1"
                  />

                  {/* Indian Coastline Stroke */}
                  <path
                    d={INDIA_COAST_STROKE}
                    fill="none"
                    stroke="rgba(122, 211, 216, 0.65)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Sri Lanka */}
                  <path
                    d={SRI_LANKA_PATH}
                    fill="rgba(103, 171, 175, 0.14)"
                    stroke="rgba(122, 211, 216, 0.45)"
                    strokeWidth="1"
                  />

                  {/* Major Coastal Shipping Lane */}
                  <path
                    d={SHIPPING_LANE_PATH}
                    fill="none"
                    stroke="rgba(122, 211, 216, 0.35)"
                    strokeWidth="1.4"
                    strokeDasharray="5 3"
                  />

                  {/* Ocean / Sea Region Labels with Enhanced Contrast */}
                  <text
                    x="95" y="210"
                    textAnchor="middle"
                    fill="rgba(142, 218, 222, 0.65)"
                    fontSize="13"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    ARABIAN SEA
                  </text>

                  <text
                    x="475" y="210"
                    textAnchor="middle"
                    fill="rgba(142, 218, 222, 0.65)"
                    fontSize="13"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    BAY OF BENGAL
                  </text>

                  <text
                    x="290" y="312"
                    textAnchor="middle"
                    fill="rgba(142, 218, 222, 0.65)"
                    fontSize="12"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.22em"
                  >
                    INDIAN OCEAN
                  </text>

                  {/* All 14 Port pins and labels driven directly from INDIAN_PORTS */}
                  {INDIAN_PORTS.map((port) => {
                    const isHovered = hoveredPort === port.name;
                    const r = isHovered ? 6.5 : (port.primary ? 5.5 : 4);
                    return (
                      <g
                        key={port.id}
                        onMouseEnter={() => setHoveredPort(port.name)}
                        onMouseLeave={() => setHoveredPort(null)}
                        onClick={() => setFormState((prev) => ({ ...prev, port: port.name }))}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Pulse ring for hovered or primary ports */}
                        {(isHovered || port.primary) && (
                          <circle
                            cx={port.x} cy={port.y} r={r + (isHovered ? 7 : 4)}
                            fill="none"
                            stroke={isHovered ? '#7ad3d8' : 'rgba(122, 211, 216, 0.55)'}
                            strokeWidth={isHovered ? 1.5 : 1}
                            className="footer__map-pulse"
                          />
                        )}
                        {/* Glow */}
                        <circle
                          cx={port.x} cy={port.y}
                          r={isHovered ? r + 5 : r + 2}
                          fill={isHovered ? 'rgba(122, 211, 216, 0.45)' : (port.primary ? 'rgba(103, 171, 175, 0.3)' : 'rgba(103, 171, 175, 0.15)')}
                        />
                        {/* Dot */}
                        <circle
                          cx={port.x} cy={port.y}
                          r={r}
                          fill={isHovered ? '#ffffff' : (port.primary ? '#7ad3d8' : 'rgba(122, 211, 216, 0.85)')}
                          stroke={isHovered ? '#7ad3d8' : 'rgba(255,255,255,0.7)'}
                          strokeWidth={isHovered ? 2 : 0.8}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                        {/* Port Name Label: All 14 ports labeled clearly with high-contrast text */}
                        <text
                          x={port.x + (port.dx || 0)}
                          y={port.y + (port.dy || -8)}
                          textAnchor={port.anchor || 'middle'}
                          fill={isHovered ? '#ffffff' : (port.primary ? 'rgba(255, 255, 255, 0.98)' : 'rgba(235, 248, 250, 0.88)')}
                          fontSize={isHovered ? '12.5' : (port.primary ? '11' : '10')}
                          fontFamily="'Articulat CF', sans-serif"
                          fontWeight={isHovered || port.primary ? '700' : '600'}
                          style={{
                            transition: 'all 0.2s ease',
                            paintOrder: 'stroke fill',
                            stroke: isHovered ? 'rgba(2, 8, 12, 0.98)' : 'rgba(5, 14, 20, 0.92)',
                            strokeWidth: isHovered ? '3px' : '2.2px',
                            strokeLinejoin: 'round',
                          }}
                        >
                          {port.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slim Bottom Strip with Copyright, Legal Links & Back to Top */}
      <div className="footer__bottom-strip">
        <div className="fw-container footer__bottom-strip-inner">
          <div className="footer__copyright-text">
            &copy; {new Date().getFullYear()} Gorod International Agency Pvt Ltd. All rights reserved.
          </div>

          <div className="footer__bottom-nav">
            <a href="#privacy" className="footer__legal-link">Privacy Policy</a>
            <span className="footer__legal-sep" aria-hidden="true">&bull;</span>
            <a href="#terms" className="footer__legal-link">Terms of Service</a>
            <span className="footer__legal-sep" aria-hidden="true">&bull;</span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="footer__back-to-top-btn"
            >
              <span>Back to top</span>
              <span className="back-to-top-arrow" aria-hidden="true">&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
