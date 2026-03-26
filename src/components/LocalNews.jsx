import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { CardSkeleton } from './SkeletonLoader';

export default function LocalNews({ news, loading }) {
  if (loading) return <CardSkeleton />;

  if (!news || news.length === 0) {
    return (
      <motion.div
        className="p-6 rounded-lg bg-slate-800 border border-slate-700 text-center text-slate-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No recent news available
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
        <Newspaper size={18} className="text-primary" /> Latest News
      </h3>
      <div className="space-y-3">
        {news.map((article, idx) => (
          <motion.a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            whileHover={{ x: 4 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex gap-3">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
