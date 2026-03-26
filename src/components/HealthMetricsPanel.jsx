import { motion } from 'framer-motion';
import { getHealthData, getRiskColor } from '../utils/healthData';

export default function HealthMetricsPanel({ selectedCountry }) {
  const data = getHealthData(selectedCountry);

  if (!data) return null;

  const metrics = [
    { label: 'Water Safety', value: data.waterSafety, icon: '💧' },
    { label: 'Air Quality', value: data.airQuality, icon: '💨' },
    { label: 'Healthcare Quality', value: data.healthcareQuality, icon: '🏥' },
    { label: 'Heat Risk', value: data.heatRisk, icon: '🌡️' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-6">HEALTH METRICS</p>

      <div className="space-y-6">
        {metrics.map((metric, idx) => {
          const colors = getRiskColor(metric.value, 33, 66);
          const isHighValue = metric.label === 'Water Safety' || metric.label === 'Air Quality' || metric.label === 'Healthcare Quality';
          const displayValue = isHighValue ? metric.value : metric.value;
          const riskValue = isHighValue ? 100 - metric.value : metric.value;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{metric.icon}</span>
                  <label className="text-sm font-semibold text-white">{metric.label}</label>
                </div>
                <motion.span
                  className={`text-sm font-bold ${colors.text}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {displayValue}%
                </motion.span>
              </div>

              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className={`h-full ${colors.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${displayValue}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    boxShadow: `0 0 10px ${colors.bar === 'bg-emerald-500' ? 'rgba(34,197,94,0.5)' : colors.bar === 'bg-amber-500' ? 'rgba(217,119,6,0.5)' : 'rgba(239,68,68,0.5)'}`
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {isHighValue ? 'Safety Level' : 'Risk Level'}: {displayValue}%
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Climate Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-2">CLIMATE & ALTITUDE</p>
        <p className="text-sm text-slate-300 mb-2">{data.climateRisk}</p>
        <p className="text-xs text-slate-500">{data.altitudeSickness}</p>
      </motion.div>
    </motion.div>
  );
}
