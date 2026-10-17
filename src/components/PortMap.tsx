import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface PortItem {
  name: string;
  lat: number;
  lng: number;
  primary: boolean;
  isHQ?: boolean;
  state: string;
}

export const PORT_DATA: PortItem[] = [
  { name: 'Mundra', lat: 22.8396, lng: 69.7042, primary: true, state: 'Gujarat' },
  { name: 'Kandla', lat: 23.0033, lng: 70.2185, primary: false, state: 'Gujarat' },
  { name: 'Mumbai / JNPT', lat: 18.9499, lng: 72.9515, primary: true, state: 'Maharashtra' },
  { name: 'Mormugao', lat: 15.4184, lng: 73.8016, primary: false, state: 'Goa' },
  { name: 'New Mangalore', lat: 12.9298, lng: 74.8197, primary: false, state: 'Karnataka' },
  { name: 'Cochin', lat: 9.9674, lng: 76.2711, primary: true, state: 'Kerala' },
  { name: 'Vizhinjam (HQ)', lat: 8.3768, lng: 76.9945, primary: true, isHQ: true, state: 'Kerala' },
  { name: 'Tuticorin', lat: 8.7543, lng: 78.1884, primary: false, state: 'Tamil Nadu' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2947, primary: true, state: 'Tamil Nadu' },
  { name: 'Ennore', lat: 13.2599, lng: 80.3292, primary: false, state: 'Tamil Nadu' },
  { name: 'Krishnapatnam', lat: 14.2547, lng: 80.1264, primary: false, state: 'Andhra Pradesh' },
  { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, primary: true, state: 'Andhra Pradesh' },
  { name: 'Paradip', lat: 20.3165, lng: 86.6114, primary: false, state: 'Odisha' },
  { name: 'Kolkata / Haldia', lat: 22.0227, lng: 88.0641, primary: true, state: 'West Bengal' },
];

interface PortMapProps {
  selectedPort?: string;
  onSelectPort?: (portName: string) => void;
}

export const PortMap: React.FC<PortMapProps> = ({ selectedPort, onSelectPort }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initialization if map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map centered on Indian coastline
    const map = L.map(mapContainerRef.current, {
      center: [16.0, 78.5],
      zoom: 4.3,
      minZoom: 3.5,
      maxZoom: 9,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // CartoDB Dark Matter tile layer - high-definition dark maritime theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Shipping Route coastal polyline
    const routeCoords: [number, number][] = [
      [22.8396, 69.7042], // Mundra
      [23.0033, 70.2185], // Kandla
      [20.5, 70.0],
      [18.9499, 72.9515], // Mumbai
      [15.4184, 73.8016], // Mormugao
      [12.9298, 74.8197], // Mangalore
      [9.9674, 76.2711],  // Cochin
      [8.3768, 76.9945],  // Vizhinjam HQ
      [8.0, 77.5],        // Cape Comorin turn
      [8.7543, 78.1884],  // Tuticorin
      [13.0827, 80.2947], // Chennai
      [14.2547, 80.1264], // Krishnapatnam
      [17.6868, 83.2185], // Visakhapatnam
      [20.3165, 86.6114], // Paradip
      [22.0227, 88.0641], // Kolkata / Haldia
    ];

    L.polyline(routeCoords, {
      color: '#67abaf',
      weight: 2,
      opacity: 0.55,
      dashArray: '5, 6',
      lineCap: 'round',
    }).addTo(map);

    // Add Port Markers
    PORT_DATA.forEach((port) => {
      const isSelected = selectedPort === port.name;
      const isHQ = !!port.isHQ;

      const iconHtml = `
        <div class="leaflet-port-pin ${port.primary ? '--primary' : ''} ${isHQ ? '--hq' : ''} ${isSelected ? '--selected' : ''}">
          <span class="pin-ring"></span>
          <span class="pin-core"></span>
          <span class="pin-title">${port.name}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'leaflet-port-divicon',
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([port.lat, port.lng], { icon: customIcon }).addTo(map);

      marker.bindTooltip(
        `<div class="port-popup-body">
          <strong>${port.name}</strong>
          <span>${isHQ ? 'Gorod HQ Hub' : port.primary ? 'Deep-Sea Terminal' : 'Husbandry Port'} &bull; ${port.state}</span>
        </div>`,
        {
          direction: 'top',
          offset: [0, -10],
          className: 'leaflet-port-tooltip',
          opacity: 0.98,
        }
      );

      marker.on('click', () => {
        if (onSelectPort) {
          onSelectPort(port.name);
        }
      });
    });

    // Invalidate size to guarantee no grey tiles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    let resizeObserver: ResizeObserver | null = null;
    if (mapContainerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedPort, onSelectPort]);

  return (
    <div className="port-map-embed">
      <div ref={mapContainerRef} className="port-map-embed__canvas" />
    </div>
  );
};

export default PortMap;
