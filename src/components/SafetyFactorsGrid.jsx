import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, AlertTriangle, TrendingDown, Info, Wrench } from 'lucide-react';
import { getSafetyBreakdown } from '../utils/countrySafetyData';

const factors = [
  { key: 'Crime Rate', icon: Shield, color: 'from-blue-500/20 to-blue-600/10', accent: 'text-blue-400' },
  { key: 'Health Risk', icon: Heart, color: 'from-red-500/20 to-red-600/10', accent: 'text-red-400' },
  { key: 'Natural Disasters', icon: AlertTriangle, color: 'from-orange-500/20 to-orange-600/10', accent: 'text-orange-400' },
  { key: 'Political Stability', icon: TrendingDown, color: 'from-purple-500/20 to-purple-600/10', accent: 'text-purple-400' },
  { key: 'Travel Advisory', icon: Info, color: 'from-cyan-500/20 to-cyan-600/10', accent: 'text-cyan-400' },
  { key: 'Infrastructure', icon: Wrench, color: 'from-green-500/20 to-green-600/10', accent: 'text-green-400' },
];

export default function SafetyFactorsGrid({ selectedCountry }) {
  const [hoveredFactor, setHoveredFactor] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const breakdown = selectedCountry ? getSafetyBreakdown(selectedCountry) : null;

  const handleMouseMove = (e, factorKey) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredFactor(factorKey);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <p className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest mb-6">SAFETY FACTORS</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map((factor, idx) => {
          const IconComponent = factor.icon;
          const value = breakdown ? breakdown[factor.key] : 0;
          const isHovered = hoveredFactor === factor.key;

          return (
            <motion.div
              key={factor.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              onMouseMove={(e) => handleMouseMove(e, factor.key)}
              onMouseLeave={() => setHoveredFactor(null)}
              className="relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/30 to-slate-950/30 transition-all cursor-pointer group"
              style={{
                boxShadow: isHovered ? '0 20px 40px -10px rgba(0,0,0,0.3)' : '0 10px 20px -10px rgba(0,0,0,0.2)'
              }}
            >
              {/* Spotlight effect */}
              {isHovered && (
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${
                      factor.accent === 'text-blue-400' ? 'rgba(96,165,250,0.2)' :
                      factor.accent === 'text-red-400' ? 'rgba(248,113,113,0.2)' :
                      factor.accent === 'text-orange-400' ? 'rgba(251,146,60,0.2)' :
                      factor.accent === 'text-purple-400' ? 'rgba(168,85,247,0.2)' :
                      factor.accent === 'text-cyan-400' ? 'rgba(34,211,238,0.2)' :
                      'rgba(74,222,128,0.2)'
                    }, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(30px)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${factor.color} flex items-center justify-center mb-4 transition-all`}
                  animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                >
                  <IconComponent size={24} className={factor.accent} />
                </motion.div>

                {/* Title */}
                <h3 className="font-bold text-white mb-2 text-sm">{factor.key}</h3>

                {/* Value Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-slate-400">Risk Level</p>
                    <motion.span
                      className={`text-sm font-bold ${factor.accent}`}
                      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    >
                      {value}%
                    </motion.span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${factor.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Status */}
                <p className="text-xs text-slate-500">
                  {value < 25 ? '✓ Low' : value < 50 ? '⚠ Moderate' : '✕ High'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
