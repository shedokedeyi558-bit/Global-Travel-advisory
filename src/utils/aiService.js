// Elite AI Travel Assistant - Groq SDK Integration
// Universal AI Service - Fallback System (No External Dependencies)

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Updated models with latest Groq offerings
const GROQ_MODELS = [
  "llama-3.3-70b-versatile", // Primary model - most capable
  "llama-3.1-8b-instant",    // Fallback - faster
  "mixtral-8x7b-32768",      // Alternative
  "gemma-7b-it"              // Last resort
];

// Initialize Groq client (optional)
let groqClient = null;
try {
  if (GROQ_API_KEY && typeof window !== 'undefined') {
    import('groq-sdk').then((GroqModule) => {
      const Groq = GroqModule.default;
      groqClient = new Groq({
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });
      console.log('Groq SDK loaded successfully');
    }).catch((error) => {
      console.log('Groq SDK not available, using fallback mode:', error.message);
    });
  }
} catch (error) {
  console.log('Groq SDK initialization failed, using fallback mode');
}

// Cache for AI responses
const responseCache = new Map();
const CACHE_DURATION = 300000; // 5 minutes

const getCachedResponse = (key) => {
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  responseCache.delete(key);
  return null;
};

const setCachedResponse = (key, data) => {
  responseCache.set(key, { data, timestamp: Date.now() });
};

// Elite system prompt for travel planning with map integration
const ELITE_SYSTEM_PROMPT = `You are an elite AI travel planner.

Rules:
- Give precise, non-generic answers
- Suggest real places (restaurants, attractions, areas)
- Include locations that can be mapped
- Return structured JSON when planning trips
- When generating itineraries: Include place names clearly, keep responses structured and clean

IMPORTANT MAP HANDLING:
If user asks to show, locate, or find a place on a map (using phrases like "show me", "where is", "locate", "find on map"), return JSON in map format instead of text.

MAP FORMAT (STRICT):
{
  "type": "map",
  "locations": [
    {
      "name": "Location Name",
      "query": "Location Name",
      "notes": "Brief description"
    }
  ]
}

ITINERARY FORMAT (STRICT):
{
  "days": [
    {
      "day": 1,
      "locations": [
        {
          "name": "Place Name",
          "type": "restaurant | attraction | hotel | shopping | transport",
          "notes": "short description"
        }
      ]
    }
  ],
  "budget_estimate": "",
  "tips": []
}

For non-itinerary and non-map questions, provide helpful travel advice with specific details.`;

// Response mode detection with MAP mode
const detectResponseMode = (input) => {
  const lowerInput = input.toLowerCase();
  
  // MAP MODE - Detect location-based intent
  if (lowerInput.includes('show me') || lowerInput.includes('where is') || 
      lowerInput.includes('locate') || lowerInput.includes('find on map') ||
      lowerInput.includes('on the map') || lowerInput.includes('show on map') ||
      lowerInput.includes('map of') || lowerInput.includes('find location')) {
    return 'MAP';
  }
  
  // ITINERARY MODE
  if (lowerInput.includes('trip') || lowerInput.includes('plan') || 
      lowerInput.includes('days') || lowerInput.includes('itinerary') ||
      /\d+\s*day/.test(lowerInput)) {
    return 'ITINERARY';
  }
  
  // SEARCH MODE
  if (lowerInput.includes('cheap') || lowerInput.includes('near') ||
      lowerInput.includes('hotels') || lowerInput.includes('restaurants') ||
      lowerInput.includes('find') || lowerInput.includes('where')) {
    return 'SEARCH';
  }
  
  // Default CHAT MODE
  return 'CHAT';
};

// Anti-generic response filter
const isGenericResponse = (response) => {
  if (!response || response.length < 20) return true;
  
  const genericPhrases = [
    'it depends',
    'varies widely',
    'can vary',
    'depends on',
    'many factors',
    'generally speaking',
    'typically',
    'usually',
    'might want to',
    'you may want',
    'consider',
    'feel free to'
  ];
  
  const lowerResponse = response.toLowerCase();
  const hasGenericPhrases = genericPhrases.some(phrase => 
    lowerResponse.includes(phrase)
  );
  
  // Check if response lacks specific details
  const hasSpecifics = /\$\d+|\£\d+|\€\d+|\d+\s*(USD|GBP|EUR|km|miles|hours|minutes)/.test(response);
  
  return hasGenericPhrases && !hasSpecifics;
};

