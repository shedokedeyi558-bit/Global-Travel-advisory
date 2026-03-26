# API Setup Summary - 3 Simple Steps

## Step 1: Get Your API Keys

### Unsplash
- Go to: https://unsplash.com/oauth/applications
- Click "Create a new application"
- Fill form and click "Create application"
- Copy your **Access Key**

### Pexels
- Go to: https://www.pexels.com/api/
- Click "Request API"
- Copy your **API Key**

### Pixabay
- Go to: https://pixabay.com/api/
- Copy your **API Key** from the page

---

## Step 2: Add Keys to `.env.local`

Create or edit `.env.local` in your project root:

```env
VITE_UNSPLASH_KEY=your_unsplash_key_here
VITE_PEXELS_KEY=your_pexels_key_here
VITE_PIXABAY_KEY=your_pixabay_key_here
```

**Example:**
```env
VITE_UNSPLASH_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
VITE_PEXELS_KEY=563492ad6f917000010000011a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r
VITE_PIXABAY_KEY=12345678-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

---

## Step 3: Restart Your App

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Done! ✅

Your app will now:
- ✅ Fetch real city images from Unsplash
- ✅ Fallback to Pexels if Unsplash is rate-limited
- ✅ Fallback to Pixabay if both fail
- ✅ Show beautiful gradients if all APIs fail

---

## Test It

1. Go to any destination page (e.g., `/destination/Paris`)
2. You should see a real city image in the hero section
3. Open DevTools (F12) → Console
4. No errors = Success! 🎉

---

## File Changes Made

✅ `src/utils/imageService.js` - Updated to use environment variables
✅ `src/components/destination/ImmersiveHero.jsx` - Now uses image service
✅ `.env.local` - Add your API keys here

---

## Questions?

See detailed guides:
- `IMAGE_API_SETUP.md` - Complete setup guide
- `API_KEYS_QUICK_START.md` - Step-by-step instructions
