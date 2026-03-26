import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Destination from './pages/Destination';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Accessibility from './pages/Accessibility';
import Newsroom from './pages/Newsroom';
import Destinations from './pages/Destinations';
import HealthData from './pages/HealthData';
import AirportInformation from './pages/AirportInformation';
import AIFeatures from './pages/AIFeatures';
import Chat from './pages/Chat';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TravelProvider } from './context/TravelContext';

function AppRoutes() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/destination/:location" element={<Destination />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/health-data" element={<HealthData />} />
        <Route path="/airport-info" element={<AirportInformation />} />
        <Route path="/ai-features" element={<AIFeatures />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default function App() {
  // Prevent scroll restoration on app load
  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on app initialization
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <TravelProvider>
          <AppRoutes />
        </TravelProvider>
      </AuthProvider>
    </Router>
  );
}
