import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

const countries = [
  'Singapore', 'Thailand', 'Switzerland', 'Japan', 'Brazil',
  'India', 'Canada', 'Egypt', 'Peru', 'Kenya'
];

const countryFlags = {
  'Singapore': '🇸🇬', 'Thailand': '🇹🇭', 'Switzerland': '🇨🇭', 'Japan': '🇯🇵',
  'Brazil': '🇧🇷', 'India': '🇮🇳', 'Canada': '🇨🇦', 'Egypt': '🇪🇬',
  'Peru': '🇵🇪', 'Kenya': '🇰🇪'
};

export default function HealthCountrySelector({ selectedCountry, onCountrySelect }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-4">SELECT DESTINATION</p>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-3 text-blue-400/50" />
        <input
          type="text"
          placeholder="Search country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-black/30 border border-blue-500/30 rounded-lg text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-400/60 focus:bg-black/50 transition-all text-sm"
        />
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {filteredCountries.map((country) => (
          <motion.button
            key={country}
            onClick={() => onCountrySelect(country)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-2 rounded-lg backdrop-blur-xl border transition-all text-center ${
              selectedCountry === country
                ? 'border-blue-400/60 bg-blue-500/20 shadow-lg shadow-blue-500/20'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="text-xl mb-1">{countryFlags[country]}</div>
            <p className="text-xs font-semibold text-white truncate">{country}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
