import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { optimizeItineraryByDay } from '../utils/routeOptimizer';
import { calculateTripBudget, extractBudgetFromMessage, detectBudgetTier } from '../utils/budgetCalculator';
import { geocodeLocation, geocodeMultipleLocations, extractLocationNames } from '../utils/geocoding';

const TravelContext = createContext();

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};

export const TravelProvider = ({ children }) => {
  // Chat state with memory
  const [messages, setMessages] = useState([]);
  const [conversationMemory, setConversationMemory] = useState({
    destinations: [],
    budgetPreferences: null,
    travelStyle: null,
    previousQueries: []
  });
  
  // Location state
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([6.5244, 3.3792]); // Lagos default
  
  // Current itinerary with optimization
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [optimizedItinerary, setOptimizedItinerary] = useState(null);
  
  // Budget state
  const [currentBudget, setCurrentBudget] = useState(null);
  const [budgetBreakdown, setBudgetBreakdown] = useState(null);
  
  // Voice and interaction state
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Loading states
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isOptimizingRoute, setIsOptimizingRoute] = useState(false);

  // Add message to chat with memory update
  const addMessage = useCallback((message) => {
    const newMessage = { ...message, id: Date.now() + Math.random() };
    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Keep only last 20 messages for performance
      return updated.slice(-20);
    });
    
    // Update conversation memory
    if (message.role === 'user') {
      setConversationMemory(prev => ({
        ...prev,
        previousQueries: [...prev.previousQueries.slice(-10), message.content] // Keep last 10 queries
      }));
      
      // Extract budget information
      const budgetAmount = extractBudgetFromMessage(message.content);
      if (budgetAmount) {
        setConversationMemory(prev => ({
          ...prev,
          budgetPreferences: budgetAmount
        }));
      }
      
      // Extract travel style
      const budgetTier = detectBudgetTier(message.content);
      if (budgetTier !== 'midrange') {
        setConversationMemory(prev => ({
          ...prev,
          travelStyle: budgetTier
        }));
      }
    }
  }, []);

  // Get conversation context for AI
  const getConversationContext = useCallback(() => {
    const recentMessages = messages.slice(-10); // Last 10 messages
    const context = {
      recentMessages: recentMessages.map(m => ({ role: m.role, content: m.content })),
      userLocation: userLocation ? {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
        name: userLocation.locationName
      } : null,
      memory: conversationMemory,
      currentBudget: currentBudget,
      hasItinerary: !!currentItinerary
    };
    
    return context;
  }, [messages, userLocation, conversationMemory, currentBudget, currentItinerary]);

  // Update user location
  const updateUserLocation = useCallback((location) => {
    setUserLocation(location);
    if (location && location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude]);
    }
  }, []);

  // Failsafe: Extract locations from text if AI returns plain text for map queries
  const handleMapFallback = useCallback(async (messageContent, originalInput) => {
    const lowerInput = originalInput.toLowerCase();
    
    // Check if this was likely a map query that returned text
    if (lowerInput.includes('show me') || lowerInput.includes('where is') || 
        lowerInput.includes('locate') || lowerInput.includes('find on map') ||
        lowerInput.includes('on the map')) {
      
      console.log('Attempting map fallback for:', originalInput);
      
      // Extract location names from the original input
      const extractedLocations = extractLocationNames(originalInput);
      
      if (extractedLocations.length > 0) {
        console.log('Extracted locations:', extractedLocations);
        
        // Create map response structure
        const mapResponse = {
          type: 'map',
          locations: extractedLocations.map(name => ({
            name,
            query: name,
            notes: `Location: ${name}`
          }))
        };
        
        // Process as map response directly
        try {
          setIsLoadingLocations(true);
          
          // Geocode all locations
          const geocodedLocations = [];
          
          for (const location of mapResponse.locations) {
            const coords = await geocodeLocation(location.query || location.name);
            if (coords) {
              geocodedLocations.push({
                ...location,
                lat: coords.lat,
                lng: coords.lng,
                id: `map-${location.name.replace(/\s+/g, '-').toLowerCase()}`,
                type: 'location',
                source: coords.source
              });
            }
          }
          
          if (geocodedLocations.length > 0) {
            setSelectedLocations(geocodedLocations);
            
            // Center map on first location
            const firstLocation = geocodedLocations[0];
            setMapCenter([firstLocation.lat, firstLocation.lng]);
            
            console.log('Map fallback locations updated:', geocodedLocations);
          }
          
          return true; // Indicate fallback was used
        } catch (error) {
          console.error('Map fallback failed:', error);
          return false;
        } finally {
          setIsLoadingLocations(false);
        }
      }
    }
    
    return false; // No fallback needed
  }, []);

  // Update locations from AI response with route optimization and map handling
  const updateLocationsFromItinerary = useCallback(async (itinerary) => {
    if (!itinerary) return;
    
    // Handle MAP response type
    if (itinerary.type === 'map' && itinerary.locations) {
      console.log('Processing map response:', itinerary);
      setIsLoadingLocations(true);
      
      try {
        // Geocode all locations
        const geocodedLocations = [];
        
        for (const location of itinerary.locations) {
          const coords = await geocodeLocation(location.query || location.name);
          if (coords) {
            geocodedLocations.push({
              ...location,
              lat: coords.lat,
              lng: coords.lng,
              id: `map-${location.name.replace(/\s+/g, '-').toLowerCase()}`,
              type: 'location',
              source: coords.source
            });
          }
        }
        
        if (geocodedLocations.length > 0) {
          setSelectedLocations(geocodedLocations);
          
          // Center map on first location
          const firstLocation = geocodedLocations[0];
          setMapCenter([firstLocation.lat, firstLocation.lng]);
          
          console.log('Map locations updated:', geocodedLocations);
        }
      } catch (error) {
        console.error('Error processing map locations:', error);
      } finally {
        setIsLoadingLocations(false);
      }
      return;
    }
    
    // Handle ITINERARY response type
    if (itinerary.days) {
      setCurrentItinerary(itinerary);
      setIsOptimizingRoute(true);
      
      try {
        // Optimize the route
        const optimized = optimizeItineraryByDay(itinerary, userLocation);
        setOptimizedItinerary(optimized);
        
        // Extract all locations from optimized itinerary
        const locations = [];
        optimized.days.forEach(day => {
          if (day.locations) {
            day.locations.forEach(location => {
              locations.push({
                ...location,
                day: day.day,
                id: `${day.day}-${location.name.replace(/\s+/g, '-').toLowerCase()}`,
                lat: location.lat,
                lng: location.lng
              });
            });
          }
        });
        
        setSelectedLocations(locations);
        
        // Calculate budget if we have destination info
        if (itinerary.destination || locations.length > 0) {
          const destination = itinerary.destination || locations[0]?.name || 'Unknown';
          const days = itinerary.days.length;
          const budgetTier = conversationMemory?.travelStyle || 'midrange';
          
          const budget = calculateTripBudget(destination, days, budgetTier);
          setCurrentBudget(budget);
          setBudgetBreakdown(budget.breakdown);
        }
        
        console.log('Itinerary optimized:', optimized);
        console.log('Extracted locations:', locations);
      } catch (error) {
        console.error('Route optimization failed:', error);
        // Fallback to original itinerary
        setOptimizedItinerary(itinerary);
      } finally {
        setIsOptimizingRoute(false);
      }
    }
  }, [userLocation, conversationMemory]);

  // Update map markers
  const updateMapMarkers = useCallback((markers) => {
    setMapMarkers(markers);
  }, []);

  // Center map on location
  const centerMapOnLocation = useCallback((lat, lng) => {
    setMapCenter([lat, lng]);
  }, []);

  // Highlight location (for interaction between chat and map)
  const [highlightedLocationId, setHighlightedLocationId] = useState(null);
  
  const highlightLocation = useCallback((locationId) => {
    setHighlightedLocationId(locationId);
    
    // Find the location and center map on it
    const location = selectedLocations.find(loc => loc.id === locationId);
    if (location && location.lat && location.lng) {
      centerMapOnLocation(location.lat, location.lng);
    }
    
    // Auto-clear highlight after 3 seconds
    setTimeout(() => setHighlightedLocationId(null), 3000);
  }, [selectedLocations, centerMapOnLocation]);

  // Voice mode controls
  const toggleVoiceMode = useCallback(() => {
    setIsVoiceMode(prev => !prev);
  }, []);

  const setVoiceListening = useCallback((listening) => {
    setIsListening(listening);
  }, []);

  // Clear conversation and reset state
  const clearConversation = useCallback(() => {
    setMessages([]);
    setCurrentItinerary(null);
    setOptimizedItinerary(null);
    setSelectedLocations([]);
    setCurrentBudget(null);
    setBudgetBreakdown(null);
    setHighlightedLocationId(null);
    setConversationMemory({
      destinations: [],
      budgetPreferences: null,
      travelStyle: null,
      previousQueries: []
    });
  }, []);

  // Update destination memory when itinerary changes
  useEffect(() => {
    if (currentItinerary && currentItinerary.destination) {
      setConversationMemory(prev => ({
        ...prev,
        destinations: [...new Set([...prev.destinations, currentItinerary.destination])]
      }));
    }
  }, [currentItinerary]);

  const value = {
    // Chat state
    messages,
    addMessage,
    setMessages,
    conversationMemory,
    getConversationContext,
    clearConversation,
    
    // Location state
    userLocation,
    updateUserLocation,
    selectedLocations,
    setSelectedLocations,
    mapMarkers,
    updateMapMarkers,
    mapCenter,
    centerMapOnLocation,
    
    // Itinerary state
    currentItinerary,
    setCurrentItinerary,
    optimizedItinerary,
    updateLocationsFromItinerary,
    isOptimizingRoute,
    
    // Map fallback
    handleMapFallback,
    
    // Budget state
    currentBudget,
    setCurrentBudget,
    budgetBreakdown,
    setBudgetBreakdown,
    
    // Interaction state
    highlightedLocationId,
    highlightLocation,
    
    // Voice state
    isVoiceMode,
    toggleVoiceMode,
    isListening,
    setVoiceListening,
    
    // Loading states
    isLoadingLocations,
    setIsLoadingLocations
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};