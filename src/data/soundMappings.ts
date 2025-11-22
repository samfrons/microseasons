/**
 * Sound mappings for microseasons
 * Maps microseasons to ambient nature sounds
 */

export interface SoundProfile {
  id: string;
  name: string;
  description: string;
  soundUrl: string; // In production, these would be actual audio file URLs
  volume: number; // 0-1
  fadeInDuration: number; // milliseconds
  fadeOutDuration: number; // milliseconds
  loop: boolean;
}

// Sound profiles for different types of microseasons
export const soundProfiles: Record<string, SoundProfile> = {
  // Spring sounds
  springWind: {
    id: 'spring-wind',
    name: 'Spring Wind',
    description: 'Gentle breeze through new leaves',
    soundUrl: '/sounds/spring-wind.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  birds: {
    id: 'birds',
    name: 'Bird Songs',
    description: 'Morning birds chirping',
    soundUrl: '/sounds/birds.mp3',
    volume: 0.4,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  springRain: {
    id: 'spring-rain',
    name: 'Spring Rain',
    description: 'Light rain on fresh soil',
    soundUrl: '/sounds/spring-rain.mp3',
    volume: 0.35,
    fadeInDuration: 4000,
    fadeOutDuration: 3000,
    loop: true,
  },
  stream: {
    id: 'stream',
    name: 'Mountain Stream',
    description: 'Flowing water over rocks',
    soundUrl: '/sounds/stream.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },

  // Summer sounds
  summerWind: {
    id: 'summer-wind',
    name: 'Summer Wind',
    description: 'Warm wind through leaves',
    soundUrl: '/sounds/summer-wind.mp3',
    volume: 0.25,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  cicadas: {
    id: 'cicadas',
    name: 'Cicadas',
    description: 'Summer cicada chorus',
    soundUrl: '/sounds/cicadas.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  summerRain: {
    id: 'summer-rain',
    name: 'Summer Rain',
    description: 'Heavy summer rainfall',
    soundUrl: '/sounds/summer-rain.mp3',
    volume: 0.4,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Gentle waves on shore',
    soundUrl: '/sounds/ocean.mp3',
    volume: 0.35,
    fadeInDuration: 4000,
    fadeOutDuration: 3000,
    loop: true,
  },

  // Autumn sounds
  autumnWind: {
    id: 'autumn-wind',
    name: 'Autumn Wind',
    description: 'Wind rustling dry leaves',
    soundUrl: '/sounds/autumn-wind.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  leaves: {
    id: 'leaves',
    name: 'Falling Leaves',
    description: 'Leaves falling and rustling',
    soundUrl: '/sounds/leaves.mp3',
    volume: 0.25,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  autumnRain: {
    id: 'autumn-rain',
    name: 'Autumn Rain',
    description: 'Steady rainfall on fallen leaves',
    soundUrl: '/sounds/autumn-rain.mp3',
    volume: 0.35,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  crickets: {
    id: 'crickets',
    name: 'Evening Crickets',
    description: 'Cricket songs at dusk',
    soundUrl: '/sounds/crickets.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },

  // Winter sounds
  winterWind: {
    id: 'winter-wind',
    name: 'Winter Wind',
    description: 'Cold wind through bare branches',
    soundUrl: '/sounds/winter-wind.mp3',
    volume: 0.25,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  snow: {
    id: 'snow',
    name: 'Falling Snow',
    description: 'Soft sound of snowfall',
    soundUrl: '/sounds/snow.mp3',
    volume: 0.2,
    fadeInDuration: 4000,
    fadeOutDuration: 3000,
    loop: true,
  },
  fire: {
    id: 'fire',
    name: 'Crackling Fire',
    description: 'Warm fireplace crackling',
    soundUrl: '/sounds/fire.mp3',
    volume: 0.3,
    fadeInDuration: 3000,
    fadeOutDuration: 2000,
    loop: true,
  },
  silence: {
    id: 'silence',
    name: 'Winter Silence',
    description: 'Peaceful winter stillness',
    soundUrl: '/sounds/silence.mp3',
    volume: 0.1,
    fadeInDuration: 5000,
    fadeOutDuration: 5000,
    loop: true,
  },
};

/**
 * Map microseason keywords to sound profiles
 */
export function getSoundForMicroseason(microseasonName: string): SoundProfile | null {
  const name = microseasonName.toLowerCase();

  // Spring mappings
  if (name.includes('wind') && (name.includes('thaw') || name.includes('east'))) {
    return soundProfiles.springWind;
  }
  if (name.includes('warbler') || name.includes('bird') || name.includes('geese')) {
    return soundProfiles.birds;
  }
  if (name.includes('rain') && (name.includes('spring') || name.includes('moisten'))) {
    return soundProfiles.springRain;
  }
  if (name.includes('stream') || name.includes('water') || name.includes('melt')) {
    return soundProfiles.stream;
  }

  // Summer mappings
  if (name.includes('cicada')) {
    return soundProfiles.cicadas;
  }
  if (name.includes('rain') && name.includes('summer')) {
    return soundProfiles.summerRain;
  }
  if (name.includes('ocean') || name.includes('wave')) {
    return soundProfiles.ocean;
  }
  if (name.includes('wind') && name.includes('summer')) {
    return soundProfiles.summerWind;
  }

  // Autumn mappings
  if (name.includes('leaves') || name.includes('autumn') || name.includes('fall')) {
    return soundProfiles.leaves;
  }
  if (name.includes('cricket')) {
    return soundProfiles.crickets;
  }
  if (name.includes('rain') && (name.includes('autumn') || name.includes('fall'))) {
    return soundProfiles.autumnRain;
  }
  if (name.includes('wind') && (name.includes('autumn') || name.includes('fall'))) {
    return soundProfiles.autumnWind;
  }

  // Winter mappings
  if (name.includes('snow') || name.includes('ice') || name.includes('frost')) {
    return soundProfiles.snow;
  }
  if (name.includes('wind') && name.includes('winter')) {
    return soundProfiles.winterWind;
  }
  if (name.includes('fire') || name.includes('hearth')) {
    return soundProfiles.fire;
  }

  // Default seasonal sounds based on month
  // This is a fallback - you'd improve this based on actual microseason dates
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 2 && currentMonth <= 4) return soundProfiles.springWind;
  if (currentMonth >= 5 && currentMonth <= 7) return soundProfiles.summerWind;
  if (currentMonth >= 8 && currentMonth <= 10) return soundProfiles.autumnWind;
  return soundProfiles.winterWind;
}

/**
 * Get all available sounds
 */
export function getAllSounds(): SoundProfile[] {
  return Object.values(soundProfiles);
}

/**
 * Get sounds by season
 */
export function getSoundsBySeason(season: 'spring' | 'summer' | 'autumn' | 'winter'): SoundProfile[] {
  const seasonMap = {
    spring: ['spring-wind', 'birds', 'spring-rain', 'stream'],
    summer: ['summer-wind', 'cicadas', 'summer-rain', 'ocean'],
    autumn: ['autumn-wind', 'leaves', 'autumn-rain', 'crickets'],
    winter: ['winter-wind', 'snow', 'fire', 'silence'],
  };

  return seasonMap[season].map(id => soundProfiles[id]).filter(Boolean);
}
