import { motion } from 'framer-motion';
import { MapPin, Heart, Utensils, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function MapSidebarControls({ visibleLayers, onLayerToggle }) {
  const layers = [
    { key: 'safety', label: 'Safety Zones', icon: MapPin, color: 'text-emerald-400' },
    { key: 'health', label: 'Health Facilities', icon: Heart, color: 'text-blue-400' },
    { key: 'amenities', label: 'Amenities', icon: Utensils, color: 'text-amber-400' },
    { key: 'alerts', label: 'Alerts', icon: AlertCircle, color: 'text-red-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-24 z-40 rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl w-64"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-4">MAP LAYERS</p>

      <div className="space-y-3">
        {layers.map((layer, idx) => {
          const IconComponent = layer.icon;
          const isVisible = visibleLayers[layer.key];

          return (
            <motion.button
              key={layer.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onLayerToggle(layer.key)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                isVisible
                  ? 'border-blue-400/60 bg-blue-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <IconComponent size={18} className={layer.color} />
              <span className="text-sm font-semibold text-white flex-1 text-left">{layer.label}</span>
              <motion.div
                animate={{ scale: isVisible ? 1 : 0.8 }}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isVisible
                    ? 'border-blue-400 bg-blue-500/30'
                    : 'border-white/20 bg-transparent'
                }`}
              >
                {isVisible && <div className="w-2 h-2 rounded-full bg-blue-400" />}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-3">LEGEND</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400">Safe Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-400">Restaurant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-400">Alert</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
