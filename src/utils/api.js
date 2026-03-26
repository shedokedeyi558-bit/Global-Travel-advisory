import { getCountrySafetyScore } from './countrySafetyData';

const CACHE_DURATION = 60000; // 1 minute in milliseconds (reduced for testing)
const cache = new Map();

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const fetchCountryData = async (location) => {
  console.log('=== fetchCountryData called ===');
  console.log('Input location:', location);

  const cacheKey = `country_${location}_v2`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached country data for:', location);
    return cached;
  }

  try {
    const encodedLocation = encodeURIComponent(location.trim());

    // First attempt: exact match with fullText=true
    let url = `https://restcountries.com/v3.1/name/${encodedLocation}?fullText=true`;
    console.log('Attempt 1 (exact match) - Fetching from URL:', url);

    let response = await fetch(url);
    let data = null;

    if (response.ok) {
      data = await response.json();
      console.log('Exact match found:', data[0]?.name.common);
    } else {
      console.log('Exact match failed, trying partial match...');
      // Try with fullText=false for partial matches
      url = `https://restcountries.com/v3.1/name/${encodedLocation}?fullText=false`;
      console.log('Attempt 2 (partial match) - Fetching from URL:', url);
      response = await fetch(url);

      if (response.ok) {
        data = await response.json();
        console.log('Partial match found:', data[0]?.name.common);
      }
    }

    if (!response.ok || !data || data.length === 0) {
      console.log('Country lookup failed, trying city/location lookup via Nominatim...');
      
      // Fallback: Try to find the location using Nominatim (for cities)
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&limit=1`;
      const nominatimResponse = await fetch(nominatimUrl);
      
      if (nominatimResponse.ok) {
        const nominatimData = await nominatimResponse.json();
        if (nominatimData && nominatimData.length > 0) {
          const locationData = nominatimData[0];
          console.log('City/location found via Nominatim:', locationData.name);
          
          // Extract country name from the address
          const addressParts = locationData.address || {};
          const countryName = addressParts.country || locationData.name;
          
          const cityData = {
            name: locationData.name,
            flag: '🌍', // Placeholder flag for cities
            population: 'N/A',
            region: addressParts.state || addressParts.region || 'N/A',
            capital: locationData.name,
            languages: 'N/A',
            currencies: 'N/A',
            lat: parseFloat(locationData.lat),
            lng: parseFloat(locationData.lon),
            timezone: 'N/A',
            area: 0,
            isCity: true,
            country: countryName
          };
          
          console.log('City data processed:', cityData);
          setCachedData(cacheKey, cityData);
          return cityData;
        }
      }
      
      console.error('No data found for:', location);
      throw new Error(`Destination not found: "${location}". Please try another country or city.`);
    }

    // If multiple results, find the best match (exact name match preferred)
    let country = data[0];
    if (data.length > 1) {
      const exactMatch = data.find(c => c.name.common.toLowerCase() === location.toLowerCase());
      if (exactMatch) {
        country = exactMatch;
        console.log('Found exact match among multiple results:', country.name.common);
      } else {
        console.log('Multiple results found, using first:', country.name.common);
      }
    }
    console.log('Selected country:', country.name.common);

    const countryData = {
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      region: country.region,
      capital: country.capital?.[0] || 'N/A',
      languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
      currencies: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',
      lat: country.latlng?.[0] || 0,
      lng: country.latlng?.[1] || 0,
      timezone: country.timezones?.[0] || 'N/A',
      area: country.area || 0,
    };

    console.log('Country data processed:', countryData);
    setCachedData(cacheKey, countryData);
    return countryData;
  } catch (error) {
    console.error('Error in fetchCountryData:', error);
    throw error;
  }
}

export const fetchWeatherData = async (lat, lng) => {
  // Convert to numbers to ensure proper formatting
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  console.log('Fetching weather data for coordinates:', { latitude, longitude });
  console.log('Type check - lat:', typeof latitude, 'lng:', typeof longitude);
  
  const cacheKey = `weather_${latitude}_${longitude}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached weather data');
    return cached;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    console.log('Fetching weather from URL:', url);
    
    const response = await fetch(url);
    console.log('Weather API response status:', response.status);
    
    if (!response.ok) {
      console.error('Weather API error - Status:', response.status);
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    console.log('Weather API response data:', data);
    
    const weatherData = {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity,
        weatherCode: data.current.weather_code,
      },
      forecast: data.daily.time.slice(0, 5).map((date, idx) => ({
        date,
        high: Math.round(data.daily.temperature_2m_max[idx]),
        low: Math.round(data.daily.temperature_2m_min[idx]),
        weatherCode: data.daily.weather_code[idx],
      })),
    };
    
    console.log('Weather data processed successfully:', weatherData);
    setCachedData(cacheKey, weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    console.log('Returning mock weather data as fallback');
    // Return mock data instead of throwing error
    const mockWeatherData = {
      current: {
        temperature: 25,
        humidity: 65,
        weatherCode: 1,
      },
      forecast: Array.from({ length: 5 }).map((_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        high: Math.round(28 + Math.random() * 5),
        low: Math.round(20 + Math.random() * 5),
        weatherCode: Math.floor(Math.random() * 3),
      })),
    };
    return mockWeatherData;
  }
};

