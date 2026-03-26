// Local storage utilities for trips and search history

export const storageKeys = {
  TRIPS: 'safetravel_trips',
  SEARCH_HISTORY: 'safetravel_search_history',
  USER_ID: 'safetravel_user_id',
};

// Generate a simple user ID
export function getUserId() {
  let userId = localStorage.getItem(storageKeys.USER_ID);
  if (!userId) {
    userId = 'user_' + Date.now();
    localStorage.setItem(storageKeys.USER_ID, userId);
  }
  return userId;
}

// Trip management
export function getTrips() {
  const trips = localStorage.getItem(storageKeys.TRIPS);
  return trips ? JSON.parse(trips) : [];
}

export function addTrip(trip) {
  const trips = getTrips();
  const newTrip = {
    id: Date.now().toString(),
    userId: getUserId(),
    createdAt: new Date().toISOString(),
    ...trip,
  };
  trips.push(newTrip);
  localStorage.setItem(storageKeys.TRIPS, JSON.stringify(trips));
  return newTrip;
}

export function updateTrip(tripId, updates) {
  const trips = getTrips();
  const index = trips.findIndex(t => t.id === tripId);
  if (index !== -1) {
    trips[index] = { ...trips[index], ...updates };
    localStorage.setItem(storageKeys.TRIPS, JSON.stringify(trips));
    return trips[index];
  }
  return null;
}

export function deleteTrip(tripId) {
  const trips = getTrips();
  const filtered = trips.filter(t => t.id !== tripId);
  localStorage.setItem(storageKeys.TRIPS, JSON.stringify(filtered));
}

export function getUserTrips() {
  const userId = getUserId();
  return getTrips().filter(t => t.userId === userId);
}

// Search history management
export function getSearchHistory() {
  const history = localStorage.getItem(storageKeys.SEARCH_HISTORY);
  return history ? JSON.parse(history) : [];
}

export function addToSearchHistory(destination, riskScore) {
  const history = getSearchHistory();
  const newSearch = {
    id: Date.now().toString(),
    userId: getUserId(),
    destination,
    riskScore,
    searchedAt: new Date().toISOString(),
  };
  
  // Add to beginning and limit to 10
  const updated = [newSearch, ...history].slice(0, 10);
  localStorage.setItem(storageKeys.SEARCH_HISTORY, JSON.stringify(updated));
}

export function getUserSearchHistory() {
  const userId = getUserId();
  return getSearchHistory().filter(s => s.userId === userId);
}
