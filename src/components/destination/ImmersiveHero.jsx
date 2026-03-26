import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { fetchCityImage, getFallbackImage, preloadImage } from '../../utils/imageService';

export default function ImmersiveHero({ destination, riskScore, country = '' }) {
  const [heroImage, setHeroImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [fallbackGradient, setFallbackGradient] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setImageLoading(true);
        
        // Fetch image from service
        const imageData = await fetchCityImage(destination, country);
        
        if (imageData) {
          // Preload image to ensure it's valid
          await preloadImage(imageData.url);
          setHeroImage(imageData.url);
        } else {
          // Use fallback gradient
          setFallbackGradient(getFallbackImage(destination));
        }
      } catch (error) {
        console.log('Image loading failed, using fallback:', error.message);
        setFallbackGradient(getFallbackImage(destination));
      } finally {
        setImageLoading(false);
      }
    };

    if (destination) {
      loadImage();
    }
  }, [destination, country]);

  const getRiskColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-900/20', border: 'border-green-700', text: 'text-green-400', label: 'Safe for Travel' };
    if (score >= 60) return { bg: 'bg-yellow-900/20', border: 'border-yellow-700', text: 'text-yellow-400', label: 'Moderate Caution' };
    if (score >= 40) return { bg: 'bg-orange-900/20', border: 'border-orange-700', text: 'text-orange-400', label: 'Caution Advised' };
    return { bg: 'bg-red-900/20', border: 'border-red-700', text: 'text-red-400', label: 'High Risk Area' };
  };

  const riskInfo = getRiskColor(riskScore);
  const RiskIcon = riskScore >= 80 ? CheckCircle : riskScore >= 60 ? Shield : AlertTriangle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl"
    >
      {/* Background Image with Zoom Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : fallbackGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      
      {/* Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 md:p-12">
        {/* Top Section - Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-end"
        >
          <div className={`backdrop-blur-md ${riskInfo.bg} border ${riskInfo.border} rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 flex items-center gap-2 sm:gap-4`}>
            <div className="text-right">
              <p className="text-xs text-slate-300 mb-0.5 sm:mb-1">Travel Safety</p>
              <p className={`text-2xl sm:text-3xl font-bold ${riskInfo.text}`}>{riskScore}</p>
            </div>
            <RiskIcon size={24} className={`${riskInfo.text} sm:w-8 sm:h-8`} />
          </div>
        </motion.div>

        {/* Bottom Section - Destination Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-2 sm:space-y-3 md:space-y-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg">
              {destination}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-semibold drop-shadow-lg">
              {riskInfo.label}
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 max-w-2xl drop-shadow-lg"
          >
            Discover travel insights, safety data, and local intelligence for your journey
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-2 sm:gap-3 pt-2 sm:pt-4"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-2 sm:px-4 py-1 sm:py-2">
              <p className="text-xs text-slate-300">Based on</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Weather & Safety Data</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-2 sm:px-4 py-1 sm:py-2">
              <p className="text-xs text-slate-300">Updated</p>
              <p className="text-xs sm:text-sm font-semibold text-white">Real-time</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
