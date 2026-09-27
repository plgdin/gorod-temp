import React, { useState } from 'react';
import {
  Anchor,
  Users,
  Package,
  Ship,
  FileText,
  Droplets,
  Wrench,
  Leaf,
  ChevronRight,
  ShieldCheck,
  Clock,
  Compass,
  FileCheck,
  HeartPulse,
  Building2,
  Radio,
  ShoppingBag,
  Trash2,
  FileSignature,
  Receipt,
  ShieldAlert,
  Gauge,
  Cpu,
  LifeBuoy,
  Zap,
  Waves,
} from 'lucide-react';

interface Capability {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  image: string;
  topPhraseLine1: string;
  topPhraseLine2: string;
  headline: string;
  description: string;
  capabilities: Capability[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'port-agency',
    number: '01',
    title: 'Port agency',
    category: 'PORT AGENCY',
    icon: Anchor,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'EFFICIENCY',
    topPhraseLine2: 'IN EVERY CALL.',
    headline: 'End-to-end support for smooth port calls.',
    description:
      'We act as your local representative, managing all port formalities, liaison with authorities and 24/7 on-ground support to ensure a hassle-free turnaround.',
    capabilities: [
      {
        title: 'Port clearance',
        desc: 'Efficient handling of all customs and immigration formalities.',
        icon: FileText,
      },
      {
        title: 'Authority liaison',
        desc: 'Strong relationships with local authorities for faster approvals.',
        icon: ShieldCheck,
      },
      {
        title: '24/7 on-ground support',
        desc: 'Our team is available round the clock during your port stay.',
        icon: Clock,
      },
      {
        title: 'Local expertise',
        desc: 'Deep knowledge of port procedures and requirements.',
        icon: Compass,
      },
    ],
  },
  {
    id: 'crew-welfare',
    number: '02',
    title: 'Crew & welfare',
    category: 'CREW & WELFARE',
    icon: Users,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'PEOPLE FIRST',
    topPhraseLine2: 'IN EVERY BERTH.',
    headline: 'Dedicated shore-side care for seafarers.',
    description:
      'From fast-tracked crew transfers and emergency medical assistance to visas and accommodations, we prioritize the safety, health, and morale of your personnel.',
    capabilities: [
      {
        title: 'Crew transfers',
        desc: 'Safe, reliable transit between vessels, terminals, and airports.',
        icon: Users,
      },
      {
        title: 'Visa & immigration',
        desc: 'Fast-track clearance with port immigration and border agencies.',
        icon: FileCheck,
      },
      {
        title: 'Medical assistance',
        desc: '24/7 emergency medical appointments, hospitalization, and care.',
        icon: HeartPulse,
      },
      {
        title: 'Hotel & lodging',
        desc: 'Comfortable accommodations and transit lounges for relief seafarers.',
        icon: Building2,
      },
    ],
  },
  {
    id: 'cargo-ops',
    number: '03',
    title: 'Cargo operations',
    category: 'CARGO OPERATIONS',
    icon: Package,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'PRECISION',
    topPhraseLine2: 'AT THE TERMINAL.',
    headline: 'Active coordination ship-to-shore.',
    description:
      'We streamline terminal liaisons, stevedoring scheduling, cargo survey monitoring, and documentation for prompt turnaround and minimal demurrage.',
    capabilities: [
      {
        title: 'Stevedoring liaison',
        desc: 'Continuous oversight of crane cycles and cargo loading plans.',
        icon: Package,
      },
      {
        title: 'Terminal dispatch',
        desc: 'Direct communication with port berths and harbor masters.',
        icon: Building2,
      },
      {
        title: 'Cargo manifests',
        desc: 'Accurate customs declarations and bill of lading releases.',
        icon: FileText,
      },
      {
        title: 'Shift reporting',
        desc: 'Hourly operations logs and turnaround efficiency tracking.',
        icon: Radio,
      },
    ],
  },
  {
    id: 'vessel-support',
    number: '04',
    title: 'Vessel support',
    category: 'VESSEL SUPPORT',
    icon: Ship,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'EVERY DETAIL',
    topPhraseLine2: 'COVERED 24/7.',
    headline: 'Husbandry and provisions on demand.',
    description:
      'From fresh provisions and potable water supplies to sludge disposal and spare parts in transit, our network delivers whatever your vessel requires.',
    capabilities: [
      {
        title: 'Ship provisions',
        desc: 'High-standard galley stores, fresh food, and potable water.',
        icon: ShoppingBag,
      },
      {
        title: 'MARPOL disposal',
        desc: 'Compliant garbage, slops, and engine room sludge offloading.',
        icon: Trash2,
      },
      {
        title: 'Spares logistics',
        desc: 'Launch delivery and customs clearance for marine parts.',
        icon: Package,
      },
      {
        title: 'Launch services',
        desc: 'Dependable offshore boat support for technicians and crew.',
        icon: Anchor,
      },
    ],
  },
  {
    id: 'documentation',
    number: '05',
    title: 'Documentation & liaison',
    category: 'DOCUMENTATION & LIAISON',
    icon: FileText,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'COMPLIANCE',
    topPhraseLine2: 'WITHOUT DELAY.',
    headline: 'Rigorous compliance across every jurisdiction.',
    description:
      'Navigating complex port bylaws, customs documentation, maritime health declarations, and environmental certifications without operational friction.',
    capabilities: [
      {
        title: 'Customs clearance',
        desc: 'Advance filing of manifests and inward / outward clearance.',
        icon: FileSignature,
      },
      {
        title: 'Harbor filings',
        desc: 'Pilotage bookings, tug reservations, and harbor paperwork.',
        icon: FileCheck,
      },
      {
        title: 'Disbursements',
        desc: 'Transparent proforma disbursement accounting with zero markup.',
        icon: Receipt,
      },
      {
        title: 'Regulatory advisory',
        desc: 'Real-time updates on regional maritime tariffs and shifting rules.',
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: 'bunkering',
    number: '06',
    title: 'Bunkering',
    category: 'BUNKERING & FUELS',
    icon: Droplets,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'FUELING',
    topPhraseLine2: 'GLOBAL VOYAGES.',
    headline: 'Audited marine refueling operations.',
    description:
      'Coordinating audited bunker barges, sampling verification, ISO 8217 quality checks, and minimal waiting times for offshore fuel deliveries.',
    capabilities: [
      {
        title: 'Quality testing',
        desc: 'Strict compliance with MARPOL Annex VI and sulfur limits.',
        icon: Droplets,
      },
      {
        title: 'Barge scheduling',
        desc: 'Alignment with local bunker suppliers to prevent delays.',
        icon: Ship,
      },
      {
        title: 'Safety attendance',
        desc: 'Agency attendance during bunker connection and sampling.',
        icon: ShieldAlert,
      },
      {
        title: 'Lube oil delivery',
        desc: 'Bulk and drummed marine lubricants from certified brands.',
        icon: Gauge,
      },
    ],
  },
  {
    id: 'technical-assistance',
    number: '07',
    title: 'Technical assistance',
    category: 'TECHNICAL ASSISTANCE',
    icon: Wrench,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'FAST REPAIR',
    topPhraseLine2: 'INTERVENTION.',
    headline: 'Class-certified technicians and divers.',
    description:
      'Connecting ship superintendents with dry docks, underwater hull cleaning, diving inspection, and specialized marine electrical engineers.',
    capabilities: [
      {
        title: 'Diving surveys',
        desc: 'UWILD, propeller polishing, and underwater hull assessments.',
        icon: Wrench,
      },
      {
        title: 'Workshop repairs',
        desc: 'Motor rewinding, pump refurbishment, and lathe fabrication.',
        icon: Cpu,
      },
      {
        title: 'Class surveyor liaison',
        desc: 'Arranging surveyor visits for Lloyd’s, DNV, ABS, and BV.',
        icon: ShieldCheck,
      },
      {
        title: 'Emergency salvage',
        desc: 'Immediate standby towing and technical advisory during casualties.',
        icon: LifeBuoy,
      },
    ],
  },
  {
    id: 'sustainability',
    number: '08',
    title: 'Sustainability support',
    category: 'SUSTAINABILITY SUPPORT',
    icon: Leaf,
    image: '/images/case-2.jpg',
    topPhraseLine1: 'TOWARDS',
    topPhraseLine2: 'DECARBONIZED SEAS.',
    headline: 'Eco-compliant operations and green berths.',
    description:
      'Facilitating cold ironing shore power, bio-fouling hull grooming with residue capture, ballast water compliance, and low-carbon operational advisories.',
    capabilities: [
      {
        title: 'Shore power (OPS)',
        desc: 'High-voltage cold ironing hookups for zero berth emissions.',
        icon: Zap,
      },
      {
        title: 'Ballast compliance',
        desc: 'BWM convention guidance, sampling, and treatment advisory.',
        icon: Waves,
      },
      {
        title: 'Clean hull capture',
        desc: 'Eco-friendly hull grooming with diverless residue collection.',
        icon: Leaf,
      },
      {
        title: 'Emissions tracking',
        desc: 'Scope 3 carbon metrics and voyage fuel efficiency reports.',
        icon: Gauge,
      },
    ],
  },
];

export const TrifoldBrochure: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const currentService = SERVICES[selectedIndex] || SERVICES[0];
  const CurrentIcon = currentService.icon;

  return (
    <div className="brochure-showcase-stage">
      <div className="tri-brochure">
        {/* =========================================================
            PANEL 1: BRAND / COVER (DARK TEAL WITH VESSEL BACKGROUND)
        ========================================================== */}
        <section className="tri-panel tri-panel--cover" aria-label="Gorod Marine Brand Panel">
          {/* Top Header Row */}
          <div className="panel-cover__header">
            <a href="/" className="panel-cover__logo-wrap" aria-label="Gorod Marine Home">
              <img
                src="/images/gorod-marine-white.png"
                alt="Gorod Marine"
                className="panel-cover__logo-img"
              />
            </a>

            <div className="panel-cover__tag">
              <span className="panel-cover__tag-text">VESSEL AGENCY</span>
              <span className="panel-cover__tag-text">WITH PURPOSE.</span>
              <span className="panel-cover__tag-line" />
            </div>
          </div>

          {/* Center Headline & Sub-Headline */}
          <div className="panel-cover__center">
            <h2 className="panel-cover__headline">
              Trusted<br />
              support<br />
              in every port.
            </h2>

            <div className="panel-cover__subline">
              <span>PEOPLE &nbsp;/&nbsp; EXPERTISE &nbsp;/&nbsp; SOLUTIONS</span>
              <span>FOR A SMOOTHER TOMORROW.</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            PANEL 2: SERVICE SELECTOR (OFF-WHITE)
        ========================================================== */}
        <section className="tri-panel tri-panel--selector" aria-label="Service Selector">
          {/* Header */}
          <div className="selector-header">
            <div className="selector-eyebrow">
              <span className="selector-eyebrow__text">OUR SERVICES</span>
              <span className="selector-eyebrow__line" />
            </div>

            <h3 className="selector-title">
              How can we<br />
              support your vessel?
            </h3>

            <p className="selector-subtitle">Select a service to explore details.</p>
          </div>

          {/* List of 8 Services */}
          <div className="selector-list" role="list">
            {SERVICES.map((item, idx) => {
              const isActive = selectedIndex === idx;
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  className={`selector-item ${isActive ? '--active' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                  aria-pressed={isActive}
                >
                  <div className="selector-item__left">
                    <ItemIcon
                      size={20}
                      strokeWidth={2}
                      className="selector-item__icon"
                    />
                    <span className="selector-item__title">{item.title}</span>
                  </div>

                  <div className="selector-item__right">
                    <span className="selector-item__index">{item.number}</span>
                    <ChevronRight
                      size={16}
                      strokeWidth={2.2}
                      className="selector-item__arrow"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Footer Note */}
          <div className="selector-footer">
            <span className="selector-footer__text">DEPENDABLE SHORE-SIDE ATTENDANCE 24/7.</span>
            <span className="selector-footer__line" />
          </div>
        </section>

        {/* =========================================================
            PANEL 3: DYNAMIC SERVICE DETAILS (OFF-WHITE / WHITE)
        ========================================================== */}
        <section className="tri-panel tri-panel--details" aria-label="Service Details Panel">
          {/* Top Hero Photo Section */}
          <div className="details-hero">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="details-hero__img"
            />
            <div className="details-hero__overlay" />

            <div className="details-hero__meta">
              <div className="details-hero__meta-left">
                <span className="details-hero__index">{currentService.number} / 08</span>
                <span className="details-hero__category">{currentService.category}</span>
              </div>

              <div className="details-hero__meta-right">
                <span>{currentService.topPhraseLine1}</span>
                <span>{currentService.topPhraseLine2}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="details-body">
            <div className="details-badge">
              <CurrentIcon size={18} strokeWidth={2} className="details-badge__icon" />
              <span className="details-badge__text">{currentService.category}</span>
            </div>

            <h3 className="details-headline">{currentService.headline}</h3>

            <p className="details-description">{currentService.description}</p>

            {/* 2x2 Capabilities Grid */}
            <div className="details-grid">
              {currentService.capabilities.map((cap, i) => {
                const CapIcon = cap.icon;
                return (
                  <div key={i} className="capability-card">
                    <div className="capability-card__header">
                      <CapIcon size={19} strokeWidth={2} className="capability-card__icon" />
                      <span className="capability-card__title">{cap.title}</span>
                    </div>
                    <p className="capability-card__desc">{cap.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <a href="#contact" className="details-cta-btn">
              <span>ENQUIRE NOW</span>
              <span className="details-cta-arrow">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrifoldBrochure;
