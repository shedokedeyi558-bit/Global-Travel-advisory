import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardWorldMap from '../components/DashboardWorldMap';
import DashboardInfoPanel from '../components/DashboardInfoPanel';
import Footer from '../components/Footer';
import MobileDestinationsList from '../components/destinations/MobileDestinationsList';
import { useScrollToTop } from '../utils/useScrollToTop';
import { getCountrySafetyScore } from '../utils/countrySafetyData';

const countries = [
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Iceland', flag: '🇮🇸' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Syria', flag: '🇸🇾' },
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Yemen', flag: '🇾🇪' },
  { name: 'Somalia', flag: '🇸🇴' }
];

export default function Destinations() {
  useScrollToTop();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRiskColor = (score) => {
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    if (score < 80) return 'text-red-400';
    return 'text-red-600';
  };

  const getRiskLabel = (score) => {
    if (score < 30) return 'LOW RISK';
    if (score < 60) return 'MODERATE';
    if (score < 80) return 'HIGH RISK';
    return 'CRITICAL';
  };

  const getRiskBorder = (score) => {
    if (score < 30) return 'border-green-500/30';
    if (score < 60) return 'border-yellow-500/30';
    if (score < 80) return 'border-red-500/30';
    return 'border-red-700/50';
  };

  const filteredCountries = countries.filter(country => {
    if (searchQuery && !country.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Mobile view
  if (isMobile) {
    return (
      <div className="lg:hidden bg-black min-h-screen w-full flex flex-col relative z-50">
        <Navbar />
        <MobileDestinationsList />
        <Footer />
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      paddingTop: '120px'
    }}>
      <Navbar />

      {/* Dashboard Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '850px',
        minHeight: '850px',
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            riskFilter={riskFilter}
            setRiskFilter={setRiskFilter}
          />
        </div>

        {/* World Map */}
        <div className="flex-1 w-full h-full lg:ml-80">
          <DashboardWorldMap
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            riskFilter={riskFilter}
          />
        </div>

        {/* Info Panel - Full Height */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 h-full overflow-y-auto" style={{ width: '350px', minWidth: '350px' }}>
          <DashboardInfoPanel selectedCountry={selectedCountry} />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
