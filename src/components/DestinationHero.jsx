import { motion } from 'framer-motion';

export default function DestinationHero({ country, loading }) {
  if (loading) {
    return (
      <motion.div
        className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    );
  }

  return (
    <motion.div
      className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {country?.flag && (
        <img
          src={country.flag}
          alt={country?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h1
          className="text-3xl font-bold text-white mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {country?.name}
        </motion.h1>
        <motion.p
          className="text-white/90 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {country?.region} • {country?.capital}
        </motion.p>
      </div>
    </motion.div>
  );
}
