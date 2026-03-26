import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, MapPin, Calendar, DollarSign, Loader2, Mic, MicOff, MapIcon, Navigation } from 'lucide-react';
import { generateAIResponse } from '../utils/aiService';
import { useTravelContext } from '../context/TravelContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { useGeolocation } from '../hooks/useGeolocation';
import { formatBudget } from '../utils/budgetCalculator';
import { formatRouteSummary } from '../utils/routeOptimizer';

export default function TravelChat({ destination, className = '' }) {
  const { 
    messages, 
    addMessage, 
    updateLocationsFromItinerary,
    highlightLocation,
    centerMapOnLocation,
    getConversationContext,
    userLocation,
    updateUserLocation,
    currentBudget,
    isOptimizingRoute,
    handleMapFallback
  } = useTravelContext();
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [realTimeSuggestions, setRealTimeSuggestions] = useState([]);
  
  // Voice input
  const { isListening, isSupported: voiceSupported, error: voiceError, startListening, stopListening } = useVoiceInput();
  
  // Geolocation
  const { 
    location: geoLocation, 
    loading: locationLoading, 
    error: locationError, 
    getCurrentLocation,
    getLocationName
  } = useGeolocation();
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Quick suggestion prompts
  const quickSuggestions = [
    "Plan a 3-day trip to Lagos",
    "Create a Tokyo itinerary", 
    "Best places to visit near me",
    "Plan a weekend trip",
    "Budget for 7 days in Paris",
    "Cheap flights and hotels"
  ];

  // Real-time suggestions based on input
  const generateRealTimeSuggestions = (input) => {
    const suggestions = [];
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('plan') || lowerInput.includes('trip')) {
      suggestions.push('Plan a weekend trip', 'Plan a budget trip', 'Plan a luxury vacation');
    } else if (lowerInput.includes('cheap') || lowerInput.includes('budget')) {
      suggestions.push('Cheap flights', 'Budget hotels', 'Cheap eats');
    } else if (lowerInput.includes('near') || lowerInput.includes('nearby')) {
      suggestions.push('Things to do nearby', 'Restaurants near me', 'Hotels near me');
    } else if (lowerInput.length > 2) {
      suggestions.push('Plan a trip', 'Find cheap options', 'Get recommendations');
    }
    
    return suggestions.slice(0, 3);
  };

  // Update real-time suggestions as user types
  useEffect(() => {
    if (inputMessage.length > 2) {
      const suggestions = generateRealTimeSuggestions(inputMessage);
      setRealTimeSuggestions(suggestions);
    } else {
      setRealTimeSuggestions([]);
    }
  }, [inputMessage]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        role: 'assistant',
        content: `Hi! I'm your AI Travel Assistant. I can help you plan trips, find costs, suggest activities, and answer any travel questions. ${destination ? `I see you're interested in ${destination}. ` : ''}What would you like to know?`,
        timestamp: new Date()
      };
      addMessage(welcomeMessage);
    }
  }, [messages.length, destination, addMessage]);

  // Focus input on mount and scroll to top
  useEffect(() => {
    inputRef.current?.focus();
    // Scroll chat container to top
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  // Handle geolocation updates
  useEffect(() => {
    if (geoLocation.latitude && geoLocation.longitude) {
      getLocationName(geoLocation.latitude, geoLocation.longitude)
        .then(locationName => {
          updateUserLocation({
            ...geoLocation,
            locationName: locationName.formatted
          });
        });
    }
  }, [geoLocation, getLocationName, updateUserLocation]);

  // Voice input handlers
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(
        (transcript) => {
          setInputMessage(transcript);
          setShowSuggestions(false);
        },
        (error) => {
          console.error('Voice input error:', error);
        }
      );
    }
  };

  // Location request handler
  const handleLocationRequest = () => {
    getCurrentLocation();
  };

  // Render structured itinerary response
  const renderItineraryResponse = (content) => {
    try {
      const itinerary = typeof content === 'object' ? content : JSON.parse(content);
      
      if (itinerary.days && Array.isArray(itinerary.days)) {
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-primary mb-3">Your Itinerary</h4>
            
            {itinerary.days.map((day) => (
              <motion.div
                key={`day-${day.day}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (day.day - 1) * 0.1 }}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
              >
                <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  Day {day.day}
                </h5>
                
                {/* Render locations with click handlers */}
                {day.locations && day.locations.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-sm font-medium text-slate-300 mb-1">Locations:</h6>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {day.locations.map((location) => (
                        <li key={`${day.day}-${location.name}`} className="flex items-start gap-2">
                          <button
                            onClick={() => highlightLocation(`${day.day}-${location.name.replace(/\s+/g, '-').toLowerCase()}`)}
                            className="flex items-start gap-2 hover:text-primary transition-colors cursor-pointer text-left"
                          >
                            <MapPin size={12} className="text-primary mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{location.name}</span>
                              {location.type && <span className="text-xs text-slate-500 ml-2">({location.type})</span>}
                              {location.notes && <div className="text-xs text-slate-500 mt-1">{location.notes}</div>}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Legacy support for activities and food */}
                {day.activities && day.activities.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-sm font-medium text-slate-300 mb-1">Activities:</h6>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {day.activities.map((activity) => (
                        <li key={`${day.day}-activity-${activity}`} className="flex items-start gap-2">
                          <MapPin size={12} className="text-primary mt-1 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {day.food && day.food.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-sm font-medium text-slate-300 mb-1">Food:</h6>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {day.food.map((food) => (
                        <li key={`${day.day}-food-${food}`} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {day.notes && (
                  <div className="text-xs text-slate-500 italic border-l-2 border-primary/30 pl-3">
                    {day.notes}
                  </div>
                )}
              </motion.div>
            ))}
            
            {itinerary.budget_estimate && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <DollarSign size={16} />
                  Budget Estimate
                </div>
                <p className="text-sm text-slate-300 mt-1">{itinerary.budget_estimate}</p>
                {currentBudget && (
                  <div className="text-xs text-slate-400 mt-2">
                    Detailed: {formatBudget(currentBudget.grandTotal)} total
                  </div>
                )}
              </div>
            )}
            
            {/* Route optimization info */}
            {day.routeStats && (
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2 text-green-400 font-medium mb-1">
                  <Navigation size={14} />
                  Optimized Route
                </div>
                <p className="text-xs text-slate-300">
                  {formatRouteSummary(day.routeStats)}
                </p>
              </div>
            )}
            
            {itinerary.tips && itinerary.tips.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                <h6 className="text-sm font-medium text-blue-400 mb-2">💡 Pro Tips:</h6>
                <ul className="text-sm text-slate-300 space-y-1">
                  {itinerary.tips.map((tip) => (
                    <li key={`tip-${tip.substring(0, 20)}`} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }
    } catch (e) {
      // Not valid JSON or itinerary format, render as text
    }
    
    return null;
  };

  // Render map response content
  const renderMapResponse = (content) => {
    try {
      // Check if it's a map response
      if (content && typeof content === 'object' && content.type === 'map' && content.locations) {
        // Validate locations array
        if (!Array.isArray(content.locations) || content.locations.length === 0) {
          return (
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <MapPin size={16} />
                <span className="font-medium">Map Response</span>
              </div>
              <p className="text-sm text-slate-300">
                No locations found to display on the map.
              </p>
            </div>
          );
        }

        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Map Locations ({content.locations.length})
            </h4>
            
            {content.locations.map((location) => {
              // Validate individual location
              if (!location || !location.name) {
                return (
                  <div key={`invalid-${Math.random()}`} className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 opacity-50">
                    <p className="text-xs text-slate-500">Invalid location data</p>
                  </div>
                );
              }

              return (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: content.locations.indexOf(location) * 0.1 }}
                  className="bg-zinc-800 rounded-lg p-3 border border-zinc-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-white mb-1">{location.name}</h5>
                      {location.notes && (
                        <p className="text-sm text-slate-400 mb-2">{location.notes}</p>
                      )}
                      {location.query && location.query !== location.name && (
                        <p className="text-xs text-slate-500 mb-2">Search: {location.query}</p>
                      )}
                      <button
                        onClick={() => {
                          try {
                            if (highlightLocation) {
                              highlightLocation(location.name.replace(/\s+/g, '-').toLowerCase());
                            }
                            if (centerMapOnLocation && location.coordinates) {
                              centerMapOnLocation(location.coordinates.lat, location.coordinates.lng);
                            }
                          } catch (error) {
                            console.error('Error highlighting location:', error);
                          }
                        }}
                        className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded-full transition-colors"
                      >
                        Show on Map
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <div className="text-xs text-slate-500 italic">
              💡 Locations have been added to the map. Check the map panel to see them!
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Error rendering map response:', error);
      return (
        <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <MapPin size={16} />
            <span className="font-medium">Map Response Error</span>
          </div>
          <p className="text-sm text-slate-300">
            Unable to display map locations. Please try asking again.
          </p>
          <details className="mt-2">
            <summary className="text-xs text-slate-500 cursor-pointer">Error Details</summary>
            <pre className="text-xs text-slate-600 mt-1 overflow-auto">
              {error.message}
            </pre>
          </details>
        </div>
      );
    }
    
    return null;
  };

  // Extract locations from AI response with safety checks
  const extractLocationsFromResponse = (response) => {
    if (!updateLocationsFromItinerary) {
      console.warn('updateLocationsFromItinerary not available yet');
      return;
    }
    
    if (typeof response === 'object' && response.days) {
      // It's already a structured itinerary
      updateLocationsFromItinerary(response);
      return;
    }
    
    if (typeof response === 'string') {
      try {
        // Try to parse JSON from string
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.days || (parsed.type === 'map' && parsed.locations)) {
            updateLocationsFromItinerary(parsed);
            return;
          }
        }
      } catch (e) {
        // Not JSON, continue with text parsing
      }
      
      // Extract location names from text using patterns
      const locationPatterns = [
        /(?:visit|go to|see|explore|check out)\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|\n|$)/gi,
        /([A-Z][a-zA-Z\s]+?)\s+(?:is|has|offers|features)/gi,
        /(?:in|at|near)\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|\n|$)/gi
      ];
      
      const extractedLocations = [];
      locationPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(response)) !== null) {
          const location = match[1].trim();
          if (location.length > 2 && location.length < 50) {
            extractedLocations.push({
              name: location,
              type: 'attraction',
              notes: 'Mentioned in conversation'
            });
          }
        }
      });
      
      if (extractedLocations.length > 0) {
        // Create a simple itinerary structure
        const simpleItinerary = {
          days: [{
            day: 1,
            locations: extractedLocations.slice(0, 5) // Limit to 5 locations
          }]
        };
        updateLocationsFromItinerary(simpleItinerary);
      }
    }
  };

  // Handle sending messages with context
  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);
    setShowSuggestions(false);
    setRealTimeSuggestions([]);

    try {
      // Get conversation context including location and memory
      const context = getConversationContext();
      
      // Enhance context with current request
      const enhancedContext = {
        ...context,
        destination,
        currentQuery: messageText.trim()
      };
      
      const aiResponse = await generateAIResponse(messageText, enhancedContext);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      addMessage(assistantMessage);
      
      // Extract locations from AI response for map integration
      extractLocationsFromResponse(aiResponse);
      
      // Failsafe: Try map fallback if AI returned text for a map query
      if (typeof aiResponse === 'string' && handleMapFallback) {
        const fallbackUsed = await handleMapFallback(aiResponse, messageText);
        if (fallbackUsed) {
          console.log('Map fallback successfully applied');
        }
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm experiencing high demand right now. Please try again in a moment, or check our destination pages for detailed information.",
        timestamp: new Date(),
        isError: true
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle quick suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render message content
  const renderMessageContent = (message) => {
    // Try to render as map response first
    if (message.role === 'assistant' && typeof message.content === 'object') {
      try {
        const mapContent = renderMapResponse(message.content);
        if (mapContent) return mapContent;
        
        const structuredContent = renderItineraryResponse(message.content);
        if (structuredContent) return structuredContent;
      } catch (error) {
        console.error('Error rendering structured content:', error);
        // Fall through to text rendering
      }
    }
    
    // Try to parse JSON string for map responses
    if (message.role === 'assistant' && typeof message.content === 'string') {
      // Check for map response patterns
      if (message.content.includes('"type"') && message.content.includes('"map"') && message.content.includes('"locations"')) {
        try {
          const parsedContent = JSON.parse(message.content);
          const mapContent = renderMapResponse(parsedContent);
          if (mapContent) return mapContent;
        } catch (error) {
          console.error('Error parsing map JSON:', error);
          // Fall through to other parsing attempts
        }
      }
      
      // Check for itinerary patterns
      if (message.content.includes('"days"') && message.content.includes('[')) {
        try {
          const structuredContent = renderItineraryResponse(message.content);
          if (structuredContent) return structuredContent;
        } catch (error) {
          console.error('Error parsing itinerary JSON:', error);
          // Fall through to text rendering
        }
      }
    }
    
    // Render as formatted text with safety checks
    let content;
    try {
      content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content, null, 2);
    } catch (error) {
      console.error('Error processing message content:', error);
      content = 'Unable to display message content';
    }
    
    if (!content || content.trim() === '') {
      return (
        <div className="text-xs text-slate-500 italic">
          Empty message
        </div>
      );
    }
    
    return (
      <div className="whitespace-pre-wrap text-xs leading-snug">
        {content.split('\n').map((line, i) => {
          // Format bold text
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <div key={i} className="font-semibold text-primary mb-1">
                {line.replace(/\*\*/g, '')}
              </div>
            );
          }
          
          // Format bullet points
          if (line.startsWith('• ') || line.startsWith('- ')) {
            return (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span className="text-primary mt-0.5">•</span>
                <span className="flex-1">{line.substring(2)}</span>
              </div>
            );
          }
          
          return line ? <div key={i} className="mb-1">{line}</div> : <div key={i} className="mb-2" />;
        })}
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b from-zinc-900 to-black rounded-xl border border-zinc-800 shadow-2xl ${className} max-w-full`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 md:p-5 border-b border-zinc-800 bg-zinc-900/50 rounded-t-xl">
        <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-r from-primary to-yellow-600 rounded-full flex items-center justify-center">
          <Bot size={18} className="md:hidden text-black" />
          <Bot size={22} className="hidden md:block text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-xs md:text-sm truncate">AI Travel Assistant</h3>
          <p className="text-xs text-slate-400 truncate">
            {destination ? `Helping with ${destination}` : 'Ready to help plan your journey'}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto min-h-0 p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 chat-compact chat-scroll"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-1.5 sm:gap-2 md:gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-primary text-black' 
                  : 'bg-zinc-700 text-white'
              }`}>
                {message.role === 'user' ? <User size={10} className="sm:hidden" /> : <Bot size={10} className="sm:hidden" />}
                {message.role === 'user' ? <User size={12} className="hidden sm:block md:hidden" /> : <Bot size={12} className="hidden sm:block md:hidden" />}
                {message.role === 'user' ? <User size={16} className="hidden md:block" /> : <Bot size={16} className="hidden md:block" />}
              </div>
              
              {/* Message Bubble */}
              <div className={`max-w-[70%] sm:max-w-[65%] md:max-w-[70%] rounded-2xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-3 md:py-2 chat-message-inward break-words ${
                message.role === 'user'
                  ? 'bg-primary text-black rounded-br-md'
                  : message.isError
                  ? 'bg-red-900/20 border border-red-700/30 text-red-300 rounded-bl-md'
                  : 'bg-zinc-800 text-white rounded-bl-md border border-zinc-700'
              }`}>
                {(() => {
                  try {
                    return renderMessageContent(message);
                  } catch (error) {
                    console.error('Error rendering message:', error, message);
                    return (
                      <div className="bg-red-900/20 border border-red-700/30 rounded p-2">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                          <span className="text-xs">⚠️</span>
                          <span className="text-xs font-medium">Rendering Error</span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Unable to display this message. Please try again.
                        </p>
                      </div>
                    );
                  }
                })()}
                
                <div className={`text-xs mt-1 opacity-60 ${
                  message.role === 'user' ? 'text-black/70' : 'text-slate-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-1.5 sm:gap-2 md:gap-3"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                <Bot size={10} className="sm:hidden text-white" />
                <Bot size={12} className="hidden sm:block md:hidden text-white" />
                <Bot size={16} className="hidden md:block text-white" />
              </div>
              <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-2 py-1.5 sm:px-3 sm:py-2 border border-zinc-700">
                <div className="flex items-center gap-2">
                  <Loader2 size={12} className="sm:hidden animate-spin text-primary" />
                  <Loader2 size={14} className="hidden sm:block animate-spin text-primary" />
                  <span className="text-xs text-slate-300">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <AnimatePresence>
        {showSuggestions && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-3 md:px-4 pb-2"
          >
            <p className="text-xs text-slate-400 mb-2 md:mb-3">Quick suggestions:</p>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {quickSuggestions.slice(0, window.innerWidth < 768 ? 3 : 4).map((suggestion) => (
                <motion.button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-slate-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full border border-zinc-700 hover:border-primary/30 transition-all duration-200"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Suggestions */}
      <AnimatePresence>
        {realTimeSuggestions.length > 0 && inputMessage.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-3 md:px-4 pb-2"
          >
            <div className="flex flex-wrap gap-1 md:gap-2">
              {realTimeSuggestions.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 hover:text-blue-200 px-2 py-1 md:px-3 md:py-2 rounded-full border border-blue-700/30 hover:border-blue-600/50 transition-all duration-200"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location & Voice Status */}
      {(userLocation || voiceError || locationError) && (
        <div className="px-3 md:px-4 pb-2">
          <div className="flex flex-wrap gap-2 text-xs">
            {userLocation && (
              <div className="flex items-center gap-1 text-green-400">
                <MapIcon size={12} />
                <span>Location: {userLocation.locationName}</span>
              </div>
            )}
            {voiceError && (
              <div className="text-red-400">{voiceError}</div>
            )}
            {locationError && (
              <div className="text-orange-400">{locationError}</div>
            )}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 md:p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-2 md:gap-3 items-end">
          {/* Location Button */}
          <motion.button
            onClick={handleLocationRequest}
            disabled={locationLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg ${
              userLocation 
                ? 'bg-green-600 hover:bg-green-500 text-white' 
                : locationLoading
                ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-700 hover:bg-zinc-600 text-slate-300 hover:text-white'
            }`}
            title={userLocation ? 'Location detected' : 'Get current location'}
          >
            {locationLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <MapIcon size={16} />
            )}
          </motion.button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Ask anything..."}
              disabled={isTyping || isListening}
              rows={1}
              className={`w-full bg-zinc-800 border border-zinc-700 rounded-xl px-2 py-1 md:px-3 md:py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden ${
                isListening ? 'ring-2 ring-red-500/50 border-red-500/50' : ''
              }`}
              style={{ minHeight: '32px', maxHeight: '100px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
            />
            
            {/* Voice indicator */}
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Button */}
          {voiceSupported && (
            <motion.button
              onClick={handleVoiceInput}
              disabled={isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-500 text-white' 
                  : 'bg-zinc-700 hover:bg-zinc-600 text-slate-300 hover:text-white disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:text-zinc-500'
              }`}
              title={isListening ? 'Stop listening' : 'Voice input'}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </motion.button>
          )}
          
          <motion.button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping || isListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 md:w-12 md:h-12 bg-primary hover:bg-primary/90 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black disabled:text-zinc-500 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-primary/25"
          >
            <Send size={16} className="md:hidden" />
            <Send size={18} className="hidden md:block" />
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="hidden md:block">
              Press Enter to send, Shift+Enter for new line
            </span>
            <span className="md:hidden">
              Tap to send
            </span>
            {voiceSupported && (
              <span className="text-blue-400">Voice enabled</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <div className={`w-2 h-2 rounded-full ${isOptimizingRoute ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            {isOptimizingRoute ? 'Optimizing...' : 'AI Online'}
          </div>
        </div>
      </div>
    </div>
  );
}