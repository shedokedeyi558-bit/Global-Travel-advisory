import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Map } from 'lucide-react';
import DestinationCard from './DestinationCard';
import FeaturedSection from './FeaturedSection';
import FilterBottomSheet from './FilterBottomSheet';
import { getCountrySafetyScore } from '../../utils/countrySafetyData';

const countries = [
  { name: 'Japan', flag: '🇯🇵', region: 'asia' },
  { name: 'Singapore', flag: '🇸🇬', region: 'asia' },
  { name: 'Switzerland', flag: '🇨🇭', region: 'europe' },
  { name: 'Norway', flag: '🇳🇴', region: 'europe' },
  { name: 'Iceland', flag: '🇮🇸', region: 'europe' },
  { name: 'Finland', flag: '🇫🇮', region: 'europe' },
  { name: 'Denmark', flag: '🇩🇰', region: 'europe' },
  { name: 'Germany', flag: '🇩🇪', region: 'europe' },
  { name: 'France', flag: '🇫🇷', region: 'europe' },
  { name: 'United Kingdom', flag: '🇬🇧', region: 'europe' },
  { name: 'Canada', flag: '🇨🇦', region: 'americas' },
  { name: 'Australia', flag: '🇦🇺', region: 'oceania' },
  { name: 'New Zealand', flag: '🇳🇿', region: 'oceania' },
  { name: 'Ireland', flag: '🇮🇪', region: 'europe' },
  { name: 'Sweden', flag: '🇸🇪', region: 'europe' },
  { name: 'United States', flag: '🇺🇸', region: 'americas' },
  { name: 'Brazil', flag: '🇧🇷', region: 'americas' },
  { name: 'Mexico', flag: '🇲🇽', region: 'americas' },
  { name: 'India', flag: '🇮🇳', region: 'asia' },
  { name: 'Thailand', flag: '🇹🇭', region: 'asia' },
  { name: 'Philippines', flag: '🇵🇭', region: 'asia' },
  { name: 'Indonesia', flag: '🇮🇩', region: 'asia' },
  { name: 'Egypt', flag: '🇪🇬', region: 'africa' },
  { name: 'South Africa', flag: '🇿🇦', region: 'africa' },
  { name: 'Nigeria', flag: '🇳🇬', region: 'africa' },
  { name: 'Kenya', flag: '🇰🇪', region: 'africa' },
  { name: 'Pakistan', flag: '🇵🇰', region: 'asia' },
  { name: 'Venezuela', flag: '🇻🇪', region: 'americas' },
  { name: 'Syria', flag: '🇸🇾', region: 'asia' },
  { name: 'Afghanistan', flag: '🇦🇫', region: 'asia' },
  { name: 'Italy', flag: '🇮🇹', region: 'europe' },
  { name: 'Spain', flag: '🇪🇸', region: 'europe' },
  { name: 'Greece', flag: '🇬🇷', region: 'europe' },
  { name: 'Portugal', flag: '🇵🇹', region: 'europe' },
  { name: 'Netherlands', flag: '🇳🇱', region: 'europe' },
  { name: 'Belgium', flag: '🇧🇪', region: 'europe' },
  { name: 'Austria', flag: '🇦🇹', region: 'europe' },
  { name: 'Czech Republic', flag: '🇨🇿', region: 'europe' },
  { name: 'Poland', flag: '🇵🇱', region: 'europe' },
  { name: 'Turkey', flag: '🇹🇷', region: 'asia' },
  { name: 'Russia', flag: '🇷🇺', region: 'europe' },
  { name: 'China', flag: '🇨🇳', region: 'asia' },
  { name: 'South Korea', flag: '🇰🇷', region: 'asia' },
  { name: 'Vietnam', flag: '🇻🇳', region: 'asia' },
  { name: 'Malaysia', flag: '🇲🇾', region: 'asia' },
  { name: 'Colombia', flag: '🇨🇴', region: 'americas' },
  { name: 'Peru', flag: '🇵🇪', region: 'americas' },
  { name: 'Argentina', flag: '🇦🇷', region: 'americas' },
  { name: 'Chile', flag: '🇨🇱', region: 'americas' },
  { name: 'Ukraine', flag: '🇺🇦', region: 'europe' },
  { name: 'Iraq', flag: '🇮🇶', region: 'asia' },
  { name: 'Yemen', flag: '🇾🇪', region: 'asia' },
  { name: 'Somalia', flag: '🇸🇴', region: 'africa' },
];

