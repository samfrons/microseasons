'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { EMPHASIS_OPTIONS, type Emphasis } from '@/types/generator';

interface CultureStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  suggestions?: string[];
}

function TagInput({ label, placeholder, tags, onAdd, onRemove, suggestions }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="mb-6">
      <label
        className="block text-xs font-mono uppercase tracking-wider mb-3"
        style={{ color: 'var(--color-textSecondary)' }}
      >
        {label}
      </label>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-sm border transition-colors focus:outline-none"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-textPrimary)',
          }}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-sm border transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-textSecondary)',
          }}
        >
          Add
        </button>
      </div>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && tags.length === 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {suggestions.slice(0, 5).map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onAdd(suggestion)}
              className="px-2 py-1 text-xs border transition-colors"
              style={{
                borderColor: 'var(--color-borderSubtle)',
                color: 'var(--color-textSecondary)',
              }}
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-sm"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
                color: 'var(--color-textPrimary)',
              }}
            >
              {tag}
              <button onClick={() => onRemove(tag)} className="hover:opacity-70">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 3L3 9M3 3l6 6" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function CultureStep({ onNext, onBack }: CultureStepProps) {
  const { preferences, updatePreference, markStepComplete, locationData } = useGeneratorStore();

  const handleEmphasisSelect = (emphasis: Emphasis) => {
    updatePreference('emphasis', emphasis);
  };

  const handleContinue = () => {
    markStepComplete('culture');
    onNext();
  };

  // Suggestions based on common entries
  const festivalSuggestions = [
    'New Year',
    'Harvest Festival',
    'Spring Festival',
    'Mid-Autumn',
    'Independence Day',
  ];
  const floraSuggestions = [
    'Cherry Blossoms',
    'Maple Trees',
    'Wildflowers',
    'Pine Trees',
    'Rice Paddies',
  ];
  const faunaSuggestions = [
    'Migratory Birds',
    'Deer',
    'Butterflies',
    'Fireflies',
    'Salmon',
  ];

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
          <span>Step 3</span>
          <span style={{ color: 'var(--color-accent)' }}>·</span>
          <span>Culture & Nature</span>
        </div>

        <h2
          className="text-3xl font-serif mb-3"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          Tell us about your traditions
        </h2>
        <p style={{ color: 'var(--color-textSecondary)' }}>
          What makes{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            {locationData?.city || 'your location'}
          </span>{' '}
          unique?
        </p>
      </div>

      {/* Language */}
      <div className="mb-8">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-3"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Primary Language for Season Names
        </label>
        <input
          type="text"
          value={preferences.localLanguage}
          onChange={(e) => updatePreference('localLanguage', e.target.value)}
          placeholder="e.g., English, Japanese, Spanish"
          className="w-full max-w-md px-4 py-3 text-sm border transition-colors focus:outline-none"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-textPrimary)',
          }}
        />
      </div>

      {/* Festivals */}
      <TagInput
        label="Local Festivals & Holidays"
        placeholder="e.g., Cherry Blossom Festival, Thanksgiving"
        tags={preferences.festivals}
        onAdd={(tag) => updatePreference('festivals', [...preferences.festivals, tag])}
        onRemove={(tag) =>
          updatePreference(
            'festivals',
            preferences.festivals.filter((f) => f !== tag)
          )
        }
        suggestions={festivalSuggestions}
      />

      {/* Flora */}
      <TagInput
        label="Notable Plants & Trees"
        placeholder="e.g., Magnolias, Oak trees, Lavender fields"
        tags={preferences.flora}
        onAdd={(tag) => updatePreference('flora', [...preferences.flora, tag])}
        onRemove={(tag) =>
          updatePreference(
            'flora',
            preferences.flora.filter((f) => f !== tag)
          )
        }
        suggestions={floraSuggestions}
      />

      {/* Fauna */}
      <TagInput
        label="Notable Wildlife"
        placeholder="e.g., Hummingbirds, Foxes, Cicadas"
        tags={preferences.fauna}
        onAdd={(tag) => updatePreference('fauna', [...preferences.fauna, tag])}
        onRemove={(tag) =>
          updatePreference(
            'fauna',
            preferences.fauna.filter((f) => f !== tag)
          )
        }
        suggestions={faunaSuggestions}
      />

      {/* Emphasis Selection */}
      <div className="mb-10">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-4"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Generation Emphasis
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMPHASIS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleEmphasisSelect(option.value)}
              className="p-4 border text-left transition-all duration-300"
              style={{
                backgroundColor:
                  preferences.emphasis === option.value
                    ? 'var(--color-accent)'
                    : 'var(--color-bgSecondary)',
                borderColor:
                  preferences.emphasis === option.value
                    ? 'var(--color-accent)'
                    : 'var(--color-border)',
                color:
                  preferences.emphasis === option.value
                    ? 'white'
                    : 'var(--color-textPrimary)',
              }}
            >
              <div className="font-medium mb-1">{option.label}</div>
              <div
                className="text-xs"
                style={{
                  color:
                    preferences.emphasis === option.value
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

      {/* Include Holidays Toggle */}
      <div className="mb-10">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.includeHolidays}
            onChange={(e) => updatePreference('includeHolidays', e.target.checked)}
            className="w-5 h-5 border-2 appearance-none cursor-pointer transition-colors"
            style={{
              borderColor: preferences.includeHolidays
                ? 'var(--color-accent)'
                : 'var(--color-border)',
              backgroundColor: preferences.includeHolidays
                ? 'var(--color-accent)'
                : 'transparent',
            }}
          />
          <span style={{ color: 'var(--color-textPrimary)' }}>
            Include major holidays in season descriptions
          </span>
        </label>
      </div>

      {/* Additional Notes */}
      <div className="mb-10">
        <label
          className="block text-xs font-mono uppercase tracking-wider mb-3"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Additional Notes (Optional)
        </label>
        <textarea
          value={preferences.additionalNotes}
          onChange={(e) => updatePreference('additionalNotes', e.target.value)}
          placeholder="Any other details you'd like us to consider..."
          rows={3}
          className="w-full px-4 py-3 text-sm border transition-colors focus:outline-none resize-none"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-textPrimary)',
          }}
        />
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
          Review & Generate
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
