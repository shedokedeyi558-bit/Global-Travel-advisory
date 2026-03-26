/**
 * City Data Fetcher - Fetches real-life information about cities
 */

const getCachedCityData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
};

const setCachedCityData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
};

/**
 * Fetch city data from multiple sources
 */
export const fetchCityData = async (cityName, lat, lng) => {
  console.log('=== fetchCityData called ===');
  console.log('City:', cityName, 'Coordinates:', lat, lng);

  if (!lat || !lng) {
    console.warn('Invalid coordinates provided');
    return null;
  }

  const cacheKey = `city_${cityName}_${Math.round(lat * 100)}_${Math.round(lng * 100)}`;
  const cached = getCachedCityData(cacheKey);
  if (cached) {
    console.log('Returning cached city data for:', cityName);
    return cached;
  }

  try {
    // Fetch city details from Nominatim
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    console.log('Fetching from Nominatim:', nominatimUrl);
    const nominatimResponse = await fetch(nominatimUrl);
    const nominatimData = await nominatimResponse.json();
    console.log('Nominatim data:', nominatimData);

    // Fetch weather data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto`;
    console.log('Fetching weather data');
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    console.log('Weather data:', weatherData);

    // Fetch population and city info from Wikipedia
    let populationData = null;
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cityName)}&prop=extracts&explaintext=true&format=json&origin=*`;
      console.log('Fetching Wikipedia data');
      const wikiResponse = await fetch(wikiUrl);
      const wikiData = await wikiResponse.json();
      const pages = wikiData.query.pages;
      const page = Object.values(pages)[0];
      if (page && page.extract) {
        populationData = page.extract;
        console.log('Wikipedia data found');
      }
    } catch (wikiError) {
      console.log('Wikipedia fetch failed, continuing without it');
    }

    // Compile city data with defaults
    const cityData = {
      name: cityName,
      lat,
      lng,
      country: nominatimData.address?.country || 'Unknown',
      state: nominatimData.address?.state || nominatimData.address?.region || 'N/A',
      population: 'N/A',
      description: populationData ? populationData.substring(0, 300) : `${cityName} is a vibrant destination with rich culture and attractions.`,
      
      // Weather data
      weather: weatherData.current ? {
        current: {
          temperature: Math.round(weatherData.current.temperature_2m) || 'N/A',
          condition: getWeatherDescription(weatherData.current.weather_code),
          humidity: weatherData.current.relative_humidity_2m || 'N/A',
          windSpeed: Math.round(weatherData.current.wind_speed_10m) || 'N/A',
        },
        forecast: weatherData.daily ? {
          maxTemp: Math.round(weatherData.daily.temperature_2m_max?.[0]) || 'N/A',
          minTemp: Math.round(weatherData.daily.temperature_2m_min?.[0]) || 'N/A',
          precipitation: Math.round(weatherData.daily.precipitation_sum?.[0] * 10) / 10 || 0,
        } : null,
        timezone: weatherData.timezone || 'N/A',
      } : null,

      // Attractions (placeholder)
      attractions: [
        { name: 'City Center', type: 'landmark' },
        { name: 'Local Market', type: 'market' },
        { name: 'Museum', type: 'museum' },
        { name: 'Park', type: 'park' },
        { name: 'Restaurant District', type: 'dining' },
      ],

      isCity: true,
      fetchedAt: new Date().toISOString(),
    };

    console.log('City data compiled:', cityData);
    setCachedCityData(cacheKey, cityData);
    return cityData;
  } catch (error) {
    console.error('Error fetching city data:', error);
    // Return basic data instead of throwing
    return {
      name: cityName,
      lat,
      lng,
      country: 'Unknown',
      state: 'N/A',
      description: `${cityName} is a destination worth exploring.`,
      weather: null,
      attractions: [],
      isCity: true,
    };
  }
};

/**
 * Convert weather code to description
 */
const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return weatherCodes[code] || 'Unknown';
};
