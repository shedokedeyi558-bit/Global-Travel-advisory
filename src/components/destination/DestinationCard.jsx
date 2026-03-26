import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function DestinationCard({ title, subtitle, score, icon, children }) {
  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/60';
    return 'bg-red-500/20 text-red-300 border-red-400/60';
  };

  const getRiskLabel = (score) => {
    if (score >= 80) return '🟢 Safe';
    if (score >= 60) return '🟡 Moderate';
    return '🔴 High';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-4 shadow-lg shadow-yellow-500/5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {icon && <div className="text-2xl mb-2">{icon}</div>}
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {score !== undefined && (
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(score)}`}>
            {getRiskLabel(score)}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}
