import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import SafetyPreview from '../components/SafetyPreview';
import AITravelAssistant from '../components/AITravelAssistant';
import Footer from '../components/Footer';
import { useScrollToTop } from '../utils/useScrollToTop';

export default function Home() {
  useScrollToTop();
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflowX: 'hidden',
      backgroundColor: '#000000',
      color: '#ffffff'
    }}>
      <Navbar />
      <main style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Hero />
        <HowItWorks />
        <Features />
        <SafetyPreview />
      </main>
      <Footer />
      
      {/* AI Travel Assistant - Available on home page */}
      <AITravelAssistant 
        destination="any destination" 
        riskScore={null} 
      />
    </div>
  );
}
