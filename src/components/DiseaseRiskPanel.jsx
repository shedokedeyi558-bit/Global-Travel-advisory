import { motion } from 'framer-motion';
import { getHealthData, getRiskColor } from '../utils/healthData';
import { AlertTriangle } from 'lucide-react';

export default function DiseaseRiskPanel({ selectedCountry }) {
  const data = getHealthData(selectedCountry);

  if (!data) return null;

  const diseases = Object.entries(data.diseases).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={18} className="text-orange-400" />
        <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest">DISEASE RISKS</p>
      </div>

      <div className="space-y-4">
        {diseases.map(([disease, risk], idx) => {
          const colors = getRiskColor(risk);

          return (
            <motion.div
              key={disease}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{disease}</span>
                <motion.span
                  className={`text-sm font-bold ${colors.text}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {risk}%
                </motion.span>
              </div>

              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className={`h-full ${colors.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${risk}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    boxShadow: `0 0 8px ${colors.bar === 'bg-emerald-500' ? 'rgba(34,197,94,0.5)' : colors.bar === 'bg-amber-500' ? 'rgba(217,119,6,0.5)' : 'rgba(239,68,68,0.5)'}`
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {risk < 33 ? 'Low Risk' : risk < 66 ? 'Moderate Risk' : 'High Risk'}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
