import { motion } from 'framer-motion';
import { TextSkeleton } from './SkeletonLoader';

export default function CountryOverview({ country, loading }) {
  if (loading) return <TextSkeleton lines={5} />;

  const stats = [
    { label: 'Population', value: country.population?.toLocaleString() || 'N/A' },
    { label: 'Region', value: country.region || 'N/A' },
    { label: 'Capital', value: country.capital || 'N/A' },
    { label: 'Area', value: `${(country.area / 1000).toFixed(0)}k km²` || 'N/A' },
    { label: 'Languages', value: country.languages || 'N/A' },
    { label: 'Currency', value: country.currencies || 'N/A' },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          className="p-4 rounded-lg bg-slate-800 border border-slate-700"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xs font-semibold text-slate-400 uppercase mb-1">{stat.label}</p>
          <p className="text-lg font-bold text-white">{stat.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
