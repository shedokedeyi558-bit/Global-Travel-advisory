// Geocoding service for converting location names to coordinates
// Uses multiple fallback services for reliability

// Fallback coordinate database for major locations
const LOCATION_COORDINATES = {
  // Countries
  'china': { lat: 35.8617, lng: 104.1954, name: 'China' },
  'japan': { lat: 36.2048, lng: 138.2529, name: 'Japan' },
  'usa': { lat: 37.0902, lng: -95.7129, name: 'United States' },
  'united states': { lat: 37.0902, lng: -95.7129, name: 'United States' },
  'uk': { lat: 55.3781, lng: -3.4360, name: 'United Kingdom' },
  'united kingdom': { lat: 55.3781, lng: -3.4360, name: 'United Kingdom' },
  'france': { lat: 46.2276, lng: 2.2137, name: 'France' },
  'germany': { lat: 51.1657, lng: 10.4515, name: 'Germany' },
  'italy': { lat: 41.8719, lng: 12.5674, name: 'Italy' },
  'spain': { lat: 40.4637, lng: -3.7492, name: 'Spain' },
  'brazil': { lat: -14.2350, lng: -51.9253, name: 'Brazil' },
  'india': { lat: 20.5937, lng: 78.9629, name: 'India' },
  'australia': { lat: -25.2744, lng: 133.7751, name: 'Australia' },
  'canada': { lat: 56.1304, lng: -106.3468, name: 'Canada' },
  'russia': { lat: 61.5240, lng: 105.3188, name: 'Russia' },
  'nigeria': { lat: 9.0820, lng: 8.6753, name: 'Nigeria' },
  'south africa': { lat: -30.5595, lng: 22.9375, name: 'South Africa' },
  'egypt': { lat: 26.0975, lng: 30.0444, name: 'Egypt' },
  'mexico': { lat: 23.6345, lng: -102.5528, name: 'Mexico' },
  'argentina': { lat: -38.4161, lng: -63.6167, name: 'Argentina' },
  
  // Major Cities
  'beijing': { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
  'shanghai': { lat: 31.2304, lng: 121.4737, name: 'Shanghai, China' },
  'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
  'new york': { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
  'london': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
  'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
  'berlin': { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
  'rome': { lat: 41.9028, lng: 12.4964, name: 'Rome, Italy' },
  'madrid': { lat: 40.4168, lng: -3.7038, name: 'Madrid, Spain' },
  'moscow': { lat: 55.7558, lng: 37.6176, name: 'Moscow, Russia' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
  'delhi': { lat: 28.7041, lng: 77.1025, name: 'Delhi, India' },
  'sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
  'toronto': { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada' },
  'lagos': { lat: 6.5244, lng: 3.3792, name: 'Lagos, Nigeria' },
  'cairo': { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt' },
  'mexico city': { lat: 19.4326, lng: -99.1332, name: 'Mexico City, Mexico' },
  'buenos aires': { lat: -34.6118, lng: -58.3960, name: 'Buenos Aires, Argentina' },
  'sao paulo': { lat: -23.5505, lng: -46.6333, name: 'São Paulo, Brazil' },
  'rio de janeiro': { lat: -22.9068, lng: -43.1729, name: 'Rio de Janeiro, Brazil' },
  
  // Popular destinations
  'dubai': { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' },
  'singapore': { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  'hong kong': { lat: 22.3193, lng: 114.1694, name: 'Hong Kong' },
  'bangkok': { lat: 13.7563, lng: 100.5018, name: 'Bangkok, Thailand' },
  'istanbul': { lat: 41.0082, lng: 28.9784, name: 'Istanbul, Turkey' },
  'amsterdam': { lat: 52.3676, lng: 4.9041, name: 'Amsterdam, Netherlands' },
  'barcelona': { lat: 41.3851, lng: 2.1734, name: 'Barcelona, Spain' },
  'vienna': { lat: 48.2082, lng: 16.3738, name: 'Vienna, Austria' },
  'prague': { lat: 50.0755, lng: 14.4378, name: 'Prague, Czech Republic' },
  'lisbon': { lat: 38.7223, lng: -9.1393, name: 'Lisbon, Portugal' }
};

// Normalize location name for lookup
const normalizeLocationName = (name) => {
  return name.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
};

// Get coordinates from fallback database
const getCoordinatesFromDatabase = (locationName) => {
  const normalized = normalizeLocationName(locationName);
  
  // Direct match
  if (LOCATION_COORDINATES[normalized]) {
    return LOCATION_COORDINATES[normalized];
  }
  
  // Partial match
  for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords;
    }
  }
  
  return null;
};

// Geocode using Nominatim (OpenStreetMap)
const geocodeWithNominatim = async (locationName) => {
  try {
    const encodedLocation = encodeURIComponent(locationName);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'TravelPlannerApp/1.0'
        }
      }
    );
    
    if (!response.ok) throw new Error('Nominatim request failed');
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        name: result.display_name || locationName,
        source: 'nominatim'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Nominatim geocoding failed:', error);
    return null;
  }
};

// Geocode using BigDataCloud (backup)
const geocodeWithBigDataCloud = async (locationName) => {
  try {
    const encodedLocation = encodeURIComponent(locationName);
    const response = await fetch(
      `https://api.bigdatacloud.net/data/forward-geocode?query=${encodedLocation}&key=free`
    );
    
    if (!response.ok) throw new Error('BigDataCloud request failed');
    
    const data = await response.json();
    
    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.latitude,
        lng: result.longitude,
        name: result.formattedAddress || locationName,
        source: 'bigdatacloud'
      };
    }
    
    return null;
  } catch (error) {
    console.error('BigDataCloud geocoding failed:', error);
    return null;
  }
};

// Main geocoding function with multiple fallbacks
export const geocodeLocation = async (locationName) => {
  if (!locationName || typeof locationName !== 'string') {
    return null;
  }
  
  console.log('Geocoding location:', locationName);
  
  // Try fallback database first (fastest)
  const dbResult = getCoordinatesFromDatabase(locationName);
  if (dbResult) {
    console.log('Found in database:', dbResult);
    return { ...dbResult, source: 'database' };
  }
  
  // Try Nominatim (OpenStreetMap)
  const nominatimResult = await geocodeWithNominatim(locationName);
  if (nominatimResult) {
    console.log('Found with Nominatim:', nominatimResult);
    return nominatimResult;
  }
  
  // Try BigDataCloud as backup
  const bigDataResult = await geocodeWithBigDataCloud(locationName);
  if (bigDataResult) {
    console.log('Found with BigDataCloud:', bigDataResult);
    return bigDataResult;
  }
  
  // Final fallback - return approximate coordinates for common terms
  const fallbackCoords = getFallbackCoordinates(locationName);
  if (fallbackCoords) {
    console.log('Using fallback coordinates:', fallbackCoords);
    return { ...fallbackCoords, source: 'fallback' };
  }
  
  console.warn('Could not geocode location:', locationName);
  return null;
};

// Get fallback coordinates for common geographic terms
const getFallbackCoordinates = (locationName) => {
  const normalized = normalizeLocationName(locationName);
  
  // Continent/region fallbacks
  if (normalized.includes('asia')) {
    return { lat: 34.0479, lng: 100.6197, name: 'Asia' };
  }
  if (normalized.includes('europe')) {
    return { lat: 54.5260, lng: 15.2551, name: 'Europe' };
  }
  if (normalized.includes('africa')) {
    return { lat: -8.7832, lng: 34.5085, name: 'Africa' };
  }
  if (normalized.includes('america') || normalized.includes('usa')) {
    return { lat: 37.0902, lng: -95.7129, name: 'North America' };
  }
  if (normalized.includes('south america')) {
    return { lat: -8.7832, lng: -55.4915, name: 'South America' };
  }
  if (normalized.includes('oceania') || normalized.includes('australia')) {
    return { lat: -25.2744, lng: 133.7751, name: 'Oceania' };
  }
  
  return null;
};

// Batch geocode multiple locations
export const geocodeMultipleLocations = async (locationNames) => {
  if (!Array.isArray(locationNames)) {
    return [];
  }
  
  const results = [];
  
  // Process locations with delay to avoid rate limiting
  for (let i = 0; i < locationNames.length; i++) {
    const location = locationNames[i];
    const coords = await geocodeLocation(location);
    
    if (coords) {
      results.push({
        originalName: location,
        ...coords
      });
    }
    
    // Add delay between requests to avoid rate limiting
    if (i < locationNames.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
};

// Extract location names from text using simple NLP
export const extractLocationNames = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  const locations = [];
  
  // Common location patterns
  const patterns = [
    // "show me China", "where is Paris"
    /(?:show me|where is|locate|find)\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|\?|!|$)/gi,
    // "China on the map", "Paris on map"
    /([A-Z][a-zA-Z\s]+?)\s+on\s+(?:the\s+)?map/gi,
    // "map of China", "map of New York"
    /map\s+of\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|\?|!|$)/gi
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const location = match[1].trim();
      if (location.length > 1 && location.length < 50) {
        locations.push(location);
      }
    }
  });
  
  // Remove duplicates and common words
  const filtered = [...new Set(locations)].filter(loc => {
    const lower = loc.toLowerCase();
    return !['the', 'and', 'or', 'in', 'on', 'at', 'to', 'from', 'with', 'by'].includes(lower);
  });
  
  return filtered;
};