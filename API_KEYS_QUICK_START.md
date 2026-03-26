# Getting Your API Keys - Quick Start Guide

## 1. Unsplash API Key

**After Registration:**

1. Go to: https://unsplash.com/oauth/applications
2. Click **"Create a new application"**
3. Accept the terms and click **"Create application"**
4. Fill in the form:
   - App name: `Travel Intelligence App`
   - Description: `Fetching city images for travel destinations`
   - Check the boxes for terms
5. Click **"Create application"**
6. You'll see your credentials page with:
   - **Access Key** ← Copy this
   - Secret Key (not needed for public API)
7. Your Access Key looks like: `abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

**Add to `.env.local`:**
```
VITE_UNSPLASH_KEY=your_access_key_here
```

---

## 2. Pexels API Key

**After Registration:**

1. Go to: https://www.pexels.com/api/
2. Click **"Request API"** (or login if already registered)
3. You'll see your API key displayed on the page
4. Your API key looks like: `563492ad6f917000010000011a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r`

**Add to `.env.local`:**
```
VITE_PEXELS_KEY=your_api_key_here
```

---

## 3. Pixabay API Key

**After Registration:**

1. Go to: https://pixabay.com/api/
2. Scroll down to **"API Documentation"**
3. Click **"Search Images"** section
4. You'll see your API key in the example URL
5. Or go to: https://pixabay.com/accounts/profile/ and look for API section
6. Your API key looks like: `12345678-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

**Add to `.env.local`:**
```
VITE_PIXABAY_KEY=your_api_key_here
```

---

## Complete `.env.local` File

Create or update your `.env.local` file in the project root:

```env
# Image APIs
VITE_UNSPLASH_KEY=your_unsplash_access_key_here
VITE_PEXELS_KEY=your_pexels_api_key_here
VITE_PIXABAY_KEY=your_pixabay_api_key_here

# Other existing variables...
```

---

## Update imageService.js

Update `src/utils/imageService.js` to use environment variables:

```javascript
// Replace these lines:
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_KEY';
const PEXELS_API_KEY = 'YOUR_PEXELS_KEY';
const PIXABAY_API_KEY = 'YOUR_PIXABAY_KEY';

// With these:
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY || '';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_KEY || '';
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_KEY || '';
```

---

## Test Your Keys

### Test Unsplash Key

Open browser console and run:
```javascript
fetch('https://api.unsplash.com/search/photos?query=paris&per_page=1', {
  headers: {
    'Authorization': `Client-ID YOUR_UNSPLASH_KEY`
  }
})
.then(r => r.json())
.then(d => console.log(d))
```

### Test Pexels Key

```javascript
fetch('https://api.pexels.com/v1/search?query=paris&per_page=1', {
  headers: {
    'Authorization': 'YOUR_PEXELS_KEY'
  }
})
.then(r => r.json())
.then(d => console.log(d))
```

### Test Pixabay Key

```javascript
fetch('https://pixabay.com/api/?key=YOUR_PIXABAY_KEY&q=paris&image_type=photo&per_page=1')
.then(r => r.json())
.then(d => console.log(d))
```

If you see image results, your keys are working!

---

## Restart Your App

After adding keys to `.env.local`:

1. Stop your dev server (Ctrl+C)
2. Run: `npm run dev`
3. The app will now use your API keys

---

## Verify It's Working

1. Navigate to a destination page (e.g., `/destination/Paris`)
2. Check the hero section - it should show a real city image
3. Open browser DevTools (F12) → Console
4. You should NOT see any API errors

---

## Troubleshooting

### "Image not loading"
- Check API keys are correct in `.env.local`
- Verify keys are active on respective platforms
- Check browser console for errors (F12)

### "Still seeing gradient fallback"
- This is normal if APIs are rate-limited
- Try refreshing the page
- Check if you've exceeded rate limits

### "API key not recognized"
- Make sure you copied the ENTIRE key
- No extra spaces or quotes
- Restart dev server after updating `.env.local`

---

## Rate Limits (Free Tier)

| API | Limit | Reset |
|-----|-------|-------|
| Unsplash | 50 requests/hour | Hourly |
| Pexels | Unlimited | N/A |
| Pixabay | 100 requests/hour | Hourly |

**Tip:** Pexels has unlimited requests, so it's great as a backup!

---

## Next Steps

1. ✅ Get all three API keys
2. ✅ Add to `.env.local`
3. ✅ Update `imageService.js`
4. ✅ Restart dev server
5. ✅ Test on a destination page
6. ✅ Enjoy beautiful city images!

---

## Need Help?

- **Unsplash Support:** https://support.unsplash.com/
- **Pexels Support:** https://www.pexels.com/support/
- **Pixabay Support:** https://pixabay.com/support/

