import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HealthCountrySelector from '../components/HealthCountrySelector';
import HealthMetricsPanel from '../components/HealthMetricsPanel';
import VaccinePanel from '../components/VaccinePanel';
import DiseaseRiskPanel from '../components/DiseaseRiskPanel';
import HealthAIInsights from '../components/HealthAIInsights';
import Footer from '../components/Footer';
import { useScrollToTop } from '../utils/useScrollToTop';

export default function HealthData() {
  useScrollToTop();
  const [selectedCountry, setSelectedCountry] = useState('Singapore');

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      paddingTop: '80px'
    }}>
      <Navbar />

      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(59,130,246,0.05) 25%, rgba(59,130,246,0.05) 26%, transparent 27%, transparent 74%, rgba(59,130,246,0.05) 75%, rgba(59,130,246,0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59,130,246,0.05) 25%, rgba(59,130,246,0.05) 26%, transparent 27%, transparent 74%, rgba(59,130,246,0.05) 75%, rgba(59,130,246,0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest mb-3">TRAVEL HEALTH INTELLIGENCE</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Health Dashboard
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Real-time health intelligence for your destination. Get comprehensive data on vaccinations, disease risks, water safety, and healthcare quality.
            </p>
          </motion.div>

          {/* Country Selector */}
          <HealthCountrySelector 
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column: Vaccines & Diseases */}
            <div className="lg:col-span-1 space-y-8">
              <VaccinePanel selectedCountry={selectedCountry} />
              <DiseaseRiskPanel selectedCountry={selectedCountry} />
            </div>

            {/* Right Column: Metrics & Insights */}
            <div className="lg:col-span-2 space-y-8">
              <HealthMetricsPanel selectedCountry={selectedCountry} />
              <HealthAIInsights selectedCountry={selectedCountry} />
            </div>
          </div>
        </div>
      </main>
      <div className="mt-10 relative z-10">
        <Footer />
      </div>
    </div>
  );
}
