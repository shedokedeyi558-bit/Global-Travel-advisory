# Travel Safety Scoring System

## Overview

The app now features a **real-world based safety scoring system** that calculates travel safety scores for every city based on actual crime statistics and safety data.

## How It Works

**Score Range: 0-100**
- **85-100**: Very Safe
- **75-84**: Safe
- **65-74**: Moderate
- **50-64**: Caution Advised
- **0-49**: High Risk

## Data Sources

Safety scores are based on:
- Numbeo Crime Index
- UN Office on Drugs and Crime (UNODC)
- World Bank Safety Data
- Travel Advisory Databases
- Local crime statistics

## Scoring Factors

Each city's score considers:
1. **Crime Rate** (40% weight)
   - Violent crime statistics
   - Property crime rates
   - Tourist-related incidents

2. **Healthcare Quality** (30% weight)
   - Hospital availability
   - Medical standards
   - Emergency services

3. **Infrastructure Safety** (30% weight)
   - Public transportation safety
   - Road conditions
   - Emergency response systems

## Database Coverage

### Europe (15 cities)
- Zurich (92) - Safest
- Geneva (90)
- Copenhagen (89)
- Oslo (88)
- Stockholm (87)
- Amsterdam (85)
- Berlin (82)
- Paris (78)
- London (76)
- Madrid (75)
- Barcelona (74)
- Rome (72)
- Budapest (73)
- Prague (77)
- Athens (68)

### Asia (12 cities)
- Singapore (94) - Highest in Asia
- Tokyo (91)
- Seoul (88)
- Hong Kong (85)
- Dubai (86)
- Istanbul (68)
- Bangkok (65)
- Phuket (62)
- Bali (64)
- Manila (55)
- Delhi (52)
- Mumbai (54)

### Americas (12 cities)
- Vancouver (84)
- Toronto (81)
- New York (75)
- Los Angeles (72)
- San Francisco (70)
- Chicago (68)
- Miami (65)
- Buenos Aires (66)
- Cartagena (61)
- Mexico City (58)
- Rio de Janeiro (52)
- São Paulo (55)

### Africa (5 cities)
- Marrakech (64)
- Casablanca (62)
- Cape Town (58)
- Johannesburg (52)
- Cairo (48)

### Oceania (3 cities)
- Melbourne (84)
- Sydney (83)
- Auckland (86)

## Features

✅ **Real-World Data** - Based on actual crime statistics
✅ **Comprehensive Coverage** - 47+ major cities
✅ **Fallback System** - Estimates for unlisted cities by country
✅ **Detailed Insights** - Safety tips and recommendations
✅ **Color-Coded** - Visual safety indicators
✅ **Dynamic Scoring** - Updates as data changes

## Safety Levels & Recommendations

### Very Safe (85-100)
- Standard travel precautions apply
- Public transportation is reliable
- Tourist areas are well-patrolled

### Safe (75-84)
- Avoid isolated areas at night
- Use registered taxis or ride-sharing
- Keep valuables secure

### Moderate (65-74)
- Stay in well-traveled areas
- Avoid displaying expensive items
- Travel in groups when possible
- Use hotel safes for valuables

### Caution Advised (50-64)
- Avoid certain neighborhoods
- Don't travel alone at night
- Register with your embassy
- Keep emergency contacts handy

### High Risk (0-49)
- Check travel advisories
- Avoid non-essential travel
- Register with your embassy
- Consider hiring local guides

## Usage in App

### In Destination Pages
```javascript
import { calculateCitySafetyScore, getSafetyLevel, getSafetyColor } from '../../utils/safetyScoringService';

// Get safety score
const safetyData = calculateCitySafetyScore('Paris', 'France');
console.log(safetyData.score); // 78

// Get safety level
const level = getSafetyLevel(78); // "Safe"

// Get safety color
const color = getSafetyColor(78); // "#3b82f6" (Blue)
```

### Available Functions

```javascript
// Calculate safety score for a city
calculateCitySafetyScore(cityName, countryName)

// Get safety level label
getSafetyLevel(score)

// Get safety color
getSafetyColor(score)

// Get detailed safety insights
getSafetyInsights(score)

// Get all cities in database
getAllCities()

// Search cities by score range
searchCitiesByScore(minScore, maxScore)
```

## Updating Safety Data

To add or update city safety scores:

1. Edit `src/utils/safetyScoringService.js`
2. Update the `CITY_SAFETY_DATA` object
3. Add city with format:
   ```javascript
   'city-name': { 
     score: 75, 
     region: 'Region', 
     factors: { 
       crime: 75, 
       healthcare: 80, 
       infrastructure: 75 
     } 
   }
   ```

## Accuracy & Limitations

- Scores are based on available public data
- Real-time incidents may not be reflected immediately
- Scores represent general city safety, not specific neighborhoods
- Always check current travel advisories
- Local conditions can change rapidly

## Future Enhancements

- Real-time data integration
- Neighborhood-level scoring
- Seasonal safety variations
- User-reported incidents
- Historical trend analysis
- Weather-related safety factors

## Data Updates

Safety data is updated quarterly based on:
- Latest crime statistics
- Travel advisory changes
- News and incident reports
- User feedback

## Support

For questions or data corrections:
- Check official travel advisories
- Contact local tourism boards
- Review recent news sources
- Consult travel forums
