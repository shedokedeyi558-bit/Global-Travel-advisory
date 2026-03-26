import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const alerts = [
  { id: 1, title: 'Dengue Alert', location: 'Bangkok', severity: 'high', time: '2 hours ago' },
  { id: 2, title: 'Air Quality Warning', location: 'Tokyo', severity: 'medium', time: '4 hours ago' },
  { id: 3, title: 'Heavy Rain Expected', location: 'Sydney', severity: 'low', time: '1 hour ago' },
  { id: 4, title: 'Road Closure', location: 'Paris', severity: 'medium', time: '30 minutes ago' },
];

export default function MapAlertsFeed() {
  const getSeverityIcon = (severity) => {
    if (severity === 'high') return <AlertCircle size={18} className="text-red-400" />;
    if (severity === 'medium') return <AlertTriangle size={18} className="text-amber-400" />;
    return <Info size={18} className="text-blue-400" />;
  };

  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'from-red-500/20 to-red-600/10 border-red-500/20';
    if (severity === 'medium') return 'from-amber-500/20 to-amber-600/10 border-amber-500/20';
    return 'from-blue-500/20 to-blue-600/10 border-blue-500/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-4 top-24 z-40 w-80 rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl max-h-96 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-4">ACTIVE ALERTS</p>

      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br ${getSeverityColor(alert.severity)} border`}
          >
            <div className="flex-shrink-0 mt-1">
              {getSeverityIcon(alert.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
              <p className="text-xs text-slate-400">{alert.location}</p>
              <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
