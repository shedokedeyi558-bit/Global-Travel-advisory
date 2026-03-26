import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function DailyCosts() {
  const costs = [
    { category: 'Budget Hotel', price: '$25-50' },
    { category: 'Mid-range Meal', price: '$10-20' },
    { category: 'Local Transport', price: '$5-15' },
    { category: 'Activities', price: '$15-40' },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Wallet size={18} className="text-primary" /> Daily Costs
      </h3>
      <div className="space-y-3">
        {costs.map((cost, idx) => (
          <motion.div
            key={idx}
            className="flex justify-between items-center p-3 rounded-lg bg-slate-800 border border-slate-700"
            whileHover={{ x: 4 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="text-sm font-medium text-slate-300">{cost.category}</span>
            <span className="text-sm font-bold text-primary">{cost.price}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
