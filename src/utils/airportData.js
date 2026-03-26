export const airportDatabase = {
  'SIN': {
    name: 'Singapore Changi',
    country: 'Singapore',
    code: 'SIN',
    lat: 1.3521,
    lng: 103.8198,
    type: 'Major Hub',
    safety: 98,
    onTimePerformance: 96,
    passengerTraffic: 68500000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  },
  'BKK': {
    name: 'Suvarnabhumi',
    country: 'Thailand',
    code: 'BKK',
    lat: 13.6923,
    lng: 100.7501,
    type: 'Major Hub',
    safety: 85,
    onTimePerformance: 82,
    passengerTraffic: 45000000,
    services: ['Lounge', 'Dining', 'Shopping'],
    alerts: ['Minor Delays']
  },
  'NRT': {
    name: 'Narita',
    country: 'Japan',
    code: 'NRT',
    lat: 35.7653,
    lng: 140.3931,
    type: 'Major Hub',
    safety: 96,
    onTimePerformance: 94,
    passengerTraffic: 38000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  },
  'HND': {
    name: 'Haneda',
    country: 'Japan',
    code: 'HND',
    lat: 35.5494,
    lng: 139.7798,
    type: 'Major Hub',
    safety: 97,
    onTimePerformance: 95,
    passengerTraffic: 85000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  },
  'SYD': {
    name: 'Sydney Kingsford Smith',
    country: 'Australia',
    code: 'SYD',
    lat: -33.9461,
    lng: 151.1772,
    type: 'Major Hub',
    safety: 94,
    onTimePerformance: 88,
    passengerTraffic: 44000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  },
  'CDG': {
    name: 'Charles de Gaulle',
    country: 'France',
    code: 'CDG',
    lat: 49.0097,
    lng: 2.5479,
    type: 'Major Hub',
    safety: 88,
    onTimePerformance: 80,
    passengerTraffic: 76000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: ['Weather Disruptions']
  },
  'LHR': {
    name: 'London Heathrow',
    country: 'United Kingdom',
    code: 'LHR',
    lat: 51.4700,
    lng: -0.4543,
    type: 'Major Hub',
    safety: 90,
    onTimePerformance: 78,
    passengerTraffic: 80000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: ['Congestion']
  },
  'JFK': {
    name: 'John F. Kennedy',
    country: 'United States',
    code: 'JFK',
    lat: 40.6413,
    lng: -73.7781,
    type: 'Major Hub',
    safety: 85,
    onTimePerformance: 75,
    passengerTraffic: 62000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: ['Delays']
  },
  'LAX': {
    name: 'Los Angeles International',
    country: 'United States',
    code: 'LAX',
    lat: 33.9425,
    lng: -118.4081,
    type: 'Major Hub',
    safety: 86,
    onTimePerformance: 79,
    passengerTraffic: 88000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  },
  'DXB': {
    name: 'Dubai International',
    country: 'United Arab Emirates',
    code: 'DXB',
    lat: 25.2528,
    lng: 55.3644,
    type: 'Major Hub',
    safety: 92,
    onTimePerformance: 91,
    passengerTraffic: 89000000,
    services: ['Lounge', 'Medical', 'Dining', 'Shopping'],
    alerts: []
  }
};

export const getAirportData = (code) => {
  return airportDatabase[code.toUpperCase()] || null;
};

export const getAllAirports = () => {
  return Object.values(airportDatabase);
};

export const searchAirports = (query) => {
  const q = query.toLowerCase();
  return Object.values(airportDatabase).filter(airport =>
    airport.code.toLowerCase().includes(q) ||
    airport.name.toLowerCase().includes(q) ||
    airport.country.toLowerCase().includes(q)
  );
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export const estimateFlightTime = (distance) => {
  const avgSpeed = 900; // km/h
  const hours = Math.round(distance / avgSpeed);
  return hours;
};
