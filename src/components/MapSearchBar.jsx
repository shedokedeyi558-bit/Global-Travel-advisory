import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

const locations = [
  'Singapore', 'Bangkok', 'Tokyo', 'Sydney', 'Paris',
  'New York', 'London', 'Dubai', 'Hong Kong', 'Seoul'
];

export default function MapSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = locations.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location);
    setShowSuggestions(false);
    onSearch(location);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 w-96"
    >
      <div className="relative">
        {/* Search Input */}
        <div className="flex gap-2 rounded-2xl backdrop-blur-xl border border-white/10 p-3 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <Search size={20} className="text-blue-400/50 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search location..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm"
          />
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all"
          >
            Search
          </motion.button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl overflow-hidden"
          >
            {suggestions.map((location, idx) => (
              <motion.button
                key={location}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => handleSelectLocation(location)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
              >
                <MapPin size={16} className="text-blue-400" />
                <span className="text-sm text-slate-300">{location}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