export const fetchExchangeRates = async (baseCurrency) => {
  console.log('Fetching exchange rates for base currency:', baseCurrency);
  
  const cacheKey = `exchange_${baseCurrency}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached exchange rates');
    return cached;
  }

  try {
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    console.log('Fetching exchange rates from URL:', url);
    
    const response = await fetch(url);
    console.log('Exchange rates API response status:', response.status);
    
    if (!response.ok) {
      console.error('Exchange rates API error - Status:', response.status);
      throw new Error('Exchange rates not available');
    }
    
    const data = await response.json();
    console.log('Exchange rates API response data:', data);
    
    const rates = {
      USD: data.rates.USD || 1,
      EUR: data.rates.EUR || 0.92,
      GBP: data.rates.GBP || 0.79,
    };
    
    console.log('Exchange rates processed successfully:', rates);
    setCachedData(cacheKey, rates);
    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    console.log('Using fallback exchange rates');
    return { USD: 1, EUR: 0.92, GBP: 0.79 };
  }
};

export const fetchNews = async (location) => {
  console.log('Fetching news for location:', location);
  
  const cacheKey = `news_${location}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached news data');
    return cached;
  }

  // Mock news data as primary source (no API key dependency)
  const mockNews = [
    {
      title: 'Travel Safety Update',
      description: 'Latest travel safety information and advisories for your destination',
      source: 'Global SafeTravel',
      publishedAt: new Date().toLocaleDateString(),
      url: '#',
      image: null,
    },
    {
      title: 'Destination Travel Guide',
      description: 'Comprehensive guide with tips and recommendations for travelers',
      source: 'Global SafeTravel',
      publishedAt: new Date().toLocaleDateString(),
      url: '#',
      image: null,
    },
    {
      title: 'Essential Travel Tips',
      description: 'Important safety tips and best practices for enjoyable travel',
      source: 'Global SafeTravel',
      publishedAt: new Date().toLocaleDateString(),
      url: '#',
      image: null,
    },
  ];

  try {
    const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
    
    // Skip API call if no key is configured
    if (!newsApiKey || newsApiKey === 'your_newsapi_key_here') {
      console.log('News API key not configured, using mock data');
      setCachedData(cacheKey, mockNews);
      return mockNews;
    }

    const encodedLocation = encodeURIComponent(location);
    const url = `https://newsapi.org/v2/everything?q=${encodedLocation}&sortBy=publishedAt&language=en&pageSize=3&apiKey=${newsApiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn('News API error - Status:', response.status, '- Using mock data');
      setCachedData(cacheKey, mockNews);
      return mockNews;
    }
    
    const data = await response.json();
    
    if (!data.articles || data.articles.length === 0) {
      console.log('No articles found, using mock data');
      setCachedData(cacheKey, mockNews);
      return mockNews;
    }
    
    const news = data.articles.slice(0, 3).map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt).toLocaleDateString(),
      url: article.url,
      image: article.urlToImage,
    }));
    
    console.log('News data loaded successfully:', news.length, 'articles');
    setCachedData(cacheKey, news);
    return news;
  } catch (error) {
    console.warn('Error fetching news:', error.message, '- Using mock data');
    setCachedData(cacheKey, mockNews);
    return mockNews;
  }
};

export const calculateRiskScore = (weather, newsCount, countryName) => {
  // Get base safety score from country database
  const countrySafetyScore = getCountrySafetyScore(countryName);
  console.log('Country safety score:', countrySafetyScore);
  
  // Weather impact (0-10 points)
  let weatherImpact = 0;
  if (weather?.current?.weatherCode > 50) {
    weatherImpact = 8; // Severe weather
  } else if (weather?.current?.weatherCode > 30) {
    weatherImpact = 4; // Moderate weather
  }
  
  // News impact (0-5 points)
  let newsImpact = 0;
  if (newsCount > 5) newsImpact = 5;
  else if (newsCount > 0) newsImpact = newsCount;
  
  // Combine scores: 85% country safety, 10% weather, 5% news
  const finalScore = Math.round(
    (countrySafetyScore * 0.85) + 
    (weatherImpact * 0.10) + 
    (newsImpact * 0.05)
  );
  
  console.log(`Final risk score for ${countryName}: ${finalScore} (Country: ${countrySafetyScore}, Weather: ${weatherImpact}, News: ${newsImpact})`);
  
  return Math.min(100, Math.max(0, finalScore));
};

export const getRiskLevel = (score) => {
  if (score < 30) return 'LOW RISK';
  if (score < 60) return 'MODERATE RISK';
  if (score < 80) return 'HIGH RISK';
  return 'CRITICAL RISK';
};

export const getRiskColor = (score) => {
  if (score < 30) return '#10b981'; // green
  if (score < 60) return '#f59e0b'; // amber
  if (score < 80) return '#ef4444'; // red
  return '#7c2d12'; // dark red
};

export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear',
    1: 'Partly Cloudy',
    2: 'Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Heavy Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    80: 'Slight Showers',
    81: 'Moderate Showers',
    82: 'Heavy Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Hail',
  };
  return weatherCodes[code] || 'Unknown';
};
