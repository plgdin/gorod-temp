import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export interface PortMapProps {
  selectedPort?: string;
  onSelectPort?: (portName: string) => void;
}

const HEAD_OFFICE_ADDRESS = 'TC 95/238 (13), Anamugham, Poonthi Road, Anayara, Trivandrum, Kerala 695029';

export const PortMap: React.FC<PortMapProps> = ({ selectedPort }) => {
  const [viewMode, setViewMode] = useState<'office' | 'port'>('office');

  const query =
    viewMode === 'port' && selectedPort
      ? `${selectedPort} Port, India`
      : HEAD_OFFICE_ADDRESS;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=${viewMode === 'office' ? 14 : 11}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="port-map-embed">
      <div className="port-map-embed__header">
        <div className="port-map-embed__title-wrap">
          <MapPin size={15} className="port-map-embed__icon" />
          <span className="port-map-embed__title">
            {viewMode === 'office'
              ? 'Head Office Location'
              : `${selectedPort || 'Port'} Terminal`}
          </span>
        </div>
        <div className="port-map-embed__actions">
          <button
            type="button"
            className={`port-map-tab-btn ${viewMode === 'office' ? '--active' : ''}`}
            onClick={() => setViewMode('office')}
          >
            Head Office
          </button>
          {selectedPort && (
            <button
              type="button"
              className={`port-map-tab-btn ${viewMode === 'port' ? '--active' : ''}`}
              onClick={() => setViewMode('port')}
            >
              <Navigation size={12} style={{ display: 'inline', marginRight: 4 }} />
              {selectedPort.split('/')[0].trim()}
            </button>
          )}
        </div>
      </div>
      <div className="port-map-embed__canvas">
        <iframe
          title="Google Maps Location"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default PortMap;
