import { motion } from 'framer-motion';
import { CardSkeleton } from './SkeletonLoader';

export default function CurrencyConverter({ rates, baseCurrency, loading }) {
  if (loading) return <CardSkeleton />;

  const conversions = [
    { from: 'USD', to: baseCurrency, rate: rates?.USD || 1 },
    { from: 'EUR', to: baseCurrency, rate: rates?.EUR || 0.92 },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-sm font-semibold text-slate-300">Currency Conversion</h3>
      <div className="grid grid-cols-2 gap-4">
        {conversions.map((conv, idx) => (
          <motion.div
            key={idx}
            className="p-4 rounded-lg bg-slate-800 border border-slate-700"
            whileHover={{ y: -2 }}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">{conv.from} to {conv.to}</p>
            <p className="text-2xl font-bold text-white">
              1 {conv.from} = {typeof conv.rate === 'number' ? conv.rate.toFixed(2) : '0.00'} {conv.to}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
