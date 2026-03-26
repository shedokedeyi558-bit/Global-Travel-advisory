import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

export default function FilterModal({ isOpen, onClose, filters, setFilters }) {
  const regions = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];
  const riskLevels = [
    { label: 'All', value: 'All', color: 'bg-slate-600' },
    { label: 'Safe', value: 'Safe', color: 'bg-emerald-600' },
    { label: 'Moderate', value: 'Moderate', color: 'bg-yellow-600' },
    { label: 'High Risk', value: 'High', color: 'bg-red-600' }
  ];

  const handleReset = () => {
    setFilters({ region: 'All', riskLevel: 'All', search: '' });
  };

  const handleApply = () => {
    onClose();
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
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 rounded-t-3xl border-t border-yellow-500/20 max-h-[90vh] overflow-y-auto"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-zinc-900 px-4 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Filters</h3>
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
            <div className="px-4 py-6 space-y-6 pb-24">
              {/* Region Filter */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  Region
                </label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <motion.button
                      key={region}
                      onClick={() => setFilters({ ...filters, region })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        filters.region === region
                          ? 'bg-yellow-500/30 border border-yellow-400/60 text-yellow-300'
                          : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-yellow-400/40'
                      }`}
                    >
                      {region}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Risk Level Filter */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  Risk Level
                </label>
                <div className="space-y-2">
                  {riskLevels.map((level) => (
                    <motion.button
                      key={level.value}
                      onClick={() => setFilters({ ...filters, riskLevel: level.value })}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        filters.riskLevel === level.value
                          ? 'bg-slate-700 border border-yellow-400/60'
                          : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span className={filters.riskLevel === level.value ? 'text-yellow-300' : 'text-slate-400'}>
                        {level.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 to-zinc-900/80 px-4 py-4 border-t border-slate-700 flex gap-3">
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </motion.button>
              <motion.button
                onClick={handleApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
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
