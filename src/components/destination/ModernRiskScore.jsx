import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export default function ModernRiskScore({ score, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse h-64 bg-slate-800 rounded-2xl" />
    );
  }

  const getRiskInfo = (score) => {
    if (score >= 80) {
      return {
        label: 'Safe for Travel',
        description: 'Excellent conditions for travelers',
        icon: CheckCircle,
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        border: 'border-green-700',
        ring: 'ring-green-500/30',
        gradient: 'from-green-900/20 to-transparent',
      };
    }
    if (score >= 60) {
      return {
        label: 'Moderate Caution',
        description: 'Generally safe with minor precautions',
        icon: Shield,
        color: 'text-yellow-400',
        bg: 'bg-yellow-900/20',
        border: 'border-yellow-700',
        ring: 'ring-yellow-500/30',
        gradient: 'from-yellow-900/20 to-transparent',
      };
    }
    if (score >= 40) {
      return {
        label: 'Caution Advised',
        description: 'Exercise increased caution',
        icon: AlertTriangle,
        color: 'text-orange-400',
        bg: 'bg-orange-900/20',
        border: 'border-orange-700',
        ring: 'ring-orange-500/30',
        gradient: 'from-orange-900/20 to-transparent',
      };
    }
    return {
      label: 'High Risk Area',
      description: 'Significant risks present',
      icon: AlertCircle,
      color: 'text-red-400',
      bg: 'bg-red-900/20',
      border: 'border-red-700',
      ring: 'ring-red-500/30',
      gradient: 'from-red-900/20 to-transparent',
    };
  };

  const riskInfo = getRiskInfo(score);
  const Icon = riskInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${riskInfo.gradient}
        border ${riskInfo.border}
        p-8 md:p-10
        shadow-lg
      `}
    >
      {/* Animated Ring Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-0 ring-2 ${riskInfo.ring} rounded-2xl`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`p-4 rounded-full ${riskInfo.bg} border ${riskInfo.border}`}
        >
          <Icon size={48} className={riskInfo.color} />
        </motion.div>

        {/* Score */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-7xl font-black text-white mb-2"
          >
            {score}
            <span className="text-3xl text-slate-400">/100</span>
          </motion.div>
          <p className={`text-xl font-bold ${riskInfo.color}`}>
            {riskInfo.label}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm md:text-base max-w-sm">
          {riskInfo.description}
        </p>

        {/* Info Badge */}
        <div className="pt-4 border-t border-slate-700/50 w-full">
          <p className="text-xs text-slate-400">
            Based on weather, safety, and live data
          </p>
        </div>
      </div>
    </motion.div>
  );
}
