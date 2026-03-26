// Route Optimization for Travel Itineraries
// Optimizes location order to minimize travel time and distance

// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // Distance in kilometers
};

// Generate mock coordinates for locations (for demo purposes)
export const generateLocationCoordinates = (locationName, baseCity = { lat: 6.5244, lng: 3.3792 }) => {
  // Create deterministic coordinates based on location name
  const hash = locationName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Generate coordinates within ~20km radius of base city
  const offsetLat = (Math.sin(hash) * 0.18); // ~20km
  const offsetLng = (Math.cos(hash) * 0.18);
  
  return {
    lat: baseCity.lat + offsetLat,
    lng: baseCity.lng + offsetLng,
    name: locationName
  };
};

// Nearest neighbor algorithm for route optimization
export const optimizeRouteNearestNeighbor = (locations, startLocation = null) => {
  if (locations.length <= 2) return locations;
  
  const unvisited = [...locations];
  const optimizedRoute = [];
  
  // Start from specified location or first location
  let current = startLocation || unvisited[0];
  optimizedRoute.push(current);
  unvisited.splice(unvisited.indexOf(current), 1);
  
  // Find nearest unvisited location iteratively
  while (unvisited.length > 0) {
    let nearestDistance = Infinity;
    let nearestLocation = null;
    let nearestIndex = -1;
    
    unvisited.forEach((location, index) => {
      const distance = calculateDistance(
        current.lat, current.lng,
        location.lat, location.lng
      );
      
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLocation = location;
        nearestIndex = index;
      }
    });
    
    if (nearestLocation) {
      optimizedRoute.push(nearestLocation);
      unvisited.splice(nearestIndex, 1);
      current = nearestLocation;
    }
  }
  
  return optimizedRoute;
};

// Calculate total route distance
export const calculateTotalDistance = (locations) => {
  if (locations.length < 2) return 0;
  
  let totalDistance = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    totalDistance += calculateDistance(
      locations[i].lat, locations[i].lng,
      locations[i + 1].lat, locations[i + 1].lng
    );
  }
  
  return totalDistance;
};

// Estimate travel time between locations
export const estimateTravelTime = (distance, transportMode = 'walking') => {
  const speeds = {
    walking: 5, // km/h
    cycling: 15, // km/h
    driving: 30, // km/h (city average)
    public_transport: 20 // km/h (average)
  };
  
  const speed = speeds[transportMode] || speeds.walking;
  const timeHours = distance / speed;
  const timeMinutes = Math.round(timeHours * 60);
  
  return {
    hours: Math.floor(timeMinutes / 60),
    minutes: timeMinutes % 60,
    totalMinutes: timeMinutes
  };
};

// Group locations by proximity for day planning
export const groupLocationsByProximity = (locations, maxGroupSize = 4, maxDistance = 5) => {
  if (locations.length === 0) return [];
  
  const groups = [];
  const unassigned = [...locations];
  
  while (unassigned.length > 0) {
    const group = [unassigned.shift()];
    const groupCenter = group[0];
    
    // Find nearby locations to add to this group
    for (let i = unassigned.length - 1; i >= 0; i--) {
      if (group.length >= maxGroupSize) break;
      
      const location = unassigned[i];
      const distance = calculateDistance(
        groupCenter.lat, groupCenter.lng,
        location.lat, location.lng
      );
      
      if (distance <= maxDistance) {
        group.push(location);
        unassigned.splice(i, 1);
      }
    }
    
    groups.push(group);
  }
  
  return groups;
};

// Optimize itinerary by day
export const optimizeItineraryByDay = (itinerary, userLocation = null) => {
  if (!itinerary || !itinerary.days) return itinerary;
  
  const optimizedItinerary = { ...itinerary };
  
  optimizedItinerary.days = itinerary.days.map(day => {
    if (!day.locations || day.locations.length <= 1) return day;
    
    // Add coordinates to locations
    const locationsWithCoords = day.locations.map(location => ({
      ...location,
      ...generateLocationCoordinates(location.name)
    }));
    
    // Optimize route for this day
    const startLocation = userLocation && day.day === 1 ? userLocation : null;
    const optimizedLocations = optimizeRouteNearestNeighbor(locationsWithCoords, startLocation);
    
    // Calculate route statistics
    const totalDistance = calculateTotalDistance(optimizedLocations);
    const totalTravelTime = estimateTravelTime(totalDistance, 'public_transport');
    
    return {
      ...day,
      locations: optimizedLocations,
      routeStats: {
        totalDistance: Math.round(totalDistance * 10) / 10, // Round to 1 decimal
        totalTravelTime,
        optimized: true
      }
    };
  });
  
  return optimizedItinerary;
};

// Generate route polyline points (simplified)
export const generateRoutePolyline = (locations) => {
  if (locations.length < 2) return [];
  
  const polylinePoints = [];
  
  for (let i = 0; i < locations.length - 1; i++) {
    const start = locations[i];
    const end = locations[i + 1];
    
    // Simple straight line between points (in real app, use routing API)
    polylinePoints.push([start.lat, start.lng]);
    
    // Add intermediate points for smoother line
    const steps = 3;
    for (let step = 1; step < steps; step++) {
      const ratio = step / steps;
      const intermediateLat = start.lat + (end.lat - start.lat) * ratio;
      const intermediateLng = start.lng + (end.lng - start.lng) * ratio;
      polylinePoints.push([intermediateLat, intermediateLng]);
    }
    
    polylinePoints.push([end.lat, end.lng]);
  }
  
  return polylinePoints;
};

// Format route summary for display
export const formatRouteSummary = (routeStats) => {
  if (!routeStats) return '';
  
  const { totalDistance, totalTravelTime } = routeStats;
  const timeStr = totalTravelTime.hours > 0 
    ? `${totalTravelTime.hours}h ${totalTravelTime.minutes}m`
    : `${totalTravelTime.minutes}m`;
  
  return `${totalDistance}km total distance • ${timeStr} travel time`;
};

// Get route recommendations
export const getRouteRecommendations = (routeStats, dayNumber) => {
  if (!routeStats) return [];
  
  const recommendations = [];
  const { totalDistance, totalTravelTime } = routeStats;
  
  if (totalTravelTime.totalMinutes > 180) { // More than 3 hours
    recommendations.push('Consider splitting locations across multiple days');
  }
  
  if (totalDistance > 15) {
    recommendations.push('Use ride-sharing or public transport for efficiency');
  } else if (totalDistance < 5) {
    recommendations.push('Perfect for walking - explore at a leisurely pace');
  }
  
  if (dayNumber === 1) {
    recommendations.push('Start early to make the most of your optimized route');
  }
  
  return recommendations;
};