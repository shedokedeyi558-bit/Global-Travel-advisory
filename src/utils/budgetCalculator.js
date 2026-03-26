// Smart Budget Calculator for Travel Planning
// Estimates costs based on destination, duration, and preferences

// Base cost data by region (USD per day)
const REGIONAL_COSTS = {
  'Southeast Asia': {
    budget: { accommodation: 15, food: 10, transport: 8, activities: 12 },
    midrange: { accommodation: 35, food: 25, transport: 15, activities: 25 },
    luxury: { accommodation: 80, food: 60, transport: 40, activities: 60 }
  },
  'Europe': {
    budget: { accommodation: 40, food: 25, transport: 20, activities: 20 },
    midrange: { accommodation: 80, food: 50, transport: 35, activities: 40 },
    luxury: { accommodation: 200, food: 120, transport: 80, activities: 100 }
  },
  'North America': {
    budget: { accommodation: 50, food: 30, transport: 25, activities: 25 },
    midrange: { accommodation: 100, food: 60, transport: 40, activities: 50 },
    luxury: { accommodation: 250, food: 150, transport: 100, activities: 120 }
  },
  'Africa': {
    budget: { accommodation: 20, food: 12, transport: 10, activities: 15 },
    midrange: { accommodation: 45, food: 30, transport: 20, activities: 30 },
    luxury: { accommodation: 120, food: 80, transport: 60, activities: 80 }
  },
  'South America': {
    budget: { accommodation: 25, food: 15, transport: 12, activities: 18 },
    midrange: { accommodation: 50, food: 35, transport: 25, activities: 35 },
    luxury: { accommodation: 150, food: 100, transport: 70, activities: 90 }
  },
  'Middle East': {
    budget: { accommodation: 35, food: 20, transport: 15, activities: 20 },
    midrange: { accommodation: 70, food: 45, transport: 30, activities: 40 },
    luxury: { accommodation: 180, food: 120, transport: 80, activities: 100 }
  },
  'Default': {
    budget: { accommodation: 30, food: 20, transport: 15, activities: 20 },
    midrange: { accommodation: 60, food: 40, transport: 25, activities: 35 },
    luxury: { accommodation: 150, food: 100, transport: 60, activities: 80 }
  }
};

// Country to region mapping
const COUNTRY_REGIONS = {
  // Southeast Asia
  'Thailand': 'Southeast Asia', 'Vietnam': 'Southeast Asia', 'Indonesia': 'Southeast Asia',
  'Malaysia': 'Southeast Asia', 'Philippines': 'Southeast Asia', 'Singapore': 'Southeast Asia',
  
  // Europe
  'France': 'Europe', 'Germany': 'Europe', 'Italy': 'Europe', 'Spain': 'Europe',
  'United Kingdom': 'Europe', 'Netherlands': 'Europe', 'Switzerland': 'Europe',
  'Greece': 'Europe', 'Portugal': 'Europe', 'Austria': 'Europe',
  
  // North America
  'United States': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
  
  // Africa
  'Nigeria': 'Africa', 'South Africa': 'Africa', 'Kenya': 'Africa', 'Morocco': 'Africa',
  'Egypt': 'Africa', 'Ghana': 'Africa', 'Tanzania': 'Africa',
  
  // South America
  'Brazil': 'South America', 'Argentina': 'South America', 'Peru': 'South America',
  'Colombia': 'South America', 'Chile': 'South America', 'Ecuador': 'South America',
  
  // Middle East
  'UAE': 'Middle East', 'Saudi Arabia': 'Middle East', 'Turkey': 'Middle East',
  'Israel': 'Middle East', 'Jordan': 'Middle East', 'Qatar': 'Middle East'
};

// Flight cost estimation (rough estimates in USD)
const FLIGHT_COSTS = {
  domestic: { budget: 150, midrange: 300, luxury: 600 },
  regional: { budget: 400, midrange: 700, luxury: 1200 },
  international: { budget: 800, midrange: 1200, luxury: 2500 }
};

// Detect region from destination
export const getRegionFromDestination = (destination) => {
  const dest = destination.toLowerCase();
  
  // Check for country matches
  for (const [country, region] of Object.entries(COUNTRY_REGIONS)) {
    if (dest.includes(country.toLowerCase())) {
      return region;
    }
  }
  
  // Check for city/region keywords
  if (dest.includes('asia') || dest.includes('bangkok') || dest.includes('tokyo')) {
    return 'Southeast Asia';
  }
  if (dest.includes('europe') || dest.includes('paris') || dest.includes('london')) {
    return 'Europe';
  }
  if (dest.includes('america') || dest.includes('new york') || dest.includes('los angeles')) {
    return 'North America';
  }
  if (dest.includes('africa') || dest.includes('lagos') || dest.includes('cairo')) {
    return 'Africa';
  }
  
  return 'Default';
};

