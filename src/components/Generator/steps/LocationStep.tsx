'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import type { LocationData } from '@/types/generator';

interface LocationStepProps {
  onNext: () => void;
}

export function LocationStep({ onNext }: LocationStepProps) {
  const { locationData, setLocationData, markStepComplete } = useGeneratorStore();
  const [searchQuery, setSearchQuery] = useState(locationData?.formattedAddress || '');
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);

  // Manual input state
  const [manualCity, setManualCity] = useState(locationData?.city || '');
  const [manualRegion, setManualRegion] = useState(locationData?.region || '');
  const [manualCountry, setManualCountry] = useState(locationData?.country || '');

  const handleGeolocation = async () => {
    setIsDetecting(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode using a free API (Nominatim)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      const data = await response.json();

      const newLocation: LocationData = {
        city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
        region: data.address?.state || data.address?.county || '',
        country: data.address?.country || 'Unknown',
        latitude,
        longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        formattedAddress: data.display_name,
      };

      setLocationData(newLocation);
      setSearchQuery(newLocation.formattedAddress || `${newLocation.city}, ${newLocation.country}`);
    } catch (err: any) {
      console.error('Geolocation error:', err);
      setError(
        err.code === 1
          ? 'Location access denied. Please enable location services or enter manually.'
          : 'Could not detect your location. Please enter manually.'
      );
    } finally {
      setIsDetecting(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualCity || !manualCountry) {
      setError('Please enter at least a city and country');
      return;
    }

    const newLocation: LocationData = {
      city: manualCity,
      region: manualRegion,
      country: manualCountry,
      latitude: 0, // Will be populated by API later if needed
      longitude: 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      formattedAddress: [manualCity, manualRegion, manualCountry].filter(Boolean).join(', '),
    };

    setLocationData(newLocation);
    setSearchQuery(newLocation.formattedAddress || '');
    setManualMode(false);
  };

  const handleContinue = () => {
    if (!locationData) {
      setError('Please select or enter a location first');
      return;
    }
    markStepComplete('location');
    onNext();
  };

  const clearLocation = () => {
    setLocationData(null);
    setSearchQuery('');
    setManualCity('');
    setManualRegion('');
    setManualCountry('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-mono uppercase tracking-wider"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            color: 'var(--color-textSecondary)',
          }}
        >
          <span>Step 1</span>
          <span style={{ color: 'var(--color-accent)' }}>·</span>
          <span>Location</span>
        </div>

        <h2
          className="text-3xl font-serif mb-3"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          Where are you?
        </h2>
        <p style={{ color: 'var(--color-textSecondary)' }}>
          We will create microseasons tailored to your location&apos;s unique climate and culture.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 border text-sm"
          style={{
            backgroundColor: 'rgba(220, 38, 38, 0.05)',
            borderColor: 'rgba(220, 38, 38, 0.2)',
            color: '#dc2626',
          }}
        >
          {error}
        </motion.div>
      )}

      {/* Current location display */}
      {locationData && !manualMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 border"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-sage)',
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div
                className="text-xs font-mono uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-sage)' }}
              >
                Selected Location
              </div>
              <div
                className="text-xl font-serif"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {locationData.city}
                {locationData.region && `, ${locationData.region}`}
              </div>
              <div
                className="text-sm"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {locationData.country}
              </div>
            </div>
            <button
              onClick={clearLocation}
              className="p-2 transition-colors"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 5L5 15M5 5l10 10" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Location input options */}
      {!locationData && !manualMode && (
        <div className="space-y-4 mb-8">
          {/* Auto-detect button */}
          <button
            onClick={handleGeolocation}
            disabled={isDetecting}
            className="w-full p-6 border text-left transition-all duration-300 group"
            style={{
              backgroundColor: 'var(--color-bgSecondary)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bgPrimary)' }}
              >
                {isDetecting ? (
                  <svg
                    className="animate-spin w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div
                  className="font-medium mb-1"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  {isDetecting ? 'Detecting...' : 'Use My Location'}
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  Auto-detect your current location
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-accent)' }}
              >
                <path d="M7 4l6 6-6 6" />
              </svg>
            </div>
          </button>

          {/* Manual entry button */}
          <button
            onClick={() => setManualMode(true)}
            className="w-full p-6 border text-left transition-all duration-300 group"
            style={{
              backgroundColor: 'var(--color-bgSecondary)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bgPrimary)' }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div
                  className="font-medium mb-1"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  Enter Manually
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  Type your city and country
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-accent)' }}
              >
                <path d="M7 4l6 6-6 6" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Manual entry form */}
      {manualMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 border"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                className="block text-xs font-mono uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                City *
              </label>
              <input
                type="text"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
                placeholder="e.g., Tokyo, New York, Paris"
                className="w-full px-4 py-3 text-sm border transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-bgPrimary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-mono uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Region/State (Optional)
              </label>
              <input
                type="text"
                value={manualRegion}
                onChange={(e) => setManualRegion(e.target.value)}
                placeholder="e.g., California, Ontario, Bavaria"
                className="w-full px-4 py-3 text-sm border transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-bgPrimary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-mono uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Country *
              </label>
              <input
                type="text"
                value={manualCountry}
                onChange={(e) => setManualCountry(e.target.value)}
                placeholder="e.g., Japan, United States, France"
                className="w-full px-4 py-3 text-sm border transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-bgPrimary)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                }}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setManualMode(false)}
                className="px-4 py-2 text-sm border transition-colors"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textSecondary)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleManualSubmit}
                className="flex-1 px-4 py-2 text-sm transition-colors"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                }}
              >
                Confirm Location
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Continue button */}
      {locationData && !manualMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
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
        </motion.div>
      )}
    </div>
  );
}
