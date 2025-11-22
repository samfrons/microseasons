import { Region } from '@/data/regionalData';
import { Vibe } from '@/data/vibes';
import { Microseason } from '@/data/microseasons';

interface SeasonTemplate {
  baseNameEn: string;
  month: number;
  dayStart: number;
  dayEnd: number;
  season: string;
}

// Season templates (72 periods throughout the year)
const seasonTemplates: SeasonTemplate[] = [
  // Winter (Dec-Feb)
  { baseNameEn: 'Winter begins', month: 12, dayStart: 7, dayEnd: 11, season: 'winter' },
  { baseNameEn: 'Frost settles', month: 12, dayStart: 12, dayEnd: 16, season: 'winter' },
  { baseNameEn: 'First ice forms', month: 12, dayStart: 17, dayEnd: 21, season: 'winter' },
  { baseNameEn: 'Winter solstice', month: 12, dayStart: 22, dayEnd: 26, season: 'winter' },
  { baseNameEn: 'Cold deepens', month: 12, dayStart: 27, dayEnd: 31, season: 'winter' },

  { baseNameEn: 'New year dawns', month: 1, dayStart: 1, dayEnd: 5, season: 'winter' },
  { baseNameEn: 'Deep freeze', month: 1, dayStart: 6, dayEnd: 10, season: 'winter' },
  { baseNameEn: 'Ice thickens', month: 1, dayStart: 11, dayEnd: 15, season: 'winter' },
  { baseNameEn: 'Winter\'s heart', month: 1, dayStart: 16, dayEnd: 20, season: 'winter' },
  { baseNameEn: 'First thaw hints', month: 1, dayStart: 21, dayEnd: 25, season: 'winter' },
  { baseNameEn: 'Ice begins to crack', month: 1, dayStart: 26, dayEnd: 31, season: 'winter' },

  { baseNameEn: 'Early February chill', month: 2, dayStart: 1, dayEnd: 5, season: 'winter' },
  { baseNameEn: 'Ice melts slightly', month: 2, dayStart: 6, dayEnd: 10, season: 'winter' },
  { baseNameEn: 'Late winter stillness', month: 2, dayStart: 11, dayEnd: 15, season: 'winter' },
  { baseNameEn: 'First buds swell', month: 2, dayStart: 16, dayEnd: 20, season: 'winter' },
  { baseNameEn: 'Winter loosens grip', month: 2, dayStart: 21, dayEnd: 28, season: 'winter' },

  // Spring (Mar-May)
  { baseNameEn: 'Early spring', month: 3, dayStart: 1, dayEnd: 5, season: 'spring' },
  { baseNameEn: 'First flowers bloom', month: 3, dayStart: 6, dayEnd: 10, season: 'spring' },
  { baseNameEn: 'Sap rises', month: 3, dayStart: 11, dayEnd: 15, season: 'spring' },
  { baseNameEn: 'Spring rains begin', month: 3, dayStart: 16, dayEnd: 20, season: 'spring' },
  { baseNameEn: 'Spring equinox', month: 3, dayStart: 21, dayEnd: 25, season: 'spring' },
  { baseNameEn: 'Cherry blossoms appear', month: 3, dayStart: 26, dayEnd: 31, season: 'spring' },

  { baseNameEn: 'April showers', month: 4, dayStart: 1, dayEnd: 5, season: 'spring' },
  { baseNameEn: 'Trees leaf out', month: 4, dayStart: 6, dayEnd: 10, season: 'spring' },
  { baseNameEn: 'Birds return', month: 4, dayStart: 11, dayEnd: 15, season: 'spring' },
  { baseNameEn: 'Grass greens', month: 4, dayStart: 16, dayEnd: 20, season: 'spring' },
  { baseNameEn: 'Late spring blooms', month: 4, dayStart: 21, dayEnd: 25, season: 'spring' },
  { baseNameEn: 'Spring peaks', month: 4, dayStart: 26, dayEnd: 30, season: 'spring' },

  { baseNameEn: 'May flowers', month: 5, dayStart: 1, dayEnd: 5, season: 'spring' },
  { baseNameEn: 'Gardens flourish', month: 5, dayStart: 6, dayEnd: 10, season: 'spring' },
  { baseNameEn: 'Warmth increases', month: 5, dayStart: 11, dayEnd: 15, season: 'spring' },
  { baseNameEn: 'Late spring', month: 5, dayStart: 16, dayEnd: 20, season: 'spring' },
  { baseNameEn: 'Summer approaches', month: 5, dayStart: 21, dayEnd: 25, season: 'spring' },
  { baseNameEn: 'Spring ends', month: 5, dayStart: 26, dayEnd: 31, season: 'spring' },

  // Summer (Jun-Aug)
  { baseNameEn: 'Early summer', month: 6, dayStart: 1, dayEnd: 5, season: 'summer' },
  { baseNameEn: 'Days lengthen', month: 6, dayStart: 6, dayEnd: 10, season: 'summer' },
  { baseNameEn: 'Heat builds', month: 6, dayStart: 11, dayEnd: 15, season: 'summer' },
  { baseNameEn: 'Summer solstice', month: 6, dayStart: 16, dayEnd: 20, season: 'summer' },
  { baseNameEn: 'Longest days', month: 6, dayStart: 21, dayEnd: 25, season: 'summer' },
  { baseNameEn: 'Midsummer', month: 6, dayStart: 26, dayEnd: 30, season: 'summer' },

  { baseNameEn: 'July heat', month: 7, dayStart: 1, dayEnd: 5, season: 'summer' },
  { baseNameEn: 'Summer peaks', month: 7, dayStart: 6, dayEnd: 10, season: 'summer' },
  { baseNameEn: 'Dog days begin', month: 7, dayStart: 11, dayEnd: 15, season: 'summer' },
  { baseNameEn: 'Hot winds blow', month: 7, dayStart: 16, dayEnd: 20, season: 'summer' },
  { baseNameEn: 'High summer', month: 7, dayStart: 21, dayEnd: 25, season: 'summer' },
  { baseNameEn: 'First harvest', month: 7, dayStart: 26, dayEnd: 31, season: 'summer' },

  { baseNameEn: 'Late summer heat', month: 8, dayStart: 1, dayEnd: 5, season: 'summer' },
  { baseNameEn: 'Summer storms', month: 8, dayStart: 6, dayEnd: 10, season: 'summer' },
  { baseNameEn: 'Crickets sing', month: 8, dayStart: 11, dayEnd: 15, season: 'summer' },
  { baseNameEn: 'Cool mornings', month: 8, dayStart: 16, dayEnd: 20, season: 'summer' },
  { baseNameEn: 'Summer fades', month: 8, dayStart: 21, dayEnd: 25, season: 'summer' },
  { baseNameEn: 'Autumn hints', month: 8, dayStart: 26, dayEnd: 31, season: 'summer' },

  // Autumn (Sep-Nov)
  { baseNameEn: 'Early autumn', month: 9, dayStart: 1, dayEnd: 5, season: 'autumn' },
  { baseNameEn: 'Harvest time', month: 9, dayStart: 6, dayEnd: 10, season: 'autumn' },
  { baseNameEn: 'Leaves turn', month: 9, dayStart: 11, dayEnd: 15, season: 'autumn' },
  { baseNameEn: 'Cool air arrives', month: 9, dayStart: 16, dayEnd: 20, season: 'autumn' },
  { baseNameEn: 'Autumn equinox', month: 9, dayStart: 21, dayEnd: 25, season: 'autumn' },
  { baseNameEn: 'Colors deepen', month: 9, dayStart: 26, dayEnd: 30, season: 'autumn' },

  { baseNameEn: 'October chill', month: 10, dayStart: 1, dayEnd: 5, season: 'autumn' },
  { baseNameEn: 'Leaves fall', month: 10, dayStart: 6, dayEnd: 10, season: 'autumn' },
  { baseNameEn: 'First frost', month: 10, dayStart: 11, dayEnd: 15, season: 'autumn' },
  { baseNameEn: 'Harvest moon', month: 10, dayStart: 16, dayEnd: 20, season: 'autumn' },
  { baseNameEn: 'Late autumn', month: 10, dayStart: 21, dayEnd: 25, season: 'autumn' },
  { baseNameEn: 'Trees bare', month: 10, dayStart: 26, dayEnd: 31, season: 'autumn' },

  { baseNameEn: 'Early November', month: 11, dayStart: 1, dayEnd: 5, season: 'autumn' },
  { baseNameEn: 'Cold strengthens', month: 11, dayStart: 6, dayEnd: 10, season: 'autumn' },
  { baseNameEn: 'First snow flurries', month: 11, dayStart: 11, dayEnd: 15, season: 'autumn' },
  { baseNameEn: 'Winter approaches', month: 11, dayStart: 16, dayEnd: 20, season: 'autumn' },
  { baseNameEn: 'Late autumn', month: 11, dayStart: 21, dayEnd: 25, season: 'autumn' },
  { baseNameEn: 'Autumn ends', month: 11, dayStart: 26, dayEnd: 30, season: 'autumn' },

  // Early Winter (Dec)
  { baseNameEn: 'December begins', month: 12, dayStart: 1, dayEnd: 6, season: 'winter' },
];

