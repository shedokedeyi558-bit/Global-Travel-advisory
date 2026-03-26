import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import MapControls from './MapControls';
import { fetchLocationData } from '../../utils/overpassApi';

export default function MapFullscreen({ isOpen, onClose, country }) {
  const [activeLayers, setActiveLayers] = useState({
    safety: true,
    medical: false,
    amenities: false,
    attractions: false,
  });
  const [locationData, setLocationData] = useState({
    medical: [],
    amenities: [],
    safety: [],
    attractions: [],
  });
  const [dataLoading, setDataLoading] = useState(false);

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

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

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
            className="fixed inset-0 bg-black/90 z-40"
          />

          {/* Fullscreen Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Regional Map</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-300" />
              </motion.button>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative overflow-hidden">
              {/* Map Controls */}
              <MapControls
                activeLayers={activeLayers}
                onToggleLayer={toggleLayer}
              />

              {/* Map */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title={`Map of ${country?.name}`}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <p className="text-slate-300">Map loading...</p>
                  </div>
                )}
              </motion.div>

              {/* Bottom Info Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 max-w-md"
              >
                <p className="text-sm text-slate-300 mb-2">
                  <span className="font-semibold text-white">{country?.name}</span>
                </p>
                <p className="text-xs text-slate-400">
                  Explore location data including safety services, medical facilities, amenities, and attractions.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Data powered by OpenStreetMap
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
