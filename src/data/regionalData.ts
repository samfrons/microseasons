// Regional climate and cultural data for microseason generation

export interface ClimateData {
  temperatureRange: {
    winter: [number, number]; // min, max in Celsius
    spring: [number, number];
    summer: [number, number];
    autumn: [number, number];
  };
  precipitation: {
    winter: 'low' | 'moderate' | 'high';
    spring: 'low' | 'moderate' | 'high';
    summer: 'low' | 'moderate' | 'high';
    autumn: 'low' | 'moderate' | 'high';
  };
  snowfall: boolean;
  humidity: 'low' | 'moderate' | 'high';
  windiness: 'low' | 'moderate' | 'high';
}

export interface CulturalData {
  festivals: string[];
  naturalFeatures: string[];
  flora: string[];
  fauna: string[];
  culturalActivities: string[];
  foodTraditions: string[];
}

export interface Region {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zipCodes?: string[]; // Sample zip codes for the region
  climate: ClimateData;
  culture: CulturalData;
  timezone: string;
}

// German Regions
export const germanRegions: Region[] = [
  {
    id: 'bavaria',
    name: 'Bavaria',
    country: 'Germany',
    coordinates: { lat: 48.1351, lng: 11.5820 }, // Munich
    zipCodes: ['80331', '80333', '80335', '81667', '81669'],
    timezone: 'Europe/Berlin',
    climate: {
      temperatureRange: {
        winter: [-3, 3],
        spring: [8, 18],
        summer: [18, 28],
        autumn: [8, 15],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'moderate',
        summer: 'high',
        autumn: 'moderate',
      },
      snowfall: true,
      humidity: 'moderate',
      windiness: 'low',
    },
    culture: {
      festivals: ['Oktoberfest', 'Christmas Markets', 'Fasching', 'Maypole Festival'],
      naturalFeatures: ['Alps', 'Danube River', 'Lakes', 'Forests'],
      flora: ['Edelweiss', 'Alpine flowers', 'Beech trees', 'Spruce forests'],
      fauna: ['Red deer', 'Chamois', 'Golden eagles', 'Marmots'],
      culturalActivities: ['Beer gardens', 'Alpine hiking', 'Traditional music', 'Folk dancing'],
      foodTraditions: ['Weißwurst', 'Pretzels', 'Lebkuchen', 'Sauerkraut'],
    },
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    zipCodes: ['10115', '10117', '10119', '10178', '10179'],
    timezone: 'Europe/Berlin',
    climate: {
      temperatureRange: {
        winter: [-2, 3],
        spring: [8, 16],
        summer: [18, 25],
        autumn: [8, 14],
      },
      precipitation: {
        winter: 'low',
        spring: 'moderate',
        summer: 'moderate',
        autumn: 'moderate',
      },
      snowfall: true,
      humidity: 'moderate',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Berlin International Film Festival', 'Festival of Lights', 'Christopher Street Day', 'New Year\'s Eve at Brandenburg Gate'],
      naturalFeatures: ['Spree River', 'Tiergarten', 'Wannsee Lake', 'Urban forests'],
      flora: ['Linden trees', 'Cherry blossoms', 'Urban gardens', 'Park roses'],
      fauna: ['Urban foxes', 'Wild boars', 'Swans', 'Nightingales'],
      culturalActivities: ['Street art', 'Club culture', 'Museums', 'Beer gardens'],
      foodTraditions: ['Currywurst', 'Döner kebab', 'Berliner Pfannkuchen', 'Street food'],
    },
  },
  {
    id: 'black-forest',
    name: 'Black Forest',
    country: 'Germany',
    coordinates: { lat: 48.0000, lng: 8.2000 },
    zipCodes: ['79098', '79100', '79102', '79104'],
    timezone: 'Europe/Berlin',
    climate: {
      temperatureRange: {
        winter: [-4, 2],
        spring: [6, 15],
        summer: [16, 24],
        autumn: [7, 13],
      },
      precipitation: {
        winter: 'high',
        spring: 'high',
        summer: 'high',
        autumn: 'high',
      },
      snowfall: true,
      humidity: 'high',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Fastnacht', 'Wine festivals', 'Christmas markets', 'Forest festivals'],
      naturalFeatures: ['Dense forests', 'Mountain peaks', 'Waterfalls', 'Lakes'],
      flora: ['Fir trees', 'Wildflowers', 'Moss', 'Mushrooms'],
      fauna: ['Deer', 'Wild boar', 'Woodpeckers', 'Lynx'],
      culturalActivities: ['Hiking', 'Cuckoo clock making', 'Traditional crafts', 'Wellness spas'],
      foodTraditions: ['Black Forest cake', 'Spätzle', 'Smoked ham', 'Cherry schnapps'],
    },
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    coordinates: { lat: 53.5511, lng: 9.9937 },
    zipCodes: ['20095', '20097', '20099', '20144', '20146'],
    timezone: 'Europe/Berlin',
    climate: {
      temperatureRange: {
        winter: [0, 4],
        spring: [8, 15],
        summer: [17, 23],
        autumn: [9, 14],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'moderate',
        summer: 'moderate',
        autumn: 'high',
      },
      snowfall: false,
      humidity: 'high',
      windiness: 'high',
    },
    culture: {
      festivals: ['Hamburg Harbor Birthday', 'Reeperbahn Festival', 'Christmas markets', 'Alstervergnügen'],
      naturalFeatures: ['Elbe River', 'Alster Lake', 'Harbor', 'Parks'],
      flora: ['Maritime plants', 'Park trees', 'Water lilies', 'Urban greenery'],
      fauna: ['Seagulls', 'Swans', 'Harbor seals (nearby)', 'Urban wildlife'],
      culturalActivities: ['Harbor tours', 'Maritime museums', 'Theater', 'Music clubs'],
      foodTraditions: ['Fish sandwiches', 'Labskaus', 'Franzbrötchen', 'Seafood'],
    },
  },
];

