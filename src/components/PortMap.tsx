import React from 'react';

const HEAD_OFFICE_ADDRESS = 'TC 95/238 (13), Anamugham, Poonthi Road, Anayara, Trivandrum, Kerala 695029';

export const PortMap: React.FC = () => {
  const query = HEAD_OFFICE_ADDRESS;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="port-map-embed">
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
