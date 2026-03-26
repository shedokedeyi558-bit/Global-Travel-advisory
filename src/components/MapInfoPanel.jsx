import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Shield, AlertCircle, X } from 'lucide-react';

export default function MapInfoPanel({ selectedMarker, onClose }) {
  if (!selectedMarker) return null;

  const getMarkerColor = (type) => {
    const colors = {
      safety: { bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-400', icon: Shield },
      hospital: { bg: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-400', icon: MapPin },
      restaurant: { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', icon: MapPin },
      hotel: { bg: 'from-purple-500/20 to-purple-600/10', text: 'text-purple-400', icon: MapPin },
      alert: { bg: 'from-red-500/20 to-red-600/10', text: 'text-red-400', icon: AlertCircle },
    };
    return colors[type] || colors.safety;
  };

  const colors = getMarkerColor(selectedMarker.type);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-40 w-96 rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
        style={{
          background: `linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)`,
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={18} className="text-slate-400" />
        </motion.button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
              <MapPin size={24} className={colors.text} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedMarker.name}</h3>
              <p className="text-sm text-slate-400">{selectedMarker.category}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Coordinates */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">LOCATION</p>
            <p className="text-sm text-slate-300">
              {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
            </p>
          </div>

          {/* Safety Score */}
          {selectedMarker.safety && (
            <div>
              <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">SAFETY SCORE</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedMarker.safety}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-sm font-bold text-emerald-400">{selectedMarker.safety}%</span>
              </div>
            </div>
          )}

          {/* Severity */}
          {selectedMarker.severity && (
            <div>
              <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">SEVERITY</p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                selectedMarker.severity === 'high' ? 'bg-red-500/30 text-red-300' :
                selectedMarker.severity === 'medium' ? 'bg-amber-500/30 text-amber-300' :
                'bg-emerald-500/30 text-emerald-300'
              }`}>
                {selectedMarker.severity.toUpperCase()}
              </div>
            </div>
          )}

          {/* Type Badge */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">TYPE</p>
            <div className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${colors.text} bg-gradient-to-br ${colors.bg} border border-white/10`}>
              {selectedMarker.type.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 transition-all"
          >
            Get Directions
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/10 transition-all"
          >
            Share
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
