import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { getCitiesByCountry } from '../utils/citiesData';

const getSafetyColor = (level) => {
  if (level >= 80) return 'text-green-400';
  if (level >= 60) return 'text-yellow-400';
  if (level >= 40) return 'text-orange-400';
  return 'text-red-400';
};

const getSafetyBadgeColor = (level) => {
  if (level >= 80) return 'bg-green-900/20 border-green-700 text-green-400';
  if (level >= 60) return 'bg-yellow-900/20 border-yellow-700 text-yellow-400';
  if (level >= 40) return 'bg-orange-900/20 border-orange-700 text-orange-400';
  return 'bg-red-900/20 border-red-700 text-red-400';
};

const getSafetyLabel = (level) => {
  if (level >= 80) return 'Very Safe';
  if (level >= 60) return 'Moderately Safe';
  if (level >= 40) return 'Caution Advised';
  return 'High Risk';
};

const getSafetyIcon = (level) => {
  if (level >= 80) return CheckCircle;
  if (level >= 60) return Shield;
  if (level >= 40) return AlertTriangle;
  return AlertTriangle;
};

export default function CitiesList({ country, loading }) {
  const [sortBy, setSortBy] = useState('safety'); // 'safety', 'name', 'population'

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-700 rounded mb-4"></div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-slate-700 rounded"></div>
        ))}
      </div>
    );
  }

  if (!country?.name) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No country data available</p>
      </div>
    );
  }

  const countryData = getCitiesByCountry(country.name);
  
  if (!countryData.cities || countryData.cities.length === 0) {
    return null;
  }

  // Filter cities - only show cities with airports
  const filteredCities = countryData.cities.filter(city => city.hasAirport);

  // Sort cities
  const sortedCities = [...filteredCities].sort((a, b) => {
    switch (sortBy) {
      case 'safety':
        return b.safetyLevel - a.safetyLevel;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'population':
        const aNum = parseFloat(a.population.replace(/[^\d.]/g, ''));
        const bNum = parseFloat(b.population.replace(/[^\d.]/g, ''));
        return bNum - aNum;
      default:
        return 0;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header with Country Airport Status */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin size={24} className="text-primary" />
            Cities in {country.name}
          </h2>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
            countryData.hasInternationalAirport 
              ? 'bg-green-900/20 border-green-700 text-green-400' 
              : 'bg-red-900/20 border-red-700 text-red-400'
          }`}>
            <Plane size={14} />
            {countryData.hasInternationalAirport ? 'Has International Airport' : 'No International Airport'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="safety">Sort by Safety</option>
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCities.map((city, index) => {
          const SafetyIcon = getSafetyIcon(city.safetyLevel);
          
          return (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-slate-800 border border-slate-700 hover:border-primary/50 rounded-lg p-4 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-400">{city.population}</span>
                  </div>
                </div>

                {/* Airport Status */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  city.hasAirport 
                    ? 'bg-blue-900/20 border border-blue-700 text-blue-400' 
                    : 'bg-slate-700 border border-slate-600 text-slate-400'
                }`}>
                  <Plane size={12} />
                  {city.hasAirport ? city.airportCode : 'No Airport'}
                </div>
              </div>

              {/* Safety Level */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SafetyIcon size={16} className={getSafetyColor(city.safetyLevel)} />
                  <span className="text-sm font-medium text-slate-300">Safety Level</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${getSafetyColor(city.safetyLevel)}`}>
                    {city.safetyLevel}
                  </span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSafetyBadgeColor(city.safetyLevel)}`}>
                    {getSafetyLabel(city.safetyLevel)}
                  </div>
                </div>
              </div>

              {/* Safety Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      city.safetyLevel >= 80 ? 'bg-green-500' :
                      city.safetyLevel >= 60 ? 'bg-yellow-500' :
                      city.safetyLevel >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${city.safetyLevel}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{countryData.cities.length}</div>
          <div className="text-sm text-slate-400">Total Cities</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {countryData.cities.filter(c => c.hasAirport).length}
          </div>
          <div className="text-sm text-slate-400">With Airports</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {countryData.cities.filter(c => c.safetyLevel >= 80).length}
          </div>
          <div className="text-sm text-slate-400">Very Safe Cities</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {Math.round(countryData.cities.reduce((sum, c) => sum + c.safetyLevel, 0) / countryData.cities.length)}
          </div>
          <div className="text-sm text-slate-400">Avg Safety Score</div>
        </div>
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">No cities with airports in {country.name}</p>
        </div>
      )}
    </motion.div>
  );
}