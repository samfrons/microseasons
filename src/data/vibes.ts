// Tone/Vibe definitions for microseason generation

export interface Vibe {
  id: string;
  name: string;
  description: string;
  emoji: string;
  keywords: string[];
  focusAreas: {
    nature: number; // 0-1 weight
    culture: number;
    weather: number;
    activity: number;
    food: number;
  };
  toneAdjectives: string[];
  colorPalette: string[];
}

export const vibes: Vibe[] = [
  {
    id: 'poetic',
    name: 'Poetic & Contemplative',
    description: 'Lyrical observations of subtle natural changes and introspective moments',
    emoji: '🍃',
    keywords: ['gentle', 'quiet', 'observant', 'reflective', 'delicate', 'whispered'],
    focusAreas: {
      nature: 0.9,
      culture: 0.3,
      weather: 0.7,
      activity: 0.2,
      food: 0.3,
    },
    toneAdjectives: ['gentle', 'soft', 'quiet', 'subtle', 'delicate', 'whispered'],
    colorPalette: ['#f0e6d2', '#d4c4a8', '#a89968', '#7a6f4d'],
  },
  {
    id: 'vibrant',
    name: 'Vibrant & Energetic',
    description: 'Bold celebrations of seasonal changes and dynamic cultural moments',
    emoji: '✨',
    keywords: ['bold', 'lively', 'festive', 'dynamic', 'bright', 'spirited'],
    focusAreas: {
      nature: 0.5,
      culture: 0.9,
      weather: 0.4,
      activity: 0.8,
      food: 0.7,
    },
    toneAdjectives: ['bold', 'vibrant', 'lively', 'spirited', 'dynamic', 'bright'],
    colorPalette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57'],
  },
  {
    id: 'scientific',
    name: 'Scientific & Precise',
    description: 'Detailed observations of meteorological and ecological patterns',
    emoji: '🔬',
    keywords: ['precise', 'detailed', 'measured', 'analytical', 'systematic', 'clear'],
    focusAreas: {
      nature: 0.8,
      culture: 0.2,
      weather: 1.0,
      activity: 0.3,
      food: 0.1,
    },
    toneAdjectives: ['precise', 'measured', 'clear', 'systematic', 'analytical', 'detailed'],
    colorPalette: ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6'],
  },
  {
    id: 'culinary',
    name: 'Culinary & Sensory',
    description: 'Focus on seasonal foods, flavors, and sensory experiences',
    emoji: '🍲',
    keywords: ['flavorful', 'aromatic', 'savory', 'delicious', 'fresh', 'ripe'],
    focusAreas: {
      nature: 0.5,
      culture: 0.6,
      weather: 0.3,
      activity: 0.5,
      food: 1.0,
    },
    toneAdjectives: ['savory', 'aromatic', 'fresh', 'ripe', 'flavorful', 'rich'],
    colorPalette: ['#d4a574', '#8b6f47', '#c17c74', '#e8b298'],
  },
  {
    id: 'urban',
    name: 'Urban & Contemporary',
    description: 'Modern city life rhythms and urban seasonal observations',
    emoji: '🏙️',
    keywords: ['modern', 'cosmopolitan', 'contemporary', 'dynamic', 'diverse', 'connected'],
    focusAreas: {
      nature: 0.4,
      culture: 0.9,
      weather: 0.5,
      activity: 0.8,
      food: 0.6,
    },
    toneAdjectives: ['modern', 'urban', 'contemporary', 'cosmopolitan', 'dynamic', 'connected'],
    colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
  },
  {
    id: 'wellness',
    name: 'Wellness & Mindful',
    description: 'Focus on wellbeing, self-care, and harmonious living with seasons',
    emoji: '🧘',
    keywords: ['balanced', 'harmonious', 'restorative', 'mindful', 'peaceful', 'centered'],
    focusAreas: {
      nature: 0.7,
      culture: 0.4,
      weather: 0.6,
      activity: 0.7,
      food: 0.5,
    },
    toneAdjectives: ['balanced', 'harmonious', 'gentle', 'mindful', 'restorative', 'peaceful'],
    colorPalette: ['#b8e6d5', '#95d5b2', '#74c69d', '#52b788'],
  },
  {
    id: 'adventurous',
    name: 'Adventurous & Outdoorsy',
    description: 'Outdoor activities and adventurous seasonal experiences',
    emoji: '⛰️',
    keywords: ['adventurous', 'bold', 'explorative', 'wild', 'free', 'untamed'],
    focusAreas: {
      nature: 0.9,
      culture: 0.4,
      weather: 0.8,
      activity: 1.0,
      food: 0.3,
    },
    toneAdjectives: ['bold', 'wild', 'free', 'adventurous', 'untamed', 'invigorating'],
    colorPalette: ['#06d6a0', '#118ab2', '#073b4c', '#ef476f'],
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic & Traditional',
    description: 'Heritage, traditions, and timeless seasonal wisdom',
    emoji: '📜',
    keywords: ['timeless', 'traditional', 'heritage', 'ancestral', 'enduring', 'classic'],
    focusAreas: {
      nature: 0.6,
      culture: 1.0,
      weather: 0.5,
      activity: 0.6,
      food: 0.8,
    },
    toneAdjectives: ['timeless', 'traditional', 'ancestral', 'enduring', 'classic', 'cherished'],
    colorPalette: ['#8b4513', '#a0522d', '#cd853f', '#deb887'],
  },
  {
    id: 'whimsical',
    name: 'Whimsical & Playful',
    description: 'Lighthearted and imaginative seasonal observations',
    emoji: '🎨',
    keywords: ['playful', 'imaginative', 'whimsical', 'creative', 'delightful', 'charming'],
    focusAreas: {
      nature: 0.7,
      culture: 0.7,
      weather: 0.4,
      activity: 0.6,
      food: 0.5,
    },
    toneAdjectives: ['playful', 'whimsical', 'delightful', 'charming', 'imaginative', 'lighthearted'],
    colorPalette: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist & Essential',
    description: 'Clean, simple observations of seasonal essentials',
    emoji: '⚪',
    keywords: ['simple', 'essential', 'clean', 'pure', 'minimal', 'focused'],
    focusAreas: {
      nature: 0.8,
      culture: 0.3,
      weather: 0.7,
      activity: 0.4,
      food: 0.2,
    },
    toneAdjectives: ['simple', 'clean', 'pure', 'essential', 'minimal', 'focused'],
    colorPalette: ['#ffffff', '#f5f5f5', '#e0e0e0', '#bdbdbd'],
  },
];

export function getVibeById(id: string): Vibe | undefined {
  return vibes.find(v => v.id === id);
}
