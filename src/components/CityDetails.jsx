import { motion } from 'framer-motion';
import { MapPin, Cloud, Landmark, Info, DollarSign, AlertTriangle, Users, Utensils, AlertCircle } from 'lucide-react';

export default function CityDetails({ cityData, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-zinc-800 rounded-lg"></div>
        <div className="h-24 bg-zinc-800 rounded-lg"></div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">City details not available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* City Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">{cityData.name}</h3>
            <p className="text-slate-300 flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {cityData.state}, {cityData.country}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      {cityData.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Info size={18} className="text-primary" />
            About {cityData.name}
          </h4>
          <p className="text-slate-300 leading-relaxed text-sm">
            {cityData.description}
          </p>
        </motion.div>
      )}

      {/* Cost of Living */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <DollarSign size={18} className="text-primary" />
          Cost of Living
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Budget Meal</p>
            <p className="text-xl font-bold text-green-400">$5-12</p>
            <p className="text-xs text-slate-500 mt-1">Local restaurant</p>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Mid-range Meal</p>
            <p className="text-xl font-bold text-blue-400">$12-30</p>
            <p className="text-xs text-slate-500 mt-1">Nice restaurant</p>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Budget Hotel</p>
            <p className="text-xl font-bold text-purple-400">$30-60</p>
            <p className="text-xs text-slate-500 mt-1">Per night</p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Local Transport</p>
            <p className="text-xl font-bold text-cyan-400">$1-3</p>
            <p className="text-xs text-slate-500 mt-1">Single ticket</p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Coffee</p>
            <p className="text-xl font-bold text-yellow-400">$2-5</p>
            <p className="text-xs text-slate-500 mt-1">Café</p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-2">Daily Budget</p>
            <p className="text-xl font-bold text-orange-400">$50-100</p>
            <p className="text-xs text-slate-500 mt-1">Average traveler</p>
          </div>
        </div>
      </motion.div>

      {/* Safety & Travel Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-primary" />
          Safety & Travel Tips
        </h4>
        
        <div className="space-y-3">
          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Best Time to Visit</p>
              <p className="text-xs text-slate-400">Spring & Fall (mild weather, fewer crowds)</p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Getting Around</p>
              <p className="text-xs text-slate-400">Use public transport, taxis, or walking in city center</p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Local Customs</p>
              <p className="text-xs text-slate-400">Respect local traditions and dress codes</p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium text-sm">Things to Avoid</p>
              <p className="text-xs text-slate-400">Avoid displaying valuables, travel at night with caution</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Local Cuisine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Utensils size={18} className="text-primary" />
          Must-Try Local Cuisine
        </h4>
        
        <div className="space-y-2">
          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium text-sm">Street Food</p>
              <p className="text-xs text-slate-400">Try local street vendors for authentic flavors</p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium text-sm">Local Markets</p>
              <p className="text-xs text-slate-400">Visit morning markets for fresh produce & local goods</p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium text-sm">Specialty Dishes</p>
              <p className="text-xs text-slate-400">Ask locals for regional specialties & hidden gems</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attractions */}
      {cityData.attractions && cityData.attractions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Landmark size={18} className="text-primary" />
            Top Attractions
          </h4>
          
          <div className="space-y-2">
            {cityData.attractions.map((attraction, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg p-3 flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium text-sm">{attraction.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{attraction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
