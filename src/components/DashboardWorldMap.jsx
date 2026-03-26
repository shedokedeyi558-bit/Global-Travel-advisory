import { motion } from 'framer-motion';
import { getCountrySafetyScore } from '../utils/countrySafetyData';

const countries = [
  'Japan', 'Singapore', 'Switzerland', 'Germany', 'France', 'United Kingdom',
  'Canada', 'Australia', 'United States', 'Brazil', 'Mexico', 'India',
  'Thailand', 'Philippines', 'Indonesia', 'Egypt', 'South Africa', 'Nigeria',
  'Kenya', 'Pakistan', 'Venezuela', 'Syria', 'Afghanistan', 'Italy',
  'Spain', 'Greece', 'Portugal', 'Netherlands', 'Belgium', 'Austria',
  'Czech Republic', 'Poland', 'Turkey', 'Russia', 'China', 'South Korea',
  'Vietnam', 'Malaysia', 'Colombia', 'Peru', 'Argentina', 'Chile',
  'Ukraine', 'Iraq', 'Yemen', 'Somalia', 'New Zealand'
];

export default function DashboardWorldMap({ 
  selectedCountry, 
  onCountrySelect,
  searchQuery,
  selectedRegion,
  riskFilter
}) {
  const getRiskColor = (score) => {
    if (score < 25) return 'bg-green-500';
    if (score < 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRegion = (country) => {
    const regions = {
      'Japan': 'Asia', 'Singapore': 'Asia', 'Switzerland': 'Europe', 'Germany': 'Europe',
      'France': 'Europe', 'United Kingdom': 'Europe', 'Canada': 'Americas', 'Australia': 'Oceania',
      'United States': 'Americas', 'Brazil': 'Americas', 'Mexico': 'Americas', 'India': 'Asia',
      'Thailand': 'Asia', 'Philippines': 'Asia', 'Indonesia': 'Asia', 'Egypt': 'Africa',
      'South Africa': 'Africa', 'Nigeria': 'Africa', 'Kenya': 'Africa', 'Pakistan': 'Asia',
      'Venezuela': 'Americas', 'Syria': 'Asia', 'Afghanistan': 'Asia', 'Italy': 'Europe',
      'Spain': 'Europe', 'Greece': 'Europe', 'Portugal': 'Europe', 'Netherlands': 'Europe',
      'Belgium': 'Europe', 'Austria': 'Europe', 'Czech Republic': 'Europe', 'Poland': 'Europe',
      'Turkey': 'Europe', 'Russia': 'Europe', 'China': 'Asia', 'South Korea': 'Asia',
      'Vietnam': 'Asia', 'Malaysia': 'Asia', 'Colombia': 'Americas', 'Peru': 'Americas',
      'Argentina': 'Americas', 'Chile': 'Americas', 'Ukraine': 'Europe', 'Iraq': 'Asia',
      'Yemen': 'Asia', 'Somalia': 'Africa', 'New Zealand': 'Oceania'
    };
    return regions[country] || 'Other';
  };

  const filteredCountries = countries.filter(country => {
    const score = getCountrySafetyScore(country);
    const region = getRegion(country);
    
    // Search filter
    if (searchQuery && !country.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (selectedRegion !== 'All' && region !== selectedRegion) {
      return false;
    }
    
    // Risk filter
    if (riskFilter !== 'All') {
      if (riskFilter === 'Safe' && score >= 25) return false;
      if (riskFilter === 'Moderate' && (score < 25 || score >= 50)) return false;
      if (riskFilter === 'High' && score < 50) return false;
    }
    
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute left-80 top-0 right-[350px] bottom-0 bg-black overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(6,28,55,0.5) 100%),
          repeating-linear-gradient(
            0deg,
            rgba(34,211,238,0.03) 0px,
            rgba(34,211,238,0.03) 1px,
            transparent 1px,
            transparent 40px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(34,211,238,0.03) 0px,
            rgba(34,211,238,0.03) 1px,
            transparent 1px,
            transparent 40px
          )
        `,
        height: '100%'
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border border-cyan-500/10"></div>
      </div>

      {/* Countries Grid */}
      <div className="relative h-full overflow-y-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
          {filteredCountries.map((country) => {
            const score = getCountrySafetyScore(country);
            const isSelected = selectedCountry === country;
            const riskColor = getRiskColor(score);

            return (
              <motion.button
                key={country}
                onClick={() => onCountrySelect(country)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative p-4 rounded-lg border-2 transition-all group ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-cyan-500/30 bg-black/30 hover:border-cyan-400/60 hover:bg-cyan-500/10'
                }`}
                style={{
                  boxShadow: isSelected 
                    ? '0 0 20px rgba(34,211,238,0.4), inset 0 0 20px rgba(34,211,238,0.1)'
                    : 'none'
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      riskColor === 'bg-green-500' ? 'rgba(34,197,94,0.2)' :
                      riskColor === 'bg-yellow-500' ? 'rgba(234,179,8,0.2)' :
                      'rgba(239,68,68,0.2)'
                    }, transparent)`,
                    pointerEvents: 'none'
                  }}
                />

                <div className="relative z-10">
                  {/* Risk indicator dot */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${riskColor} shadow-lg`}
                      style={{
                        boxShadow: `0 0 8px ${
                          riskColor === 'bg-green-500' ? 'rgba(34,197,94,0.8)' :
                          riskColor === 'bg-yellow-500' ? 'rgba(234,179,8,0.8)' :
                          'rgba(239,68,68,0.8)'
                        }`
                      }}
                    />
                    <span className="text-xs font-bold text-cyan-300">{score}</span>
                  </div>

                  {/* Country name */}
                  <h3 className="text-sm font-bold text-white text-left truncate">
                    {country}
                  </h3>

                  {/* Risk label */}
                  <p className={`text-xs font-semibold mt-1 ${
                    score < 25 ? 'text-green-400' :
                    score < 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {score < 25 ? 'SAFE' : score < 50 ? 'MODERATE' : 'HIGH'}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCountries.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-cyan-300/50 text-sm">No countries match your filters</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