// Try models with proper error handling
const tryGroqModels = async (messages, options) => {
  for (const model of GROQ_MODELS) {
    try {
      console.log(`Trying Groq model: ${model}`);
      const completion = await groqClient.chat.completions.create({
        model: model,
        messages: messages,
        max_tokens: options.maxTokens || 500,
        temperature: options.temperature || 0.2, // Lower for more focused responses
        top_p: options.topP || 0.8,
        stream: false
      });
      
      console.log(`Success with model: ${model}`);
      return completion;
    } catch (error) {
      console.log(`Model ${model} failed:`, error.message);
      
      // Check for specific error types
      if (error.message?.includes('decommissioned') || 
          error.message?.includes('not found') ||
          error.message?.includes('model_decommissioned') ||
          error.status === 400) {
        console.log(`Model ${model} is decommissioned, trying next...`);
        continue; // Try next model
      } else {
        throw error; // Other errors should be thrown
      }
    }
  }
  throw new Error('All Groq models failed or are decommissioned');
};

// Format user input with context and wrapper
const formatUserInputWithContext = (input, context = {}) => {
  let contextualInput = `Answer this clearly and intelligently:\n${input}`;
  
  // Add location context
  if (context.userLocation) {
    contextualInput += `\n\nUser's current location: ${context.userLocation.name || 'Unknown'} (${context.userLocation.lat}, ${context.userLocation.lng})`;
  }
  
  // Add conversation memory
  if (context.memory) {
    if (context.memory.budgetPreferences) {
      contextualInput += `\nUser's budget preference: $${context.memory.budgetPreferences}`;
    }
    if (context.memory.travelStyle) {
      contextualInput += `\nUser's travel style: ${context.memory.travelStyle}`;
    }
    if (context.memory.destinations && context.memory.destinations.length > 0) {
      contextualInput += `\nPreviously discussed destinations: ${context.memory.destinations.slice(-3).join(', ')}`;
    }
  }
  
  // Add recent conversation context
  if (context.recentMessages && context.recentMessages.length > 0) {
    const recentContext = context.recentMessages.slice(-3).map(msg => 
      `${msg.role}: ${msg.content.substring(0, 100)}`
    ).join('\n');
    contextualInput += `\n\nRecent conversation:\n${recentContext}`;
  }
  
  // Add current itinerary context
  if (context.hasItinerary) {
    contextualInput += `\nNote: User already has an active itinerary. Consider building upon it or suggesting modifications.`;
  }
  
  return contextualInput;
};