export default function MobileDestinationsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ risk: [], region: [], budget: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(15);

  // Get all countries with scores
  const countriesWithScores = countries.map(country => ({
    ...country,
    score: getCountrySafetyScore(country.name),
  }));

  // Get featured destinations (safe countries)
  const featuredDestinations = countriesWithScores
    .filter(c => c.score < 30)
    .sort((a, b) => a.score - b.score)
    .slice(0, 6);

  // Filter logic
  const filteredCountries = countriesWithScores.filter(country => {
    // Search filter
    if (searchQuery && !country.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Risk filter
    if (filters.risk.length > 0) {
      const riskLevel = country.score;
      const matchesRisk = filters.risk.some(risk => {
        if (risk === 'safe') return riskLevel < 30;
        if (risk === 'moderate') return riskLevel >= 30 && riskLevel < 60;
        if (risk === 'caution') return riskLevel >= 60 && riskLevel < 80;
        if (risk === 'high') return riskLevel >= 80;
        return false;
      });
      if (!matchesRisk) return false;
    }

    // Region filter
    if (filters.region.length > 0) {
      if (!filters.region.includes(country.region)) return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setFilters({ risk: [], region: [], budget: [] });
    setDisplayCount(15);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value,
    }));
    setDisplayCount(15); // Reset to first page when filters change
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 15);
  };

  return (
    <div className="bg-black min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-16 z-30 bg-black/95 backdrop-blur-md border-b border-slate-800 px-4 py-5"
      >
        {/* Title */}
        <div className="mb-5">
          <p className="text-green-400 text-[10px] font-extrabold tracking-[0.2em] mb-2 uppercase">Discover</p>
          <h1 className="text-3xl font-bold text-white">Destinations</h1>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-9 pr-3 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-primary focus:outline-none transition-colors text-sm"
            />
          </div>
          <motion.button
            onClick={() => setShowFilters(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-primary/20 border border-primary/60 rounded-lg text-primary font-semibold hover:bg-primary/30 transition-colors flex items-center gap-1"
          >
            <Filter size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-28 space-y-10">
        {/* Featured Section */}
        {filteredCountries.length > 0 && !searchQuery && filters.risk.length === 0 && filters.region.length === 0 && (
          <FeaturedSection destinations={featuredDestinations} />
        )}

        {/* Results Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? 'Search Results' : 'All Destinations'}
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Showing {Math.min(displayCount, filteredCountries.length)} of {filteredCountries.length} destination{filteredCountries.length !== 1 ? 's' : ''}
              </p>
            </div>
            {(searchQuery || filters.risk.length > 0 || filters.region.length > 0) && (
              <motion.button
                onClick={handleResetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Clear
              </motion.button>
            )}
          </div>

          {/* Destinations Grid */}
          {filteredCountries.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5">
                {filteredCountries.slice(0, displayCount).map((country, index) => (
                  <DestinationCard
                    key={country.name}
                    country={country}
                    score={country.score}
                    index={index}
                    featured={false}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {displayCount < filteredCountries.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 flex justify-center"
                >
                  <motion.button
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/60 rounded-lg text-primary font-bold text-base hover:from-primary/30 hover:to-primary/20 transition-all shadow-lg hover:shadow-primary/20"
                  >
                    Load More Destinations
                  </motion.button>
                </motion.div>
              )}

              {/* All Loaded Message */}
              {displayCount >= filteredCountries.length && filteredCountries.length > 15 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 text-center"
                >
                  <p className="text-slate-400 font-semibold">✓ All destinations loaded</p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="text-5xl mb-4">🌍</div>
              <p className="text-slate-400 font-semibold mb-2 text-lg">No destinations found</p>
              <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
}
