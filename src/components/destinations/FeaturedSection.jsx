import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';

export default function FeaturedSection({ destinations }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Featured</p>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Safe Destinations</h2>
        <p className="text-sm text-text-secondary">Top-rated travel destinations</p>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-5">
          {destinations.map((country, index) => (
            <DestinationCard
              key={country.name}
              country={country}
              score={country.score}
              index={index}
              featured={true}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
