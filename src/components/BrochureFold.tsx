import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import './BrochureFold.css';

gsap.registerPlugin(ScrollTrigger);

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
    image: '/images/panel3-port-agency.jpg',
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
    image: '/images/case-6.jpg',
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
    image: '/images/case-1.jpg',
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
    image: '/images/case-4.jpg',
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
    image: '/images/case-3.jpg',
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
    image: '/images/case-5.jpg',
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
    image: '/images/case-7.jpg',
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
    image: '/images/case-8.jpg',
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

const prompts = [
  'Click to open the right fold',
  'Click to open the left fold',
  'Click to fold the brochure again',
];

export default function BrochureFold() {
  const [fold, setFold] = useState<0 | 1 | 2>(0);
  const [closing, setClosing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const unfoldTimerRef = useRef<number | null>(null);

  const currentService = SERVICES[selectedIndex] || SERVICES[0];
  const CurrentIcon = currentService.icon;

  // Handle closing transition timeout
  useEffect(() => {
    if (!closing) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timeout = window.setTimeout(
      () => setClosing(false),
      reducedMotion ? 0 : 2450
    );

    return () => window.clearTimeout(timeout);
  }, [closing]);

  // Automatic opening when scrolling down to the brochure, and closing when scrolling past
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 15%',
      onEnter: () => {
        // Scrolled down into brochure section -> automatically unfold
        setClosing(false);
        setFold(1);
        if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
        unfoldTimerRef.current = window.setTimeout(() => {
          setFold(2);
        }, reducedMotion ? 0 : 800);
      },
      onLeave: () => {
        // Scrolled down past the brochure section -> automatically close
        if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
        setClosing(true);
        setFold(0);
      },
      onEnterBack: () => {
        // Scrolled back up into brochure section -> automatically unfold
        setClosing(false);
        setFold(1);
        if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
        unfoldTimerRef.current = window.setTimeout(() => {
          setFold(2);
        }, reducedMotion ? 0 : 800);
      },
      onLeaveBack: () => {
        // Scrolled back up above the brochure section -> automatically close
        if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
        setClosing(true);
        setFold(0);
      },
    });

    return () => {
      if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
      trigger.kill();
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // If the click is on an interactive service category or action button, do not fold/unfold
    const target = e.target as HTMLElement;
    if (
      target.closest('.selector-item') ||
      target.closest('.details-cta-btn') ||
      target.closest('.panel-cover__logo-wrap') ||
      target.closest('a')
    ) {
      return;
    }

    if (fold === 2) {
      setClosing(true);
      setFold(0);
    } else {
      setFold((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }
  }, [fold]);

  const instruction = closing ? 'Folding the brochure' : prompts[fold];

  return (
    <section
      ref={sectionRef}
      className="fold-brochure-section"
      aria-label="Interactive three-fold brochure"
    >
      <div
        className={`fold-brochure fold-brochure--step-${fold}${
          closing ? ' fold-brochure--closing' : ''
        }`}
        onClick={handleClick}
        role="region"
        aria-label={instruction}
      >
        {/* =========================================================
            PANEL 1 (LEFT): BRAND & COVER PANEL
            - Hinge on right center
            - Closed: Folds inward over middle panel
            - Open: Swings out to the left
        ========================================================== */}
        <div
          className="fold-brochure__panel fold-brochure__panel--left"
          aria-hidden={fold < 2}
        >
          {/* Front Face: Brand Cover */}
          <div className="fold-brochure__face fold-brochure__face--left panel-content-cover">
            <div className="panel-cover__header">
              <a href="/" className="panel-cover__logo-wrap" aria-label="Gorod Marine Home">
                <img
                  src="/images/gorod-marine-teal.png"
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

            <div className="panel-cover__bottom-tag">
              <span>GOROD MARINE SERVICES REGISTER</span>
              <span>24/7 PORT SHORE-SIDE ATTENDANCE</span>
            </div>
          </div>

          {/* Reverse Face: Back of left fold */}
          <div className="fold-brochure__face fold-brochure__face--back" />
        </div>

        {/* =========================================================
            PANEL 2 (MIDDLE): INTERACTIVE SERVICES SELECTOR
            - All 8 categories are fully functional interactive buttons!
        ========================================================== */}
        <div
          className="fold-brochure__panel fold-brochure__panel--middle"
          aria-hidden="false"
        >
          <div className="panel-content-selector">
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

            {/* 8 INTERACTIVE SERVICE BUTTONS */}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    aria-pressed={isActive}
                  >
                    <div className="selector-item__left">
                      <ItemIcon
                        size={18}
                        strokeWidth={2}
                        className="selector-item__icon"
                      />
                      <span className="selector-item__title">{item.title}</span>
                    </div>
                    <div className="selector-item__right">
                      <span className="selector-item__index">{item.number}</span>
                      <ChevronRight
                        size={15}
                        strokeWidth={2.2}
                        className="selector-item__arrow"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="selector-footer">
              <span className="selector-footer__text">DEPENDABLE SHORE-SIDE ATTENDANCE 24/7.</span>
              <span className="selector-footer__line" />
            </div>
          </div>
        </div>

        {/* =========================================================
            PANEL 3 (RIGHT): DYNAMIC SERVICE DETAILS
            - Hinge on left center
            - Closed: Folds backward away from viewer
            - Open: Unfolds to the right showing selected service details!
        ========================================================== */}
        <div
          className="fold-brochure__panel fold-brochure__panel--right"
          aria-hidden={fold === 0}
        >
          {/* Front Face: Dynamic Service Details */}
          <div className="fold-brochure__face fold-brochure__face--right panel-content-details">
            {/* Hero image with meta */}
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

            {/* Details Body */}
            <div className="details-body">
              <div className="details-badge">
                <CurrentIcon size={17} strokeWidth={2} className="details-badge__icon" />
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
                        <CapIcon size={16} strokeWidth={2} className="capability-card__icon" />
                        <span className="capability-card__title">{cap.title}</span>
                      </div>
                      <p className="capability-card__desc">{cap.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Enquire CTA */}
              <a href="#contact" className="details-cta-btn">
                <span>ENQUIRE NOW</span>
                <span className="details-cta-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Reverse Face: Back of right fold */}
          <div className="fold-brochure__face fold-brochure__face--reverse" />
        </div>
      </div>

      {/* Interactive prompt below the brochure */}
      <button
        type="button"
        className="fold-brochure__hint"
        onClick={handleClick}
        aria-live="polite"
      >
        {instruction}
      </button>
    </section>
  );
}
