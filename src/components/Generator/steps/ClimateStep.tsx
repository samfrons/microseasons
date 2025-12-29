'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import {
  CLIMATE_OPTIONS,
  SEASON_TYPE_OPTIONS,
  type ClimateType,
  type SeasonType,
} from '@/types/generator';

interface ClimateStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function ClimateStep({ onNext, onBack }: ClimateStepProps) {
  const { preferences, updatePreference, markStepComplete, locationData } = useGeneratorStore();
  const [weatherInput, setWeatherInput] = useState('');

  const handleClimateSelect = (climate: ClimateType) => {
    updatePreference('climateType', climate);
  };

  const toggleSeasonType = (season: SeasonType) => {
    const current = preferences.seasonTypes;
    if (current.includes(season)) {
      updatePreference(
        'seasonTypes',
        current.filter((s) => s !== season)
      );
    } else {
      updatePreference('seasonTypes', [...current, season]);
    }
  };

  const addWeatherPattern = () => {
    if (weatherInput.trim() && !preferences.weatherPatterns.includes(weatherInput.trim())) {
      updatePreference('weatherPatterns', [...preferences.weatherPatterns, weatherInput.trim()]);
      setWeatherInput('');
    }
  };

  const removeWeatherPattern = (pattern: string) => {
    updatePreference(
      'weatherPatterns',
      preferences.weatherPatterns.filter((p) => p !== pattern)
    );
  };

  const handleContinue = () => {
    markStepComplete('climate');
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-mono uppercase tracking-wider"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            color: 'var(--color-textSecondary)',
          }}
        >
          <span>Step 2</span>
          <span style={{ color: 'var(--color-accent)' }}>·</span>
          <span>Climate</span>
        </div>

        <h2
          className="text-3xl font-serif mb-3"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          Describe your climate
        </h2>
        <p style={{ color: 'var(--color-textSecondary)' }}>
          Help us understand the weather patterns in{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            {locationData?.city || 'your location'}
          </span>
        </p>
      </div>

      {/* Climate Type Selection */}
      <div className="mb-10">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-4"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Climate Type
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CLIMATE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleClimateSelect(option.value)}
              className="p-4 border text-left transition-all duration-300"
              style={{
                backgroundColor:
                  preferences.climateType === option.value
                    ? 'var(--color-accent)'
                    : 'var(--color-bgSecondary)',
                borderColor:
                  preferences.climateType === option.value
                    ? 'var(--color-accent)'
                    : 'var(--color-border)',
                color:
                  preferences.climateType === option.value
                    ? 'white'
                    : 'var(--color-textPrimary)',
              }}
            >
              <div className="font-medium mb-1">{option.label}</div>
              <div
                className="text-xs"
                style={{
                  color:
                    preferences.climateType === option.value
                      ? 'rgba(255,255,255,0.8)'
                      : 'var(--color-textSecondary)',
                }}
              >
                {option.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Season Types */}
      <div className="mb-10">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-4"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Seasons You Experience
        </label>

        <div className="flex flex-wrap gap-2">
          {SEASON_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleSeasonType(option.value)}
              className="px-4 py-2 text-sm border transition-all duration-300"
              style={{
                backgroundColor: preferences.seasonTypes.includes(option.value)
                  ? 'var(--color-accent)'
                  : 'transparent',
                borderColor: preferences.seasonTypes.includes(option.value)
                  ? 'var(--color-accent)'
                  : 'var(--color-border)',
                color: preferences.seasonTypes.includes(option.value)
                  ? 'white'
                  : 'var(--color-textSecondary)',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notable Weather Patterns */}
      <div className="mb-10">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-4"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Notable Weather Patterns (Optional)
        </label>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={weatherInput}
            onChange={(e) => setWeatherInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addWeatherPattern()}
            placeholder="e.g., Santa Ana winds, lake effect snow, fog season"
            className="flex-1 px-4 py-3 text-sm border transition-colors focus:outline-none"
            style={{
              backgroundColor: 'var(--color-bgSecondary)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-textPrimary)',
            }}
          />
          <button
            onClick={addWeatherPattern}
            className="px-4 py-2 text-sm border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-textSecondary)',
            }}
          >
            Add
          </button>
        </div>

        {preferences.weatherPatterns.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {preferences.weatherPatterns.map((pattern) => (
              <span
                key={pattern}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm"
                style={{
                  backgroundColor: 'var(--color-bgSecondary)',
                  color: 'var(--color-textPrimary)',
                }}
              >
                {pattern}
                <button
                  onClick={() => removeWeatherPattern(pattern)}
                  className="hover:opacity-70"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M10 4L4 10M4 4l6 6" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-sm transition-colors"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
          Back
        </button>

        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'white',
          }}
        >
          Continue
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