// Detect budget tier from user input
export const detectBudgetTier = (input) => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('cheap') || lowerInput.includes('budget') || 
      lowerInput.includes('backpack') || lowerInput.includes('low cost')) {
    return 'budget';
  }
  
  if (lowerInput.includes('luxury') || lowerInput.includes('premium') || 
      lowerInput.includes('high-end') || lowerInput.includes('expensive')) {
    return 'luxury';
  }
  
  return 'midrange';
};

// Calculate daily budget
export const calculateDailyBudget = (destination, budgetTier = 'midrange') => {
  const region = getRegionFromDestination(destination);
  const costs = REGIONAL_COSTS[region] || REGIONAL_COSTS['Default'];
  const dailyCosts = costs[budgetTier];
  
  const total = Object.values(dailyCosts).reduce((sum, cost) => sum + cost, 0);
  
  return {
    accommodation: dailyCosts.accommodation,
    food: dailyCosts.food,
    transport: dailyCosts.transport,
    activities: dailyCosts.activities,
    total,
    region,
    tier: budgetTier
  };
};

// Calculate trip budget
export const calculateTripBudget = (destination, days, budgetTier = 'midrange', includeFlights = true) => {
  const dailyBudget = calculateDailyBudget(destination, budgetTier);
  const totalDaily = dailyBudget.total * days;
  
  let flightCost = 0;
  if (includeFlights) {
    // Simple flight cost estimation
    const region = getRegionFromDestination(destination);
    if (region === 'Default' || region === 'Africa') {
      flightCost = FLIGHT_COSTS.regional[budgetTier];
    } else if (region === 'Europe' || region === 'North America') {
      flightCost = FLIGHT_COSTS.international[budgetTier];
    } else {
      flightCost = FLIGHT_COSTS.regional[budgetTier];
    }
  }
  
  return {
    daily: dailyBudget,
    totalDaily,
    flights: flightCost,
    grandTotal: totalDaily + flightCost,
    days,
    breakdown: {
      accommodation: dailyBudget.accommodation * days,
      food: dailyBudget.food * days,
      transport: dailyBudget.transport * days,
      activities: dailyBudget.activities * days,
      flights: flightCost
    }
  };
};

// Extract budget from user message
export const extractBudgetFromMessage = (message) => {
  const budgetRegex = /\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
  const matches = message.match(budgetRegex);
  
  if (matches) {
    const amounts = matches.map(match => {
      const num = parseFloat(match.replace(/[$,]/g, ''));
      return num;
    }).filter(num => num > 50 && num < 50000); // Reasonable travel budget range
    
    if (amounts.length > 0) {
      return Math.max(...amounts); // Take the largest reasonable amount
    }
  }
  
  return null;
};

// Suggest budget adjustments
export const suggestBudgetAdjustments = (currentBudget, targetBudget, destination) => {
  if (!targetBudget || currentBudget <= targetBudget) {
    return null;
  }
  
  const difference = currentBudget - targetBudget;
  const suggestions = [];
  
  if (difference > currentBudget * 0.3) {
    suggestions.push('Consider a shorter trip duration');
    suggestions.push('Look for budget accommodations like hostels or guesthouses');
    suggestions.push('Eat at local restaurants instead of tourist areas');
  } else if (difference > currentBudget * 0.15) {
    suggestions.push('Mix budget and mid-range accommodations');
    suggestions.push('Use public transport instead of taxis');
    suggestions.push('Look for free activities and attractions');
  } else {
    suggestions.push('Book flights in advance for better deals');
    suggestions.push('Consider traveling during off-peak season');
    suggestions.push('Look for package deals that include multiple services');
  }
  
  return {
    overage: difference,
    percentage: (difference / currentBudget) * 100,
    suggestions
  };
};

// Format budget for display
export const formatBudget = (amount, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
};

// Generate budget summary text
export const generateBudgetSummary = (budgetData) => {
  const { daily, totalDaily, flights, grandTotal, days, breakdown } = budgetData;
  
  return {
    summary: `${formatBudget(grandTotal)} total for ${days} days (${formatBudget(daily.total)}/day + ${formatBudget(flights)} flights)`,
    breakdown: {
      accommodation: `${formatBudget(breakdown.accommodation)} (${formatBudget(daily.accommodation)}/day)`,
      food: `${formatBudget(breakdown.food)} (${formatBudget(daily.food)}/day)`,
      transport: `${formatBudget(breakdown.transport)} (${formatBudget(daily.transport)}/day)`,
      activities: `${formatBudget(breakdown.activities)} (${formatBudget(daily.activities)}/day)`,
      flights: formatBudget(breakdown.flights)
    }
  };
};