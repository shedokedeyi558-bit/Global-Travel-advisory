import { motion } from 'framer-motion';
import { Search, Filter, Globe, AlertCircle } from 'lucide-react';

export default function DashboardSidebar({ 
  searchQuery, 
  setSearchQuery, 
  selectedRegion, 
  setSelectedRegion,
  riskFilter,
  setRiskFilter 
}) {
  const regions = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];
  const riskLevels = ['All', 'Safe', 'Moderate', 'High'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block absolute left-0 top-0 h-full w-80 bg-black/40 backdrop-blur-xl border-r border-cyan-500/20 p-6 overflow-y-auto z-40"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(6,28,55,0.4) 100%)',
        boxShadow: 'inset 0 0 30px rgba(34,211,238,0.1)',
        height: '100%'
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={24} className="text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Travel Intel</h2>
        </div>
        <p className="text-xs text-cyan-300/60">Global Safety Dashboard</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-cyan-300 mb-2 block">SEARCH COUNTRY</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-cyan-400/50" />
          <input
            type="text"
            placeholder="Japan, Thailand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/30 focus:outline-none focus:border-cyan-400/60 focus:bg-black/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* Region Filter */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-cyan-300 mb-3 block flex items-center gap-2">
          <Filter size={14} /> REGION
        </label>
        <div className="space-y-2">
          {regions.map((region) => (
            <motion.button
              key={region}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ x: 4 }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedRegion === region
                  ? 'bg-cyan-500/30 border border-cyan-400/60 text-cyan-200'
                  : 'bg-black/20 border border-cyan-500/10 text-cyan-300/70 hover:border-cyan-500/30'
              }`}
            >
              {region}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Risk Filter */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-cyan-300 mb-3 block flex items-center gap-2">
          <AlertCircle size={14} /> RISK LEVEL
        </label>
        <div className="space-y-2">
          {riskLevels.map((level) => (
            <motion.button
              key={level}
              onClick={() => setRiskFilter(level)}
              whileHover={{ x: 4 }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                riskFilter === level
                  ? 'bg-cyan-500/30 border border-cyan-400/60 text-cyan-200'
                  : 'bg-black/20 border border-cyan-500/10 text-cyan-300/70 hover:border-cyan-500/30'
              }`}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-cyan-500/10">
        <p className="text-xs font-semibold text-cyan-300 mb-3">RISK LEVELS</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            <span className="text-cyan-300/70">Safe (0-25)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
            <span className="text-cyan-300/70">Moderate (25-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
            <span className="text-cyan-300/70">High (50+)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
