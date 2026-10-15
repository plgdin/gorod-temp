import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, ArrowRight, Anchor } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

/* Port locations for the map (lat/lng on Black Sea & Danube) */
const PORT_LOCATIONS = [
  { name: 'Odesa', lat: 46.4825, lng: 30.7233, primary: true },
  { name: 'Chornomorsk', lat: 46.3003, lng: 30.6575, primary: true },
  { name: 'Pivdennyi', lat: 46.6167, lng: 31.0167, primary: true },
  { name: 'Izmail', lat: 45.3500, lng: 28.8333, primary: false },
  { name: 'Reni', lat: 45.4500, lng: 28.2667, primary: false },
  { name: 'Mykolaiv', lat: 46.9659, lng: 31.9974, primary: false },
  { name: 'Kherson', lat: 46.6354, lng: 32.6169, primary: false },
  { name: 'Constanța', lat: 44.1598, lng: 28.6348, primary: false },
  { name: 'Varna', lat: 43.2141, lng: 27.9147, primary: false },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784, primary: false },
  { name: 'Batumi', lat: 41.6168, lng: 41.6367, primary: false },
  { name: 'Novorossiysk', lat: 44.7234, lng: 37.7687, primary: false },
  { name: 'Mariupol', lat: 47.0956, lng: 37.5500, primary: false },
  { name: 'Burgas', lat: 42.5048, lng: 27.4626, primary: false },
];

