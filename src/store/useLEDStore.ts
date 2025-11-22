import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LEDColor = 'off' | 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'pink';

export interface LEDDay {
  year: number;
  month: number;
  day: number;
  color: LEDColor;
  note?: string;
}

export interface LEDStats {
  totalDaysMarked: number;
  currentStreak: number;
  longestStreak: number;
  colorCounts: Record<LEDColor, number>;
}

interface LEDState {
  // LED data - keyed by 'YYYY-MM-DD' format
  leds: Record<string, LEDDay>;

  // Active color for marking
  activeColor: LEDColor;

  // Tracking categories
  categories: {
    [key: string]: {
      name: string;
      color: LEDColor;
      description: string;
    };
  };

  // Actions
  toggleLED: (year: number, month: number, day: number) => void;
  setLEDColor: (year: number, month: number, day: number, color: LEDColor) => void;
  removeLED: (year: number, month: number, day: number) => void;
  setActiveColor: (color: LEDColor) => void;
  addCategory: (id: string, name: string, color: LEDColor, description: string) => void;
  removeCategory: (id: string) => void;
  clearAllLEDs: () => void;
  getLEDForDate: (year: number, month: number, day: number) => LEDDay | null;
  getStats: () => LEDStats;
  exportData: () => string;
  importData: (data: string) => void;
}

const getDayKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const parseDayKey = (key: string): { year: number; month: number; day: number } | null => {
  const parts = key.split('-');
  if (parts.length !== 3) return null;

  return {
    year: parseInt(parts[0]),
    month: parseInt(parts[1]),
    day: parseInt(parts[2]),
  };
};

export const useLEDStore = create<LEDState>()(
  persist(
    (set, get) => ({
      leds: {},
      activeColor: 'green',
      categories: {
        exercise: {
          name: 'Exercise',
          color: 'green',
          description: 'Physical activity or workout',
        },
        meditation: {
          name: 'Meditation',
          color: 'blue',
          description: 'Meditation or mindfulness practice',
        },
        creative: {
          name: 'Creative Work',
          color: 'purple',
          description: 'Creative projects or art',
        },
        learning: {
          name: 'Learning',
          color: 'amber',
          description: 'Study or learning new skills',
        },
        social: {
          name: 'Social',
          color: 'pink',
          description: 'Social connections or relationships',
        },
        important: {
          name: 'Important Event',
          color: 'red',
          description: 'Significant events or milestones',
        },
      },

      toggleLED: (year, month, day) => {
        const key = getDayKey(year, month, day);
        const { leds, activeColor } = get();

        set({
          leds: {
            ...leds,
            [key]: leds[key]
              ? { ...leds[key], color: leds[key].color === 'off' ? activeColor : 'off' }
              : { year, month, day, color: activeColor },
          },
        });
      },

      setLEDColor: (year, month, day, color) => {
        const key = getDayKey(year, month, day);
        const { leds } = get();

        set({
          leds: {
            ...leds,
            [key]: { year, month, day, color },
          },
        });
      },

      removeLED: (year, month, day) => {
        const key = getDayKey(year, month, day);
        const { leds } = get();

        const newLeds = { ...leds };
        delete newLeds[key];

        set({ leds: newLeds });
      },

      setActiveColor: (activeColor) => set({ activeColor }),

      addCategory: (id, name, color, description) => {
        const { categories } = get();
        set({
          categories: {
            ...categories,
            [id]: { name, color, description },
          },
        });
      },

      removeCategory: (id) => {
        const { categories } = get();
        const newCategories = { ...categories };
        delete newCategories[id];
        set({ categories: newCategories });
      },

      clearAllLEDs: () => set({ leds: {} }),

      getLEDForDate: (year, month, day) => {
        const key = getDayKey(year, month, day);
        return get().leds[key] || null;
      },

      getStats: () => {
        const { leds } = get();
        const ledArray = Object.values(leds).filter(led => led.color !== 'off');

        // Total days marked
        const totalDaysMarked = ledArray.length;

        // Color counts
        const colorCounts: Record<LEDColor, number> = {
          off: 0,
          green: 0,
          blue: 0,
          amber: 0,
          red: 0,
          purple: 0,
          pink: 0,
        };

        ledArray.forEach(led => {
          colorCounts[led.color]++;
        });

        // Calculate streaks
        const sortedLeds = ledArray
          .sort((a, b) => {
            const dateA = new Date(a.year, a.month - 1, a.day);
            const dateB = new Date(b.year, b.month - 1, b.day);
            return dateA.getTime() - dateB.getTime();
          });

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        let lastDate: Date | null = null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const led of sortedLeds) {
          const ledDate = new Date(led.year, led.month - 1, led.day);
          ledDate.setHours(0, 0, 0, 0);

          if (lastDate) {
            const dayDiff = Math.floor(
              (ledDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (dayDiff === 1) {
              tempStreak++;
            } else {
              longestStreak = Math.max(longestStreak, tempStreak);
              tempStreak = 1;
            }
          } else {
            tempStreak = 1;
          }

          // Check if this contributes to current streak
          const daysAgo = Math.floor(
            (today.getTime() - ledDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysAgo === 0 || daysAgo === 1) {
            currentStreak = tempStreak;
          }

          lastDate = ledDate;
        }

        longestStreak = Math.max(longestStreak, tempStreak);

        return {
          totalDaysMarked,
          currentStreak,
          longestStreak,
          colorCounts,
        };
      },

      exportData: () => {
        const { leds, categories } = get();
        return JSON.stringify({ leds, categories }, null, 2);
      },

      importData: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.leds && parsed.categories) {
            set({ leds: parsed.leds, categories: parsed.categories });
          }
        } catch (e) {
          console.error('Failed to import LED data:', e);
        }
      },
    }),
    {
      name: 'microseasons-led-storage',
    }
  )
);
