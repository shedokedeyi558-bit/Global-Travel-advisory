import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AirportMap from '../components/AirportMap';
import AirportPanel from '../components/AirportPanel';
import RoutePlanner from '../components/RoutePlanner';
import AirportFilters from '../components/AirportFilters';
import AirportComparison from '../components/AirportComparison';
import { getAllAirports } from '../utils/airportData';
import { useScrollToTop } from '../utils/useScrollToTop';

export default function AirportInformation() {
  useScrollToTop();
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [routeAirports, setRouteAirports] = useState({ from: null, to: null });
  const [comparisonAirports, setComparisonAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState(getAllAirports());
  const [filters, setFilters] = useState({
    region: 'All',
    safety: 'All',
    traffic: 'All',
  });

  const handleMarkerClick = (airport) => {
    setSelectedAirport(airport);
    
    if (!comparisonAirports.find(a => a.code === airport.code)) {
      if (comparisonAirports.length < 3) {
        setComparisonAirports([...comparisonAirports, airport]);
      }
    }
  };

  const handleRemoveComparison = (code) => {
    setComparisonAirports(comparisonAirports.filter(a => a.code !== code));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleAirportsFiltered = (airports) => {
    setFilteredAirports(airports);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-12">
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6,182,212,0.05) 25%, rgba(6,182,212,0.05) 26%, transparent 27%, transparent 74%, rgba(6,182,212,0.05) 75%, rgba(6,182,212,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6,182,212,0.05) 25%, rgba(6,182,212,0.05) 26%, transparent 27%, transparent 74%, rgba(6,182,212,0.05) 75%, rgba(6,182,212,0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Airport Intelligence & Flight Planning</h1>
          <p className="text-slate-400">Explore global airports, plan routes, and compare facilities with real-time data</p>
        </motion.div>

        {/* Top Section: Route Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <RoutePlanner onRouteChange={setRouteAirports} />
        </motion.div>

        {/* Filters Section - Full Width Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AirportFilters 
            filters={filters} 
            onFilterChange={handleFilterChange}
            onAirportsFiltered={handleAirportsFiltered}
          />
        </motion.div>

        {/* Main Layout: Map + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Center: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl" style={{ height: '400px' }}>
              <AirportMap
                onMarkerClick={handleMarkerClick}
                selectedAirport={selectedAirport}
                routeAirports={routeAirports}
                airports={filteredAirports}
              />
            </div>
          </motion.div>

          {/* Right: Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <AirportPanel
              selectedAirport={selectedAirport}
              onClose={() => setSelectedAirport(null)}
            />
          </motion.div>
        </div>

        {/* Comparison Section */}
        {comparisonAirports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <AirportComparison
              selectedAirports={comparisonAirports}
              onRemove={handleRemoveComparison}
            />
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl backdrop-blur-xl border border-white/10 p-8 bg-gradient-to-br from-slate-900/40 to-slate-950/40"
          style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">1. Plan Routes</h3>
              <p className="text-slate-400 text-sm">Use the route planner at the top to select departure and arrival airports. View distance, flight duration, and average safety scores.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">2. Explore Airports</h3>
              <p className="text-slate-400 text-sm">Click on map markers to view detailed airport information including safety scores, on-time performance, and available services.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">3. Compare Facilities</h3>
              <p className="text-slate-400 text-sm">Select up to 3 airports to compare metrics side-by-side. Analyze safety, performance, and services to make informed decisions.</p>
            </div>
          </div>
        </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}