/* Convert lat/lng to SVG viewBox position (simple Mercator-like projection) */
function toSVG(lat: number, lng: number) {
  const minLng = 25;
  const maxLng = 43;
  const minLat = 40;
  const maxLat = 48;
  const x = ((lng - minLng) / (maxLng - minLng)) * 560 + 20;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 280 + 20;
  return { x, y };
}

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const shipWrapRef = useRef<HTMLDivElement>(null);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    vessel: '',
    port: 'Odesa',
    service: '',
    eta: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!footerRef.current || !shipWrapRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // As we scroll towards and reach the footer, ship shrinks down into trailing water
      gsap.fromTo(
        shipWrapRef.current,
        {
          scale: 2.2,
          y: -100,
          opacity: 0.8,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom 95%',
            scrub: 1.2,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="footer" ref={footerRef}>
      {/* Docked Vessel in Trailing Water */}
      <div className="footer__docked-ship-layer" aria-hidden="true">
        <div className="footer__docked-ship-wrap" ref={shipWrapRef}>
          <img
            src="/images/Gorod_bulker.png"
            alt="Gorod Bulker Docked"
            className="footer__docked-ship-img"
          />
        </div>
      </div>

      <div className="fw-container footer__container">
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
                    <li><span>Odesa &bull; Chornomorsk</span></li>
                    <li><span>Pivdennyi &bull; Danube Ports</span></li>
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
                  {/* Water fill */}
                  <rect x="0" y="0" width="600" height="320" rx="12" fill="rgba(7, 24, 32, 0.6)" />
                  
                  {/* Stylized Black Sea coastline */}
                  <path
                    d="M 0,100 C 40,95 80,85 120,90 C 160,95 180,75 220,70 C 260,65 280,80 310,60 C 340,40 370,35 400,50 C 430,65 450,50 480,55 C 510,60 540,45 570,50 C 590,53 600,55 600,55 L 600,0 L 0,0 Z"
                    fill="rgba(103, 171, 175, 0.08)"
                    stroke="rgba(103, 171, 175, 0.2)"
                    strokeWidth="1"
                  />
                  {/* Northern coastline (Ukraine) */}
                  <path
                    d="M 0,110 C 50,105 100,98 160,100 C 200,102 230,88 280,85 C 320,82 350,75 390,90 C 430,105 460,95 500,100 L 500,98 C 460,93 430,103 390,88 C 350,73 320,80 280,83 C 230,86 200,100 160,98 C 100,96 50,103 0,108 Z"
                    fill="rgba(103, 171, 175, 0.12)"
                    stroke="rgba(103, 171, 175, 0.25)"
                    strokeWidth="0.5"
                  />
                  {/* Turkey/Southern coastline */}
                  <path
                    d="M 0,220 C 60,225 120,240 180,235 C 240,230 280,245 340,250 C 400,255 440,240 500,245 C 540,248 570,255 600,260 L 600,320 L 0,320 Z"
                    fill="rgba(103, 171, 175, 0.08)"
                    stroke="rgba(103, 171, 175, 0.2)"
                    strokeWidth="1"
                  />

                  {/* Grid lines */}
                  {[80, 160, 240, 320, 400, 480].map((x) => (
                    <line key={`vl-${x}`} x1={x} y1="0" x2={x} y2="320" stroke="rgba(103,171,175,0.06)" strokeWidth="0.5" />
                  ))}
                  {[64, 128, 192, 256].map((y) => (
                    <line key={`hl-${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(103,171,175,0.06)" strokeWidth="0.5" />
                  ))}

                  {/* Shipping lanes (dotted lines connecting primary ports) */}
                  {(() => {
                    const primaries = PORT_LOCATIONS.filter(p => p.primary);
                    const lines = [];
                    for (let i = 0; i < primaries.length; i++) {
                      for (let j = i + 1; j < primaries.length; j++) {
                        const a = toSVG(primaries[i].lat, primaries[i].lng);
                        const b = toSVG(primaries[j].lat, primaries[j].lng);
                        lines.push(
                          <line
                            key={`lane-${i}-${j}`}
                            x1={a.x} y1={a.y}
                            x2={b.x} y2={b.y}
                            stroke="rgba(103, 171, 175, 0.15)"
                            strokeWidth="1"
                            strokeDasharray="4 3"
                          />
                        );
                      }
                    }
                    return lines;
                  })()}

                  {/* Port pins */}
                  {PORT_LOCATIONS.map((port) => {
                    const { x, y } = toSVG(port.lat, port.lng);
                    const isHovered = hoveredPort === port.name;
                    const r = port.primary ? 6 : 4;
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
                            cx={x} cy={y} r={r + 6}
                            fill="none"
                            stroke="rgba(103, 171, 175, 0.4)"
                            strokeWidth="1"
                            className="footer__map-pulse"
                          />
                        )}
                        {/* Glow */}
                        <circle
                          cx={x} cy={y}
                          r={isHovered ? r + 4 : r + 2}
                          fill={port.primary ? 'rgba(103, 171, 175, 0.2)' : 'rgba(103, 171, 175, 0.1)'}
                        />
                        {/* Dot */}
                        <circle
                          cx={x} cy={y}
                          r={isHovered ? r + 1 : r}
                          fill={port.primary ? '#67abaf' : 'rgba(103, 171, 175, 0.6)'}
                          stroke={isHovered ? '#ffffff' : 'rgba(255,255,255,0.3)'}
                          strokeWidth={isHovered ? 1.5 : 0.5}
                          style={{ transition: 'all 0.25s ease' }}
                        />
                        {/* Label */}
                        {(isHovered || port.primary) && (
                          <text
                            x={x}
                            y={y - (port.primary ? 14 : 10)}
                            textAnchor="middle"
                            fill={isHovered ? '#ffffff' : 'rgba(255,255,255,0.8)'}
                            fontSize={isHovered ? '11' : '9'}
                            fontFamily="'Articulat CF', sans-serif"
                            fontWeight={port.primary ? '700' : '500'}
                            style={{ transition: 'all 0.25s ease', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
                          >
                            {port.name}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* "BLACK SEA" label */}
                  <text
                    x="300" y="175"
                    textAnchor="middle"
                    fill="rgba(103, 171, 175, 0.18)"
                    fontSize="22"
                    fontFamily="'Articulat CF', sans-serif"
                    fontWeight="800"
                    letterSpacing="0.25em"
                  >
                    BLACK SEA
                  </text>
                </svg>
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
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="footer__bottom-bar">
          <span className="footer__copyright">
            &copy; {new Date().getFullYear()} Gorod International Agency Pvt Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
