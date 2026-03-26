import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Search, Filter } from 'lucide-react';
import { getCountriesWithAirports, getCountriesWithoutAirports, getCitiesByCountry } from '../utils/citiesData';

export default function AirportInfo() {
  const [activeTab, setActiveTab] = useState('with'); // 'with' or 'without'
  const [searchTerm, setSearchTerm] = useState('');

  const countriesWithAirports = getCountriesWithAirports();
  const countriesWithoutAirports = getCountriesWithoutAirports();

  const filterCountries = (countries) => {
    if (!searchTerm) return countries;
    return countries.filter(country => 
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getAirportCount = (countryName) => {
    const countryData = getCitiesByCountry(countryName);
    return countryData.cities.filter(city => city.hasAirport).length;
  };

  const displayCountries = activeTab === 'with' 
    ? filterCountries(countriesWithAirports)
    : filterCountries(countriesWithoutAirports);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Plane size={32} className="text-primary" />
          Global Airport Information
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Discover which countries have international airports and plan your travel accordingly. 
          Essential information for flight booking and travel planning.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-center"
        >
          <Plane size={32} className="mx-auto mb-3 text-white" />
          <div className="text-3xl font-bold text-white mb-1">{countriesWithAirports.length}</div>
          <div className="text-green-100">Countries with Airports</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-center"
        >
          <MapPin size={32} className="mx-auto mb-3 text-white" />
          <div className="text-3xl font-bold text-white mb-1">{countriesWithoutAirports.length}</div>
          <div className="text-red-100">Countries without Airports</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-center"
        >
          <Filter size={32} className="mx-auto mb-3 text-white" />
          <div className="text-3xl font-bold text-white mb-1">
            {countriesWithAirports.length + countriesWithoutAirports.length}
          </div>
          <div className="text-blue-100">Total Countries</div>
        </motion.div>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search countries..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('with')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'with'
                ? 'bg-green-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            With Airports ({countriesWithAirports.length})
          </button>
          <button
            onClick={() => setActiveTab('without')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'without'
                ? 'bg-red-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Without Airports ({countriesWithoutAirports.length})
          </button>
        </div>
      </div>

      {/* Countries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayCountries.map((country, index) => {
          const airportCount = getAirportCount(country);
          const countryData = getCitiesByCountry(country);
          
          return (
            <motion.div
              key={country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-lg p-4 border transition-all cursor-pointer group ${
                activeTab === 'with'
                  ? 'bg-green-900/20 border-green-700 hover:border-green-500'
                  : 'bg-red-900/20 border-red-700 hover:border-red-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {country}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-400">
                      {countryData.cities.length} cities tracked
                    </span>
                  </div>
                </div>

                <div className={`p-2 rounded-lg ${
                  activeTab === 'with' 
                    ? 'bg-green-600/20' 
                    : 'bg-red-600/20'
                }`}>
                  <Plane size={20} className={
                    activeTab === 'with' ? 'text-green-400' : 'text-red-400'
                  } />
                </div>
              </div>

              {activeTab === 'with' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Airports:</span>
                    <span className="text-sm font-semibold text-green-400">
                      {airportCount} cities
                    </span>
                  </div>
                  
                  {countryData.cities.filter(c => c.hasAirport).slice(0, 2).map(city => (
                    <div key={city.name} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{city.name}</span>
                      <span className="text-blue-400 font-mono">{city.airportCode}</span>
                    </div>
                  ))}
                  
                  {airportCount > 2 && (
                    <div className="text-xs text-slate-500 text-center">
                      +{airportCount - 2} more airports
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'without' && (
                <div className="space-y-2">
                  <div className="text-sm text-slate-300">
                    Travel via neighboring countries or alternative transport methods
                  </div>
                  <div className="text-xs text-red-400">
                    ⚠ No international airports available
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {displayCountries.length === 0 && (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto mb-4 text-slate-400" />
          <p className="text-slate-400 text-lg">No countries found matching "{searchTerm}"</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your search terms</p>
        </div>
      )}

      {/* Travel Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-slate-800 rounded-xl p-6 mt-8"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Plane size={20} className="text-primary" />
          Travel Planning Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Countries with Airports</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Direct international flights available</li>
              <li>• Multiple airport options in major cities</li>
              <li>• Better connectivity and flight schedules</li>
              <li>• Competitive pricing due to multiple carriers</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-400 mb-2">Countries without Airports</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Fly to neighboring countries first</li>
              <li>• Use land or sea transport for final leg</li>
              <li>• Plan for additional travel time</li>
              <li>• Consider visa requirements for transit countries</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}