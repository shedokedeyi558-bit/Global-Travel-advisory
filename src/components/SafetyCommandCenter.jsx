import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCountrySafetyScore, getSafetyBreakdown } from '../utils/countrySafetyData';

const topCountries = [
  'Singapore', 'Switzerland', 'New Zealand', 'Canada', 'Japan',
  'Germany', 'Australia', 'South Korea', 'France', 'Spain'
];

const countryFlags = {
  'Singapore': '🇸🇬', 'Switzerland': '🇨🇭', 'New Zealand': '🇳🇿', 'Canada': '🇨🇦',
  'Japan': '🇯🇵', 'Germany': '🇩🇪', 'Australia': '🇦🇺', 'South Korea': '🇰🇷',
  'France': '🇫🇷', 'Spain': '🇪🇸'
};

export default function SafetyCommandCenter({ selectedCountry, onCountrySelect }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const score = selectedCountry ? getCountrySafetyScore(selectedCountry) : 95;
  const flag = selectedCountry ? countryFlags[selectedCountry] : '🌍';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getRiskColor = (s) => {
    if (s < 25) return { bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/30' };
    if (s < 50) return { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', glow: 'shadow-amber-500/30' };
    return { bg: 'from-red-500/20 to-red-600/10', text: 'text-red-400', glow: 'shadow-red-500/30' };
  };

  const colors = getRiskColor(score);

  return (
    <div className="space-y-8">
      {/* Hero Scorecard - Safety Command Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-3xl backdrop-blur-2xl border border-white/10 p-12 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)'
          }}
        />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Country Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest mb-3">SAFETY COMMAND CENTER</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">{flag}</span>
                <div>
                  <h1 className="text-4xl font-black text-white leading-tight">
                    {selectedCountry || 'Global'}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">Real-time Safety Intelligence</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 mb-2">RISK ASSESSMENT</p>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-5xl font-black ${colors.text}`}>{score}</span>
                    <span className={`text-sm font-semibold ${colors.text} uppercase`}>
                      {score < 25 ? 'Safe' : score < 50 ? 'Moderate' : 'High Risk'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Radial Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-48 h-48">
                {/* Outer ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  {/* Progress arc */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="url(#pulseGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${(score / 100) * 534} 534`}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 534' }}
                    animate={{ strokeDasharray: `${(score / 100) * 534} 534` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <p className="text-xs text-slate-400 mb-1">SAFETY PULSE</p>
                    <p className={`text-3xl font-black ${colors.text}`}>{score}%</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Country Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest mb-4">SELECT DESTINATION</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {topCountries.map((country, idx) => (
            <motion.button
              key={country}
              onClick={() => onCountrySelect(country)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-3 rounded-xl backdrop-blur-xl border transition-all ${
                selectedCountry === country
                  ? 'border-amber-400/60 bg-amber-500/20 shadow-lg shadow-amber-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">{countryFlags[country]}</div>
              <p className="text-xs font-semibold text-white">{country}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
