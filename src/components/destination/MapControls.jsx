import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Utensils, Landmark, X } from 'lucide-react';

export default function MapControls({ activeLayers, onToggleLayer, onClose }) {
  const layers = [
    { id: 'safety', icon: AlertTriangle, label: 'Safety', color: '#ef4444' },
    { id: 'medical', icon: Heart, label: 'Medical', color: '#3b82f6' },
    { id: 'amenities', icon: Utensils, label: 'Amenities', color: '#22c55e' },
    { id: 'attractions', icon: Landmark, label: 'Attractions', color: '#06b6d4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-6 left-6 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Map Layers</h3>
        {onClose && (
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={16} className="text-slate-400" />
          </motion.button>
        )}
      </div>

      {/* Layer Toggles */}
      <div className="space-y-2">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayers[layer.id];

          return (
            <motion.button
              key={layer.id}
              onClick={() => onToggleLayer(layer.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-opacity-20 border border-opacity-50'
                  : 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
              }`}
              style={isActive ? {
                backgroundColor: `${layer.color}20`,
                borderColor: layer.color,
              } : {}}
            >
              <Icon
                size={16}
                className={isActive ? 'text-white' : 'text-slate-400'}
                style={isActive ? { color: layer.color } : {}}
              />
              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {layer.label}
              </span>
              <div className={`ml-auto w-4 h-4 rounded border-2 transition-all ${
                isActive ? 'bg-opacity-50' : 'bg-transparent'
              }`}
              style={isActive ? {
                backgroundColor: layer.color,
                borderColor: layer.color,
              } : {
                borderColor: '#64748b',
              }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
        <p className="text-xs font-semibold text-slate-300 mb-2">Legend</p>
        {layers.map((layer) => (
          <div key={`legend-${layer.id}`} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            <span className="text-xs text-slate-400">{layer.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