// Main AI response generation function with enhanced context
export const generateAIResponse = async (input, context = {}) => {
  const cacheKey = `ai_${input.substring(0, 100)}`;
  const cached = getCachedResponse(cacheKey);
  
  if (cached) {
    console.log('Returning cached AI response');
    return cached;
  }

  // Detect response mode
  const responseMode = detectResponseMode(input);
  console.log('Response mode detected:', responseMode);

  // Format input with wrapper and context
  const formattedInput = formatUserInputWithContext(input, context);
  
  // Add mode-specific instructions
  let modeInstructions = '';
  if (responseMode === 'MAP') {
    modeInstructions = '\n\nIMPORTANT: Return response as valid JSON with this exact structure: {"type": "map", "locations": [{"name": "Location Name", "query": "Location Name", "notes": "description"}]}. Do NOT include any text outside the JSON.';
  } else if (responseMode === 'ITINERARY') {
    modeInstructions = '\n\nIMPORTANT: Return response as valid JSON with this exact structure: {"days": [{"day": 1, "locations": [{"name": "Place Name", "type": "attraction", "notes": "description"}]}], "budget_estimate": "", "tips": []}';
  } else if (responseMode === 'SEARCH') {
    modeInstructions = '\n\nIMPORTANT: Return response as valid JSON with this structure: {"type": "", "price": "", "location": "", "amenities": []}';
  }

  console.log('Making AI request to Groq SDK');
  console.log('API Key available:', !!GROQ_API_KEY);
  console.log('Groq client initialized:', !!groqClient);

  // Check if Groq client is available
  if (!groqClient) {
    console.warn('Groq client not initialized, using fallback');
    return getIntelligentFallback(input, responseMode, context);
  }

  try {
    console.log('Attempting Groq API call...');
    const startTime = Date.now();
    
    const messages = [
      {
        role: "system",
        content: ELITE_SYSTEM_PROMPT
      },
      {
        role: "user",
        content: formattedInput + modeInstructions
      }
    ];
    
    // Try models with fallback
    const completion = await tryGroqModels(messages, {
      maxTokens: responseMode === 'ITINERARY' ? 800 : 500,
      temperature: 0.2
    });

    const responseTime = Date.now() - startTime;
    console.log(`Groq SDK success in ${responseTime}ms`);

    let aiResponse = completion.choices?.[0]?.message?.content?.trim();
    
    if (!aiResponse) {
      throw new Error('No response content from Groq SDK');
    }

    // Anti-generic response filter
    if (isGenericResponse(aiResponse) && responseMode === 'CHAT') {
      console.log('Generic response detected, retrying with more specific prompt...');
      
      const retryMessages = [
        {
          role: "system",
          content: ELITE_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: formattedInput + '\n\nGive a more detailed, specific, and useful answer. Avoid generalizations. Include real examples, prices, and actionable advice.'
        }
      ];
      
      const retryCompletion = await tryGroqModels(retryMessages, {
        maxTokens: 600,
        temperature: 0.1 // Even lower temperature for specificity
      });
      
      aiResponse = retryCompletion.choices?.[0]?.message?.content?.trim();
    }

    // Parse JSON responses for structured modes with error handling
    if (responseMode === 'MAP' || responseMode === 'ITINERARY' || responseMode === 'SEARCH') {
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedResponse = JSON.parse(jsonMatch[0]);
          // Validate the structure
          if (responseMode === 'MAP' && parsedResponse.type === 'map' && parsedResponse.locations) {
            aiResponse = parsedResponse;
          } else if (responseMode === 'ITINERARY' && parsedResponse.days) {
            aiResponse = parsedResponse;
          } else if (responseMode === 'SEARCH' && parsedResponse.type) {
            aiResponse = parsedResponse;
          }
        }
      } catch (e) {
        console.log('Failed to parse JSON response, returning as text');
        // Don't throw error, just continue with text response
      }
    }

    // Cache the response
    setCachedResponse(cacheKey, aiResponse);
    
    console.log('AI Response received:', typeof aiResponse === 'object' ? 'JSON Object' : aiResponse.substring(0, 100) + '...');
    return aiResponse;

  } catch (error) {
    console.error('Groq SDK Error Details:', {
      message: error.message,
      name: error.name,
      status: error.status
    });
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      console.error('Invalid API key - check your VITE_GROQ_API_KEY');
    } else if (error.message?.includes('rate limit')) {
      console.error('Rate limit exceeded - try again later');
    } else if (error.status === 400 || error.message?.includes('model_decommissioned')) {
      console.error('Model decommissioned - all fallback models failed');
    }
    
    // Fallback to intelligent responses
    console.log('Falling back to intelligent responses');
    return getIntelligentFallback(input, responseMode, context);
  }
};

