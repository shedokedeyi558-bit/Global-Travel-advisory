import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning, CloudDrizzle } from 'lucide-react';
import { getWeatherDescription } from '../utils/api';
import { CardSkeleton } from './SkeletonLoader';

const getWeatherIcon = (code) => {
  if (code === 0) return <Sun size={48} className="text-yellow-500" />;
  if (code <= 3) return <CloudDrizzle size={48} className="text-gray-300" />;
  if (code <= 48) return <Cloud size={48} className="text-gray-400" />;
  if (code <= 67) return <CloudRain size={48} className="text-blue-500" />;
  if (code <= 86) return <CloudSnow size={48} className="text-blue-300" />;
  return <CloudLightning size={48} className="text-purple-500" />;
};

export default function WeatherForecast({ weather, loading }) {
  if (loading) return <CardSkeleton />;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Current Weather</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-white">
              {weather.current.temperature}°C
            </div>
            <p className="text-slate-300 mt-2">
              {getWeatherDescription(weather.current.weatherCode)}
            </p>
            <p className="text-sm text-slate-400 mt-1">Humidity: {weather.current.humidity}%</p>
          </div>
          <div>{getWeatherIcon(weather.current.weatherCode)}</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {weather.forecast.map((day, idx) => (
            <motion.div
              key={idx}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-xs font-semibold text-slate-400 mb-2">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <div className="text-2xl mb-2">{getWeatherIcon(day.weatherCode)}</div>
              <p className="text-sm font-bold text-white">{Math.round(day.high)}°</p>
              <p className="text-xs text-slate-400">{Math.round(day.low)}°</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
