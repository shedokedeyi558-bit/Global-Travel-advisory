import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Heart, Utensils, Landmark, MapPin } from 'lucide-react';
import { fetchLocationData } from '../../utils/overpassApi';
import { useTravelContext } from '../../context/TravelContext';

export default function MapModal({ isOpen, onClose, country }) {
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
    itinerary: true,
  });

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

  const mapUrl = country 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${country.lng-1},${country.lat-1},${country.lng+1},${country.lat+1}&layer=mapnik&marker=${country.lat},${country.lng}`
    : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 lg:inset-8 z-50 bg-slate-900 rounded-2xl border border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-2xl font-bold text-white">Regional Map</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-300" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                    height="500"
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
                {/* Safety Services */}
                {activeLayers.safety && locationData.safety.length > 0 && (
                  <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} /> Safety Services
                    </h4>
                    <ul className="space-y-2">
                      {locationData.safety.slice(0, 5).map((item, idx) => (
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
                      {locationData.medical.slice(0, 5).map((item, idx) => (
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
                      {locationData.amenities.slice(0, 5).map((item, idx) => (
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
                      {locationData.attractions.slice(0, 5).map((item, idx) => (
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
