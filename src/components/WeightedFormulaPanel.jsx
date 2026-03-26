import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCountrySafetyScore } from '../utils/countrySafetyData';

const defaultWeights = {
  'Crime Rate': 0.25,
  'Political Stability': 0.20,
  'Health Risk': 0.15,
  'Natural Disasters': 0.15,
  'Travel Advisory': 0.15,
  'Infrastructure': 0.10,
};

export default function WeightedFormulaPanel({ selectedCountry, topCountries }) {
  const [weights, setWeights] = useState(defaultWeights);

  const handleWeightChange = (factor, value) => {
    const newWeights = { ...weights, [factor]: value };
    const total = Object.values(newWeights).reduce((a, b) => a + b, 0);
    
    // Normalize to 1.0
    const normalized = {};
    Object.keys(newWeights).forEach(key => {
      normalized[key] = newWeights[key] / total;
    });
    
    setWeights(normalized);
  };

  const resetWeights = () => setWeights(defaultWeights);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-3xl backdrop-blur-2xl border border-white/10 p-8 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest mb-2">FORMULA WEIGHTS</p>
          <h3 className="text-2xl font-bold text-white">Customize Safety Calculation</h3>
        </div>
        <motion.button
          onClick={resetWeights}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-semibold hover:bg-amber-500/30 transition-all"
        >
          Reset
        </motion.button>
      </div>

      <div className="space-y-6">
        {Object.entries(weights).map(([factor, weight], idx) => (
          <motion.div
            key={factor}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-white">{factor}</label>
              <motion.span
                className="text-sm font-bold text-amber-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {(weight * 100).toFixed(0)}%
              </motion.span>
            </div>

            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500/60 to-amber-400/40"
                initial={{ width: 0 }}
                animate={{ width: `${weight * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weight}
              onChange={(e) => handleWeightChange(factor, parseFloat(e.target.value))}
              className="w-full mt-2 h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-amber-400"
              style={{
                background: 'transparent'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Total check */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">Total Weight</p>
          <motion.p
            className={`text-sm font-bold ${
              Math.abs(Object.values(weights).reduce((a, b) => a + b, 0) - 1) < 0.01
                ? 'text-emerald-400'
                : 'text-amber-400'
            }`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            {(Object.values(weights).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
