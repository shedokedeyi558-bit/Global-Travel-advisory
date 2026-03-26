import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchCityImage } from '../../utils/imageService';
import { useState, useEffect } from 'react';

export default function DestinationCard({ country, score, index, featured = false }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = await fetchCityImage(country.name);
        if (img) {
          setImage(img.url);
        }
      } catch (err) {
        console.log('Image load failed for', country.name);
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, [country.name]);

  const getRiskColor = (score) => {
    if (score < 30) return { bg: 'bg-green-500/20', border: 'border-green-400/60', text: 'text-green-300', label: 'Safe' };
    if (score < 60) return { bg: 'bg-yellow-500/20', border: 'border-yellow-400/60', text: 'text-yellow-300', label: 'Moderate' };
    if (score < 80) return { bg: 'bg-orange-500/20', border: 'border-orange-400/60', text: 'text-orange-300', label: 'Caution' };
    return { bg: 'bg-red-500/20', border: 'border-red-400/60', text: 'text-red-300', label: 'High Risk' };
  };

  const riskStyle = getRiskColor(score);

  const getTagline = (score) => {
    if (score < 30) return 'Safe & welcoming';
    if (score < 60) return 'Generally safe';
    if (score < 80) return 'Exercise caution';
    return 'Avoid travel';
  };

  if (featured) {
    return (
      <motion.button
        onClick={() => navigate(`/destination/${encodeURIComponent(country.name)}`)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex-shrink-0 w-52 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20 group"
      >
        {/* Image */}
        <div className="relative h-36 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {loading ? (
            <div className="w-full h-full animate-pulse bg-slate-700" />
          ) : image ? (
            <img
              src={image}
              alt={country.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 bg-slate-900/80 backdrop-blur-sm">
          <h3 className="font-bold text-white text-base truncate">{country.name}</h3>
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full ${riskStyle.bg} ${riskStyle.text} border ${riskStyle.border}`}>
              {riskStyle.label}
            </span>
            <span className="text-sm font-bold text-slate-400">{score}</span>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={() => navigate(`/destination/${encodeURIComponent(country.name)}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full rounded-2xl overflow-hidden border border-slate-700/50 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20 group bg-slate-900/40 backdrop-blur-sm"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-slate-700" />
        ) : image ? (
          <img
            src={image}
            alt={country.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Risk Badge - Top Right */}
        <div className={`absolute top-4 right-4 px-3.5 py-2 rounded-full font-bold text-sm border ${riskStyle.bg} ${riskStyle.text} ${riskStyle.border} backdrop-blur-sm`}>
          {riskStyle.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 text-left">
            <h3 className="font-bold text-white text-xl mb-2">{country.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{getTagline(score)}</p>
          </div>
          <div className="text-right shrink-0">
            <p className={`text-3xl font-black ${riskStyle.text}`}>{score}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">TRUST</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex-1 text-center">
            <p className="text-xs text-slate-400 mb-1">Safety</p>
            <p className="text-base font-bold text-slate-300">{score > 70 ? '✓' : '⚠'}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-slate-400 mb-1">Explore</p>
            <p className="text-base font-bold text-primary">→</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
