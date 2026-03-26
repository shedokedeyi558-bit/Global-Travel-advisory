import { motion } from 'framer-motion';
import { getRiskLevel, getRiskColor } from '../utils/api';
import { ProgressSkeleton } from './SkeletonLoader';

export default function RiskScore({ score, loading }) {
  if (loading) return <ProgressSkeleton />;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getRiskColor(score);
  const level = getRiskLevel(score);

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-200"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color }}
          >
            {score}
          </motion.div>
          <div className="text-xs font-semibold text-slate-300 mt-1">RISK SCORE</div>
        </div>
      </div>
      <motion.div
        className="mt-6 px-4 py-2 rounded-full font-bold text-sm"
        style={{ backgroundColor: `${color}20`, color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {level}
      </motion.div>
    </motion.div>
  );
}
