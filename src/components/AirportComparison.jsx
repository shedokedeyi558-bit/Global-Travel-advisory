import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { getAllAirports } from '../utils/airportData';

export default function AirportComparison({ selectedAirports, onRemove }) {
  if (selectedAirports.length === 0) return null;

  const metrics = [
    { label: 'Safety Score', key: 'safety', unit: '%' },
    { label: 'On-Time Performance', key: 'onTimePerformance', unit: '%' },
    { label: 'Annual Passengers', key: 'passengerTraffic', unit: 'M', format: (v) => (v / 1000000).toFixed(1) },
  ];

  const getMetricColor = (value, key) => {
    if (key === 'safety' || key === 'onTimePerformance') {
      if (value >= 90) return 'text-emerald-400';
      if (value >= 80) return 'text-blue-400';
      if (value >= 70) return 'text-amber-400';
      return 'text-red-400';
    }
    return 'text-cyan-400';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-4">Airport Comparison</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-400">Metric</th>
                {selectedAirports.map((airport) => (
                  <th key={airport.code} className="text-center py-3 px-3">
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        <p className="font-bold text-white">{airport.code}</p>
                        <p className="text-xs text-slate-400">{airport.country}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onRemove(airport.code)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <X size={14} className="text-slate-400" />
                      </motion.button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, idx) => (
                <motion.tr
                  key={metric.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-3 text-xs font-semibold text-slate-400">{metric.label}</td>
                  {selectedAirports.map((airport) => {
                    const value = airport[metric.key];
                    const displayValue = metric.format ? metric.format(value) : value;
                    return (
                      <td key={airport.code} className="text-center py-3 px-3">
                        <span className={`font-bold ${getMetricColor(value, metric.key)}`}>
                          {displayValue}{metric.unit}
                        </span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Services Comparison */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Services</p>
          <div className="grid gap-3">
            {['Lounge', 'Medical', 'Dining', 'Shopping'].map((service) => (
              <div key={service} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400 w-20">{service}</span>
                <div className="flex gap-3 flex-1">
                  {selectedAirports.map((airport) => (
                    <div key={airport.code} className="flex-1 flex justify-center">
                      {airport.services.includes(service) ? (
                        <Check size={16} className="text-emerald-400" />
                      ) : (
                        <X size={16} className="text-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
