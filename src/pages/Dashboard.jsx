import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TripPlanner from '../components/TripPlanner';
import { useScrollToTop } from '../utils/useScrollToTop';
import { getUserSearchHistory } from '../utils/storage';

export default function Dashboard() {
  useScrollToTop();
  const navigate = useNavigate();
  const recentSearches = getUserSearchHistory();

  const quickLinks = [
    { icon: MapPin, label: 'Destinations', path: '/destinations', color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Safety Ratings', path: '/safety-ratings', color: 'text-green-500' },
    { icon: AlertCircle, label: 'Health Data', path: '/health-data', color: 'text-red-500' },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-12 bg-gradient-to-b from-yellow-500/5 to-transparent">
          <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to Your Dashboard
              </h1>
              <p className="text-slate-300">
                Explore destinations and plan your next adventure
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a destination..."
                  className="w-full px-6 py-4 rounded-xl border border-yellow-500/20 bg-zinc-900 border border-yellow-500/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      navigate(`/destination/${encodeURIComponent(e.target.value)}`);
                    }
                  }}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-xl bg-zinc-900 border border-yellow-500/20 hover:shadow-lg transition-all text-left"
                    >
                      <Icon size={32} className={`${link.color} mb-4`} />
                      <h3 className="font-bold text-lg text-white">{link.label}</h3>
                      <p className="text-sm text-slate-300 mt-2">
                        {link.label === 'Destinations' && 'Browse all destinations'}
                        {link.label === 'Safety Ratings' && 'View global safety rankings'}
                        {link.label === 'Health Data' && 'Travel health information'}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Trip Planner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <TripPlanner />
            </motion.div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Recent Searches</h2>
                <div className="space-y-3">
                  {recentSearches.map((search, idx) => (
                    <motion.button
                      key={search.id}
                      onClick={() => navigate(`/destination/${encodeURIComponent(search.destination)}`)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-yellow-500/20 hover:shadow-md transition-all text-left"
                    >
                      <div>
                        <h3 className="font-bold text-white">{search.destination}</h3>
                        <p className="text-xs text-slate-400">{new Date(search.searchedAt).toLocaleDateString()}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        search.riskScore < 20
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                          : search.riskScore < 40
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {search.riskScore}% Risk
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
