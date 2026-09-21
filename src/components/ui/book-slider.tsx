import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ArrowRight } from 'lucide-react';

interface ServicePageData {
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  ctaText: string;
}

const servicesData: ServicePageData[] = [
  {
    num: '01',
    title: 'Ship Agency',
    tagline: 'Port Attendance & Full Husbandry',
    description:
      'Complete representation of shipowners, charterers, and vessel operators in port. We manage inward and outward harbor clearances, pilotage bookings, tug assistance, berth prioritization, and 24/7 boarding supervision to guarantee swift, seamless turnaround without demurrage.',
    image: '/images/case-1.jpg',
    ctaText: 'Nominate Ship Agency',
  },
  {
    num: '02',
    title: 'Bunker Fuels',
    tagline: 'Certified Marine Fuel & Lubricants',
    description:
      'Full coordination and supply of marine fuels, low-sulfur distillates, and engine lubricants. We coordinate independent sampling, laboratory testing (ISO 8217), quantity gauging, and barge or pipeline bunkering with zero disruption to vessel schedules.',
    image: '/images/case-2.jpg',
    ctaText: 'Inquire Bunker Fuels',
  },
  {
    num: '03',
    title: 'Canal & Straits Transits',
    tagline: 'Expedited Waterway & Convoy Passage',
    description:
      'Specialized transit agency facilitating safe, expedited passages through vital international waterways and canals. We manage convoy bookings, toll disbursements, escort tugs, pilot handovers, and documentation to eliminate costly waiting times.',
    image: '/images/case-3.jpg',
    ctaText: 'Book Canal Transit',
  },
  {
    num: '04',
    title: 'Hub Agency',
    tagline: 'Centralized Multi-Port Fleet Management',
    description:
      'A single point of contact for regional and global fleet operations. We streamline disbursements through consolidated PDA/FDA accounting, offer standardized real-time reporting, and maintain consistent operational standards across multiple ports.',
    image: '/images/case-4.jpg',
    ctaText: 'Connect Hub Agency',
  },
  {
    num: '05',
    title: 'Hull Cleaning',
    tagline: 'Underwater Biofouling Removal & Inspection',
    description:
      'Eco-compliant underwater hull cleaning, propeller polishing, and class-approved in-water surveys (IWS). Our certified diving teams restore vessel hydrodynamic efficiency and significantly lower bunker fuel consumption with full CCTV photographic reports.',
    image: '/images/case-5.jpg',
    ctaText: 'Schedule Hull Cleaning',
  },
  {
    num: '06',
    title: 'Husbandry Services',
    tagline: 'Comprehensive Crew & Vessel Care',
    description:
      'Attending directly to the shipmaster and maritime crew. From visa assistance and immigration clearance to airport transfers, hotel accommodations, cash to master (CTM), mail delivery, and 24/7 port-side emergency medical assistance.',
    image: '/images/case-6.jpg',
    ctaText: 'Request Husbandry Care',
  },
  {
    num: '07',
    title: 'Launch Services',
    tagline: '24/7 Anchorage & Offshore Boat Transfer',
    description:
      'Fast, dependable offshore launch boats operating around the clock. We provide safe transit for crew, boarding officials, technicians, fresh stores, light spares, and documentation to vessels anchored off-port limits.',
    image: '/images/case-7.jpg',
    ctaText: 'Order Launch Boat',
  },
  {
    num: '08',
    title: 'P&I / H&M Services',
    tagline: 'Correspondent & Marine Insurance Liaison',
    description:
      'Independent local assistance for Protection & Indemnity clubs and Hull & Machinery insurers. We conduct emergency damage surveys, cargo condition assessments, incident investigation, and legal coordination with absolute discretion.',
    image: '/images/case-8.jpg',
    ctaText: 'P&I / H&M Inquiry',
  },
  {
    num: '09',
    title: 'Protecting Agency',
    tagline: 'Independent Principal Interest Safeguard',
    description:
      'Dedicated supervisory representation protecting owners and charterers when a third-party agent is appointed. We audit proforma disbursement accounts, verify cargo tallies, monitor loading rates, and protect against unfair demurrage claims.',
    image: '/images/case-1.jpg',
    ctaText: 'Appoint Protecting Agent',
  },
];

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
}

const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(({ children, className = '' }, ref) => {
  return (
    <div className={`book-page ${className}`} ref={ref}>
      {children}
    </div>
  );
});
BookPage.displayName = 'BookPage';

