export const healthDatabase = {
  'Singapore': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Japanese Encephalitis']
    },
    diseases: {
      'Dengue Fever': 45,
      'Malaria': 5,
      'Typhoid': 15,
      'Hepatitis A': 20
    },
    waterSafety: 95,
    airQuality: 85,
    healthcareQuality: 98,
    climateRisk: 'Tropical - High Humidity',
    heatRisk: 35,
    altitudeSickness: 'Not applicable'
  },
  'Thailand': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Japanese Encephalitis', 'Rabies']
    },
    diseases: {
      'Dengue Fever': 65,
      'Malaria': 40,
      'Typhoid': 35,
      'Hepatitis A': 45
    },
    waterSafety: 60,
    airQuality: 55,
    healthcareQuality: 75,
    climateRisk: 'Tropical - Monsoon Season',
    heatRisk: 60,
    altitudeSickness: 'Not applicable'
  },
  'Switzerland': {
    vaccines: {
      required: [],
      recommended: ['Hepatitis A', 'Tick-borne Encephalitis']
    },
    diseases: {
      'Lyme Disease': 25,
      'Tick-borne Encephalitis': 15,
      'Hepatitis A': 10
    },
    waterSafety: 99,
    airQuality: 92,
    healthcareQuality: 99,
    climateRisk: 'Alpine - Cold Winters',
    heatRisk: 5,
    altitudeSickness: 'Possible above 2500m'
  },
  'Japan': {
    vaccines: {
      required: [],
      recommended: ['Hepatitis A', 'Japanese Encephalitis']
    },
    diseases: {
      'Japanese Encephalitis': 20,
      'Hepatitis A': 15,
      'Dengue Fever': 10
    },
    waterSafety: 98,
    airQuality: 75,
    healthcareQuality: 97,
    climateRisk: 'Temperate - Seasonal',
    heatRisk: 25,
    altitudeSickness: 'Possible in mountain areas'
  },
  'Brazil': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Rabies']
    },
    diseases: {
      'Dengue Fever': 75,
      'Malaria': 55,
      'Yellow Fever': 40,
      'Zika': 35
    },
    waterSafety: 50,
    airQuality: 65,
    healthcareQuality: 70,
    climateRisk: 'Tropical - High Humidity',
    heatRisk: 70,
    altitudeSickness: 'Not applicable'
  },
  'India': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Japanese Encephalitis', 'Rabies']
    },
    diseases: {
      'Dengue Fever': 70,
      'Malaria': 65,
      'Typhoid': 60,
      'Hepatitis A': 55
    },
    waterSafety: 40,
    airQuality: 35,
    healthcareQuality: 60,
    climateRisk: 'Tropical - Monsoon',
    heatRisk: 75,
    altitudeSickness: 'Possible in Himalayas'
  },
  'Canada': {
    vaccines: {
      required: [],
      recommended: ['Hepatitis A']
    },
    diseases: {
      'Lyme Disease': 30,
      'West Nile Virus': 15,
      'Hepatitis A': 10
    },
    waterSafety: 97,
    airQuality: 88,
    healthcareQuality: 96,
    climateRisk: 'Temperate - Cold Winters',
    heatRisk: 10,
    altitudeSickness: 'Not applicable'
  },
  'Egypt': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Rabies']
    },
    diseases: {
      'Hepatitis A': 50,
      'Typhoid': 45,
      'Schistosomiasis': 40,
      'Dengue Fever': 25
    },
    waterSafety: 35,
    airQuality: 45,
    healthcareQuality: 65,
    climateRisk: 'Desert - Extreme Heat',
    heatRisk: 85,
    altitudeSickness: 'Not applicable'
  },
  'Peru': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Rabies']
    },
    diseases: {
      'Dengue Fever': 60,
      'Malaria': 50,
      'Typhoid': 40,
      'Altitude Sickness': 55
    },
    waterSafety: 45,
    airQuality: 60,
    healthcareQuality: 70,
    climateRisk: 'Varied - Andes Mountains',
    heatRisk: 40,
    altitudeSickness: 'High risk in Machu Picchu (2430m)'
  },
  'Kenya': {
    vaccines: {
      required: ['Yellow Fever'],
      recommended: ['Hepatitis A', 'Typhoid', 'Rabies', 'Meningitis']
    },
    diseases: {
      'Malaria': 70,
      'Dengue Fever': 50,
      'Typhoid': 45,
      'Hepatitis A': 40
    },
    waterSafety: 40,
    airQuality: 70,
    healthcareQuality: 65,
    climateRisk: 'Tropical - Dry Season',
    heatRisk: 65,
    altitudeSickness: 'Possible in highlands'
  }
};

export const getHealthData = (country) => {
  return healthDatabase[country] || null;
};

export const getRiskColor = (value, threshold1 = 33, threshold2 = 66) => {
  if (value < threshold1) return { bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-400', bar: 'bg-emerald-500' };
  if (value < threshold2) return { bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-400', bar: 'bg-amber-500' };
  return { bg: 'from-red-500/20 to-red-600/10', text: 'text-red-400', bar: 'bg-red-500' };
};
