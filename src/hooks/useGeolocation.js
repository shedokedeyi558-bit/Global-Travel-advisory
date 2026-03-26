import { useState, useEffect, useCallback } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  // Check if geolocation is supported
  useEffect(() => {
    setIsSupported('geolocation' in navigator);
  }, []);

  // Get current position
  const getCurrentLocation = useCallback(() => {
    if (!isSupported) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = `Location error: ${err.message}`;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      options
    );
  }, [isSupported]);

  // Watch position (for continuous tracking)
  const watchLocation = useCallback(() => {
    if (!isSupported) return null;

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      (err) => {
        console.error('Watch location error:', err);
      },
      options
    );

    return watchId;
  }, [isSupported]);

  // Clear watch
  const clearWatch = useCallback((watchId) => {
    if (watchId && isSupported) {
      navigator.geolocation.clearWatch(watchId);
    }
  }, [isSupported]);

  // Get location name from coordinates (reverse geocoding)
  const getLocationName = useCallback(async (lat, lng) => {
    try {
      // Using a simple reverse geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          city: data.city || data.locality || 'Unknown City',
          country: data.countryName || 'Unknown Country',
          formatted: `${data.city || data.locality || 'Unknown'}, ${data.countryName || 'Unknown'}`
        };
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
    
    return {
      city: 'Unknown City',
      country: 'Unknown Country',
      formatted: 'Unknown Location'
    };
  }, []);

  return {
    location,
    loading,
    error,
    isSupported,
    getCurrentLocation,
    watchLocation,
    clearWatch,
    getLocationName
  };
};