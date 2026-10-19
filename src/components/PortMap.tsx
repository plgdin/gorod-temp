import React from 'react';
import { MapPin } from 'lucide-react';

export interface PortMapProps {
  selectedPort?: string;
  onSelectPort?: (portName: string) => void;
}

const HEAD_OFFICE_ADDRESS = 'TC 95/238 (13), Anamugham, Poonthi Road, Anayara, Trivandrum, Kerala 695029';

export const PortMap: React.FC<PortMapProps> = () => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    HEAD_OFFICE_ADDRESS
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="port-map-embed">
      <div className="port-map-embed__header">
        <div className="port-map-embed__title-wrap">
          <MapPin size={15} className="port-map-embed__icon" />
          <span className="port-map-embed__title">Head Office Location</span>
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
