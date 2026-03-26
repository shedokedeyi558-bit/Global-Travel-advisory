import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SmartSearchSuggestions from './SmartSearchSuggestions';
import { scaleIn, hoverScale } from '../utils/animations';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      console.log('Searching for destination:', location);
      navigate(`/destination/${encodeURIComponent(location.trim())}`);
      setShowSuggestions(false);
    } else {
      console.warn('Search field is empty');
      alert('Please enter a destination to analyze');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setLocation('');
  };

  const trendingLocations = ['Tokyo', 'Paris', 'Singapore', 'Zermatt'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mx-auto mt-12 max-w-2xl relative"
    >
      <motion.div
        className="relative flex flex-col sm:flex-row items-center rounded-2xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 p-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-primary focus-within:bg-slate-800/95"
        whileFocus={{ boxShadow: '0 0 0 3px rgba(212, 175, 55, 0.1)' }}
      >
        <span className="material-symbols-outlined ml-4 text-slate-400 text-xl">search</span>
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(location.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search country, city, or airport..."
          className="w-full border-0 bg-transparent px-4 py-3 sm:py-4 text-white placeholder-slate-400 focus:ring-0 focus:outline-none text-base sm:text-lg"
          aria-label="Search destination"
        />
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto mt-2 sm:mt-0 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 whitespace-nowrap"
          aria-label="Analyze destination"
        >
          Analyze Destination
        </motion.button>
      </motion.div>

      {/* Smart Suggestions */}
      {showSuggestions && (
        <SmartSearchSuggestions 
          searchTerm={location} 
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      <motion.div
        className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-slate-200 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>Trending:</span>
        {trendingLocations.map((loc) => (
          <motion.button
            key={loc}
            onClick={() => navigate(`/destination/${encodeURIComponent(loc)}`)}
            className="hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {loc}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
