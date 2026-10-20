import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export interface PortMapProps {
  selectedPort?: string;
  onSelectPort?: (portName: string) => void;
}

const HEAD_OFFICE_ADDRESS = 'TC 95/238 (13), Anamugham, Poonthi Road, Anayara, Trivandrum, Kerala 695029';
const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=TC+95/238+(13),+Anamugham,+Poonthi+Road,+Anayara,+Trivandrum,+Kerala+695029';

export const PortMap: React.FC<PortMapProps> = () => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    HEAD_OFFICE_ADDRESS
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="port-map-embed">
      <div className="port-map-embed__header">
        <div className="port-map-embed__title-wrap">
          <MapPin size={15} className="port-map-embed__icon" />
          <span className="port-map-embed__title">HEAD OFFICE LOCATION</span>
        </div>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="port-map-tab-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
        >
          <span>Open in Maps</span>
          <ExternalLink size={12} />
        </a>
      </div>
      <div className="port-map-embed__canvas">
        <iframe
          title="Gorod Marine Head Office Location"
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