export const BookSlider: React.FC = () => {
  const flipBookRef = useRef<any>(null);
  const [_activePageIndex, setActivePageIndex] = useState(0);


  const handlePrev = () => {
    if (flipBookRef.current?.pageFlip()) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (flipBookRef.current?.pageFlip()) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handlePageChange = (e: { data: number }) => {
    setActivePageIndex(e.data);
  };


  // Keyboard navigation for page flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div className="book-slider-container">
      {/* Book Frame */}
      <div className="book-slider-wrapper">
        <HTMLFlipBook
          ref={flipBookRef}
          width={640}
          height={780}
          size="stretch"
          minWidth={400}
          maxWidth={750}
          minHeight={580}
          maxHeight={880}
          maxShadowOpacity={0.4}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handlePageChange}
          className="flip-book-instance"
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{ margin: '0 auto' }}
        >
          {servicesData.flatMap((svc, index) => [
            // Left Page: Visual Showcase
            <BookPage key={`img-${svc.num}`} className="book-page--left">
              <div className="page-media">
                <img src={svc.image} alt={svc.title} className="page-media__img" />
                <div className="page-media__overlay">
                  <div className="page-media__top-row">
                    <span className="page-media__tag">{svc.tagline}</span>
                  </div>
                  <div className="page-media__bottom-row">
                    <div className="page-media__num">{svc.num}</div>
                    <div className="page-media__stamp">
                      <span>GOROD SHIPPING</span>
                      <span>SERVICES REGISTER</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-footer-bar">
                <span>Gorod Maritime Agency</span>
                <span>Spread {index + 1} of {servicesData.length}</span>
              </div>
            </BookPage>,

            // Right Page: Clean, Minimal Service Explanation & CTA
            <BookPage key={`desc-${svc.num}`} className="book-page--right">
              <div className="page-body">
                {/* On first page right, display 'Our Services' kicker */}
                {index === 0 && (
                  <div className="page-services-kicker">
                    <span className="page-services-kicker__pill">SERVICES</span>
                    <h2 className="page-services-kicker__title">Our Services</h2>
                  </div>
                )}

                <div className="page-header --minimal">
                  <div className="page-header__meta">
                    <span className="page-badge">SERVICE {svc.num}</span>
                  </div>
                  <h3 className="page-title">{svc.title}</h3>
                  <div className="page-divider" />
                </div>

                <div className="page-description-wrapper">
                  <p className="page-description --clean">{svc.description}</p>
                </div>

                {/* Direct Action Button */}
                <div className="page-cta --minimal">
                  <a href="#contact" className="page-cta__btn">
                    <span>{svc.ctaText}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="page-footer-bar --right">
                  <span>Standard Operational Procedures</span>
                  <span>Page {index * 2 + 2}</span>
                </div>

                {/* Official Gorod Signature Brand Element Swoosh (Bottom Right Corner) */}
                <div className="page-corner-swoosh" aria-hidden="true">
                  <svg viewBox="0 0 150.2 97.8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 150.19 0 C 134.64 1.35, 119.12 3.50, 103.68 6.48 C 84.76 10.14, 64.81 15.35, 47.02 22.66 C 34.20 27.92, 19.48 35.54, 10.07 45.73 C 7.38 48.64, 5.17 51.73, 3.46 55.29 C 0 62.49, 0.22 70.60, 3.91 77.68 C 8.35 86.19, 16.22 92.65, 24.11 97.78 L 83.24 97.78 C 65.77 92.91, 34.84 82.80, 26.01 66.06 C 23.27 60.85, 23.27 54.97, 26.01 49.76 C 31.70 38.94, 46.39 31.38, 57.51 26.75 C 72.93 20.33, 90.84 15.79, 107.30 12.64 C 121.55 9.92, 135.85 7.98, 150.19 6.68 Z"
                      fill={`url(#gorod-swoosh-gradient-${svc.num})`}
                      stroke="rgba(0, 104, 115, 0.2)"
                      strokeWidth="0.75"
                    />
                    <defs>
                      <linearGradient id={`gorod-swoosh-gradient-${svc.num}`} x1="150" y1="0" x2="0" y2="98" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#006873" stopOpacity="0.2" />
                        <stop offset="0.55" stopColor="#006873" stopOpacity="0.12" />
                        <stop offset="1" stopColor="#67abaf" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </BookPage>,
          ])}
        </HTMLFlipBook>
      </div>

    </div>
  );
}

export default BookSlider;
