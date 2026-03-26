import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Utensils, Landmark, MapPin } from 'lucide-react';
import { fetchLocationData } from '../utils/overpassApi';
import { useTravelContext } from '../context/TravelContext';

// Fallback component for map loading
const MapFallback = () => (
  <motion.div
    className="w-full h-96 bg-slate-700 rounded-xl animate-pulse flex items-center justify-center"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    <p className="text-slate-300">Loading map...</p>
  </motion.div>
);

export default function MapContainer({ country, loading }) {
  const { 
    selectedLocations, 
    highlightedLocationId, 
    highlightLocation,
    currentItinerary 
  } = useTravelContext();
  
  const [activeLayers, setActiveLayers] = useState({
    safety: true,
    medical: false,
    amenities: false,
    weather: false,
    itinerary: true, // New layer for itinerary locations
  });

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [locationData, setLocationData] = useState({
    medical: [],
    amenities: [],
    safety: [],
    attractions: [],
  });
  const [dataLoading, setDataLoading] = useState(false);

  const mapFeatures = [
    { id: 'itinerary', icon: MapPin, label: 'Itinerary', color: '#D4AF37' },
    { id: 'safety', icon: AlertTriangle, label: 'Safety Services', color: '#ef4444' },
    { id: 'medical', icon: Heart, label: 'Medical', color: '#3b82f6' },
    { id: 'amenities', icon: Utensils, label: 'Amenities', color: '#22c55e' },
    { id: 'weather', icon: Landmark, label: 'Attractions', color: '#06b6d4' },
  ];

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  // Fetch location data when country changes
  useEffect(() => {
    if (country && country.lat && country.lng) {
      setDataLoading(true);
      fetchLocationData(country.lat, country.lng)
        .then(data => {
          setLocationData(data);
          setDataLoading(false);
        })
        .catch(error => {
          console.error('Error loading location data:', error);
          setDataLoading(false);
        });
    }
  }, [country]);

  if (loading || dataLoading) {
    return <MapFallback />;
  }

  // Generate map URL for static map display using OpenStreetMap
  const mapUrl = country 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${country.lng-1},${country.lat-1},${country.lng+1},${country.lat+1}&layer=mapnik&marker=${country.lat},${country.lng}`
    : '';

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Map Controls */}
      <div className="flex flex-wrap gap-2">
        {mapFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.button
              key={feature.id}
              onClick={() => toggleLayer(feature.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeLayers[feature.id]
                  ? `bg-opacity-20 border-2 text-white`
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
              style={activeLayers[feature.id] ? {
                backgroundColor: `${feature.color}20`,
                borderColor: feature.color,
                color: feature.color
              } : {}}
            >
              <Icon size={16} />
              {feature.label}
            </motion.button>
          );
        })}
      </div>

      {/* Map Display */}
      <motion.div
        className="relative w-full rounded-xl overflow-hidden shadow-lg border border-yellow-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {mapUrl ? (
          <iframe 
            src={mapUrl}
            width="100%"
            height="400"
            className="rounded-xl"
            style={{ border: 'none' }}
            title={`Map of ${country?.name}`}
          />
        ) : (
          <div className="w-full h-96 bg-slate-800 rounded-xl flex items-center justify-center">
            <p className="text-slate-300">Map loading...</p>
          </div>
        )}
      </motion.div>

      {/* Location Data Display */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Map Locations (from map queries) */}
        {activeLayers.itinerary && selectedLocations.some(loc => loc.type === 'location') && (
          <div className="bg-slate-800 border border-primary/30 rounded-lg p-4 md:col-span-2">
            <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
              <MapPin size={16} /> Map Locations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedLocations.filter(loc => loc.type === 'location').map((location, idx) => (
                <motion.button
                  key={location.id || idx}
                  onClick={() => highlightLocation(location.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    highlightedLocationId === location.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs opacity-75">
                    {location.lat && location.lng ? 
                      `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 
                      'Coordinates unavailable'
                    }
                  </div>
                  {location.notes && (
                    <div className="text-xs opacity-60 mt-1">{location.notes}</div>
                  )}
                  {location.source && (
                    <div className="text-xs text-primary/70 mt-1">Source: {location.source}</div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Itinerary Locations */}
        {activeLayers.itinerary && selectedLocations.some(loc => loc.day) && (
          <div className="bg-slate-800 border border-primary/30 rounded-lg p-4 md:col-span-2">
            <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
              <MapPin size={16} /> Itinerary Locations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedLocations.filter(loc => loc.day).map((location, idx) => (
                <motion.button
                  key={location.id || idx}
                  onClick={() => highlightLocation(location.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    highlightedLocationId === location.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs opacity-75 capitalize">{location.type}</div>
                  {location.notes && (
                    <div className="text-xs opacity-60 mt-1">{location.notes}</div>
                  )}
                  {location.day && (
                    <div className="text-xs text-primary mt-1">Day {location.day}</div>
                  )}
                </motion.button>
              ))}
            </div>
            {currentItinerary && (
              <div className="mt-3 text-xs text-slate-400">
                Click locations to highlight them on the map
              </div>
            )}
          </div>
        )}

        {/* Safety Services */}
        {activeLayers.safety && locationData.safety.length > 0 && (
          <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} /> Safety Services
            </h4>
            <ul className="space-y-2">
              {locationData.safety.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300">• {item.label}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Medical Facilities */}
        {activeLayers.medical && locationData.medical.length > 0 && (
          <div className="bg-slate-800 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
              <Heart size={16} /> Medical Facilities
            </h4>
            <ul className="space-y-2">
              {locationData.medical.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300">• {item.label}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Amenities */}
        {activeLayers.amenities && locationData.amenities.length > 0 && (
          <div className="bg-slate-800 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
              <Utensils size={16} /> Amenities
            </h4>
            <ul className="space-y-2">
              {locationData.amenities.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300">• {item.label}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Attractions */}
        {activeLayers.weather && locationData.attractions.length > 0 && (
          <div className="bg-slate-800 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <Landmark size={16} /> Attractions
            </h4>
            <ul className="space-y-2">
              {locationData.attractions.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300">• {item.label}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Map Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs"
      >
        {mapFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex items-center gap-2 text-slate-300">
              <Icon size={14} style={{ color: feature.color }} />
              <span>{feature.label}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Data Source Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-slate-400 text-center"
      >
        <p>Location data powered by OpenStreetMap</p>
      </motion.div>
    </motion.div>
  );
}
