import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllAirports } from '../utils/airportData';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function AirportMap({ onMarkerClick, selectedAirport, routeAirports, airports }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({});
  const routeLineRef = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = L.map(mapContainer.current).setView([20, 0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      // Cleanup
    };
  }, [onMarkerClick]);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      map.current.removeLayer(marker);
    });
    markersRef.current = {};

    // Add filtered airports
    const airportsToShow = airports || getAllAirports();
    
    airportsToShow.forEach((airport) => {
      const markerElement = createMarker(airport);
      markersRef.current[airport.code] = markerElement;
      markerElement.addTo(map.current);

      markerElement.on('click', () => {
        onMarkerClick(airport);
      });
    });
  }, [airports, onMarkerClick]);

  useEffect(() => {
    if (selectedAirport && map.current) {
      const marker = markersRef.current[selectedAirport.code];
      if (marker) {
        marker.setIcon(L.icon({
          iconUrl: getMarkerIcon(selectedAirport.type, true),
          iconSize: [50, 62],
          iconAnchor: [25, 62],
          popupAnchor: [0, -62],
        }));
        map.current.setView([selectedAirport.lat, selectedAirport.lng], 8);
      }
    } else {
      Object.entries(markersRef.current).forEach(([code, marker]) => {
        const airport = getAllAirports().find(a => a.code === code);
        if (airport) {
          marker.setIcon(L.icon({
            iconUrl: getMarkerIcon(airport.type, false),
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50],
          }));
        }
      });
    }
  }, [selectedAirport]);

  useEffect(() => {
    if (routeLineRef.current) {
      map.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (routeAirports.from && routeAirports.to && map.current) {
      const latlngs = [
        [routeAirports.from.lat, routeAirports.from.lng],
        [routeAirports.to.lat, routeAirports.to.lng],
      ];

      routeLineRef.current = L.polyline(latlngs, {
        color: '#06b6d4',
        weight: 3,
        opacity: 0.8,
        dashArray: '5, 5',
      }).addTo(map.current);

      const bounds = L.latLngBounds(latlngs);
      map.current.fitBounds(bounds, { padding: [100, 100] });
    }
  }, [routeAirports]);

  const createMarker = (airport) => {
    return L.marker([airport.lat, airport.lng], {
      icon: L.icon({
        iconUrl: getMarkerIcon(airport.type, false),
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50],
      }),
    }).bindPopup(`<strong>${airport.code}</strong><br/>${airport.name}`);
  };

  const getMarkerIcon = (type, isSelected) => {
    const size = isSelected ? 36 : 28;
    const isMajor = type === 'Major Hub';
    
    // Smart compact marker with minimal design
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${isMajor ? '#06b6d4' : '#8b5cf6'};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${isMajor ? '#0891b2' : '#7c3aed'};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Subtle glow ring -->
      <circle cx="20" cy="20" r="18" fill="none" stroke="${isMajor ? '#06b6d4' : '#8b5cf6'}" stroke-width="0.8" opacity="0.2" filter="url(#shadow)"/>
      
      <!-- Main marker body (compact teardrop) -->
      <path d="M 20 6 C 12.3 6 6 12.3 6 20 C 6 28 20 38 20 38 C 20 38 34 28 34 20 C 34 12.3 27.7 6 20 6 Z" fill="url(#grad)" filter="url(#shadow)"/>
      
      <!-- Inner highlight -->
      <circle cx="20" cy="19" r="5" fill="white" opacity="0.35"/>
      
      <!-- Center dot -->
      <circle cx="20" cy="19" r="2.5" fill="white" opacity="0.95"/>
    </svg>`;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div
      ref={mapContainer}
      className="w-full rounded-2xl overflow-hidden border border-white/10"
      style={{ height: '400px', width: '100%' }}
    />
  );
}