// Generate microseason name based on region, vibe, and template
function generateMicroseasonName(
  template: SeasonTemplate,
  region: Region,
  vibe: Vibe
): { nameEn: string; nameLocal: string; description: string; imagery: string[]; colors: string[] } {
  const { season } = template;
  const { climate, culture } = region;
  const focusAreas = vibe.focusAreas;

  // Determine what to focus on based on vibe weights
  const primaryFocus = Object.entries(focusAreas).sort((a, b) => b[1] - a[1])[0][0];

  let nameEn = template.baseNameEn;
  let description = '';
  const imagery: string[] = [];

  // Customize based on primary focus
  if (primaryFocus === 'nature' && focusAreas.nature > 0.6) {
    // Nature-focused customization
    const seasonFlora = culture.flora.slice(0, 2);
    const seasonFauna = culture.fauna.slice(0, 1);

    if (season === 'spring') {
      nameEn = seasonFlora[0] ? `${seasonFlora[0]} blooms` : template.baseNameEn;
      description = `The ${vibe.toneAdjectives[0]} arrival of ${seasonFlora.join(' and ')} marks this period`;
      imagery.push(...seasonFlora, ...seasonFauna);
    } else if (season === 'winter' && climate.snowfall) {
      nameEn = `Snow ${vibe.toneAdjectives[2]}s the ${culture.naturalFeatures[0] || 'landscape'}`;
      description = `${vibe.toneAdjectives[1]} snowfall transforms the ${culture.naturalFeatures[0]}`;
      imagery.push('snow', 'ice', culture.naturalFeatures[0]);
    }
  } else if (primaryFocus === 'culture' && focusAreas.culture > 0.6) {
    // Culture-focused customization
    const relevantFestival = culture.festivals.find(f => {
      const fLower = f.toLowerCase();
      if (season === 'winter') return fLower.includes('christmas') || fLower.includes('new year');
      if (season === 'spring') return fLower.includes('spring') || fLower.includes('easter');
      if (season === 'summer') return fLower.includes('summer') || fLower.includes('festival');
      if (season === 'autumn') return fLower.includes('harvest') || fLower.includes('autumn');
      return false;
    });

    if (relevantFestival) {
      nameEn = `${relevantFestival} ${vibe.toneAdjectives[3]}s`;
      description = `The ${vibe.toneAdjectives[0]} celebration of ${relevantFestival}`;
      imagery.push(relevantFestival, ...culture.culturalActivities.slice(0, 2));
    }
  } else if (primaryFocus === 'food' && focusAreas.food > 0.6) {
    // Food-focused customization
    const seasonalFood = culture.foodTraditions[template.month % culture.foodTraditions.length];
    nameEn = `${seasonalFood} season`;
    description = `The ${vibe.toneAdjectives[4]} flavors of ${seasonalFood} define this time`;
    imagery.push(seasonalFood, ...culture.foodTraditions.slice(0, 2));
  } else if (primaryFocus === 'activity' && focusAreas.activity > 0.6) {
    // Activity-focused customization
    const activity = culture.culturalActivities[template.month % culture.culturalActivities.length];
    nameEn = `${activity} ${vibe.toneAdjectives[5]} begins`;
    description = `The ${vibe.toneAdjectives[2]} season for ${activity}`;
    imagery.push(activity, ...culture.culturalActivities.slice(0, 2));
  } else if (primaryFocus === 'weather' && focusAreas.weather > 0.8) {
    // Weather-focused customization
    const [minTemp, maxTemp] = climate.temperatureRange[season as keyof typeof climate.temperatureRange];
    const precipitation = climate.precipitation[season as keyof typeof climate.precipitation];

    if (precipitation === 'high') {
      nameEn = `${vibe.toneAdjectives[0]} rains ${season === 'spring' ? 'nourish' : 'fall'}`;
      description = `Precipitation averages ${precipitation} with temperatures ${minTemp}°C to ${maxTemp}°C`;
    } else {
      nameEn = `${vibe.toneAdjectives[1]} ${season} weather`;
      description = `${vibe.toneAdjectives[3]} conditions: ${minTemp}°C to ${maxTemp}°C, ${precipitation} precipitation`;
    }
    imagery.push('weather', season, climate.humidity);
  }

  // Fallback to template base name if nothing was generated
  if (!description) {
    description = `A ${vibe.toneAdjectives[0]} ${season} period in ${region.name}`;
    imagery.push(season, ...culture.naturalFeatures.slice(0, 2));
  }

  // Generate local name (simplified - in production, would use actual translation)
  const nameLocal = nameEn;

  // Use vibe color palette
  const colors = vibe.colorPalette.slice(0, 3);

  return {
    nameEn,
    nameLocal,
    description,
    imagery: imagery.slice(0, 3),
    colors,
  };
}

