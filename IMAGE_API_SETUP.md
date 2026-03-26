# Image API Setup Guide

This document explains how to set up the image fetching service for city views in the app.

## Overview

The `imageService.js` utility fetches high-quality city images from multiple APIs with automatic fallbacks:

1. **Unsplash** - Best quality, free tier available
2. **Pexels** - High quality, free tier available
3. **Pixabay** - Good quality, free tier available

If all APIs fail, a beautiful gradient fallback is used.

## Setup Instructions

### 1. Unsplash API (Recommended)

**Why Unsplash?** Best image quality, generous free tier, excellent for travel photography.

**Steps:**
1. Go to https://unsplash.com/developers
2. Click "Create an app"
3. Accept terms and fill in the form
4. You'll get an `Access Key`
5. Add to `.env.local`:
   ```
   VITE_UNSPLASH_KEY=your_access_key_here
   ```

**Free Tier:** 50 requests/hour

### 2. Pexels API (Backup)

**Why Pexels?** Free, no rate limits for reasonable use, good quality.

**Steps:**
1. Go to https://www.pexels.com/api/
2. Click "Get Started"
3. Create an account
4. Generate API key
5. Add to `.env.local`:
   ```
   VITE_PEXELS_KEY=your_api_key_here
   ```

**Free Tier:** Unlimited requests

### 3. Pixabay API (Fallback)

**Why Pixabay?** Free, large collection, good for fallback.

**Steps:**
1. Go to https://pixabay.com/api/
2. Create an account
3. Generate API key
4. Add to `.env.local`:
   ```
   VITE_PIXABAY_KEY=your_api_key_here
   ```

**Free Tier:** 100 requests/hour

## Update Environment Variables

Edit `src/utils/imageService.js` and replace the placeholder keys:

```javascript
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY || 'YOUR_UNSPLASH_KEY';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_KEY || 'YOUR_PEXELS_KEY';
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_KEY || 'YOUR_PIXABAY_KEY';
```

## Usage

### In ImmersiveHero Component

The component automatically uses the image service:

```javascript
import { fetchCityImage } from '../../utils/imageService';

// Automatically fetches image for the destination
const imageData = await fetchCityImage(destination, country);
```

### In Other Components

```javascript
import { fetchCityImage, fetchCityImages, getFallbackImage } from '../../utils/imageService';

// Fetch single image
const image = await fetchCityImage('Paris', 'France');

// Fetch multiple images
const images = await fetchCityImages('Tokyo', 'Japan', 5);

// Get fallback gradient
const gradient = getFallbackImage('Barcelona');
```

## Features

✅ **Multiple API Support** - Tries Unsplash → Pexels → Pixabay
✅ **Smart Fallbacks** - Beautiful gradients if all APIs fail
✅ **Image Preloading** - Validates images before using
✅ **Query Variations** - Tries multiple search queries for better results
✅ **Attribution** - Returns photographer/creator credit
✅ **Error Handling** - Graceful degradation with fallbacks

## Search Query Strategy

The service tries multiple query variations to find the best image:

1. `{city} {country} city skyline`
2. `{city} {country} landscape`
3. `{city} city`
4. `{city} travel`
5. `{city}`

This ensures better results even for less common cities.

## Performance Tips

1. **Cache Images** - Consider caching fetched images in localStorage
2. **Lazy Load** - Only fetch images when needed
3. **Preload** - Preload images for upcoming destinations
4. **Optimize** - Use image CDN for faster delivery

## Troubleshooting

### Images not loading?
- Check API keys are correct in `.env.local`
- Verify API keys are active on respective platforms
- Check browser console for error messages
- Ensure rate limits haven't been exceeded

### Getting fallback gradients?
- This is normal if APIs are rate-limited or unavailable
- Gradients are beautiful and provide good UX
- Consider upgrading to paid API tiers for production

### Rate limiting?
- Unsplash: 50 requests/hour (free tier)
- Pexels: Unlimited
- Pixabay: 100 requests/hour (free tier)

Consider upgrading to paid plans for production apps.

## Production Recommendations

For production use:

1. **Use Paid Tiers** - Upgrade to paid plans for higher limits
2. **Implement Caching** - Cache images to reduce API calls
3. **Use CDN** - Serve images through a CDN for faster delivery
4. **Monitor Usage** - Track API usage to avoid surprises
5. **Fallback Strategy** - Always have beautiful fallbacks ready

## Alternative APIs

If you want to use different image APIs:

- **Flickr API** - Large collection, good for travel
- **Getty Images API** - Premium images (paid)
- **Shutterstock API** - Professional images (paid)
- **iStock API** - Stock photos (paid)

## Support

For issues or questions:
- Check API documentation on respective platforms
- Review error messages in browser console
- Test API keys directly on provider websites