// Major World Cities
export const worldCities: Region[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    zipCodes: ['100-0001', '100-0005', '150-0001'],
    timezone: 'Asia/Tokyo',
    climate: {
      temperatureRange: {
        winter: [2, 10],
        spring: [14, 20],
        summer: [25, 32],
        autumn: [15, 22],
      },
      precipitation: {
        winter: 'low',
        spring: 'moderate',
        summer: 'high',
        autumn: 'high',
      },
      snowfall: false,
      humidity: 'high',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Cherry Blossom Festival', 'Tanabata', 'Autumn Leaves Festival', 'New Year'],
      naturalFeatures: ['Mount Fuji (view)', 'Tokyo Bay', 'Rivers', 'Parks'],
      flora: ['Cherry blossoms', 'Plum blossoms', 'Ginkgo trees', 'Maple trees'],
      fauna: ['Crows', 'Koi fish', 'Egrets', 'Sparrows'],
      culturalActivities: ['Temple visits', 'Traditional tea', 'Modern technology', 'Festivals'],
      foodTraditions: ['Sushi', 'Ramen', 'Seasonal kaiseki', 'Wagashi sweets'],
    },
  },
  {
    id: 'new-york',
    name: 'New York City',
    country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    zipCodes: ['10001', '10002', '10003', '10004'],
    timezone: 'America/New_York',
    climate: {
      temperatureRange: {
        winter: [-3, 4],
        spring: [10, 20],
        summer: [23, 30],
        autumn: [10, 18],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'high',
        summer: 'moderate',
        autumn: 'moderate',
      },
      snowfall: true,
      humidity: 'moderate',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Thanksgiving Parade', 'Times Square New Year', 'Cherry Blossom Festival', 'Halloween Parade'],
      naturalFeatures: ['Hudson River', 'Central Park', 'East River', 'Urban parks'],
      flora: ['Street trees', 'Park flowers', 'Autumn foliage', 'Spring blooms'],
      fauna: ['Pigeons', 'Squirrels', 'Hawks', 'Raccoons'],
      culturalActivities: ['Theater', 'Museums', 'Street culture', 'Food scenes'],
      foodTraditions: ['Pizza', 'Bagels', 'Hot dogs', 'International cuisine'],
    },
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    zipCodes: ['SW1A', 'WC2N', 'E1', 'SE1'],
    timezone: 'Europe/London',
    climate: {
      temperatureRange: {
        winter: [2, 8],
        spring: [8, 15],
        summer: [15, 23],
        autumn: [10, 15],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'moderate',
        summer: 'low',
        autumn: 'moderate',
      },
      snowfall: false,
      humidity: 'high',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Notting Hill Carnival', 'Chelsea Flower Show', 'Guy Fawkes Night', 'Christmas lights'],
      naturalFeatures: ['Thames River', 'Parks', 'Gardens', 'Urban greenery'],
      flora: ['Roses', 'Daffodils', 'Park trees', 'Garden flowers'],
      fauna: ['Urban foxes', 'Swans', 'Pigeons', 'Parakeets'],
      culturalActivities: ['Museums', 'Theater', 'Pub culture', 'Markets'],
      foodTraditions: ['Tea time', 'Fish and chips', 'Sunday roast', 'International food'],
    },
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    zipCodes: ['75001', '75002', '75003', '75004'],
    timezone: 'Europe/Paris',
    climate: {
      temperatureRange: {
        winter: [3, 8],
        spring: [10, 16],
        summer: [18, 25],
        autumn: [10, 16],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'moderate',
        summer: 'low',
        autumn: 'moderate',
      },
      snowfall: false,
      humidity: 'moderate',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['Bastille Day', 'Nuit Blanche', 'Paris Fashion Week', 'Fête de la Musique'],
      naturalFeatures: ['Seine River', 'Parks', 'Gardens', 'Tree-lined boulevards'],
      flora: ['Chestnut trees', 'Roses', 'Garden flowers', 'Spring blossoms'],
      fauna: ['Swans', 'Pigeons', 'Sparrows', 'Urban wildlife'],
      culturalActivities: ['Art museums', 'Café culture', 'Fashion', 'Architecture'],
      foodTraditions: ['Croissants', 'Cheese', 'Wine', 'Patisserie'],
    },
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    zipCodes: ['2000', '2001', '2007', '2008'],
    timezone: 'Australia/Sydney',
    climate: {
      temperatureRange: {
        winter: [8, 17],
        spring: [14, 22],
        summer: [19, 27],
        autumn: [15, 23],
      },
      precipitation: {
        winter: 'moderate',
        spring: 'moderate',
        summer: 'moderate',
        autumn: 'high',
      },
      snowfall: false,
      humidity: 'moderate',
      windiness: 'moderate',
    },
    culture: {
      festivals: ['New Year Fireworks', 'Vivid Sydney', 'Mardi Gras', 'Australia Day'],
      naturalFeatures: ['Harbor', 'Beaches', 'Blue Mountains', 'Coastal cliffs'],
      flora: ['Eucalyptus', 'Wattle', 'Banksias', 'Native wildflowers'],
      fauna: ['Rainbow lorikeets', 'Cockatoos', 'Possums', 'Whales (seasonal)'],
      culturalActivities: ['Beach culture', 'Outdoor dining', 'Harbor activities', 'Markets'],
      foodTraditions: ['Barbecue', 'Seafood', 'Lamingtons', 'Multicultural cuisine'],
    },
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    zipCodes: ['08001', '08002', '08003', '08004'],
    timezone: 'Europe/Madrid',
    climate: {
      temperatureRange: {
        winter: [8, 14],
        spring: [12, 18],
        summer: [23, 29],
        autumn: [15, 21],
      },
      precipitation: {
        winter: 'low',
        spring: 'moderate',
        summer: 'low',
        autumn: 'high',
      },
      snowfall: false,
      humidity: 'moderate',
      windiness: 'low',
    },
    culture: {
      festivals: ['La Mercè', 'Sant Jordi', 'Festa Major de Gràcia', 'Three Kings'],
      naturalFeatures: ['Mediterranean Sea', 'Beaches', 'Montjuïc', 'Parks'],
      flora: ['Palm trees', 'Mediterranean plants', 'Bougainvillea', 'Pine trees'],
      fauna: ['Seagulls', 'Pigeons', 'Parrots', 'Mediterranean fish'],
      culturalActivities: ['Beach life', 'Architecture tours', 'Tapas culture', 'Markets'],
      foodTraditions: ['Tapas', 'Paella', 'Cava', 'Pan con tomate'],
    },
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    coordinates: { lat: 64.1466, lng: -21.9426 },
    zipCodes: ['101', '102', '103', '104'],
    timezone: 'Atlantic/Reykjavik',
    climate: {
      temperatureRange: {
        winter: [-3, 2],
        spring: [2, 8],
        summer: [10, 15],
        autumn: [4, 9],
      },
      precipitation: {
        winter: 'high',
        spring: 'moderate',
        summer: 'moderate',
        autumn: 'high',
      },
      snowfall: true,
      humidity: 'high',
      windiness: 'high',
    },
    culture: {
      festivals: ['Winter Lights Festival', 'Iceland Airwaves', 'Culture Night', 'Midnight Sun celebrations'],
      naturalFeatures: ['Geothermal areas', 'Coastline', 'Volcanic landscapes', 'Northern lights'],
      flora: ['Moss', 'Lupines', 'Arctic flowers', 'Birch trees'],
      fauna: ['Puffins', 'Arctic terns', 'Whales (nearby)', 'Seals'],
      culturalActivities: ['Hot springs', 'Music scene', 'Viking heritage', 'Northern lights viewing'],
      foodTraditions: ['Fermented shark', 'Lamb', 'Skyr', 'Dried fish'],
    },
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    zipCodes: ['018956', '018960', '048619'],
    timezone: 'Asia/Singapore',
    climate: {
      temperatureRange: {
        winter: [24, 31],
        spring: [25, 32],
        summer: [25, 32],
        autumn: [24, 31],
      },
      precipitation: {
        winter: 'high',
        spring: 'high',
        summer: 'moderate',
        autumn: 'high',
      },
      snowfall: false,
      humidity: 'high',
      windiness: 'low',
    },
    culture: {
      festivals: ['Chinese New Year', 'Deepavali', 'Hari Raya', 'National Day'],
      naturalFeatures: ['Gardens by the Bay', 'Rainforest', 'Islands', 'Waterfront'],
      flora: ['Orchids', 'Tropical flowers', 'Palms', 'Frangipani'],
      fauna: ['Hornbills', 'Otters', 'Monitor lizards', 'Tropical birds'],
      culturalActivities: ['Hawker centers', 'Gardens', 'Marina life', 'Multicultural festivals'],
      foodTraditions: ['Laksa', 'Chicken rice', 'Satay', 'Kaya toast'],
    },
  },
];

export const allRegions = [...germanRegions, ...worldCities];

// Helper function to find region by coordinates or zip code
export function findRegionByZipCode(zipCode: string): Region | undefined {
  return allRegions.find(region =>
    region.zipCodes?.some(zip => zip.startsWith(zipCode.substring(0, 3)))
  );
}

export function findNearestRegion(lat: number, lng: number): Region {
  let nearest = allRegions[0];
  let minDistance = Infinity;

  for (const region of allRegions) {
    const distance = Math.sqrt(
      Math.pow(region.coordinates.lat - lat, 2) +
      Math.pow(region.coordinates.lng - lng, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = region;
    }
  }

  return nearest;
}
