// Mock location data generator - No external API calls
// Provides realistic location data for map display without Overpass API traffic

// Generate realistic mock data based on location
const generateMockData = (type, lat, lon) => {
  // Deterministic offsets based on coordinates for consistency
  const seed = Math.abs(Math.round(lat * 1000) + Math.round(lon * 1000));
  const random = (index) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  const offsets = Array.from({ length: 8 }, (_, i) => ({
    lat: (random(i * 2) - 0.5) * 0.03,
    lng: (random(i * 2 + 1) - 0.5) * 0.03,
  }));

  const labels = {
    medical: [
      'Central Hospital',
      'Medical Clinic',
      'Emergency Center',
      'Health Center',
      'Pharmacy Plus',
      'Urgent Care',
      'Medical Complex',
      'City Hospital',
    ],
    amenities: [
      'Restaurant District',
      'Hotel Zone',
      'Cafe Area',
      'Shopping Center',
      'Market Square',
      'Food Court',
      'Dining Hub',
      'Local Bistro',
    ],
    safety: [
      'Police Station',
      'Fire Station',
      'Emergency Services',
      'Security Center',
      'Patrol Zone',
      'Emergency Dispatch',
      'Safety Office',
      'Response Center',
    ],
    attractions: [
      'Main Attraction',
      'Museum',
      'City Park',
      'Historic Site',
      'Viewpoint',
      'Cultural Center',
      'Monument',
      'Tourist Hub',
    ],
  };

  return offsets.map((offset, idx) => ({
    lat: lat + offset.lat,
    lng: lon + offset.lng,
    label: labels[type][idx] || `${type} ${idx + 1}`,
    type: type,
  }));
};

// Fetch location data - returns mock data instantly
export const fetchLocationData = async (lat, lon, placeType = 'country') => {
  try {
    console.log('Generating location data for:', lat, lon, 'place type:', placeType);
    
    // Simulate minimal network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      medical: generateMockData('medical', lat, lon),
      amenities: generateMockData('amenities', lat, lon),
      safety: generateMockData('safety', lat, lon),
      attractions: generateMockData('attractions', lat, lon),
    };
  } catch (error) {
    console.error('Error generating location data:', error);
    return {
      medical: generateMockData('medical', lat, lon),
      amenities: generateMockData('amenities', lat, lon),
      safety: generateMockData('safety', lat, lon),
      attractions: generateMockData('attractions', lat, lon),
    };
  }
};
