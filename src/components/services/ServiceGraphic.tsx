import React, { useEffect, useRef } from 'react';

interface ServiceGraphicProps {
  type: 'globe' | 'transport' | 'warehouse' | 'customs' | 'project';
  accentColor: string;
}

export const ServiceGraphic: React.FC<ServiceGraphicProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Globe Canvas Rendering
  useEffect(() => {
    if (type !== 'globe') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    // Generate latitude/longitude dots for realistic wireframe globe
    const dots: { x: number; y: number; z: number }[] = [];
    const numLat = 16;
    const numLon = 32;
    const radius = 105;

    for (let i = 0; i <= numLat; i++) {
      const lat = (Math.PI / numLat) * i - Math.PI / 2;
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const step = Math.max(1, Math.floor(numLon * cosLat));

      for (let j = 0; j < step; j++) {
        const lon = (2 * Math.PI / step) * j;
        // Add pseudo-continental density (filter out empty Pacific zones for recognizable land silhouettes)
        const lonDeg = (lon * 180) / Math.PI;
        const latDeg = (lat * 180) / Math.PI;
        const isLand =
          (lonDeg > 30 && lonDeg < 150 && latDeg > -35 && latDeg < 65) || // Eurasia & Africa
          (lonDeg > 230 && lonDeg < 320 && latDeg > -50 && latDeg < 65) || // Americas
          (lonDeg > 110 && lonDeg < 160 && latDeg > -45 && latDeg < -10); // Australia

        if (isLand || Math.random() < 0.25) {
          dots.push({
            x: radius * cosLat * Math.sin(lon),
            y: radius * sinLat,
            z: radius * cosLat * Math.cos(lon),
          });
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Outer glow atmosphere
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.3);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0.08)');
      grad.addColorStop(0.8, 'rgba(0, 229, 255, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotation matrix
      rotation += 0.007;
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);

      // Draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        // Rotate around Y axis
        const xRot = dot.x * cosR - dot.z * sinR;
        const zRot = dot.x * sinR + dot.z * cosR;

        // Perspective projection
        if (zRot > -radius) {
          const alpha = Math.max(0.08, (zRot + radius) / (2 * radius));
          const size = Math.max(0.8, (zRot + radius) / (radius) * 1.3);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(cx + xRot, cy + dot.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw trade route arcs
      const tradeRoutes = [
        { lat1: 22, lon1: 114, lat2: 34, lon2: -118 }, // HK to LA
        { lat1: 51, lon1: 4, lat2: 40, lon2: -74 },    // Rotterdam to NY
        { lat1: 1, lon1: 103, lat2: 25, lon2: 55 },    // Singapore to Dubai
      ];

      ctx.lineWidth = 1.5;
      for (const route of tradeRoutes) {
        const radLat1 = (route.lat1 * Math.PI) / 180;
        const radLon1 = (route.lon1 * Math.PI) / 180;
        const radLat2 = (route.lat2 * Math.PI) / 180;
        const radLon2 = (route.lon2 * Math.PI) / 180;

        const p1x = radius * Math.cos(radLat1) * Math.sin(radLon1);
        const p1y = radius * Math.sin(radLat1);
        const p1z = radius * Math.cos(radLat1) * Math.cos(radLon1);

        const p2x = radius * Math.cos(radLat2) * Math.sin(radLon2);
        const p2y = radius * Math.sin(radLat2);
        const p2z = radius * Math.cos(radLat2) * Math.cos(radLon2);

        const r1x = p1x * cosR - p1z * sinR;
        const r1z = p1x * sinR + p1z * cosR;
        const r2x = p2x * cosR - p2z * sinR;
        const r2z = p2x * sinR + p2z * cosR;

        if (r1z > -30 || r2z > -30) {
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx + r1x, cy + p1y);
          // quadratic curve arching out
          const midX = (r1x + r2x) / 2 * 1.25;
          const midY = (p1y + p2y) / 2 - 25;
          ctx.quadraticCurveTo(cx + midX, cy + midY, cx + r2x, cy + p2y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Glowing pulse at endpoint
          ctx.fillStyle = '#00e5ff';
          ctx.beginPath();
          ctx.arc(cx + r1x, cy + p1y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [type]);

  if (type === 'globe') {
    return (
      <div className="service-graphic-wrap">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="service-graphic-canvas"
        />
        <div className="graphic-telemetry-badge">
          <span className="telemetry-dot" />
          <span>AIS SATELLITE LIVE</span>
        </div>
      </div>
    );
  }

  if (type === 'transport') {
    return (
      <div className="service-graphic-wrap">
        <svg viewBox="0 0 280 280" className="service-graphic-svg">
          <defs>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.8)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <circle cx="140" cy="140" r="110" fill="url(#hubGlow)" />
          <circle cx="140" cy="140" r="115" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" fill="none" />

          {/* Highway vector path */}
          <path
            d="M 40 210 Q 110 180, 140 130 T 240 70"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 40 210 Q 110 180, 140 130 T 240 70"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="animated-dash-line"
          />

          {/* Intermodal Waypoints */}
          <g transform="translate(60, 200)">
            <circle r="8" fill="rgba(245, 158, 11, 0.2)" />
            <circle r="4" fill="#f59e0b" />
            <text x="14" y="4" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">PORT GATE</text>
          </g>

          <g transform="translate(140, 130)">
            <circle r="11" fill="rgba(245, 158, 11, 0.25)" className="pulse-circle" />
            <circle r="5" fill="#ffffff" />
            <text x="14" y="4" fill="rgba(255,255,255,0.9)" fontSize="9" fontWeight="bold" fontFamily="monospace">CORRIDOR A-1</text>
          </g>

          <g transform="translate(220, 80)">
            <circle r="8" fill="rgba(245, 158, 11, 0.2)" />
            <circle r="4" fill="#f59e0b" />
            <text x="-70" y="4" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">INLAND HUB</text>
          </g>

          {/* Freight truck schematic */}
          <g transform="translate(125, 115) scale(0.9)">
            <rect x="0" y="0" width="34" height="18" rx="2" fill="rgba(15,23,42,0.8)" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="26" y="4" width="12" height="14" rx="2" fill="rgba(15,23,42,0.8)" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="8" cy="18" r="3" fill="#ffffff" />
            <circle cx="26" cy="18" r="3" fill="#ffffff" />
            <circle cx="34" cy="18" r="3" fill="#ffffff" />
          </g>
        </svg>
        <div className="graphic-telemetry-badge">
          <span className="telemetry-dot" style={{ backgroundColor: '#f59e0b' }} />
          <span>ROAD & RAIL TELEMATICS</span>
        </div>
      </div>
    );
  }

  if (type === 'warehouse') {
    return (
      <div className="service-graphic-wrap">
        <svg viewBox="0 0 280 280" className="service-graphic-svg">
          <defs>
            <radialGradient id="whGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.35)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="140" cy="140" r="110" fill="url(#whGlow)" />
          <circle cx="140" cy="140" r="115" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" fill="none" />

          {/* Isometric warehouse racks */}
          <g transform="translate(140, 75)">
            {/* Top row isometric bays */}
            {[-45, 0, 45].map((xOffset, colIdx) => (
              <g key={colIdx} transform={`translate(${xOffset}, ${colIdx === 1 ? 0 : 25})`}>
                <polygon points="0,-15 35,5 0,25 -35,5" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.2" />
                <polygon points="-35,5 0,25 0,65 -35,45" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" strokeWidth="1.2" />
                <polygon points="0,25 35,5 35,45 0,65" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="1.2" />
                {/* Rack level divider */}
                <line x1="-35" y1="25" x2="0" y2="45" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="45" x2="35" y2="25" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
              </g>
            ))}

            {/* Laser scanning beam */}
            <line x1="-90" y1="70" x2="90" y2="70" stroke="#34d399" strokeWidth="1.5" className="scanner-line" opacity="0.8" />
          </g>

          <text x="140" y="215" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="monospace" letterSpacing="1.5">
            AUTOMATED WMS • BAY A-09
          </text>
        </svg>
        <div className="graphic-telemetry-badge">
          <span className="telemetry-dot" style={{ backgroundColor: '#10b981' }} />
          <span>BONDED STORAGE LIVE</span>
        </div>
      </div>
    );
  }

  if (type === 'customs') {
    return (
      <div className="service-graphic-wrap">
        <svg viewBox="0 0 280 280" className="service-graphic-svg">
          <defs>
            <radialGradient id="customsGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.35)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="140" cy="140" r="110" fill="url(#customsGlow)" />
          <circle cx="140" cy="140" r="115" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" fill="none" />

          {/* Outer rotating compliance ring */}
          <circle cx="140" cy="140" r="90" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="8 6 2 6" fill="none" className="rotate-slow" />
          <circle cx="140" cy="140" r="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />

          {/* Central Shield */}
          <path
            d="M 140 85 L 180 100 C 180 145 155 175 140 190 C 125 175 100 145 100 100 Z"
            fill="rgba(15, 23, 42, 0.85)"
            stroke="#6366f1"
            strokeWidth="2"
          />

          {/* Checkmark inside shield */}
          <path
            d="M 125 135 L 136 146 L 158 122"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Micro text */}
          <text x="140" y="222" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
            AEO-F CERTIFIED • 0% AUDIT DELAY
          </text>
        </svg>
        <div className="graphic-telemetry-badge">
          <span className="telemetry-dot" style={{ backgroundColor: '#6366f1' }} />
          <span>DIGITAL CLEARANCE READY</span>
        </div>
      </div>
    );
  }

  // project cargo
  return (
    <div className="service-graphic-wrap">
      <svg viewBox="0 0 280 280" className="service-graphic-svg">
        <defs>
          <radialGradient id="projGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="140" cy="140" r="110" fill="url(#projGlow)" />
        <circle cx="140" cy="140" r="115" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" fill="none" />

        {/* Heavy Lift Crane Hoist schematic */}
        <g transform="translate(140, 65)">
          {/* Overhead trolley */}
          <rect x="-45" y="0" width="90" height="14" rx="2" fill="rgba(15,23,42,0.9)" stroke="#f97316" strokeWidth="1.5" />
          {/* Tension wire cables */}
          <line x1="-30" y1="14" x2="-20" y2="75" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="30" y1="14" x2="20" y2="75" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="0" y1="14" x2="0" y2="75" stroke="#ffffff" strokeWidth="1.8" />

          {/* Heavy Crane Block Hook */}
          <rect x="-24" y="75" width="48" height="22" rx="3" fill="#f97316" stroke="#ffffff" strokeWidth="1" />
          {/* Hook shape */}
          <path
            d="M 0 97 C 0 115 22 115 22 105 C 22 97 10 97 10 102"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Suspended Heavy Industrial Turbine / Out of Gauge module */}
          <g transform="translate(0, 115)">
            <rect x="-55" y="0" width="110" height="30" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#f97316" strokeWidth="1.5" />
            <line x1="-40" y1="0" x2="-40" y2="30" stroke="#f97316" strokeWidth="1" />
            <line x1="40" y1="0" x2="40" y2="30" stroke="#f97316" strokeWidth="1" />
            <circle cx="0" cy="15" r="8" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1" />
          </g>
        </g>

        <text x="140" y="235" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
          HEAVY HOIST • 1,200 MT PAYLOAD
        </text>
      </svg>
      <div className="graphic-telemetry-badge">
        <span className="telemetry-dot" style={{ backgroundColor: '#f97316' }} />
        <span>ENGINEERED RIGGING</span>
      </div>
    </div>
  );
};
