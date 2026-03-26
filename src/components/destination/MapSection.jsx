import { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import MapFullscreen from './MapFullscreen';

export default function MapSection({ country, loading }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapUrl = country 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${country.lng-1},${country.lat-1},${country.lng+1},${country.lat+1}&layer=mapnik&marker=${country.lat},${country.lng}`
    : '';

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-12 flex justify-center"
      >
        <div className="relative w-full max-w-4xl min-h-[432px] lg:min-h-[576px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-400">Loading map...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Full Width Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-12 flex justify-center"
      >
        <div className="relative w-full max-w-4xl min-h-[432px] lg:min-h-[576px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all duration-300 group">
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Fullscreen Button */}
          <motion.button
            onClick={() => setIsFullscreen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-6 right-6 z-20 p-3 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-lg hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20"
          >
            <Maximize2 size={20} className="text-slate-300 hover:text-primary transition-colors" />
          </motion.button>

          {/* Map Container */}
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
                style={{ border: 'none', display: 'block' }}
                title={`Map of ${country?.name}`}
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <p className="text-slate-300">Map unavailable</p>
              </div>
            )}
          </motion.div>

          {/* Bottom Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent p-6 pointer-events-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white mb-1">
                  {country?.name}
                </p>
                <p className="text-xs text-slate-400">
                  Click fullscreen to explore detailed location data
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Powered by OpenStreetMap
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <MapFullscreen
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        country={country}
      />
    </>
  );
}
