import React from 'react';
import type { CraneState } from '@/types/services';

interface CraneSpreaderProps {
  craneState: CraneState;
  spreaderWidth: number;
}

export const CraneSpreader: React.FC<CraneSpreaderProps> = ({ craneState, spreaderWidth }) => {
  const isLocked = craneState === 'lifting' || craneState === 'hoisted' || craneState === 'locking';

  return (
    <div
      className={`crane-spreader-assembly ${isLocked ? '--locked' : '--unlocked'}`}
      style={{ width: `${spreaderWidth}px` }}
    >
      {/* Overhead Cable Extensions extending to top gantry */}
      <div className="crane-overhead-cables-wrap">
        <svg
          viewBox="0 0 1024 1200"
          preserveAspectRatio="none"
          className="crane-overhead-cables-svg"
        >
          <defs>
            <linearGradient id="cableGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <filter id="cableShadow" x="-20%" y="0%" width="140%" height="100%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.6)" />
            </filter>
          </defs>

          {/* 4 Center Vertical Steel Hoist Wires aligned with image cables */}
          <line x1="491" y1="0" x2="491" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />
          <line x1="504" y1="0" x2="504" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />
          <line x1="520" y1="0" x2="520" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />
          <line x1="533" y1="0" x2="533" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />

          {/* Diagonal Left Stay Cable extending from top winch to image cable at x=419 */}
          <line x1="480" y1="0" x2="419" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />

          {/* Diagonal Right Stay Cable extending from top winch to image cable at x=606 */}
          <line x1="544" y1="0" x2="606" y2="1200" stroke="url(#cableGrad)" strokeWidth="3.5" filter="url(#cableShadow)" />
        </svg>
      </div>

      {/* Main Crane Spreader Bar Graphic */}
      <div className="crane-spreader-img-wrap">
        <img
          src="/images/services/crane-spreader-large.png"
          alt="Container Crane Spreader Bar"
          className="crane-spreader-img"
          draggable={false}
        />

        {/* Left Twistlock Lock Indicator */}
        <div className={`spreader-twistlock-indicator --left ${isLocked ? '--active' : ''}`}>
          <div className="twistlock-pin" />
          <div className="twistlock-light" />
        </div>

        {/* Right Twistlock Lock Indicator */}
        <div className={`spreader-twistlock-indicator --right ${isLocked ? '--active' : ''}`}>
          <div className="twistlock-pin" />
          <div className="twistlock-light" />
        </div>

        {/* Center Trolley Hoist Sheave Lights */}
        <div className="crane-sheave-lantern" />
      </div>
    </div>
  );
};
