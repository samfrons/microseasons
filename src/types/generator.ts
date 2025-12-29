// Generator Types for Custom Microseasons

export interface LocationData {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  formattedAddress?: string;
}

export type ClimateType =
  | 'tropical'
  | 'arid'
  | 'mediterranean'
  | 'temperate'
  | 'continental'
  | 'polar'
  | 'monsoon';

export type SeasonType =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'wet'
  | 'dry'
  | 'monsoon';

export type Emphasis = 'nature' | 'culture' | 'agriculture' | 'balanced';

export interface GenerationPreferences {
  // Climate
  climateType: ClimateType;
  weatherPatterns: string[];
  seasonTypes: SeasonType[];

  // Culture
  localLanguage: string;
  festivals: string[];
  traditions: string[];

  // Nature
  flora: string[];
  fauna: string[];
  landscapes: string[];

  // Generation options
  emphasis: Emphasis;
  includeHolidays: boolean;
  additionalNotes: string;
}

export interface CustomSeason {
  id: string;
  season_number: number;
  name_local: string;
  name_english: string;
  description: string;
  start_month: number;
  start_day: number;
  end_month: number;
  end_day: number;
  colors: string[];
  imagery: string[];
  solar_term: string | null;
  is_edited: boolean;
}

export interface MicroseasonSet {
  id: string;
  user_id: string;
  location_name: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  title: string;
  description: string | null;
  is_public: boolean;
  share_slug: string | null;
  climate_type: string | null;
  created_at: string;
  updated_at: string;
  seasons?: CustomSeason[];
}

export type WizardStep = 'location' | 'climate' | 'culture' | 'preview' | 'review';

export const WIZARD_STEPS: WizardStep[] = [
  'location',
  'climate',
  'culture',
  'preview',
  'review',
];

export const STEP_TITLES: Record<WizardStep, string> = {
  location: 'Location',
  climate: 'Climate',
  culture: 'Culture',
  preview: 'Generate',
  review: 'Review',
};

// Climate options for the form
export const CLIMATE_OPTIONS: { value: ClimateType; label: string; description: string }[] = [
  { value: 'tropical', label: 'Tropical', description: 'Hot and humid year-round with heavy rainfall' },
  { value: 'arid', label: 'Arid/Desert', description: 'Hot and dry with minimal rainfall' },
  { value: 'mediterranean', label: 'Mediterranean', description: 'Mild, wet winters and hot, dry summers' },
  { value: 'temperate', label: 'Temperate', description: 'Moderate temperatures with four distinct seasons' },
  { value: 'continental', label: 'Continental', description: 'Hot summers, cold winters, variable precipitation' },
  { value: 'monsoon', label: 'Monsoon', description: 'Seasonal heavy rains with distinct wet/dry periods' },
  { value: 'polar', label: 'Polar/Alpine', description: 'Cold year-round with brief summers' },
];

export const SEASON_TYPE_OPTIONS: { value: SeasonType; label: string }[] = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn/Fall' },
  { value: 'winter', label: 'Winter' },
  { value: 'wet', label: 'Wet/Rainy Season' },
  { value: 'dry', label: 'Dry Season' },
  { value: 'monsoon', label: 'Monsoon Season' },
];

export const EMPHASIS_OPTIONS: { value: Emphasis; label: string; description: string }[] = [
  { value: 'balanced', label: 'Balanced', description: 'Equal mix of nature, culture, and agriculture' },
  { value: 'nature', label: 'Nature-focused', description: 'Emphasize flora, fauna, and natural phenomena' },
  { value: 'culture', label: 'Culture-focused', description: 'Emphasize festivals, traditions, and local customs' },
  { value: 'agriculture', label: 'Agriculture-focused', description: 'Emphasize farming cycles and harvest traditions' },
];

// Default preferences
export const DEFAULT_PREFERENCES: GenerationPreferences = {
  climateType: 'temperate',
  weatherPatterns: [],
  seasonTypes: ['spring', 'summer', 'autumn', 'winter'],
  localLanguage: 'English',
  festivals: [],
  traditions: [],
  flora: [],
  fauna: [],
  landscapes: [],
  emphasis: 'balanced',
  includeHolidays: true,
  additionalNotes: '',
};
