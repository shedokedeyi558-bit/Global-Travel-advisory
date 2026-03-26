import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Shield, TrendingUp, Users, Clock, AlertCircle, X } from 'lucide-react';

export default function AirportPanel({ selectedAirport, onClose }) {
  if (!selectedAirport) return null;

  const getSafetyColor = (score) => {
    if (score >= 90) return { bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-400', label: 'Excellent' };
    if (score >= 80) return { bg: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-400', label: 'Good' };
    if (score >= 70) return { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', label: 'Fair' };
    return { bg: 'from-red-500/20 to-red-600/10', text: 'text-red-400', label: 'Poor' };
  };

  const safetyColor = getSafetyColor(selectedAirport.safety);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-4 top-20 z-40 w-96 rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
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
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${safetyColor.bg} flex items-center justify-center`}>
              <Plane size={24} className={safetyColor.text} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedAirport.code}</h3>
              <p className="text-sm text-slate-400">{selectedAirport.name}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">{selectedAirport.country}</p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          {/* Safety Score */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">Safety Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className={`h-full bg-gradient-to-r ${safetyColor.bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedAirport.safety}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className={`text-sm font-bold ${safetyColor.text}`}>{selectedAirport.safety}%</span>
            </div>
            <p className={`text-xs mt-1 ${safetyColor.text}`}>{safetyColor.label}</p>
          </div>

          {/* On-Time Performance */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">On-Time Performance</p>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-cyan-400" />
              <div className="flex-1">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedAirport.onTimePerformance}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-cyan-400">{selectedAirport.onTimePerformance}%</span>
            </div>
          </div>

          {/* Passenger Traffic */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">Annual Passengers</p>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              <span className="text-sm text-slate-300">
                {(selectedAirport.passengerTraffic / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>

          {/* Airport Type */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">Type</p>
            <div className="inline-block px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/20 border border-cyan-400/30">
              {selectedAirport.type}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">Services</p>
            <div className="flex flex-wrap gap-2">
              {selectedAirport.services.map((service, idx) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-2 py-1 rounded text-xs font-semibold text-slate-300 bg-white/5 border border-white/10"
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Alerts */}
          {selectedAirport.alerts.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest mb-2">Active Alerts</p>
              <div className="space-y-2">
                {selectedAirport.alerts.map((alert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 p-2 rounded bg-amber-500/20 border border-amber-400/30"
                  >
                    <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-amber-300">{alert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 transition-all"
          >
            Book Flight
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
