/**
 * Image Service - Fetches high-quality city/destination images
 * Uses Unsplash API for reliable, beautiful travel photography
 */

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY || '';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

/**
 * Fetch image from Unsplash with optimized city search
 */
async function fetchFromUnsplash(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=1&order_by=relevant&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        url: data.results[0].urls.regular,
        source: 'unsplash',
        credit: data.results[0].user.name,
        photographer: data.results[0].user.name
      };
    }
  } catch (error) {
    console.log('Unsplash fetch failed:', error.message);
  }
  return null;
}

/**
 * Main function to fetch city image
 * Tries multiple search queries for best results
 */
export async function fetchCityImage(cityName, countryName = '') {
  if (!cityName) return null;

  // Build search queries with different variations for better results
  const queries = [
    `${cityName} ${countryName} city skyline`,
    `${cityName} ${countryName} landscape`,
    `${cityName} city`,
    `${cityName} travel destination`,
    `${cityName} aerial view`,
    cityName
  ];

  // Try each query until one succeeds
  for (const query of queries) {
    const result = await fetchFromUnsplash(query);
    if (result) return result;
  }

  // Return null if all queries fail (will use fallback gradient)
  return null;
}

/**
 * Fetch multiple images for a city (for galleries, carousels, etc.)
 */
export async function fetchCityImages(cityName, countryName = '', count = 3) {
  if (!cityName || !UNSPLASH_ACCESS_KEY) return [];

  try {
    const query = `${cityName} ${countryName} travel`;
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&order_by=relevant&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) throw new Error('Unsplash API failed');

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(img => ({
        url: img.urls.regular,
        source: 'unsplash',
        credit: img.user.name,
        photographer: img.user.name
      }));
    }
  } catch (error) {
    console.log('Fetch multiple images failed:', error.message);
  }

  return [];
}

/**
 * Get a fallback gradient or placeholder image
 */
export function getFallbackImage(cityName) {
  // Return a gradient background as fallback
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  // Use city name to consistently select same gradient
  const index = cityName.charCodeAt(0) % gradients.length;
  return gradients[index];
}

/**
 * Preload image to check if it's valid
 */
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;
  });
}
