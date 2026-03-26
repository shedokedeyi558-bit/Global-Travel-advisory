import { motion } from 'framer-motion';
import { useEffect } from 'react';
import TravelChat from '../components/TravelChat';
import TravelDashboard from '../components/TravelDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollToTop } from '../utils/useScrollToTop';
import { useTravelContext } from '../context/TravelContext';

export default function Chat() {
  useScrollToTop();
  const { currentItinerary } = useTravelContext();

  // Additional scroll to top on component mount
  useEffect(() => {
    // Force scroll to top immediately when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-zinc-900 to-black overflow-x-hidden">
      {/* Navigation */}
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 pt-32 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Travel Assistant
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get instant, intelligent travel advice powered by advanced AI. 
            Plan trips, find costs, and discover destinations with your personal travel expert.
          </p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch"
        >
          {/* Chat Interface */}
          <div className="h-[750px] bg-zinc-900/10 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <TravelChat className="h-full" />
          </div>

          {/* Travel Dashboard */}
          <div className="h-[750px] bg-zinc-900/40 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
              <TravelDashboard className="h-full" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}