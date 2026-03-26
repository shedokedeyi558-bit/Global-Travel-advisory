import { motion } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

export default function SafetyAlerts({ riskScore }) {
  const alerts = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Heavy rainfall expected',
      description: 'Prepare for potential flooding in low-lying areas',
      color: 'bg-yellow-900/20 border-yellow-700',
      iconColor: 'text-yellow-400',
    },
    {
      type: 'info',
      icon: Info,
      title: 'Travel notice',
      description: 'Check local travel advisories before departure',
      color: 'bg-blue-900/20 border-blue-700',
      iconColor: 'text-blue-400',
    },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <AlertCircle size={18} className="text-red-500" /> Active Safety Alerts
      </h3>
      <div className="space-y-3">
        {alerts.map((alert, idx) => {
          const IconComponent = alert.icon;
          return (
            <motion.div
              key={idx}
              className={`p-4 rounded-lg border ${alert.color}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex gap-3">
                <IconComponent size={20} className={`flex-shrink-0 mt-0.5 ${alert.iconColor}`} />
                <div>
                  <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{alert.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
