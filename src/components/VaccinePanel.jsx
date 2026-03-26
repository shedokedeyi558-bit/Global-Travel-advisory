import { motion } from 'framer-motion';
import { getHealthData } from '../utils/healthData';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function VaccinePanel({ selectedCountry }) {
  const data = getHealthData(selectedCountry);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-6">VACCINATION REQUIREMENTS</p>

      {/* Required Vaccines */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={18} className="text-red-400" />
          <h3 className="font-semibold text-white">Required Vaccines</h3>
        </div>
        {data.vaccines.required.length > 0 ? (
          <div className="space-y-2">
            {data.vaccines.required.map((vaccine, idx) => (
              <motion.div
                key={vaccine}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm text-slate-300">{vaccine}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No required vaccines</p>
        )}
      </div>

      {/* Recommended Vaccines */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={18} className="text-amber-400" />
          <h3 className="font-semibold text-white">Recommended Vaccines</h3>
        </div>
        {data.vaccines.recommended.length > 0 ? (
          <div className="space-y-2">
            {data.vaccines.recommended.map((vaccine, idx) => (
              <motion.div
                key={vaccine}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm text-slate-300">{vaccine}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No recommended vaccines</p>
        )}
      </div>
    </motion.div>
  );
}
