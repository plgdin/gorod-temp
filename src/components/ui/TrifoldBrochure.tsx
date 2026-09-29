import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
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
  FolderClosed,
  BookOpen,
  ArrowRight,
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
    image: '/images/case-1.jpg',
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
    image: '/images/case-3.jpg',
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
    image: '/images/case-5.jpg',
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
    image: '/images/case-6.jpg',
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

type MobileTab = 'cover' | 'selector' | 'details';

export const TrifoldBrochure: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // Default is CLOSED so when scrolling down to Services, the brochure starts closed
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('selector');
  const [flipState, setFlipState] = useState<'idle' | 'folding-in' | 'folding-out'>('idle');

  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const hasAutoFoldedRef = useRef<boolean>(false);
  const flipTimeout1Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flipTimeout2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto fold-out when user enters the Services section
  useEffect(() => {
    const el = stageWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAutoFoldedRef.current) {
          hasAutoFoldedRef.current = true;
          // Natural 350ms delay so user catches the fold-out action as they arrive
          setTimeout(() => {
            setIsOpen(true);
            setHasInteracted(true);
          }, 350);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (flipTimeout1Ref.current) clearTimeout(flipTimeout1Ref.current);
      if (flipTimeout2Ref.current) clearTimeout(flipTimeout2Ref.current);
    };
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    setIsOpen((prev) => !prev);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setHasInteracted(true);
      setIsOpen(true);
    }
  };

  // Interactive fold-in / fold-out when selecting a service in Panel 2
  const handleServiceSelect = (idx: number) => {
    if (idx === selectedIndex) return;

    if (flipTimeout1Ref.current) clearTimeout(flipTimeout1Ref.current);
    if (flipTimeout2Ref.current) clearTimeout(flipTimeout2Ref.current);

    // 1. Fold the 3rd page in onto the 2nd layer
    setFlipState('folding-in');

    // 2. When folded over the 2nd layer (260ms), swap data and unfold out from the 2nd layer
    flipTimeout1Ref.current = setTimeout(() => {
      setSelectedIndex(idx);
      setFlipState('folding-out');

      // 3. Return to resting flat state with zero pop
      flipTimeout2Ref.current = setTimeout(() => {
        setFlipState('idle');
      }, 380);
    }, 260);
  };

  const currentService = SERVICES[selectedIndex] || SERVICES[0];
  const CurrentIcon = currentService.icon;

  return (
    <div className={`brochure-showcase-stage ${isOpen ? 'is-brochure-open' : 'is-brochure-closed'}`}>
      {/* =========================================================
          HIGH-END MARITIME TOOLBAR
      ========================================================== */}
      <div className="brochure-toolbar">
        <div className="brochure-toolbar__brand">
          <div className="brochure-toolbar__compass-box">
            <Compass size={14} className="brochure-toolbar__compass" />
          </div>
          <div className="brochure-toolbar__meta">
            <span className="brochure-toolbar__title">TRIFOLD BROCHURE</span>
            <span className="brochure-toolbar__sub">
              {isOpen ? '8 CORE VESSEL SERVICES • FULL SPREAD' : 'VESSEL AGENCY SPECIFICATION • FOLDED'}
            </span>
          </div>
        </div>

        {/* Primary Toggle Action: Unfold Flat / Fold Closed */}
        <div className="brochure-toolbar__actions">
          <button
            type="button"
            className={`brochure-toolbar__toggle-btn ${isOpen ? '--is-open' : '--is-closed'}`}
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fold brochure closed' : 'Unfold brochure flat'}
          >
            {isOpen ? (
              <>
                <FolderClosed size={14} className="btn-icon" />
                <span>Fold Closed</span>
              </>
            ) : (
              <>
                <BookOpen size={14} className="btn-icon" />
                <span>Open Brochure</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE TAB BAR (< 1024px)
      ========================================================== */}
      <div className="brochure-mobile-tabs" role="tablist" aria-label="Mobile Brochure Sections">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'cover'}
          className={`mobile-tab-btn ${mobileTab === 'cover' ? '--active' : ''}`}
          onClick={() => setMobileTab('cover')}
        >
          01 Cover
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'selector'}
          className={`mobile-tab-btn ${mobileTab === 'selector' ? '--active' : ''}`}
          onClick={() => {
            handleOpen();
            setMobileTab('selector');
          }}
        >
          02 Services (08)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'details'}
          className={`mobile-tab-btn ${mobileTab === 'details' ? '--active' : ''}`}
          onClick={() => {
            handleOpen();
            setMobileTab('details');
          }}
        >
          03 Details
        </button>
      </div>

      {/* =========================================================
          THE BROCHURE WRAPPER & FOLD STAGE
      ========================================================== */}
      <div className="brochure-stage-wrapper" ref={stageWrapperRef}>
        {/* Soft diffused ground shadow */}
        <div className={`brochure-ground-shadow ${isOpen ? '--open' : '--closed'}`} aria-hidden="true" />

        {/* The Foldable Brochure Spread */}
        <div
          className={`tri-brochure ${
            isOpen
              ? 'tri-brochure--open'
              : hasInteracted
                ? 'tri-brochure--closed tri-brochure--has-closed'
                : 'tri-brochure--closed'
          }`}
          onClick={handleOpen}
        >
          {/* =========================================================
              PANEL 1: BRAND / COVER (LEFT)
          ========================================================== */}
          <div
            className={`brochure-panel-wrap brochure-panel-wrap--left ${
              mobileTab === 'cover' ? '--mobile-active' : ''
            }`}
          >
            {/* Physical Folded Brochure Underlay (folded inner flap edge visible when closed) */}
            <div className="brochure-flap-underlay" aria-hidden="true" />

            <section className="tri-panel tri-panel--cover" aria-label="Gorod Marine Brand Cover">
              {/* Paper Score Fold on Left Edge */}
              <div className="brochure-left-fold-line" aria-hidden="true" />

              {/* Paper Sheen & Ambient Crease Overlays */}
              <div className="panel-paper-sheen" aria-hidden="true" />
              <div className="crease-occlusion crease-occlusion--right" aria-hidden="true" />

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

              {/* Bottom Tagline / Spec */}
              <div className="panel-cover__bottom-tag">
                <span>PORT AGENCY &bull; VESSEL SUPPORT &bull; BRED ON INTEGRITY</span>
              </div>

              {/* When closed: Interactive Callout Button to open like a book */}
              {!isOpen && (
                <div className="cover-unfold-callout">
                  <BookOpen size={15} className="callout-sparkle" />
                  <span className="callout-text">CLICK TO OPEN BROCHURE</span>
                  <ArrowRight size={15} className="callout-arrow" />
                </div>
              )}
            </section>

            {/* Fold Crease Score Line 1 */}
            <div className="brochure-crease brochure-crease--left" aria-hidden="true" />
          </div>

          {/* =========================================================
              PANEL 2: SERVICE SELECTOR (CENTER)
          ========================================================== */}
          <div
            className={`brochure-panel-wrap brochure-panel-wrap--center ${
              mobileTab === 'selector' ? '--mobile-active' : ''
            }`}
          >
            <section className="tri-panel tri-panel--selector" aria-label="Service Selector">
              <div className="panel-paper-sheen" aria-hidden="true" />
              <div className="crease-occlusion crease-occlusion--left" aria-hidden="true" />
              <div className="crease-occlusion crease-occlusion--right" aria-hidden="true" />

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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceSelect(idx);
                        setMobileTab('details');
                      }}
                      aria-pressed={isActive}
                    >
                      <div className="selector-item__left">
                        <ItemIcon
                          size={19}
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

            {/* Fold Crease Score Line 2 */}
            <div className="brochure-crease brochure-crease--right" aria-hidden="true" />
          </div>

          {/* =========================================================
              PANEL 3: DYNAMIC SERVICE DETAILS (RIGHT)
          ========================================================== */}
          <div
            className={`brochure-panel-wrap brochure-panel-wrap--right ${
              mobileTab === 'details' ? '--mobile-active' : ''
            } ${flipState !== 'idle' ? `is-${flipState}` : ''}`}
          >
            <section className="tri-panel tri-panel--details" aria-label="Service Details Panel">
              <div className="panel-paper-sheen" aria-hidden="true" />
              <div className="crease-occlusion crease-occlusion--left" aria-hidden="true" />

              {/* Mobile Back Button (< 1024px) */}
              <div className="details-mobile-back-bar">
                <button
                  type="button"
                  className="details-mobile-back-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileTab('selector');
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Back to all services</span>
                </button>
              </div>

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
                          <CapIcon size={18} strokeWidth={2} className="capability-card__icon" />
                          <span className="capability-card__title">{cap.title}</span>
                        </div>
                        <p className="capability-card__desc">{cap.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA Button */}
                <a
                  href="#contact"
                  className="details-cta-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>ENQUIRE NOW</span>
                  <span className="details-cta-arrow">→</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM HELPER HINT
      ========================================================== */}
      <div className="brochure-hint-row">
        <span className="brochure-hint-pill">
          {isOpen
            ? '✦ Open Flat Spread: Click services in the center panel to explore details'
            : '✦ Click the brochure cover to unfold it flat'}
        </span>
      </div>
    </div>
  );
};

export default TrifoldBrochure;
