# Global SafeTravel 🌍✈️

A comprehensive travel intelligence platform that combines real-time safety scoring, health data, airport information, and AI-powered travel assistance to help users make informed travel decisions.

## 🎯 Features

### Core Features
- **Real-Time Safety Scoring**: AI-powered safety assessment based on crime rates, political stability, health risks, and more
- **Destination Discovery**: Modern card-based UI with 50+ destinations
- **Health & Wellness**: Disease risk panels, vaccine information, and health metrics
- **Airport Information**: Comprehensive airport data and flight information
- **AI Travel Assistant**: Intelligent chatbot for travel planning and recommendations
- **Currency Converter**: Real-time exchange rates
- **Weather Forecasts**: Current conditions and forecasts for destinations
- **Local News**: Stay updated with destination news

### Mobile Destinations Page (Latest)
- **Modern Card-Based UI**: Beautiful destination cards with images and risk badges
- **Featured Section**: Horizontal scrolling carousel of safe destinations
- **Advanced Filtering**: Filter by risk level, region, and budget
- **Smart Pagination**: Shows 15 destinations by default with "Load More" option
- **Real-Time Search**: Instant filtering as you type
- **Responsive Design**: Optimized for all mobile screen sizes

## 🚀 Tech Stack

### Frontend
- **React 18+**: UI library with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **Lucide Icons**: Beautiful icon library

### APIs & Services
- **Unsplash API**: High-quality destination images
- **OpenStreetMap**: Interactive maps
- **Open-Meteo**: Weather data
- **Nominatim**: Geocoding and location data
- **Overpass API**: Points of interest
- **Firebase**: Authentication and backend

### Development
- **Node.js**: JavaScript runtime
- **npm**: Package manager
- **ESLint**: Code quality
- **PostCSS**: CSS processing

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/global-safetravel.git
cd global-safetravel
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env.local` file in the root directory:
```env
VITE_UNSPLASH_KEY=your_unsplash_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
global-safetravel/
├── src/
│   ├── components/
│   │   ├── destinations/          # Mobile destinations page components
│   │   │   ├── MobileDestinationsList.jsx
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── FeaturedSection.jsx
│   │   │   └── FilterBottomSheet.jsx
│   │   ├── destination/           # Destination detail page components
│   │   │   ├── DestinationPage.jsx
│   │   │   ├── ImmersiveHero.jsx
│   │   │   ├── ModernRiskScore.jsx
│   │   │   ├── MapSection.jsx
│   │   │   └── ...
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── Destination.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Chat.jsx
│   │   ├── HealthData.jsx
│   │   └── ...
│   ├── utils/
│   │   ├── safetyScoringService.js    # Real-world safety scoring
│   │   ├── imageService.js            # Image fetching from Unsplash
│   │   ├── cityDataFetcher.js         # City data aggregation
│   │   ├── api.js                     # API calls
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── TravelContext.jsx
│   ├── hooks/
│   │   ├── useGeolocation.js
│   │   └── useVoiceInput.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── api/
│   └── ai.js                      # AI service backend
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### Mobile Destinations Page
- **MobileDestinationsList**: Main container with search, filters, and pagination
- **DestinationCard**: Reusable card component for destinations
- **FeaturedSection**: Horizontal scroll carousel
- **FilterBottomSheet**: Mobile-optimized filter modal

### Destination Detail Page
- **ImmersiveHero**: Full-width hero with city image and risk score
- **ModernRiskScore**: Glassmorphism risk badge
- **ModernWeather**: Weather forecast display
- **MapSection**: Interactive map with fullscreen mode
- **CityDetails**: Detailed city information

## 🔐 Safety Scoring System

The app uses a comprehensive safety scoring algorithm based on:
- **Crime Rate** (25% weight)
- **Political Stability** (20% weight)
- **Health Risk** (15% weight)
- **Natural Disasters** (15% weight)
- **Travel Advisory** (15% weight)
- **Infrastructure** (10% weight)

Scores range from 0-100:
- **0-30**: Safe (Green)
- **30-60**: Moderate (Yellow)
- **60-80**: Caution (Orange)
- **80+**: High Risk (Red)

See `SAFETY_SCORING_GUIDE.md` for detailed information.

## 📱 Mobile Optimization

### Responsive Design
- Mobile-first approach
- Separate mobile and desktop components
- Optimized for 320px+ screens
- Touch-friendly interactions

### Performance
- Lazy image loading
- Pagination (15 destinations per page)
- Efficient state management
- Smooth 60fps animations

### Features
- Sticky header with search
- Bottom sheet filters
- Horizontal scroll carousels
- Smooth animations
- Proper spacing and hierarchy

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📚 Documentation

- **[DESTINATIONS_REDESIGN.md](./DESTINATIONS_REDESIGN.md)** - Mobile destinations page redesign details
- **[PAGINATION_IMPLEMENTATION.md](./PAGINATION_IMPLEMENTATION.md)** - Pagination system documentation
- **[SPACING_IMPROVEMENTS.md](./SPACING_IMPROVEMENTS.md)** - Spacing and layout improvements
- **[SAFETY_SCORING_GUIDE.md](./SAFETY_SCORING_GUIDE.md)** - Safety scoring algorithm
- **[IMAGE_API_SETUP.md](./IMAGE_API_SETUP.md)** - Image API configuration
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - User quick start guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview

## 🔑 API Keys Required

### Unsplash API
- Get key from: https://unsplash.com/developers
- Used for: Destination images
- Free tier: 50 requests/hour

### Firebase
- Get credentials from: https://firebase.google.com
- Used for: Authentication and database
- Free tier: Generous limits

### Optional APIs
- Open-Meteo: Weather (free, no key needed)
- Nominatim: Geocoding (free, no key needed)
- Overpass: POI data (free, no key needed)

## 🎯 Usage

### View Destinations
1. Navigate to `/destinations`
2. Browse featured safe destinations
3. Search for specific countries
4. Apply filters (risk, region, budget)
5. Click "Load More" to see additional destinations

### View Destination Details
1. Click on any destination card
2. View immersive hero with city image
3. Check safety score and risk level
4. View weather, costs, and attractions
5. Explore interactive map

### Use AI Assistant
1. Click floating chat button
2. Ask travel questions
3. Get AI-powered recommendations
4. Drag chat window to reposition

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Unsplash for beautiful travel photography
- OpenStreetMap for map data
- Open-Meteo for weather data
- Firebase for backend services
- Framer Motion for smooth animations
- Tailwind CSS for styling

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the quick start guide

## 🗺️ Roadmap

### Upcoming Features
- [ ] Infinite scroll pagination
- [ ] User favorites/bookmarks
- [ ] Trip planning and itineraries
- [ ] Social sharing
- [ ] User reviews and ratings
- [ ] Offline mode
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

## 📊 Project Stats

- **Components**: 80+
- **Pages**: 15+
- **Destinations**: 50+
- **Lines of Code**: 10,000+
- **Documentation**: 15+ guides
- **Build Time**: ~20 seconds
- **Bundle Size**: ~750KB (gzipped: ~212KB)

---

**Made with ❤️ for travelers worldwide**

Last updated: March 2026
#   G l o b a l - T r a v e l - a d v i s o r y  
 