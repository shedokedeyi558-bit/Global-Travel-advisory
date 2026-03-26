import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AITravelAssistant from '../AITravelAssistant';
import DesktopDestination from './DesktopDestination';
import MobileDestination from './MobileDestination';
import { useAuth } from '../../context/AuthContext';
import { useScrollToTop } from '../../utils/useScrollToTop';
import { fetchCityData } from '../../utils/cityDataFetcher';
import { calculateCitySafetyScore } from '../../utils/safetyScoringService';
import {
  fetchCountryData,
  fetchWeatherData,
  fetchExchangeRates,
  fetchNews,
} from '../../utils/api';

export default function DestinationPage() {
  useScrollToTop();
  const { location } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [country, setCountry] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [rates, setRates] = useState(null);
  const [news, setNews] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isCity, setIsCity] = useState(false);

  console.log('DestinationPage rendered with location:', location);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const decodedLocation = decodeURIComponent(location);
        console.log('Loading data for:', decodedLocation);
        setLoading(true);
        setError(null);

        const countryData = await fetchCountryData(decodedLocation);
        console.log('Country data loaded:', countryData);
        
        // Check if it's a city
        if (countryData.isCity) {
          setIsCity(true);
          setCityData(countryData);
          
          // Fetch additional city data
          try {
            const additionalCityData = await fetchCityData(
              countryData.name,
              countryData.lat,
              countryData.lng
            );
            if (additionalCityData) {
              console.log('Additional city data fetched:', additionalCityData);
              setCityData(prev => ({ ...prev, ...additionalCityData }));
            }
          } catch (cityError) {
            console.log('Additional city data fetch failed:', cityError);
            // Continue with basic city data
          }
        } else {
          setCountry(countryData);
        }

        const weatherData = await fetchWeatherData(countryData.lat, countryData.lng);
        console.log('Weather data loaded:', weatherData);
        setWeather(weatherData);

        const currencyCode = countryData.currencies?.split(',')[0]?.trim() || 'USD';
        const ratesData = await fetchExchangeRates(currencyCode);
        console.log('Exchange rates loaded:', ratesData);
        setRates(ratesData);

        const newsData = await fetchNews(countryData.name);
        console.log('News data loaded:', newsData);
        setNews(newsData);

        // Calculate safety score based on real-world data
        const safetyData = calculateCitySafetyScore(countryData.name, countryData.country);
        const score = safetyData.score;
        console.log('Safety score calculated:', score);
        setRiskScore(score);

        const { addToSearchHistory } = await import('../../utils/storage');
        addToSearchHistory(countryData.name, score);

        console.log('All data loaded successfully');
        setLoading(false);
      } catch (err) {
        console.error('Error loading destination data:', err);
        setError(err.message || 'Destination not found. Please try another country or city.');
        setLoading(false);
      }
    };

    if (location) {
      loadData();
    }
  }, [location]);

  if (error) {
    return (
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 pt-20">
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold text-white mb-4">
                  Destination Not Found
                </h1>
                <p className="text-slate-300 dark:text-slate-400 mb-8">
                  {error}
                </p>
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-primary px-8 py-3 text-lg font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                  Back to Home
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {isCity ? (
          // Show city details instead of country overview
          isMobile ? (
            <MobileDestination
              country={cityData}
              weather={weather}
              rates={rates}
              news={news}
              riskScore={riskScore}
              loading={loading}
              isLoggedIn={isLoggedIn}
              isCity={true}
            />
          ) : (
            <DesktopDestination
              country={cityData}
              weather={weather}
              rates={rates}
              news={news}
              riskScore={riskScore}
              loading={loading}
              isLoggedIn={isLoggedIn}
              isCity={true}
            />
          )
        ) : (
          // Show country overview
          isMobile ? (
            <MobileDestination
              country={country}
              weather={weather}
              rates={rates}
              news={news}
              riskScore={riskScore}
              loading={loading}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <DesktopDestination
              country={country}
              weather={weather}
              rates={rates}
              news={news}
              riskScore={riskScore}
              loading={loading}
              isLoggedIn={isLoggedIn}
            />
          )
        )}
      </main>
      <Footer />
      <AITravelAssistant destination={country?.name || cityData?.name} riskScore={riskScore} />
    </div>
  );
}
