import { motion } from 'framer-motion';

export const CardSkeleton = () => (
  <motion.div
    className="bg-slate-700 rounded-lg h-32 animate-pulse"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);

export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <motion.div
        key={i}
        className="bg-slate-700 rounded h-4 animate-pulse"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
);

export const ProgressSkeleton = () => (
  <motion.div
    className="w-32 h-32 rounded-full bg-slate-700 animate-pulse"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);
