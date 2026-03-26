import { motion } from 'framer-motion';
import { Globe, Cloud, Map, Newspaper, DollarSign, Shield } from 'lucide-react';
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
import JourneyPlanner from '../JourneyPlanner';
import CitiesList from '../CitiesList';

export default function DesktopDestination({ country, weather, rates, news, riskScore, loading, isLoggedIn, isCity }) {
  // Show loading state
  if (loading) {
    return (
      <div className="hidden lg:flex py-8 bg-black w-full min-h-screen flex-col items-center justify-center">
        <div className="text-center mt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading destination data...</p>
        </div>
      </div>
    );
  }

  // Show error state if no country data
  if (!country) {
    return (
      <div className="hidden lg:flex py-8 bg-black w-full min-h-screen flex-col items-center justify-center">
        <div className="text-center mt-32">
          <p className="text-red-400 text-lg mb-2">Failed to load destination</p>
          <p className="text-slate-400">Please try searching again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block py-8 bg-black w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12 pt-8">
        {/* Immersive Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ImmersiveHero 
            destination={country?.name || 'Destination'} 
            riskScore={riskScore}
          />
        </motion.div>

        {/* Risk Score & City Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <ModernRiskScore score={riskScore} loading={loading} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ModernCard title="City Information" icon={Globe}>
              {isCity ? (
                <CityDetails cityData={country} loading={loading} />
              ) : (
                <CountryOverview country={country} loading={loading} />
              )}
            </ModernCard>
          </motion.div>
        </div>

        {/* Weather & Costs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ModernCard title="Weather Forecast" icon={Cloud} noPadding>
              <div className="p-6 md:p-8">
                <ModernWeather weather={weather} loading={loading} />
              </div>
            </ModernCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-8"
          >
            <ModernCard title="Currency" icon={DollarSign}>
              <CurrencyConverter rates={rates} baseCurrency={country?.currencies} loading={loading} />
            </ModernCard>

            <ModernCard title="Daily Costs" icon={DollarSign}>
              <DailyCosts />
            </ModernCard>
          </motion.div>
        </div>

        {/* Full Width Map Section */}
        <MapSection country={country} loading={loading} />

        {/* Safety & News Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <ModernCard title="Safety Alerts" icon={Shield}>
              <SafetyAlerts country={country} loading={loading} />
            </ModernCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <ModernCard title="Local News" icon={Newspaper}>
              <LocalNews news={news} loading={loading} />
            </ModernCard>
          </motion.div>
        </div>

        {/* Cities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <ModernCard title="Cities & Destinations" icon={Globe}>
            <CitiesList country={country} loading={loading} />
          </ModernCard>
        </motion.div>

        {/* Journey Planner - Only for logged in users */}
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <ModernCard title="Journey Planner" icon={Map}>
              <JourneyPlanner country={country} loading={loading} />
            </ModernCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
