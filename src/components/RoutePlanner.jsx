import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Zap } from 'lucide-react';
import { calculateDistance, estimateFlightTime } from '../utils/airportData';
import AirportSearch from './AirportSearch';

export default function RoutePlanner({ onRouteChange }) {
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const handleFromSelect = (airport) => {
    setFromAirport(airport);
    updateRoute(airport, toAirport);
  };

  const handleToSelect = (airport) => {
    setToAirport(airport);
    updateRoute(fromAirport, airport);
  };

  const updateRoute = (from, to) => {
    if (from && to) {
      const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
      const duration = estimateFlightTime(distance);
      const avgSafety = Math.round((from.safety + to.safety) / 2);

      const info = {
        distance,
        duration,
        avgSafety,
      };

      setRouteInfo(info);
      onRouteChange({ from, to });
    } else {
      setRouteInfo(null);
      onRouteChange({ from: null, to: null });
    }
  };

  const handleSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    updateRoute(toAirport, fromAirport);
  };

  const handleClear = () => {
    setFromAirport(null);
    setToAirport(null);
    setRouteInfo(null);
    onRouteChange({ from: null, to: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-4">Flight Route Planner</p>

      <div className="space-y-4">
        {/* From Airport */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">From</label>
          <AirportSearch onSelect={handleFromSelect} selectedAirport={fromAirport} />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwap}
            disabled={!fromAirport || !toAirport}
            className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* To Airport */}
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">To</label>
          <AirportSearch onSelect={handleToSelect} selectedAirport={toAirport} />
        </div>

        {/* Route Info */}
        {routeInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-white/10 space-y-3"
          >
            <div className="grid grid-cols-3 gap-3">
              {/* Distance */}
              <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                <p className="text-xs text-cyan-400/60 uppercase tracking-widest mb-1">Distance</p>
                <p className="text-lg font-bold text-cyan-300">{routeInfo.distance} km</p>
              </div>

              {/* Duration */}
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <p className="text-xs text-purple-400/60 uppercase tracking-widest mb-1">Duration</p>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-purple-300" />
                  <p className="text-lg font-bold text-purple-300">{routeInfo.duration}h</p>
                </div>
              </div>

              {/* Safety */}
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
                <p className="text-xs text-emerald-400/60 uppercase tracking-widest mb-1">Avg Safety</p>
                <p className="text-lg font-bold text-emerald-300">{routeInfo.avgSafety}%</p>
              </div>
            </div>

            {/* Clear Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClear}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/10 transition-all"
            >
              Clear Route
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
