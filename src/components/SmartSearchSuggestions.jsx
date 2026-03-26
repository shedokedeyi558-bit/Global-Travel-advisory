import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Sparkles, Bot, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../utils/aiService';
import { useTravelContext } from '../context/TravelContext';

export default function SmartSearchSuggestions({ searchTerm, onSuggestionClick }) {
  const [suggestions, setSuggestions] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const navigate = useNavigate();
  const { highlightLocation, centerMapOnLocation } = useTravelContext();

  useEffect(() => {
    if (searchTerm.length > 2) {
      generateSmartSuggestions(searchTerm);
      generateAISuggestions(searchTerm);
    } else {
      setSuggestions([]);
      setAiSuggestions([]);
    }
  }, [searchTerm]);

  const generateAISuggestions = async (term) => {
    if (term.length < 3) return;
    
    setIsLoadingAI(true);
    try {
      const aiPrompt = `Based on the search term "${term}", suggest 2-3 relevant travel destinations or travel-related topics. Format as: "Destination/Topic - Brief description". Keep each suggestion under 50 characters.`;
      
      const aiResponse = await generateAIResponse(aiPrompt);
      
      // Parse AI response into suggestions
      const lines = aiResponse.split('\n').filter(line => line.trim());
      const parsedSuggestions = lines.slice(0, 3).map((line, index) => {
        const parts = line.replace(/^\d+\.?\s*/, '').split(' - ');
        const title = parts[0]?.trim() || `AI Suggestion ${index + 1}`;
        const description = parts[1]?.trim() || 'AI-powered recommendation';
        
        return {
          type: 'ai',
          title,
          subtitle: 'AI-powered suggestion',
          description,
          icon: Bot,
          action: () => {
            // Try to navigate to destination if it looks like a place name
            if (title.match(/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/)) {
              handleDestinationClick(title);
            } else {
              navigate('/destinations');
              onSuggestionClick();
            }
          }
        };
      });
      
      setAiSuggestions(parsedSuggestions);
    } catch (error) {
      console.error('AI suggestions error:', error);
      setAiSuggestions([]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const generateSmartSuggestions = (term) => {
    const lowerTerm = term.toLowerCase();
    const smartSuggestions = [];

    // Country/City matching
    const destinations = [
      { name: 'Switzerland', type: 'country', safety: 95, description: 'Alpine paradise, very safe' },
      { name: 'Portugal', type: 'country', safety: 88, description: 'Affordable Europe, great food' },
      { name: 'Nigeria', type: 'country', safety: 45, description: 'Rich culture, plan carefully' },
      { name: 'Japan', type: 'country', safety: 96, description: 'Extremely safe, unique culture' },
      { name: 'United States', type: 'country', safety: 75, description: 'Diverse destinations' },
      { name: 'France', type: 'country', safety: 82, description: 'Art, cuisine, romance' },
      { name: 'Germany', type: 'country', safety: 85, description: 'History, efficiency, beer' },
      { name: 'Australia', type: 'country', safety: 84, description: 'Adventure and beaches' },
      { name: 'Canada', type: 'country', safety: 87, description: 'Nature and friendly people' },
      { name: 'United Kingdom', type: 'country', safety: 82, description: 'History and culture' },
      { name: 'Lisbon', type: 'city', safety: 89, description: 'Charming Portuguese capital' },
      { name: 'Tokyo', type: 'city', safety: 96, description: 'Modern metropolis, very safe' },
      { name: 'Lagos', type: 'city', safety: 45, description: 'Nigerian business hub' },
      { name: 'Zurich', type: 'city', safety: 95, description: 'Swiss financial center' },
      { name: 'Paris', type: 'city', safety: 79, description: 'City of lights and love' },
    ];

    // Find matching destinations
    const matchingDestinations = destinations.filter(dest => 
      dest.name.toLowerCase().includes(lowerTerm)
    );

    matchingDestinations.forEach(dest => {
      smartSuggestions.push({
        type: 'destination',
        title: dest.name,
        subtitle: `${dest.type} • Safety: ${dest.safety}/100`,
        description: dest.description,
        icon: MapPin,
        action: () => handleDestinationClick(dest.name)
      });
    });

    // Intent-based suggestions
    if (lowerTerm.includes('safe') || lowerTerm.includes('security')) {
      smartSuggestions.push({
        type: 'intent',
        title: 'Safest Destinations',
        subtitle: 'Countries with highest safety scores',
        description: 'Switzerland, Japan, Singapore, Canada',
        icon: Sparkles,
        action: () => navigate('/safety-ratings')
      });
    }

    if (lowerTerm.includes('budget') || lowerTerm.includes('cheap') || lowerTerm.includes('affordable')) {
      smartSuggestions.push({
        type: 'intent',
        title: 'Budget-Friendly Destinations',
        subtitle: 'Great value travel destinations',
        description: 'Portugal, Thailand, Vietnam, Mexico',
        icon: TrendingUp,
        action: () => navigate('/destinations')
      });
    }

    if (lowerTerm.includes('beach') || lowerTerm.includes('ocean') || lowerTerm.includes('coast')) {
      smartSuggestions.push({
        type: 'intent',
        title: 'Beach Destinations',
        subtitle: 'Beautiful coastal locations',
        description: 'Portugal, Australia, Thailand, Brazil',
        icon: MapPin,
        action: () => navigate('/destinations')
      });
    }

    if (lowerTerm.includes('mountain') || lowerTerm.includes('hiking') || lowerTerm.includes('alpine')) {
      smartSuggestions.push({
        type: 'intent',
        title: 'Mountain Destinations',
        subtitle: 'Alpine and hiking destinations',
        description: 'Switzerland, Austria, Nepal, Chile',
        icon: MapPin,
        action: () => navigate('/destinations')
      });
    }

    setSuggestions(smartSuggestions.slice(0, 5)); // Limit to 5 suggestions
  };

  const handleDestinationClick = async (destination) => {
    setIsFetchingData(true);
    try {
      // First, try to fetch as a country using REST Countries API
      try {
        const countryResponse = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(destination)}?fullText=false`
        );
        if (countryResponse.ok) {
          const countryData = await countryResponse.json();
          if (countryData && countryData.length > 0) {
            const country = countryData[0];
            const lat = country.latlng?.[0];
            const lng = country.latlng?.[1];
            
            if (lat && lng && centerMapOnLocation) {
              centerMapOnLocation(lat, lng);
            }
            
            console.log(`Fetched country data for ${destination}:`, { lat, lng, name: country.name.common });
            navigate(`/destination/${encodeURIComponent(destination)}`);
            onSuggestionClick();
            return;
          }
        }
      } catch (countryError) {
        console.log('Country lookup failed, trying city lookup...');
      }

      // If country lookup fails, try city/location lookup using Nominatim
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`
      );
      const locationData = await locationResponse.json();
      
      if (locationData && locationData.length > 0) {
        const location = locationData[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        
        if (centerMapOnLocation) {
          centerMapOnLocation(lat, lon);
        }
        
        if (highlightLocation) {
          highlightLocation(destination.replace(/\s+/g, '-').toLowerCase());
        }
        
        console.log(`Fetched location data for ${destination}:`, { lat, lon, ...location });
      }
      
      navigate(`/destination/${encodeURIComponent(destination)}`);
      onSuggestionClick();
    } catch (error) {
      console.error('Error fetching location data:', error);
      navigate(`/destination/${encodeURIComponent(destination)}`);
      onSuggestionClick();
    } finally {
      setIsFetchingData(false);
    }
  };

  if (suggestions.length === 0 && aiSuggestions.length === 0 && !isLoadingAI) return null;

  const allSuggestions = [...suggestions, ...aiSuggestions].slice(0, 6); // Limit total suggestions

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute bottom-full left-0 right-0 mb-2 bg-zinc-900 border border-yellow-500/30 rounded-xl shadow-2xl shadow-yellow-500/10 overflow-hidden z-50"
      >
        <div className="p-2">
          <div className="text-xs text-slate-400 px-3 py-2 flex items-center gap-2">
            <Sparkles size={12} />
            Smart Suggestions {isLoadingAI && <span className="animate-pulse">• AI thinking...</span>}
          </div>
          
          {allSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.button
                key={index}
                onClick={() => {
                  suggestion.action();
                }}
                disabled={isFetchingData}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    {isFetchingData ? (
                      <Loader2 size={16} className="text-primary animate-spin" />
                    ) : (
                      <Icon size={16} className="text-primary" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white text-sm group-hover:text-primary transition-colors">
                        {suggestion.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        suggestion.type === 'destination' 
                          ? 'bg-blue-900/20 text-blue-400' 
                          : suggestion.type === 'ai'
                          ? 'bg-purple-900/20 text-purple-400'
                          : 'bg-green-900/20 text-green-400'
                      }`}>
                        {suggestion.type}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-1">{suggestion.subtitle}</p>
                    <p className="text-xs text-slate-500">{suggestion.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}