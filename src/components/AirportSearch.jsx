import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { searchAirports } from '../utils/airportData';

export default function AirportSearch({ onSelect, selectedAirport }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const results = searchAirports(query);
      setSuggestions(results);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (airport) => {
    onSelect(airport);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400/60" />
        <input
          type="text"
          placeholder="Search by code, city, or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors"
        />
        {query && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X size={16} className="text-slate-400" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-lg backdrop-blur-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 shadow-xl z-[9999] max-h-64 overflow-y-auto"
          >
            {suggestions.map((airport, idx) => (
              <motion.button
                key={airport.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelect(airport)}
                className="w-full px-4 py-3 text-left hover:bg-white/10 border-b border-white/5 last:border-b-0 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{airport.code}</p>
                    <p className="text-xs text-slate-400">{airport.name}</p>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">{airport.country}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedAirport && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-blue-500/20 border border-blue-400/30"
        >
          <p className="text-xs text-blue-400/60 uppercase tracking-widest mb-1">Selected</p>
          <p className="text-sm font-semibold text-white">{selectedAirport.code} - {selectedAirport.name}</p>
        </motion.div>
      )}
    </div>
  );
}
