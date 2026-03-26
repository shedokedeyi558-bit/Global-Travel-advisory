import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from 'lucide-react';

const getWeatherIcon = (code) => {
  if (code === 0 || code === 1) return Sun;
  if (code === 2 || code === 3) return Cloud;
  if (code >= 45 && code <= 82) return CloudRain;
  return Cloud;
};

export default function ModernWeather({ weather, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-40 bg-slate-800 rounded-2xl" />
        <div className="flex gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-800 rounded-xl flex-1" />
          ))}
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-12 text-slate-400">
        Weather data not available
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.current?.weather_code);

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/30 p-8"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-slate-300 text-sm">Current Weather</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white">
                {Math.round(weather.current?.temperature || 0)}°
              </span>
              <span className="text-2xl text-slate-400">C</span>
            </div>
            <p className="text-lg text-slate-200 font-medium">
              {weather.current?.condition || 'Unknown'}
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-6 bg-blue-500/10 rounded-full"
          >
            <WeatherIcon size={64} className="text-blue-400" />
          </motion.div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-blue-700/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Droplets size={16} className="text-cyan-400" />
              <span className="text-xs text-slate-400">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">
              {weather.current?.humidity || 'N/A'}%
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind size={16} className="text-blue-400" />
              <span className="text-xs text-slate-400">Wind</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">
              {Math.round(weather.current?.wind_speed || 0)} km/h
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Eye size={16} className="text-slate-400" />
              <span className="text-xs text-slate-400">Feels</span>
            </div>
            <p className="text-2xl font-bold text-slate-300">
              {Math.round((weather.current?.temperature || 0) - 2)}°
            </p>
          </div>
        </div>
      </motion.div>

      {/* Forecast */}
      {weather.forecast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-bold text-white">Today's Forecast</h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-red-900/20 to-transparent border border-red-700/30 p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">High</p>
              <p className="text-3xl font-bold text-red-400">
                {Math.round(weather.forecast.maxTemp || 0)}°
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-700/30 p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Low</p>
              <p className="text-3xl font-bold text-blue-400">
                {Math.round(weather.forecast.minTemp || 0)}°
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-700/30 p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Rain</p>
              <p className="text-3xl font-bold text-cyan-400">
                {weather.forecast.precipitation || 0}mm
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