export function generateMicroseasons(region: Region, vibe: Vibe): Microseason[] {
  return seasonTemplates.map((template, index) => {
    const generated = generateMicroseasonName(template, region, vibe);

    return {
      id: index + 1,
      nameEn: generated.nameEn,
      nameJa: generated.nameLocal, // Using nameLocal for consistency with existing structure
      description: generated.description,
      startDate: {
        month: template.month,
        day: template.dayStart,
      },
      endDate: {
        month: template.month === 2 && template.dayEnd > 28 ? template.month : template.month,
        day: template.month === 2 && template.dayEnd > 28 ? 28 : template.dayEnd,
      },
      solarTerm: template.season.charAt(0).toUpperCase() + template.season.slice(1),
      imagery: generated.imagery,
      colors: generated.colors,
    };
  });
}

// Helper to generate a preview microseason for testing
export function generatePreviewMicroseason(region: Region, vibe: Vibe): Microseason {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Find closest template
  const template = seasonTemplates.find(
    t => t.month === month && day >= t.dayStart && day <= t.dayEnd
  ) || seasonTemplates[0];

  const generated = generateMicroseasonName(template, region, vibe);

  return {
    id: 1,
    nameEn: generated.nameEn,
    nameJa: generated.nameLocal,
    description: generated.description,
    startDate: {
      month: template.month,
      day: template.dayStart,
    },
    endDate: {
      month: template.month,
      day: template.dayEnd,
    },
    solarTerm: template.season.charAt(0).toUpperCase() + template.season.slice(1),
    imagery: generated.imagery,
    colors: generated.colors,
  };
}
