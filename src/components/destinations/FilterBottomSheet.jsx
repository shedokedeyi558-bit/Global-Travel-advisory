import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function FilterBottomSheet({ isOpen, onClose, filters, onFilterChange, onReset }) {
  const riskLevels = [
    { id: 'safe', label: 'Safe (0-30)', color: 'bg-green-500/20 border-green-400/60' },
    { id: 'moderate', label: 'Moderate (30-60)', color: 'bg-yellow-500/20 border-yellow-400/60' },
    { id: 'caution', label: 'Caution (60-80)', color: 'bg-orange-500/20 border-orange-400/60' },
    { id: 'high', label: 'High Risk (80+)', color: 'bg-red-500/20 border-red-400/60' },
  ];

  const regions = [
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia' },
    { id: 'americas', label: 'Americas' },
    { id: 'africa', label: 'Africa' },
    { id: 'oceania', label: 'Oceania' },
  ];

  const budgets = [
    { id: 'budget', label: 'Budget ($)' },
    { id: 'moderate', label: 'Moderate ($$)' },
    { id: 'luxury', label: 'Luxury ($$$)' },
  ];

  const toggleFilter = (category, id) => {
    const current = filters[category] || [];
    const updated = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    onFilterChange(category, updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 rounded-t-3xl max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-10 pb-28">
              {/* Risk Level */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Risk Level</h3>
                <div className="space-y-3">
                  {riskLevels.map(level => (
                    <motion.button
                      key={level.id}
                      onClick={() => toggleFilter('risk', level.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        filters.risk?.includes(level.id)
                          ? `${level.color} border-opacity-100`
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base font-semibold text-white">{level.label}</span>
                      {filters.risk?.includes(level.id) && (
                        <Check size={20} className="text-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Region</h3>
                <div className="space-y-3">
                  {regions.map(region => (
                    <motion.button
                      key={region.id}
                      onClick={() => toggleFilter('region', region.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        filters.region?.includes(region.id)
                          ? 'bg-primary/20 border-primary/60'
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base font-semibold text-white">{region.label}</span>
                      {filters.region?.includes(region.id) && (
                        <Check size={20} className="text-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Budget</h3>
                <div className="space-y-3">
                  {budgets.map(budget => (
                    <motion.button
                      key={budget.id}
                      onClick={() => toggleFilter('budget', budget.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        filters.budget?.includes(budget.id)
                          ? 'bg-emerald-500/20 border-emerald-400/60'
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-base font-semibold text-white">{budget.label}</span>
                      {filters.budget?.includes(budget.id) && (
                        <Check size={20} className="text-emerald-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gradient-to-t from-slate-900 to-slate-900/80 border-t border-slate-800 px-6 py-5 flex gap-4">
              <motion.button
                onClick={onReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors text-base"
              >
                Reset
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-black font-bold transition-colors text-base"
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
