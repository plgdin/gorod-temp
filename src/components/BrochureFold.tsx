import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
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
  Globe,
  MapPin,
  Award,
  Star,
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



export default function BrochureFold() {
  const [fold, setFold] = useState<0 | 1 | 2>(0);
  const [closing, setClosing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<'about' | 'services' | 'details'>('services');
  const [foldState, setFoldState] = useState<'idle' | 'folding-in' | 'folding-out'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const foldTimer1Ref = useRef<number | null>(null);
  const foldTimer2Ref = useRef<number | null>(null);

  const currentService = SERVICES[selectedIndex] || SERVICES[0];
  const CurrentIcon = currentService.icon;

  // Preload service images into browser cache so reveals and flips never drop frames decoding
  useEffect(() => {
    SERVICES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Handle closing transition timeout for fallback
  useEffect(() => {
    if (!closing) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeout = window.setTimeout(
      () => setClosing(false),
      reducedMotion ? 0 : 2800
    );
    return () => window.clearTimeout(timeout);
  }, [closing]);

  // SCROLL-DRIVEN SCRUBBED UNFOLD (Desktop >= 1024px) & CLEAN RESPONSIVE FALLBACK
  useIsomorphicLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const stage = root.querySelector<HTMLElement>('.fold-brochure');
    const left = root.querySelector<HTMLElement>('.fold-brochure__panel--left');
    const right = root.querySelector<HTMLElement>('.fold-brochure__panel--right');
    const shadow = root.querySelector<HTMLElement>('.fold-brochure__shadow');
    const sheenLeft = root.querySelector<HTMLElement>('.fold-brochure__sheen--left');
    const sheenRight = root.querySelector<HTMLElement>('.fold-brochure__sheen--right');
    const hint = root.querySelector<HTMLElement>('.fold-brochure__hint');

    if (!stage || !left || !right) return;

    const mm = gsap.matchMedia();

    // DESKTOP: Scrubbed Unfold Driven by Scroll with Pinning
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      stage.classList.add('is-scroll-scrubbed');

      // Clear transition during scrub to prevent CSS lag/fighting
      left.style.transition = 'none';
      right.style.transition = 'none';

      // Layout constants: keep the brochure clear of the fixed nav while pinned
      const STAGE_H = 772;
      const NAV_GAP = 28; // breathing room between nav bottom and brochure top
      const HINT_SPACE = 64; // hint pill + bottom margin
      const navH = () =>
        document.querySelector<HTMLElement>('.header__top')?.offsetHeight ?? 90;

      // Fit the stage into the space BELOW the nav and ABOVE the hint pill
      const fit = () =>
        Math.min(1, (window.innerHeight - navH() - NAV_GAP - HINT_SPACE) / STAGE_H);

      // Pin so the scaled stage's top edge sits exactly NAV_GAP below the nav
      const pinStart = () => {
        const padTop = parseFloat(getComputedStyle(root).paddingTop) || 0;
        const off = navH() + NAV_GAP + (STAGE_H / 2) * fit() - padTop - STAGE_H / 2;
        return off >= 0 ? `top top+=${off}` : `top top-=${-off}`;
      };

      // Set initial 3D folded brochure state (scale handled by timeline fromTo with fit()).
      // No transformPerspective here: .fold-brochure already has CSS perspective,
      // and stacking both exaggerates the swing of the panels.
      gsap.set(left, { rotateY: 180, transformOrigin: 'right center' });
      gsap.set(right, { rotateY: -180, transformOrigin: 'left center' });
      if (shadow) gsap.set(shadow, { scaleX: 0.35, opacity: 0.45 });
      if (sheenLeft) gsap.set(sheenLeft, { opacity: 0, xPercent: -100 });
      if (sheenRight) gsap.set(sheenRight, { opacity: 0, xPercent: -100 });

      let currentHintText = '';

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: pinStart,
          end: '+=2100',
          pin: true,
          scrub: 0.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // The stage shrinks visually but keeps its layout box, so lift the hint
          // up to sit right under the visible brochure instead of off-screen.
          onRefresh: () => {
            if (hint) gsap.set(hint, { y: -(STAGE_H / 2) * (1 - fit()) });
          },
          onUpdate: (self) => {
            if (hint) {
              const nextText =
                self.progress > 0.62
                  ? 'Select a service in the middle panel to explore'
                  : self.progress > 0.08
                  ? 'Scroll to physically unfold the brochure'
                  : 'Scroll down to open brochure ↓';
              if (nextText !== currentHintText) {
                hint.textContent = nextText;
                currentHintText = nextText;
              }
            }
          },
        },
      });

      // 1. Stage scale up with dynamic viewport fit + contact shadow expansion
      tl.fromTo(
        stage,
        { scale: () => fit() * 0.88 },
        { scale: () => fit(), ease: 'none', duration: 1 },
        0
      );
      if (shadow) {
        tl.to(shadow, { scaleX: 1, opacity: 0.82, ease: 'none', duration: 1 }, 0);
      }

      // 2. Left panel (cover) unfolds to the left: 180deg -> 0deg
      tl.to(
        left,
        {
          rotateY: 0,
          ease: 'power2.inOut',
          duration: 0.44,
        },
        0.08
      );

      // Light sheen sweep across left panel face
      if (sheenLeft) {
        tl.fromTo(
          sheenLeft,
          { opacity: 0, xPercent: -100 },
          { opacity: 0.45, xPercent: 40, ease: 'power1.in', duration: 0.22 },
          0.08
        ).to(
          sheenLeft,
          { opacity: 0, xPercent: 120, ease: 'power1.out', duration: 0.22 },
          0.30
        );
      }

      // 3. Right panel (details) unfolds to the right: -180deg -> 0deg
      tl.to(
        right,
        {
          rotateY: 0,
          ease: 'power2.inOut',
          duration: 0.44,
        },
        0.50
      );

      // Light sheen sweep across right panel face
      if (sheenRight) {
        tl.fromTo(
          sheenRight,
          { opacity: 0, xPercent: -100 },
          { opacity: 0.45, xPercent: 40, ease: 'power1.in', duration: 0.22 },
          0.50
        ).to(
          sheenRight,
          { opacity: 0, xPercent: 120, ease: 'power1.out', duration: 0.22 },
          0.72
        );
      }

      // 4. Extended open hold: stays open while user reads and clicks services
      tl.to({}, { duration: 0.5 });
    });

    // MOBILE / REDUCED MOTION: Clean fallback without pinning
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      stage.classList.remove('is-scroll-scrubbed');
      left.style.transition = '';
      right.style.transition = '';
      gsap.set([stage, left, right], { clearProps: 'all' });
      if (hint) gsap.set(hint, { clearProps: 'transform' });
      if (shadow) gsap.set(shadow, { clearProps: 'all' });
      if (sheenLeft) gsap.set(sheenLeft, { clearProps: 'all' });
      if (sheenRight) gsap.set(sheenRight, { clearProps: 'all' });
    });

    return () => {
      if (foldTimer1Ref.current) clearTimeout(foldTimer1Ref.current);
      if (foldTimer2Ref.current) clearTimeout(foldTimer2Ref.current);
      mm.revert();
    };
  }, []);

  // Fold panel 3 closed onto panel 2, swap service data, then unfold back open
  const handleServiceSelect = (idx: number) => {
    // If mobile: switch tab directly to details
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSelectedIndex(idx);
      setMobileTab('details');
      return;
    }

    if (idx === selectedIndex || foldState !== 'idle') return;

    if (foldTimer1Ref.current) clearTimeout(foldTimer1Ref.current);
    if (foldTimer2Ref.current) clearTimeout(foldTimer2Ref.current);

    // 1. Fold panel 3 closed onto panel 2 (0deg → -180deg, hinged on left edge)
    setFoldState('folding-in');

    // 2. When fully folded (800ms), swap data and unfold back
    foldTimer1Ref.current = window.setTimeout(() => {
      setSelectedIndex(idx);
      setFoldState('folding-out');

      // 3. Return to flat resting state after fold-out completes
      foldTimer2Ref.current = window.setTimeout(() => {
        setFoldState('idle');
      }, 980);
    }, 820);
  };

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.selector-item') ||
      target.closest('.details-cta-btn') ||
      target.closest('.panel-cover__logo-wrap') ||
      target.closest('.mobile-tab-btn') ||
      target.closest('a')
    ) {
      return;
    }

    // Only active if fallback manual step mode is engaged
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return;
    }

    if (fold === 2) {
      setClosing(true);
      setFold(0);
    } else {
      setFold((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }
  }, [fold]);

  return (
    <section
      ref={sectionRef}
      className="fold-brochure-section"
      aria-label="Interactive three-fold brochure"
    >
      {/* Mobile Tab Selector (< 1024px) */}
      <div className="fold-brochure__mobile-tabs" role="tablist" aria-label="Brochure sections">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'about'}
          className={`mobile-tab-btn ${mobileTab === 'about' ? '--active' : ''}`}
          onClick={() => setMobileTab('about')}
        >
          01. About Us
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'services'}
          className={`mobile-tab-btn ${mobileTab === 'services' ? '--active' : ''}`}
          onClick={() => setMobileTab('services')}
        >
          02. Services
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'details'}
          className={`mobile-tab-btn ${mobileTab === 'details' ? '--active' : ''}`}
          onClick={() => setMobileTab('details')}
        >
          03. Details
        </button>
      </div>

      <div
        className={`fold-brochure fold-brochure--step-${fold}${
          closing ? ' fold-brochure--closing' : ''
        }`}
        onClick={handleClick}
        role="region"
        aria-label="Interactive brochure"
      >
        {/* Dynamic ground contact shadow */}
        <div className="fold-brochure__shadow" aria-hidden="true" />
        {/* =========================================================
            PANEL 1 (LEFT): BRAND & COVER PANEL
            - Hinge on right center
            - Closed: Folds inward over middle panel
            - Open: Swings out to the left
        ========================================================== */}
        <div
          className={`fold-brochure__panel fold-brochure__panel--left ${
            mobileTab === 'about' ? 'fold-brochure__panel--active-mobile' : ''
          }`}
          aria-hidden={false}
        >
          {/* Inside Face (when unfolded to the left): Our Company Content */}
          <div className="fold-brochure__face fold-brochure__face--left panel-content-inside">
            <div className="fold-brochure__sheen fold-brochure__sheen--left" aria-hidden="true" />
            <div className="inside-cover__header">
              <div className="inside-cover__eyebrow">
                <span className="inside-cover__eyebrow-text">ABOUT US</span>
                <span className="inside-cover__eyebrow-line" />
              </div>
              <img
                src="/images/gorod-marine-teal.png"
                alt="Gorod Marine"
                className="inside-cover__logo"
              />
            </div>

            <div className="inside-cover__mission">
              <h3 className="inside-cover__headline">
                Your vessel's<br />
                trusted partner<br />
                on shore.
              </h3>
              <p className="inside-cover__desc">
                Gorod Marine delivers comprehensive port agency and vessel 
                husbandry services across major ports, ensuring every call 
                is safe, compliant, and efficient.
              </p>
            </div>

            <div className="inside-cover__stats">
              <div className="inside-stat">
                <Globe size={16} strokeWidth={2} className="inside-stat__icon" />
                <span className="inside-stat__value">15+</span>
                <span className="inside-stat__label">Ports Covered</span>
              </div>
              <div className="inside-stat">
                <Ship size={16} strokeWidth={2} className="inside-stat__icon" />
                <span className="inside-stat__value">500+</span>
                <span className="inside-stat__label">Vessel Calls / Year</span>
              </div>
              <div className="inside-stat">
                <Clock size={16} strokeWidth={2} className="inside-stat__icon" />
                <span className="inside-stat__value">24/7</span>
                <span className="inside-stat__label">Shore Attendance</span>
              </div>
              <div className="inside-stat">
                <Award size={16} strokeWidth={2} className="inside-stat__icon" />
                <span className="inside-stat__value">ISO</span>
                <span className="inside-stat__label">Certified Operations</span>
              </div>
            </div>

            <div className="inside-cover__trust">
              <div className="trust-badge">
                <Star size={11} strokeWidth={2.5} className="trust-badge__star" />
                <span>FONASBA Certified</span>
              </div>
              <div className="trust-badge">
                <ShieldCheck size={11} strokeWidth={2.5} className="trust-badge__star" />
                <span>ISPS Compliant</span>
              </div>
              <div className="trust-badge">
                <MapPin size={11} strokeWidth={2.5} className="trust-badge__star" />
                <span>Indian Ports Specialist</span>
              </div>
            </div>

            <div className="inside-cover__footer">
              <span>SELECT A SERVICE IN THE NEXT PANEL →</span>
            </div>
          </div>

          {/* Cover Face: Brand Cover (Image 1) — Visible when folded closed! */}
          <div className="fold-brochure__face fold-brochure__face--back panel-content-cover">
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
        </div>

        {/* =========================================================
            PANEL 2 (MIDDLE): INTERACTIVE SERVICES SELECTOR
            - All 8 categories are fully functional interactive buttons!
        ========================================================== */}
        <div
          className={`fold-brochure__panel fold-brochure__panel--middle ${
            mobileTab === 'services' ? 'fold-brochure__panel--active-mobile' : ''
          }`}
          aria-hidden={false}
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
                      handleServiceSelect(idx);
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
            - Folds closed onto panel 2 when switching services
        ========================================================== */}
        <div
          className={`fold-brochure__panel fold-brochure__panel--right${
            foldState !== 'idle' ? ` is-${foldState}` : ''
          } ${mobileTab === 'details' ? 'fold-brochure__panel--active-mobile' : ''}`}
          aria-hidden={false}
        >
          {/* FRONT FACE: Service Details (visible when flat/open) */}
          <div className="fold-brochure__face fold-brochure__face--right panel-content-details">
            <div className="fold-brochure__sheen fold-brochure__sheen--right" aria-hidden="true" />
            <div className="details-flip-wrapper">
              {/* Hero image with meta */}
              <div className="details-hero">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="details-hero__img"
                  loading="eager"
                  decoding="async"
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
                  <CurrentIcon size={20} strokeWidth={2} className="details-badge__icon" />
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

                {/* Enquire CTA */}
                <a href="#contact" className="details-cta-btn">
                  <span>ENQUIRE NOW</span>
                  <span className="details-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* BACK FACE: Cover design (visible when panel folds closed onto Panel 2) */}
          <div className="fold-brochure__face fold-brochure__face--back-cover panel-content-cover" aria-hidden="true">
            <div className="panel-cover__header">
              <a href="/" className="panel-cover__logo-wrap" aria-label="Gorod Marine Home" tabIndex={-1}>
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
        </div>
      </div>

      {/* Scroll indicator & status hint */}
      <div className="fold-brochure__hint" aria-live="polite">
        Scroll down to open brochure ↓
      </div>
    </section>
  );
}
