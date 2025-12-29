import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  LocationData,
  GenerationPreferences,
  CustomSeason,
  WizardStep,
  DEFAULT_PREFERENCES,
} from '@/types/generator';

interface GeneratorState {
  // Wizard navigation
  currentStep: WizardStep;
  completedSteps: WizardStep[];

  // Form data
  locationData: LocationData | null;
  preferences: GenerationPreferences;

  // Generation state
  isGenerating: boolean;
  generationProgress: number;
  generationStatus: string;
  generatedSeasons: CustomSeason[];
  currentSetId: string | null;

  // Error state
  error: string | null;

  // Actions - Navigation
  setCurrentStep: (step: WizardStep) => void;
  markStepComplete: (step: WizardStep) => void;
  canNavigateToStep: (step: WizardStep) => boolean;

  // Actions - Form data
  setLocationData: (data: LocationData | null) => void;
  setPreferences: (prefs: Partial<GenerationPreferences>) => void;
  updatePreference: <K extends keyof GenerationPreferences>(
    key: K,
    value: GenerationPreferences[K]
  ) => void;

  // Actions - Generation
  setIsGenerating: (generating: boolean) => void;
  setGenerationProgress: (progress: number) => void;
  setGenerationStatus: (status: string) => void;
  setGeneratedSeasons: (seasons: CustomSeason[]) => void;
  addGeneratedSeason: (season: CustomSeason) => void;
  updateSeason: (seasonNumber: number, updates: Partial<CustomSeason>) => void;
  setCurrentSetId: (id: string | null) => void;

  // Actions - Error
  setError: (error: string | null) => void;

  // Actions - Reset
  reset: () => void;
  resetGeneration: () => void;
}

const defaultPreferences: GenerationPreferences = {
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

const initialState = {
  currentStep: 'location' as WizardStep,
  completedSteps: [] as WizardStep[],
  locationData: null,
  preferences: defaultPreferences,
  isGenerating: false,
  generationProgress: 0,
  generationStatus: '',
  generatedSeasons: [],
  currentSetId: null,
  error: null,
};

export const useGeneratorStore = create<GeneratorState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      setCurrentStep: (step) => set({ currentStep: step }),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      canNavigateToStep: (step) => {
        const { completedSteps, currentStep, locationData } = get();
        const steps: WizardStep[] = ['location', 'climate', 'culture', 'preview', 'review'];
        const targetIndex = steps.indexOf(step);
        const currentIndex = steps.indexOf(currentStep);

        // Can always go back
        if (targetIndex <= currentIndex) return true;

        // Must complete location first
        if (!locationData && step !== 'location') return false;

        // Check if all previous steps are complete
        for (let i = 0; i < targetIndex; i++) {
          if (!completedSteps.includes(steps[i])) return false;
        }

        return true;
      },

      // Form data
      setLocationData: (data) => set({ locationData: data }),

      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),

      updatePreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),

      // Generation
      setIsGenerating: (isGenerating) => set({ isGenerating }),

      setGenerationProgress: (generationProgress) => set({ generationProgress }),

      setGenerationStatus: (generationStatus) => set({ generationStatus }),

      setGeneratedSeasons: (generatedSeasons) => set({ generatedSeasons }),

      addGeneratedSeason: (season) =>
        set((state) => ({
          generatedSeasons: [...state.generatedSeasons, season],
          generationProgress: Math.round((state.generatedSeasons.length + 1) / 72 * 100),
        })),

      updateSeason: (seasonNumber, updates) =>
        set((state) => ({
          generatedSeasons: state.generatedSeasons.map((s) =>
            s.season_number === seasonNumber
              ? { ...s, ...updates, is_edited: true }
              : s
          ),
        })),

      setCurrentSetId: (id) => set({ currentSetId: id }),

      // Error
      setError: (error) => set({ error }),

      // Reset
      reset: () => set(initialState),

      resetGeneration: () =>
        set({
          isGenerating: false,
          generationProgress: 0,
          generationStatus: '',
          generatedSeasons: [],
          currentSetId: null,
          error: null,
        }),
    }),
    {
      name: 'microseasons-generator',
      partialize: (state) => ({
        locationData: state.locationData,
        preferences: state.preferences,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
      }),
    }
  )
);
