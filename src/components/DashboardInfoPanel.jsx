import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Zap, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCountrySafetyScore, getSafetyBreakdown } from '../utils/countrySafetyData';

const countryFlags = {
  'Japan': '🇯🇵', 'Singapore': '🇸🇬', 'Switzerland': '🇨🇭', 'Germany': '🇩🇪',
  'France': '🇫🇷', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
  'United States': '🇺🇸', 'Brazil': '🇧🇷', 'Mexico': '🇲🇽', 'India': '🇮🇳',
  'Thailand': '🇹🇭', 'Philippines': '🇵🇭', 'Indonesia': '🇮🇩', 'Egypt': '🇪🇬',
  'South Africa': '🇿🇦', 'Nigeria': '🇳🇬', 'Kenya': '🇰🇪', 'Pakistan': '🇵🇰',
  'Venezuela': '🇻🇪', 'Syria': '🇸🇾', 'Afghanistan': '🇦🇫', 'Italy': '🇮🇹',
  'Spain': '🇪🇸', 'Greece': '🇬🇷', 'Portugal': '🇵🇹', 'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪', 'Austria': '🇦🇹', 'Czech Republic': '🇨🇿', 'Poland': '🇵🇱',
  'Turkey': '🇹🇷', 'Russia': '🇷🇺', 'China': '🇨🇳', 'South Korea': '🇰🇷',
  'Vietnam': '🇻🇳', 'Malaysia': '🇲🇾', 'Colombia': '🇨🇴', 'Peru': '🇵🇪',
  'Argentina': '🇦🇷', 'Chile': '🇨🇱', 'Ukraine': '🇺🇦', 'Iraq': '🇮🇶',
  'Yemen': '🇾🇪', 'Somalia': '🇸🇴', 'New Zealand': '🇳🇿'
};

function DataBar({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-cyan-300">{label}</span>
        <span className="text-xs text-cyan-400">{value}%</span>
      </div>
      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-cyan-500/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color} shadow-lg`}
          style={{
            boxShadow: `0 0 10px ${color === 'bg-green-500' ? 'rgba(34,197,94,0.6)' : color === 'bg-yellow-500' ? 'rgba(234,179,8,0.6)' : 'rgba(239,68,68,0.6)'}`
          }}
        />
      </div>
    </div>
  );
}

export default function DashboardInfoPanel({ selectedCountry }) {
  const navigate = useNavigate();
  
  if (!selectedCountry) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-xl border-t border-l border-cyan-500/20 p-6 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(6,28,55,0.4) 100%)',
          boxShadow: 'inset 0 0 30px rgba(34,211,238,0.1)'
        }}
      >
        <div className="text-center">
          <MapPin size={48} className="text-cyan-400/30 mx-auto mb-3" />
          <p className="text-cyan-300/50 text-sm">Select a country to view details</p>
        </div>
      </motion.div>
    );
  }

  const safetyScore = getCountrySafetyScore(selectedCountry);
  const breakdown = getSafetyBreakdown(selectedCountry);
  const flag = countryFlags[selectedCountry] || '🌍';

  const getRiskColor = (score) => {
    if (score < 25) return 'text-green-400';
    if (score < 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLabel = (score) => {
    if (score < 25) return 'SAFE';
    if (score < 50) return 'MODERATE';
    return 'HIGH RISK';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 bg-black/40 backdrop-blur-xl border-t border-l border-cyan-500/20 p-6 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(6,28,55,0.4) 100%)',
        boxShadow: 'inset 0 0 30px rgba(34,211,238,0.1), -10px -10px 30px rgba(34,211,238,0.05)'
      }}
    >
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-cyan-500/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{flag}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedCountry}</h3>
              <p className="text-xs text-cyan-300/60">Global Travel Intelligence</p>
            </div>
          </div>
        </div>

        {/* Safety Score */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-cyan-300/60 mb-1">SAFETY SCORE</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${getRiskColor(safetyScore)}`}>
                {safetyScore}
              </span>
              <span className={`text-xs font-semibold ${getRiskColor(safetyScore)}`}>
                {getRiskLabel(safetyScore)}
              </span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full border-2 border-cyan-500/30 flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50"
            />
            <div className="text-center">
              <p className="text-xs text-cyan-300/60">Risk</p>
              <p className={`text-lg font-bold ${getRiskColor(safetyScore)}`}>
                {safetyScore}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Breakdown */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <AlertTriangle size={14} /> SAFETY METRICS
        </h4>
        {breakdown && Object.entries(breakdown).map(([key, value]) => {
          let color = 'bg-green-500';
          if (value > 50) color = 'bg-red-500';
          else if (value > 25) color = 'bg-yellow-500';
          return <DataBar key={key} label={key} value={value} color={color} />;
        })}
      </div>

      {/* Quick Info */}
      <div className="space-y-2 text-xs mb-6">
        <div className="flex items-center gap-2 text-cyan-300/70">
          <Heart size={14} className="text-red-400" />
          <span>Health Advisory: Check local requirements</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300/70">
          <Zap size={14} className="text-yellow-400" />
          <span>Travel Insurance: Highly recommended</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300/70">
          <Phone size={14} className="text-green-400" />
          <span>Emergency: Contact local embassy</span>
        </div>
      </div>

      {/* View More Button */}
      <motion.button
        onClick={() => navigate(`/destination/${encodeURIComponent(selectedCountry)}`)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-400/50 rounded-lg text-cyan-300 font-semibold hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-cyan-400/20 hover:border-cyan-300/70 transition-all flex items-center justify-center gap-2 group"
      >
        <span>View More Details</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
}
