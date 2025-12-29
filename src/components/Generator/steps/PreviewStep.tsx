'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { CustomSeason } from '@/types/generator';

interface PreviewStepProps {
  onNext: () => void;
  onBack: () => void;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

export function PreviewStep({
  onNext,
  onBack,
  isAuthenticated,
  onAuthRequired,
}: PreviewStepProps) {
  const {
    locationData,
    preferences,
    isGenerating,
    generationProgress,
    generationStatus,
    generatedSeasons,
    setIsGenerating,
    setGenerationProgress,
    setGenerationStatus,
    setGeneratedSeasons,
    addGeneratedSeason,
    setCurrentSetId,
    setError,
    markStepComplete,
    setCurrentStep,
  } = useGeneratorStore();

  const { profile } = useAuthStore();
  const [hasStarted, setHasStarted] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if user can generate
  const canGenerate = () => {
    if (!isAuthenticated) return true; // Allow unauthenticated preview
    if (!profile) return false;
    if (profile.subscription_tier === 'premium') return true;
    return profile.generations_count < 1;
  };

  const handleGenerate = async () => {
    if (!locationData) return;

    // Require auth for actual generation
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    // Check generation limits
    if (!canGenerate()) {
      setError('You have reached your free generation limit. Upgrade to premium for unlimited generations.');
      return;
    }

    setHasStarted(true);
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStatus('Preparing your microseasons...');
    setGeneratedSeasons([]);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: locationData,
          preferences,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.status) {
                setGenerationStatus(data.status);
              }

              if (data.progress) {
                setGenerationProgress(data.progress);
              }

              if (data.season) {
                addGeneratedSeason(data.season);
              }

              if (data.complete) {
                setCurrentSetId(data.setId);
                setGenerationStatus('Generation complete!');
                setGenerationProgress(100);
                markStepComplete('preview');

                // Auto-advance to review after a brief delay
                setTimeout(() => {
                  setIsGenerating(false);
                  setCurrentStep('review');
                }, 1500);
              }

              if (data.error) {
                throw new Error(data.error);
              }
            } catch (parseError) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setGenerationStatus('Generation cancelled');
      } else {
        setError(error.message || 'An error occurred during generation');
        setGenerationStatus('Generation failed');
      }
      setIsGenerating(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    setHasStarted(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
          <span>Step 4</span>
          <span style={{ color: 'var(--color-accent)' }}>·</span>
          <span>Generate</span>
        </div>

        <h2
          className="text-3xl font-serif mb-3"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          {isGenerating ? 'Creating your microseasons...' : 'Ready to generate'}
        </h2>
        <p style={{ color: 'var(--color-textSecondary)' }}>
          {isGenerating
            ? 'Our AI is crafting 72 unique seasons for you'
            : 'Review your selections and generate your personalized microseasons'}
        </p>
      </div>

      {/* Summary Card */}
      {!isGenerating && !hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 border"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h3
            className="text-lg font-serif mb-4"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Generation Summary
          </h3>

          <div className="space-y-4">
            {/* Location */}
            <div className="flex justify-between items-start">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Location
              </span>
              <span
                className="text-right"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {locationData?.city}, {locationData?.country}
              </span>
            </div>

            {/* Climate */}
            <div className="flex justify-between items-start">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Climate
              </span>
              <span
                className="text-right capitalize"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {preferences.climateType}
              </span>
            </div>

            {/* Seasons */}
            <div className="flex justify-between items-start">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Seasons
              </span>
              <span
                className="text-right capitalize"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {preferences.seasonTypes.join(', ')}
              </span>
            </div>

            {/* Language */}
            <div className="flex justify-between items-start">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Language
              </span>
              <span
                className="text-right"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {preferences.localLanguage}
              </span>
            </div>

            {/* Emphasis */}
            <div className="flex justify-between items-start">
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Emphasis
              </span>
              <span
                className="text-right capitalize"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {preferences.emphasis}
              </span>
            </div>

            {/* Extras */}
            {(preferences.festivals.length > 0 ||
              preferences.flora.length > 0 ||
              preferences.fauna.length > 0) && (
              <div
                className="pt-4 border-t"
                style={{ borderColor: 'var(--color-borderSubtle)' }}
              >
                {preferences.festivals.length > 0 && (
                  <div className="mb-2">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      Festivals:{' '}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textPrimary)' }}
                    >
                      {preferences.festivals.join(', ')}
                    </span>
                  </div>
                )}
                {preferences.flora.length > 0 && (
                  <div className="mb-2">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      Flora:{' '}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textPrimary)' }}
                    >
                      {preferences.flora.join(', ')}
                    </span>
                  </div>
                )}
                {preferences.fauna.length > 0 && (
                  <div>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      Fauna:{' '}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textPrimary)' }}
                    >
                      {preferences.fauna.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Generation Progress */}
      {(isGenerating || hasStarted) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          {/* Progress bar */}
          <div
            className="h-2 mb-4 overflow-hidden"
            style={{ backgroundColor: 'var(--color-bgSecondary)' }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
              initial={{ width: 0 }}
              animate={{ width: `${generationProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Status */}
          <div className="flex justify-between items-center mb-6">
            <span style={{ color: 'var(--color-textSecondary)' }}>
              {generationStatus}
            </span>
            <span
              className="font-mono text-sm"
              style={{ color: 'var(--color-accent)' }}
            >
              {generatedSeasons.length}/72
            </span>
          </div>

          {/* Preview of generated seasons */}
          {generatedSeasons.length > 0 && (
            <div
              className="p-4 border max-h-64 overflow-y-auto custom-scrollbar"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="space-y-2">
                {generatedSeasons.slice(-5).map((season) => (
                  <motion.div
                    key={season.season_number}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      #{season.season_number}
                    </span>
                    <span style={{ color: 'var(--color-textPrimary)' }}>
                      {season.name_local}
                    </span>
                    <span
                      className="text-sm italic"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {season.name_english}
                    </span>
                    <div className="flex gap-1 ml-auto">
                      {season.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Auth prompt for unauthenticated users */}
      {!isAuthenticated && !isGenerating && !hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 border text-center"
          style={{
            backgroundColor: 'var(--color-blush)',
            borderColor: 'var(--color-accent)',
          }}
        >
          <p
            className="text-sm mb-3"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Create an account to generate and save your microseasons
          </p>
          <button
            onClick={onAuthRequired}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            Sign Up Free
          </button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-3 text-sm transition-colors disabled:opacity-50"
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

        {isGenerating ? (
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-8 py-3 text-sm font-medium border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-textSecondary)',
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!locationData}
            className="flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-300 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 2l6 6-6 6M2 8h12" />
            </svg>
            Generate 72 Microseasons
          </button>
        )}
      </div>
    </div>
  );
}
