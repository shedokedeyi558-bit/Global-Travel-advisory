import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Cloud, Map, Newspaper, Shield, DollarSign } from 'lucide-react';
import ImmersiveHero from './ImmersiveHero';
import ModernRiskScore from './ModernRiskScore';
import ModernCard from './ModernCard';
import ModernWeather from './ModernWeather';
import MapSection from './MapSection';
import CityDetails from '../CityDetails';
import CountryOverview from '../CountryOverview';
import CurrencyConverter from '../CurrencyConverter';
import LocalNews from '../LocalNews';
import SafetyAlerts from '../SafetyAlerts';
import DailyCosts from '../DailyCosts';
import CitiesList from '../CitiesList';

export default function MobileDestination({ country, weather, rates, news, riskScore, loading, isLoggedIn, isCity }) {
  const [showMapView, setShowMapView] = useState(false);

  // Show loading state
  if (loading) {
    return (
      <div className="lg:hidden bg-black min-h-screen w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading destination data...</p>
        </div>
      </div>
    );
  }

  // Show error state if no country data
  if (!country) {
    return (
      <div className="lg:hidden bg-black min-h-screen w-full flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Failed to load destination</p>
          <p className="text-slate-400">Please try searching again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden bg-black min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Spacing from navbar */}
      <div className="h-16 sm:h-20"></div>

      {/* Immersive Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-4 pt-4 pb-6"
      >
        <div className="h-[300px] rounded-2xl overflow-hidden">
          <ImmersiveHero 
            destination={country?.name || 'Destination'} 
            riskScore={riskScore}
          />
        </div>
      </motion.div>

      {/* List/Map Toggle */}
      <div className="sticky top-20 z-30 bg-black/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowMapView(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
              !showMapView
                ? 'bg-yellow-500/20 border border-yellow-400/60 text-yellow-300'
                : 'bg-slate-800 border border-slate-700 text-slate-400'
            }`}
          >
            Details
          </motion.button>
          <motion.button
            onClick={() => setShowMapView(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
              showMapView
                ? 'bg-yellow-500/20 border border-yellow-400/60 text-yellow-300'
                : 'bg-slate-800 border border-slate-700 text-slate-400'
            }`}
          >
            Map
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20 space-y-6">
        {showMapView ? (
          // MAP VIEW
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full -mx-4 px-4"
          >
            <MapSection country={country} loading={loading} />
          </motion.div>
        ) : (
          // DETAILS VIEW
          <>
            {/* Risk Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <ModernRiskScore score={riskScore} loading={loading} />
            </motion.div>

            {/* City/Country Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ModernCard title="Information" icon={Globe}>
                {isCity ? (
                  <CityDetails cityData={country} loading={loading} />
                ) : (
                  <CountryOverview country={country} loading={loading} />
                )}
              </ModernCard>
            </motion.div>

            {/* Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ModernCard title="Weather Forecast" icon={Cloud} noPadding>
                <div className="p-6">
                  <ModernWeather weather={weather} loading={loading} />
                </div>
              </ModernCard>
            </motion.div>

            {/* Currency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ModernCard title="Currency" icon={DollarSign}>
                <CurrencyConverter rates={rates} baseCurrency={country?.currencies} loading={loading} />
              </ModernCard>
            </motion.div>

            {/* Daily Costs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <ModernCard title="Daily Costs" icon={DollarSign}>
                <DailyCosts />
              </ModernCard>
            </motion.div>

            {/* Safety Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <ModernCard title="Safety Alerts" icon={Shield}>
                <SafetyAlerts country={country} loading={loading} />
              </ModernCard>
            </motion.div>

            {/* Local News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <ModernCard title="Local News" icon={Newspaper}>
                <LocalNews news={news} loading={loading} />
              </ModernCard>
            </motion.div>

            {/* Cities & Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <ModernCard title="Cities & Destinations" icon={Globe}>
                <CitiesList country={country} loading={loading} />
              </ModernCard>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