// Enhanced fallback system with mode and context support
const getIntelligentFallback = (input, mode = 'CHAT', context = {}) => {
  const lowerInput = input.toLowerCase();
  
  // Use location context for personalized responses
  const userLocation = context.userLocation?.name || 'your location';
  const isNearUser = context.userLocation && (lowerInput.includes('near me') || lowerInput.includes('nearby'));
  
  // MAP MODE fallback
  if (mode === 'MAP') {
    // Extract location from user input
    const locationMatch = input.match(/(?:show me|where is|locate|find|map of)\s+([^.!?]+)/i);
    const locationName = locationMatch ? locationMatch[1].trim() : 'Unknown Location';
    
    return {
      type: 'map',
      locations: [
        {
          name: locationName,
          query: locationName,
          notes: `Location: ${locationName}`
        }
      ]
    };
  }
  
  // ITINERARY MODE fallback
  if (mode === 'ITINERARY') {
    // Location-aware itinerary suggestions
    if (isNearUser && context.userLocation) {
      return {
        days: [
          {
            day: 1,
            locations: [
              {
                name: `Local Attractions near ${userLocation}`,
                type: "attraction",
                notes: "Explore nearby points of interest"
              },
              {
                name: `Popular Restaurant in ${userLocation}`,
                type: "restaurant",
                notes: "Highly rated local dining option"
              }
            ]
          }
        ],
        budget_estimate: "$50-100 per day depending on your location",
        tips: ["Use local transport", "Ask locals for recommendations", "Check opening hours"]
      };
    }
    
    if (lowerInput.includes('lagos') || lowerInput.includes('nigeria')) {
      return {
        days: [
          {
            day: 1,
            locations: [
              {
                name: "National Theatre Lagos",
                type: "attraction",
                notes: "Iconic cultural landmark and arts center"
              },
              {
                name: "Tafawa Balewa Square",
                type: "attraction", 
                notes: "Historic square in Lagos Island"
              },
              {
                name: "Yellow Chilli",
                type: "restaurant",
                notes: "Popular Nigerian cuisine restaurant"
              }
            ]
          },
          {
            day: 2,
            locations: [
              {
                name: "Lekki Conservation Centre",
                type: "attraction",
                notes: "Nature reserve with canopy walkway"
              },
              {
                name: "Nike Art Gallery",
                type: "attraction",
                notes: "Largest art gallery in West Africa"
              },
              {
                name: "Terra Kulture",
                type: "restaurant",
                notes: "Cultural center with restaurant and bookshop"
              }
            ]
          },
          {
            day: 3,
            locations: [
              {
                name: "Elegushi Beach",
                type: "attraction",
                notes: "Popular beach destination in Lekki"
              },
              {
                name: "Palms Shopping Mall",
                type: "shopping",
                notes: "Major shopping and entertainment complex"
              }
            ]
          }
        ],
        budget_estimate: "₦50,000-80,000 per day including meals and transport",
        tips: ["Use ride-hailing apps for safety", "Carry cash for local vendors", "Visit during dry season (Nov-Mar)"]
      };
    }
    
    if (lowerInput.includes('tokyo') || lowerInput.includes('japan')) {
      return {
        days: [
          {
            day: 1,
            locations: [
              {
                name: "Senso-ji Temple",
                type: "attraction",
                notes: "Ancient Buddhist temple in Asakusa"
              },
              {
                name: "Tokyo Skytree",
                type: "attraction",
                notes: "Tallest structure in Japan with city views"
              },
              {
                name: "Sukiyabashi Jiro",
                type: "restaurant",
                notes: "World-famous sushi restaurant"
              }
            ]
          },
          {
            day: 2,
            locations: [
              {
                name: "Meiji Shrine",
                type: "attraction",
                notes: "Shinto shrine in Shibuya"
              },
              {
                name: "Shibuya Crossing",
                type: "attraction",
                notes: "World's busiest pedestrian crossing"
              },
              {
                name: "Ginza",
                type: "shopping",
                notes: "Upscale shopping and dining district"
              }
            ]
          },
          {
            day: 3,
            locations: [
              {
                name: "Tsukiji Outer Market",
                type: "attraction",
                notes: "Famous fish market and food stalls"
              },
              {
                name: "Imperial Palace",
                type: "attraction",
                notes: "Primary residence of the Emperor of Japan"
              }
            ]
          }
        ],
        budget_estimate: "¥15,000-25,000 per day including meals and transport",
        tips: ["Get JR Pass for unlimited train travel", "Learn basic Japanese phrases", "Carry cash as many places don't accept cards"]
      };
    }
    
    // Generic fallback itinerary with context
    const budgetTier = context.memory?.travelStyle || 'midrange';
    const budgetRange = budgetTier === 'budget' ? '$30-60' : budgetTier === 'luxury' ? '$150-300' : '$60-120';
    
    return {
      days: [
        {
          day: 1,
          locations: [
            {
              name: "City Center",
              type: "attraction",
              notes: "Explore the main downtown area"
            },
            {
              name: "Local Market",
              type: "attraction",
              notes: "Experience local culture and food"
            }
          ]
        }
      ],
      budget_estimate: `${budgetRange} per day depending on destination`,
      tips: ["Research local customs", "Download offline maps", "Keep emergency contacts handy"]
    };
  }
  
  // SEARCH MODE fallback
  if (mode === 'SEARCH') {
    return {
      type: "accommodation",
      price: context.memory?.travelStyle || "budget-friendly",
      location: isNearUser ? userLocation : "city center or near attractions",
      amenities: ["wifi", "breakfast", "clean facilities"]
    };
  }
  
  // CHAT MODE fallback - context-aware responses
  if (isNearUser && context.userLocation) {
    return `I can help you find great options near ${userLocation}! For the most accurate recommendations, I'd need to know:

• What type of places are you looking for?
• Your budget range
• Any specific preferences

I can suggest restaurants, attractions, hotels, and activities in your area.`;
  }
  
  if (lowerInput.includes('cost') && lowerInput.includes('china') && lowerInput.includes('england')) {
    return `**England to China Travel Costs:**

**Flights:** £450-1,200 return
• Budget: £450-650 (with stops)
• Direct: £700-900 (British Airways, Virgin)
• Premium: £900-1,200

**Daily Costs in China:**
• Budget: £25-40/day (hostels, local food)
• Mid-range: £50-80/day (3-star hotels)
• Luxury: £120+/day (5-star hotels)

**Visa:** £151 (10-year multiple entry)
**Best time:** April-May, September-October
**Total 7-day trip:** £800-1,500 per person

**Money-saving tips:**
• Book flights 2-3 months ahead
• Use local transport (subway £0.30 per ride)
• Eat at local restaurants (£3-8 per meal)`;
  }
  
  if (lowerInput.includes('safe') && lowerInput.includes('nigeria')) {
    return `**Nigeria Safety Assessment:**

**Current Risk Level:** HIGH - Requires careful planning

**Safe Areas in Lagos:**
• Victoria Island (business district)
• Ikoyi (upscale residential)
• Lekki Peninsula (expat area)

**Areas to Avoid:**
• Mushin, Ajegunle (high crime)
• Niger Delta region
• Northern states (security issues)

**Essential Precautions:**
• Use reputable hotels with security
• Hire trusted local guides
• Avoid displaying valuables
• Use ride-hailing apps (Uber, Bolt)
• Register with your embassy

**Emergency Contacts:**
• Police: 199
• UK Embassy Lagos: +234 1 277 0780`;
  }
  
  // Context-aware default response
  const contextInfo = [];
  if (context.memory?.budgetPreferences) {
    contextInfo.push(`Budget: $${context.memory.budgetPreferences}`);
  }
  if (context.memory?.travelStyle) {
    contextInfo.push(`Style: ${context.memory.travelStyle}`);
  }
  if (context.userLocation) {
    contextInfo.push(`Location: ${userLocation}`);
  }
  
  const contextStr = contextInfo.length > 0 ? `\n\nI remember: ${contextInfo.join(', ')}` : '';
  
  return `I can provide specific travel advice! For the best help, tell me:

• Your destination and departure city
• Travel dates and duration  
• Budget range
• Specific questions (costs, safety, activities)

I'll give you precise, actionable information with real prices and recommendations.${contextStr}`;
};

