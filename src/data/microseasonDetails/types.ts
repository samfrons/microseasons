/**
 * Detailed microseason information for educational deep-dives
 */

export interface MicroseasonDetail {
  id: string;
  name: string;
  japaneseKanji: string;
  japaneseRomaji: string;

  // Timing
  startDate: string; // MM-DD format
  endDate: string;
  solarTerm: string;

  // Core description
  description: string;
  longDescription: string;

  // Cultural and historical context
  history: {
    origin: string;
    evolution: string;
    significance: string;
  };

  // Natural phenomena
  nature: {
    phenomena: string[];
    flora: string[];
    fauna: string[];
    weather: string[];
  };

  // Cultural elements
  culture: {
    traditions: string[];
    activities: string[];
    foods: string[];
    festivals?: string[];
  };

  // Artistic elements
  art: {
    poetry?: string[];
    haiku?: Array<{
      japanese: string;
      romaji: string;
      translation: string;
      author?: string;
    }>;
    paintings?: string[];
    symbolism: string[];
  };

  // Modern interpretation
  modern: {
    relevance: string;
    activities: string[];
    mindfulness: string[];
  };

  // Visual elements
  imagery: {
    colors: string[];
    keywords: string[];
    mood: string;
  };

  // Related microseasons
  related?: string[];
}

export interface MicroseasonCategory {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  solarTerm: string;
  microseasons: MicroseasonDetail[];
}
