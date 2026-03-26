import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Route, 
  Plane,
  Compass,
  Sparkles
} from 'lucide-react';
import { useTravelContext } from '../context/TravelContext';
import { formatBudget } from '../utils/budgetCalculator';

export default function TravelDashboard({ className = '' }) {
  const { 
    currentItinerary, 
    optimizedItinerary,
    currentBudget, 
    selectedLocations,
    isOptimizingRoute
  } = useTravelContext();

  // Empty state - clean and minimal
  if (!currentItinerary && !currentBudget && selectedLocations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-dark rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Compass size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Ready to Plan</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Start a conversation to see your<br />trip details and budget here
          </p>
        </div>
      </motion.div>
    );
  }

  const itinerary = optimizedItinerary || currentItinerary;
  
  // Calculate trip statistics
  const totalLocations = selectedLocations.length;
  const totalDays = itinerary?.days?.length || 0;
  const totalDistance = itinerary?.days?.reduce((sum, day) => 
    sum + (day.routeStats?.totalDistance || 0), 0) || 0;
  const totalTravelTime = itinerary?.days?.reduce((sum, day) => 
    sum + (day.routeStats?.totalTravelTime?.totalMinutes || 0), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-dark rounded-2xl overflow-hidden ${className}`}
    >
      {/* Clean Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Trip Overview</h3>
            <p className="text-slate-400 text-sm">
              {isOptimizingRoute ? 'Optimizing your route...' : 'Your travel summary'}
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <Sparkles size={20} className="text-black" />
          </div>
        </div>
      </div>

      {/* Key Stats - Clean Grid */}
      <div className="p-6 space-y-4">
        {/* Primary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium">Duration</p>
                <p className="text-white text-lg font-bold">
                  {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium">Places</p>
                <p className="text-white text-lg font-bold">{totalLocations}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        {(totalDistance > 0 || totalTravelTime > 0) && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Route size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium">Distance</p>
                  <p className="text-white text-lg font-bold">
                    {totalDistance > 0 ? `${Math.round(totalDistance)}km` : '--'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock size={18} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium">Travel</p>
                  <p className="text-white text-lg font-bold">
                    {totalTravelTime > 0 ? `${Math.round(totalTravelTime / 60)}h` : '--'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Section - Clean and Prominent */}
        {currentBudget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <DollarSign size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-primary text-sm font-semibold">Total Budget</p>
                <p className="text-white text-2xl font-bold">
                  {formatBudget(currentBudget.grandTotal)}
                </p>
              </div>
            </div>
            
            <div className="text-xs text-slate-300 mb-3">
              {formatBudget(currentBudget.totalDaily)} for {totalDays} days + {formatBudget(currentBudget.flights)} flights
            </div>
            
            {/* Budget Breakdown - Simplified */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Hotels</span>
                <span className="text-white font-medium">
                  {formatBudget(currentBudget.breakdown.accommodation)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Food</span>
                <span className="text-white font-medium">
                  {formatBudget(currentBudget.breakdown.food)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Transport</span>
                <span className="text-white font-medium">
                  {formatBudget(currentBudget.breakdown.transport)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Activities</span>
                <span className="text-white font-medium">
                  {formatBudget(currentBudget.breakdown.activities)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Route Status - Minimal */}
        {itinerary && itinerary.days && itinerary.days.some(day => day.routeStats) && (
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-green-400 text-sm font-medium">Route Optimized</p>
            </div>
            <p className="text-slate-300 text-xs mt-1">
              Travel time minimized for efficiency
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}