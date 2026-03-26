// Cities database with safety levels and airport information
export const citiesDatabase = {
  'United States': {
    hasInternationalAirport: true,
    cities: [
      { name: 'New York', safetyLevel: 75, hasAirport: true, airportCode: 'JFK/LGA/EWR', population: '8.3M' },
      { name: 'Los Angeles', safetyLevel: 70, hasAirport: true, airportCode: 'LAX', population: '4.0M' },
      { name: 'Chicago', safetyLevel: 65, hasAirport: true, airportCode: 'ORD/MDW', population: '2.7M' },
      { name: 'Houston', safetyLevel: 72, hasAirport: true, airportCode: 'IAH/HOU', population: '2.3M' },
      { name: 'Miami', safetyLevel: 68, hasAirport: true, airportCode: 'MIA', population: '470K' },
      { name: 'San Francisco', safetyLevel: 78, hasAirport: true, airportCode: 'SFO', population: '875K' },
      { name: 'Las Vegas', safetyLevel: 69, hasAirport: true, airportCode: 'LAS', population: '650K' },
      { name: 'Boston', safetyLevel: 80, hasAirport: true, airportCode: 'BOS', population: '695K' }
    ]
  },
  'United Kingdom': {
    hasInternationalAirport: true,
    cities: [
      { name: 'London', safetyLevel: 82, hasAirport: true, airportCode: 'LHR/LGW/STN', population: '9.0M' },
      { name: 'Manchester', safetyLevel: 78, hasAirport: true, airportCode: 'MAN', population: '547K' },
      { name: 'Birmingham', safetyLevel: 75, hasAirport: true, airportCode: 'BHX', population: '1.1M' },
      { name: 'Edinburgh', safetyLevel: 85, hasAirport: true, airportCode: 'EDI', population: '540K' },
      { name: 'Liverpool', safetyLevel: 73, hasAirport: true, airportCode: 'LPL', population: '500K' },
      { name: 'Bristol', safetyLevel: 80, hasAirport: true, airportCode: 'BRS', population: '470K' },
      { name: 'Glasgow', safetyLevel: 76, hasAirport: true, airportCode: 'GLA', population: '635K' }
    ]
  },
  'France': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Paris', safetyLevel: 79, hasAirport: true, airportCode: 'CDG/ORY', population: '2.2M' },
      { name: 'Lyon', safetyLevel: 83, hasAirport: true, airportCode: 'LYS', population: '518K' },
      { name: 'Marseille', safetyLevel: 71, hasAirport: true, airportCode: 'MRS', population: '870K' },
      { name: 'Nice', safetyLevel: 77, hasAirport: true, airportCode: 'NCE', population: '340K' },
      { name: 'Toulouse', safetyLevel: 81, hasAirport: true, airportCode: 'TLS', population: '490K' },
      { name: 'Strasbourg', safetyLevel: 84, hasAirport: true, airportCode: 'SXB', population: '285K' },
      { name: 'Bordeaux', safetyLevel: 82, hasAirport: true, airportCode: 'BOD', population: '260K' }
    ]
  },
  'Germany': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Berlin', safetyLevel: 81, hasAirport: true, airportCode: 'BER', population: '3.7M' },
      { name: 'Munich', safetyLevel: 87, hasAirport: true, airportCode: 'MUC', population: '1.5M' },
      { name: 'Frankfurt', safetyLevel: 85, hasAirport: true, airportCode: 'FRA', population: '750K' },
      { name: 'Hamburg', safetyLevel: 83, hasAirport: true, airportCode: 'HAM', population: '1.9M' },
      { name: 'Cologne', safetyLevel: 82, hasAirport: true, airportCode: 'CGN', population: '1.1M' },
      { name: 'Stuttgart', safetyLevel: 86, hasAirport: true, airportCode: 'STR', population: '630K' },
      { name: 'Düsseldorf', safetyLevel: 84, hasAirport: true, airportCode: 'DUS', population: '620K' }
    ]
  },
  'Japan': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Tokyo', safetyLevel: 92, hasAirport: true, airportCode: 'NRT/HND', population: '14.0M' },
      { name: 'Osaka', safetyLevel: 90, hasAirport: true, airportCode: 'KIX/ITM', population: '2.7M' },
      { name: 'Kyoto', safetyLevel: 94, hasAirport: false, airportCode: 'N/A', population: '1.5M' },
      { name: 'Nagoya', safetyLevel: 91, hasAirport: true, airportCode: 'NGO', population: '2.3M' },
      { name: 'Sapporo', safetyLevel: 93, hasAirport: true, airportCode: 'CTS', population: '1.9M' },
      { name: 'Fukuoka', safetyLevel: 89, hasAirport: true, airportCode: 'FUK', population: '1.6M' },
      { name: 'Hiroshima', safetyLevel: 92, hasAirport: true, airportCode: 'HIJ', population: '1.2M' }
    ]
  },
  'Australia': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Sydney', safetyLevel: 84, hasAirport: true, airportCode: 'SYD', population: '5.3M' },
      { name: 'Melbourne', safetyLevel: 86, hasAirport: true, airportCode: 'MEL', population: '5.1M' },
      { name: 'Brisbane', safetyLevel: 83, hasAirport: true, airportCode: 'BNE', population: '2.6M' },
      { name: 'Perth', safetyLevel: 85, hasAirport: true, airportCode: 'PER', population: '2.1M' },
      { name: 'Adelaide', safetyLevel: 87, hasAirport: true, airportCode: 'ADL', population: '1.4M' },
      { name: 'Gold Coast', safetyLevel: 81, hasAirport: true, airportCode: 'OOL', population: '680K' },
      { name: 'Canberra', safetyLevel: 89, hasAirport: true, airportCode: 'CBR', population: '430K' }
    ]
  },
  'Canada': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Toronto', safetyLevel: 85, hasAirport: true, airportCode: 'YYZ', population: '2.9M' },
      { name: 'Vancouver', safetyLevel: 87, hasAirport: true, airportCode: 'YVR', population: '675K' },
      { name: 'Montreal', safetyLevel: 83, hasAirport: true, airportCode: 'YUL', population: '1.8M' },
      { name: 'Calgary', safetyLevel: 88, hasAirport: true, airportCode: 'YYC', population: '1.3M' },
      { name: 'Ottawa', safetyLevel: 90, hasAirport: true, airportCode: 'YOW', population: '1.0M' },
      { name: 'Edmonton', safetyLevel: 86, hasAirport: true, airportCode: 'YEG', population: '1.0M' },
      { name: 'Quebec City', safetyLevel: 89, hasAirport: true, airportCode: 'YQB', population: '540K' }
    ]
  },
  'Nigeria': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Lagos', safetyLevel: 45, hasAirport: true, airportCode: 'LOS', population: '15.0M' },
      { name: 'Abuja', safetyLevel: 55, hasAirport: true, airportCode: 'ABV', population: '3.0M' },
      { name: 'Kano', safetyLevel: 40, hasAirport: true, airportCode: 'KAN', population: '4.1M' },
      { name: 'Ibadan', safetyLevel: 48, hasAirport: false, airportCode: 'N/A', population: '3.6M' },
      { name: 'Port Harcourt', safetyLevel: 42, hasAirport: true, airportCode: 'PHC', population: '1.9M' },
      { name: 'Benin City', safetyLevel: 46, hasAirport: true, airportCode: 'BNI', population: '1.5M' },
      { name: 'Kaduna', safetyLevel: 38, hasAirport: true, airportCode: 'KAD', population: '1.6M' },
      { name: 'Jos', safetyLevel: 35, hasAirport: true, airportCode: 'JOS', population: '900K' }
    ]
  },
  'Brazil': {
    hasInternationalAirport: true,
    cities: [
      { name: 'São Paulo', safetyLevel: 58, hasAirport: true, airportCode: 'GRU/CGH', population: '12.3M' },
      { name: 'Rio de Janeiro', safetyLevel: 52, hasAirport: true, airportCode: 'GIG/SDU', population: '6.7M' },
      { name: 'Brasília', safetyLevel: 65, hasAirport: true, airportCode: 'BSB', population: '3.1M' },
      { name: 'Salvador', safetyLevel: 48, hasAirport: true, airportCode: 'SSA', population: '2.9M' },
      { name: 'Fortaleza', safetyLevel: 45, hasAirport: true, airportCode: 'FOR', population: '2.7M' },
      { name: 'Belo Horizonte', safetyLevel: 55, hasAirport: true, airportCode: 'CNF', population: '2.5M' },
      { name: 'Manaus', safetyLevel: 50, hasAirport: true, airportCode: 'MAO', population: '2.2M' }
    ]
  },
  'India': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Mumbai', safetyLevel: 62, hasAirport: true, airportCode: 'BOM', population: '20.4M' },
      { name: 'Delhi', safetyLevel: 58, hasAirport: true, airportCode: 'DEL', population: '32.9M' },
      { name: 'Bangalore', safetyLevel: 68, hasAirport: true, airportCode: 'BLR', population: '13.2M' },
      { name: 'Hyderabad', safetyLevel: 65, hasAirport: true, airportCode: 'HYD', population: '10.0M' },
      { name: 'Chennai', safetyLevel: 63, hasAirport: true, airportCode: 'MAA', population: '11.0M' },
      { name: 'Kolkata', safetyLevel: 55, hasAirport: true, airportCode: 'CCU', population: '14.9M' },
      { name: 'Pune', safetyLevel: 70, hasAirport: true, airportCode: 'PNQ', population: '7.4M' },
      { name: 'Ahmedabad', safetyLevel: 60, hasAirport: true, airportCode: 'AMD', population: '8.4M' }
    ]
  },
  'Singapore': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Singapore', safetyLevel: 95, hasAirport: true, airportCode: 'SIN', population: '5.9M' }
    ]
  },
  'Switzerland': {
    hasInternationalAirport: true,
    cities: [
      { name: 'Zurich', safetyLevel: 92, hasAirport: true, airportCode: 'ZUR', population: '435K' },
      { name: 'Geneva', safetyLevel: 90, hasAirport: true, airportCode: 'GVA', population: '203K' },
      { name: 'Basel', safetyLevel: 91, hasAirport: true, airportCode: 'BSL', population: '177K' },
      { name: 'Bern', safetyLevel: 93, hasAirport: true, airportCode: 'BRN', population: '134K' },
      { name: 'Lausanne', safetyLevel: 89, hasAirport: false, airportCode: 'N/A', population: '140K' },
      { name: 'Lucerne', safetyLevel: 94, hasAirport: false, airportCode: 'N/A', population: '82K' }
    ]
  }
};

export const getCitiesByCountry = (countryName) => {
  return citiesDatabase[countryName] || { hasInternationalAirport: false, cities: [] };
};

export const getCitySafetyLevel = (countryName, cityName) => {
  const countryData = citiesDatabase[countryName];
  if (!countryData) return null;
  
  const city = countryData.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.safetyLevel : null;
};

export const getCountriesWithAirports = () => {
  return Object.entries(citiesDatabase)
    .filter(([country, data]) => data.hasInternationalAirport)
    .map(([country]) => country);
};

export const getCountriesWithoutAirports = () => {
  return Object.entries(citiesDatabase)
    .filter(([country, data]) => !data.hasInternationalAirport)
    .map(([country]) => country);
};

export const getCitiesWithAirports = (countryName) => {
  const countryData = citiesDatabase[countryName];
  if (!countryData) return [];
  
  return countryData.cities.filter(city => city.hasAirport);
};

export const getCitiesWithoutAirports = (countryName) => {
  const countryData = citiesDatabase[countryName];
  if (!countryData) return [];
  
  return countryData.cities.filter(city => !city.hasAirport);
};