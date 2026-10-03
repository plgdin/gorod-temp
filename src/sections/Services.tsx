import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  Ship,
  Truck,
  Building2,
  FileCheck,
  Compass,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { ServiceItem, CraneState } from '@/types/services';
import { CraneSpreader } from '@/components/services/CraneSpreader';
import { LiftedContainer } from '@/components/services/LiftedContainer';
import { GroundContainer } from '@/components/services/GroundContainer';
import { ServiceDetailModal } from '@/components/services/ServiceDetailModal';
import { craneAudio } from '@/utils/craneAudio';
import '@/styles/crane-services.css';

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'sea-freight',
    number: '01',
    title: 'Sea Freight',
    shortTitle: 'Sea Freight',
    category: 'OCEAN & INTERMODAL',
    tagline: 'Global shipping solutions across major trade routes.',
    summary: 'Comprehensive FCL & LCL connectivity with real-time AIS vessel telemetry.',
    description:
      'Premier ocean freight solutions leveraging Tier-1 carrier alliances across 140+ global port hubs. We provide end-to-end container logistics, refrigerated reefer telematics, dangerous goods handling, and automated customs manifests.',
    accentColor: '#00e5ff',
    icon: Ship,
    graphicType: 'globe',
    metrics: [
      { label: 'Global Ports', value: '140+' },
      { label: 'On-Time Rate', value: '99.4%' },
      { label: 'Annual TEU', value: '480K+' },
    ],
    capabilities: [
      'Full Container Load (FCL) & LCL Consolidation',
      'Satellite AIS Real-Time Ocean Tracking',
      'Cold-Chain Temperature Regulated Reefers',
      'Port-to-Port & Door-to-Door Multimodal Transit',
      'Bunker Fuel Optimization & Route Scheduling',
    ],
  },
  {
    id: 'land-transport',
    number: '02',
    title: 'Land Transport',
    shortTitle: 'Land Transport',
    category: 'ROAD & RAIL CORRIDORS',
    tagline: 'Reliable road and rail freight across continental corridors.',
    summary: 'High-frequency bonded road freight with GPS telematics across regions.',
    description:
      'Direct intermodal overland transport linking deep-water sea terminals with inland economic zones. Modern GPS-monitored fleet, cross-border customs bonded trucking, and synchronized schedule dispatch.',
    accentColor: '#f59e0b',
    icon: Truck,
    graphicType: 'transport',
    metrics: [
      { label: 'Active Fleet', value: '2,400+' },
      { label: 'Dispatch SLA', value: '< 24h' },
      { label: 'Transit Hubs', value: '85 Hubs' },
    ],
    capabilities: [
      'Heavy Haul & Flatbed Container Haulage',
      'GPS Telemetry & Temperature Sensor Loggers',
      'Bonded Customs Transit (T1 / Transit Accompanying)',
      'Cross-Docking & Regional Distribution Hubs',
      'ADR / Hazardous Cargo Certified Drivers',
    ],
  },
  {
    id: 'warehousing',
    number: '03',
    title: 'Warehousing',
    shortTitle: 'Warehousing',
    category: 'STORAGE & FULFILLMENT',
    tagline: 'Secure, temperature-controlled, and high-velocity storage hubs.',
    summary: 'Port-adjacent automated bonded storage with real-time WMS visibility.',
    description:
      'Strategic port-adjacent bonded and non-bonded warehouse complexes equipped with automated inventory management, 24/7 CCTV surveillance, and climate-controlled storage for sensitive cargo.',
    accentColor: '#10b981',
    icon: Building2,
    graphicType: 'warehouse',
    metrics: [
      { label: 'Total Area', value: '350K m²' },
      { label: 'WMS Accuracy', value: '99.98%' },
      { label: 'Security Bays', value: '24/7' },
    ],
    capabilities: [
      'Customs Bonded & Free-Trade Zone Storage',
      'Automated High-Bay Pallet Racking & WMS',
      'Climate-Controlled & Cold Storage Chambers',
      'Pick & Pack, Kitting, and Value-Add Labeling',
      'Cross-Dock Transshipment & Cargo Palletizing',
    ],
  },
  {
    id: 'customs-clearance',
    number: '04',
    title: 'Customs Clearance',
    shortTitle: 'Customs Clearance',
    category: 'REGULATORY COMPLIANCE',
    tagline: 'Hassle-free global documentation, tariffs, and regulatory compliance.',
    summary: 'In-house licensed brokers providing zero-delay automated EDI filing.',
    description:
      'Seamless cross-border customs brokerage and regulatory compliance. Licensed in-house customs specialists ensure tariff classification accuracy, duty minimization, and rapid green-lane clearance.',
    accentColor: '#6366f1',
    icon: FileCheck,
    graphicType: 'customs',
    metrics: [
      { label: 'Clearance Speed', value: 'Zero-Delay' },
      { label: 'Audit Accuracy', value: '100%' },
      { label: 'Licensed Brokers', value: '50+' },
    ],
    capabilities: [
      'Automated Electronic Customs EDI Filing',
      'Harmonized System (HS) Tariff Classification',
      'Free Trade Agreement (FTA) Duty Drawback Optimization',
      'Port Health, Phytosanitary & Veterinary Compliance',
      'AEO-F Accredited Fast-Track Processing',
    ],
  },
  {
    id: 'project-cargo',
    number: '05',
    title: 'Project Cargo',
    shortTitle: 'Project Cargo',
    category: 'SPECIALIZED & HEAVY LIFT',
    tagline: 'Specialized engineering and heavy-lift handling for oversized cargo.',
    summary: 'Engineered rigging, breakbulk logistics, and heavy-lift crane handling.',
    description:
      'Engineered transport solutions for oversized, out-of-gauge (OOG), and ultra-heavy cargo. Tailored route surveying, barge transshipment, civil permit coordination, and on-site marine supercargo rigging.',
    accentColor: '#f97316',
    icon: Compass,
    graphicType: 'project',
    metrics: [
      { label: 'Max Lift', value: '1,200 MT' },
      { label: 'OOG Handling', value: '100% Turnkey' },
      { label: 'Supercargo', value: 'On-Site' },
    ],
    capabilities: [
      'Heavy-Lift Port Crane & Tandem Hoisting Rigging',
      'Route Engineering, Bridge Stress & Escort Surveys',
      'Barge & Roll-On/Roll-Off (Ro-Ro) Transshipment',
      'Marine Warranty Survey (MWS) Compliance',
      'Modular Multi-Axle Hydraulic SPMT Transport',
    ],
  },
];

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES_DATA[0]);
  const [isHoisted, setIsHoisted] = useState<boolean>(true);
  const [craneState, setCraneState] = useState<CraneState>('hoisted');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  // Dynamic layout calculation for container & spreader width
  const [containerWidth, setContainerWidth] = useState<number>(680);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  // Calculate proportional widths
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      if (vw > 1280) {
        setContainerWidth(680);
      } else if (vw > 1024) {
        setContainerWidth(580);
      } else if (vw > 768) {
        setContainerWidth(500);
      } else {
        setContainerWidth(Math.min(vw - 32, 420));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spreader width is 1.11565 * containerWidth for exact hook-to-corner casting alignment
  const spreaderWidth = Math.round(containerWidth * 1.11565);

  // Sound toggle handler
  const handleToggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    craneAudio.setEnabled(nextState);
  };

  // The Master Hoist Animation Sequence
  const liftContainer = useCallback(
    (targetService: ServiceItem) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const rig = rigRef.current;
      if (!rig) {
        setActiveService(targetService);
        setIsHoisted(true);
        setCraneState('hoisted');
        isAnimatingRef.current = false;
        return;
      }

      // If already hoisted and user clicked a different container:
      // Lower current, swap, and lift new container
      if (isHoisted) {
        setCraneState('lowering');
        craneAudio.startMotor();

        // 1. Lower current container to dock ground
        gsap.to(rig, {
          y: 280,
          opacity: 0.85,
          duration: 0.85,
          ease: 'power2.in',
          onComplete: () => {
            // Swap to target service
            setActiveService(targetService);
            setCraneState('locking');
            craneAudio.playTwistlock();

            // 2. Lock twistlocks & hoist up
            setTimeout(() => {
              setCraneState('lifting');
              craneAudio.startMotor();

              gsap.to(rig, {
                y: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'power2.out',
                onComplete: () => {
                  // Settle with subtle industrial mechanical suspension sway
                  gsap.to(rig, {
                    rotation: -0.6,
                    duration: 0.35,
                    ease: 'sine.out',
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                      gsap.set(rig, { rotation: 0 });
                    },
                  });

                  craneAudio.stopMotor();
                  craneAudio.playPneumatic();
                  setCraneState('hoisted');
                  setIsHoisted(true);
                  isAnimatingRef.current = false;
                },
              });
            }, 250);
          },
        });
      } else {
        // From dock floor straight up
        setActiveService(targetService);
        setCraneState('locking');
        craneAudio.playTwistlock();

        setTimeout(() => {
          setCraneState('lifting');
          craneAudio.startMotor();

          gsap.fromTo(
            rig,
            { y: 320, opacity: 0.7 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
              onComplete: () => {
                craneAudio.stopMotor();
                craneAudio.playPneumatic();
                setCraneState('hoisted');
                setIsHoisted(true);
                isAnimatingRef.current = false;
              },
            }
          );
        }, 220);
      }
    },
    [isHoisted]
  );

  // Lower container back to dock
  const handleLower = useCallback(() => {
    if (isAnimatingRef.current || !isHoisted) return;
    isAnimatingRef.current = true;
    const rig = rigRef.current;
    if (!rig) return;

    setCraneState('lowering');
    craneAudio.startMotor();

    gsap.to(rig, {
      y: 340,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.in',
      onComplete: () => {
        craneAudio.stopMotor();
        craneAudio.playTwistlock();
        setIsHoisted(false);
        setCraneState('idle');
        isAnimatingRef.current = false;
      },
    });
  }, [isHoisted]);

  // Initial mount positioning
  useEffect(() => {
    if (rigRef.current) {
      gsap.set(rigRef.current, { y: 0, opacity: 1 });
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="crane-services-section">
      {/* Background Port Image */}
      <div className="crane-services-bg-layer">
        <img
          src="/images/services/port-background.jpg"
          alt="Container Port Crane Terminal"
          className="crane-services-bg-img"
          draggable={false}
        />
        {/* Sunset Golden Hour Overlay */}
        <div className="crane-services-sunset-overlay" />
        {/* Wet Dock Specular Floor Reflection */}
        <div className="crane-services-wet-dock-overlay" />
      </div>

      {/* Overhead Crane Gantry Beam with Winch Trolley */}
      <div className="crane-top-gantry-beam">
        <div className="gantry-caution-strip" />
        <div className="gantry-winch-trolley">
          <span className="trolley-indicator-light" />
          <span className="trolley-label">HOIST 40T • ACTIVE</span>
        </div>
      </div>

      {/* Top UI Header (Left Kicker/Title + Right Step Tracker) */}
      <div className="crane-services-ui-container">
        <div className="crane-services-header-row">
          {/* Left Title Group */}
          <div className="services-intro-col">
            <div className="services-kicker">
              <span className="services-kicker-dash" />
              <span>OUR SERVICES</span>
            </div>
            <h1 className="services-hero-headline">
              Integrated Logistics Solutions
            </h1>
            <p className="services-hero-subtext">
              End-to-end logistics services designed to keep your business moving forward.
            </p>

            {/* Audio Feedback Toggle */}
            <button
              type="button"
              className={`services-audio-toggle ${audioEnabled ? '--active' : ''}`}
              onClick={handleToggleAudio}
              aria-label={audioEnabled ? 'Mute crane sound effects' : 'Enable crane sound effects'}
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{audioEnabled ? 'CRANE AUDIO ON' : 'CRANE AUDIO OFF'}</span>
            </button>
          </div>

          {/* Right Stepper: 01 to 05 */}
          <div className="services-stepper-col">
            <div className="stepper-track-line" />
            {SERVICES_DATA.map((srv) => {
              const isActive = activeService.id === srv.id && isHoisted;
              return (
                <button
                  key={srv.id}
                  type="button"
                  className={`stepper-item-btn ${isActive ? '--active' : ''}`}
                  onClick={() => liftContainer(srv)}
                  aria-label={`Select ${srv.title}`}
                >
                  <span className="stepper-item-num">{srv.number}</span>
                  <div className="stepper-node-circle">
                    <span className="stepper-node-inner" />
                  </div>
                  <span className="stepper-item-label">{srv.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Center Hoist Rig Stage (Spreader + Lifted Container) */}
      <div
        ref={rigRef}
        className="crane-hoist-rig-stage"
        style={{
          top: 'clamp(110px, 14vw, 150px)',
          display: isHoisted || craneState !== 'idle' ? 'flex' : 'none',
        }}
      >
        <CraneSpreader craneState={craneState} spreaderWidth={spreaderWidth} />
        <LiftedContainer
          service={activeService}
          craneState={craneState}
          onExplore={(s) => setModalService(s)}
          onLower={handleLower}
          containerWidth={containerWidth}
        />
      </div>

      {/* Dock Floor Container Row (Containers sitting on the ground in the background) */}
      <div className="crane-dock-floor-wrap">
        <div className="dock-containers-row">
          {SERVICES_DATA.map((srv, index) => {
            const isCurrentlyLifted = isHoisted && activeService.id === srv.id;
            return (
              <GroundContainer
                key={srv.id}
                service={srv}
                index={index}
                isLifted={isCurrentlyLifted}
                onSelect={(selected) => liftContainer(selected)}
              />
            );
          })}
        </div>
      </div>

      {/* Detailed Inspection Modal */}
      <ServiceDetailModal
        service={modalService}
        onClose={() => setModalService(null)}
      />
    </section>
  );
};

export default Services;
