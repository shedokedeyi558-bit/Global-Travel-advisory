import { motion } from 'framer-motion';
import { Filter, Globe, Shield, Users, X } from 'lucide-react';
import { getAllAirports } from '../utils/airportData';

export default function AirportFilters({ filters, onFilterChange, onAirportsFiltered }) {
  const regions = ['All', 'Asia', 'Europe', 'Americas', 'Middle East', 'Oceania'];
  const safetyLevels = ['All', 'Excellent (90+)', 'Good (80-89)', 'Fair (70-79)', 'Poor (<70)'];
  const trafficLevels = ['All', 'Very High (80M+)', 'High (50-80M)', 'Medium (30-50M)', 'Low (<30M)'];

  const handleFilterClick = (filterType, value) => {
    onFilterChange(filterType, value);
    applyFilters(filterType, value);
  };

  const applyFilters = (filterType, value) => {
    let filtered = getAllAirports();

    const region = filterType === 'region' ? value : filters.region;
    if (region !== 'All') {
      filtered = filtered.filter(airport => {
        const regionMap = {
          'Asia': ['Singapore', 'Thailand', 'Japan', 'Japan'],
          'Europe': ['France', 'United Kingdom'],
          'Americas': ['United States', 'United States'],
          'Middle East': ['United Arab Emirates'],
          'Oceania': ['Australia'],
        };
        return regionMap[region]?.includes(airport.country);
      });
    }

    const safety = filterType === 'safety' ? value : filters.safety;
    if (safety !== 'All') {
      filtered = filtered.filter(airport => {
        if (safety === 'Excellent (90+)') return airport.safety >= 90;
        if (safety === 'Good (80-89)') return airport.safety >= 80 && airport.safety < 90;
        if (safety === 'Fair (70-79)') return airport.safety >= 70 && airport.safety < 80;
        if (safety === 'Poor (<70)') return airport.safety < 70;
        return true;
      });
    }

    const traffic = filterType === 'traffic' ? value : filters.traffic;
    if (traffic !== 'All') {
      filtered = filtered.filter(airport => {
        const passengers = airport.passengerTraffic / 1000000;
        if (traffic === 'Very High (80M+)') return passengers >= 80;
        if (traffic === 'High (50-80M)') return passengers >= 50 && passengers < 80;
        if (traffic === 'Medium (30-50M)') return passengers >= 30 && passengers < 50;
        if (traffic === 'Low (<30M)') return passengers < 30;
        return true;
      });
    }

    onAirportsFiltered?.(filtered);
  };

  const isFiltered = filters.region !== 'All' || filters.safety !== 'All' || filters.traffic !== 'All';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl w-full"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-400" />
          <p className="text-sm font-semibold text-blue-400/60 uppercase tracking-widest">Smart Filters</p>
          {isFiltered && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-cyan-500/30 text-cyan-300 border border-cyan-400/30">
              Active
            </span>
          )}
        </div>
        {isFiltered && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleFilterClick('region', 'All');
              handleFilterClick('safety', 'All');
              handleFilterClick('traffic', 'All');
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10 transition-all"
          >
            <X size={14} />
            Clear All
          </motion.button>
        )}
      </div>

      <div className="space-y-4">
        {/* Region Filter */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            <Globe size={14} className="text-cyan-400" />
            Region
          </label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <motion.button
                key={region}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterClick('region', region)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filters.region === region
                    ? 'bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-300'
                }`}
              >
                {region}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Safety Filter */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            <Shield size={14} className="text-emerald-400" />
            Safety Level
          </label>
          <div className="flex flex-wrap gap-2">
            {safetyLevels.map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterClick('safety', level)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filters.safety === level
                    ? 'bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:border-emerald-400/40 hover:text-emerald-300'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Traffic Filter */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            <Users size={14} className="text-purple-400" />
            Passenger Traffic
          </label>
          <div className="flex flex-wrap gap-2">
            {trafficLevels.map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterClick('traffic', level)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filters.traffic === level
                    ? 'bg-purple-500/30 border border-purple-400/60 text-purple-300 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:border-purple-400/40 hover:text-purple-300'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