// Backward compatibility functions
export const queryAI = async (prompt, options = {}) => {
  return await generateAIResponse(prompt, options);
};

export const getTravelAdvice = async (destination, question) => {
  const input = `${question} for ${destination}`;
  return await generateAIResponse(input);
};

export const generateItinerary = async (destination, duration, interests, budget) => {
  const input = `Create a ${duration}-day itinerary for ${destination} with ${interests} interests and ${budget} budget`;
  return await generateAIResponse(input);
};

export const getSafetyInsights = async (destination, riskScore) => {
  const input = `Safety information for ${destination} with risk score ${riskScore}%`;
  return await generateAIResponse(input);
};

export const getDestinationRecommendations = async (preferences) => {
  const input = `Recommend destinations for: ${preferences}`;
  return await generateAIResponse(input);
};

// Debug and health check functions
export const debugEnvironment = () => {
  console.log('=== Environment Debug ===');
  console.log('VITE_GROQ_API_KEY available:', !!import.meta.env.VITE_GROQ_API_KEY);
  console.log('VITE_GROQ_API_KEY length:', import.meta.env.VITE_GROQ_API_KEY?.length || 0);
  console.log('VITE_GROQ_API_KEY starts with gsk_:', import.meta.env.VITE_GROQ_API_KEY?.startsWith('gsk_') || false);
  console.log('Groq client initialized:', !!groqClient);
  console.log('All VITE env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  return {
    hasApiKey: !!import.meta.env.VITE_GROQ_API_KEY,
    keyLength: import.meta.env.VITE_GROQ_API_KEY?.length || 0,
    isValidFormat: import.meta.env.VITE_GROQ_API_KEY?.startsWith('gsk_') || false,
    clientInitialized: !!groqClient
  };
};

export const checkAIService = async () => {
  console.log('=== AI Service Health Check ===');
  console.log('API Key available:', !!GROQ_API_KEY);
  console.log('Groq client initialized:', !!groqClient);
  
  if (!groqClient) {
    return { status: 'offline', error: 'Groq client not initialized' };
  }
  
  try {
    const testResponse = await generateAIResponse("Test: Are you working? Respond with 'Yes, I am working perfectly!'");
    console.log('Health check successful:', testResponse);
    return { status: 'online', response: testResponse };
  } catch (error) {
    console.error('Health check failed:', error);
    
    if (error.message?.includes('decommissioned') || error.message?.includes('model')) {
      return { status: 'model_error', error: 'AI model is decommissioned. Using intelligent fallbacks.' };
    }
    
    return { status: 'offline', error: error.message };
  }
};