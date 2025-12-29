'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { CustomSeason } from '@/types/generator';

interface ReviewStepProps {
  onBack: () => void;
}

interface SeasonCardProps {
  season: CustomSeason;
  onEdit: (season: CustomSeason) => void;
}

function SeasonCard({ season, onEdit }: SeasonCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 border transition-all duration-300 cursor-pointer group"
      style={{
        backgroundColor: 'var(--color-bgSecondary)',
        borderColor: season.is_edited ? 'var(--color-sage)' : 'var(--color-border)',
      }}
      onClick={() => onEdit(season)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            #{season.season_number}
          </span>
          {season.is_edited && (
            <span
              className="ml-2 text-[10px] uppercase"
              style={{ color: 'var(--color-sage)' }}
            >
              Edited
            </span>
          )}
        </div>
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 2.5l1.5 1.5L5 10.5l-2 .5.5-2L10 2.5z" />
          </svg>
        </button>
      </div>

      {/* Names */}
      <div className="mb-3">
        <div
          className="text-lg font-serif leading-tight"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          {season.name_local}
        </div>
        <div
          className="text-sm italic"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          {season.name_english}
        </div>
      </div>

      {/* Date */}
      <div
        className="text-xs mb-3"
        style={{ color: 'var(--color-textSecondary)' }}
      >
        {season.start_month}/{season.start_day} - {season.end_month}/{season.end_day}
      </div>

      {/* Colors */}
      <div className="flex gap-1">
        {season.colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 h-4"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SeasonEditorProps {
  season: CustomSeason;
  onSave: (updates: Partial<CustomSeason>) => void;
  onClose: () => void;
}

function SeasonEditor({ season, onSave, onClose }: SeasonEditorProps) {
  const [nameLocal, setNameLocal] = useState(season.name_local);
  const [nameEnglish, setNameEnglish] = useState(season.name_english);
  const [description, setDescription] = useState(season.description);
  const [colors, setColors] = useState(season.colors);

  const handleSave = () => {
    onSave({
      name_local: nameLocal,
      name_english: nameEnglish,
      description,
      colors,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Editor */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg p-6 border z-10"
        style={{
          backgroundColor: 'var(--color-bgPrimary)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2"
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

        {/* Header */}
        <div className="mb-6">
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Season #{season.season_number}
          </span>
          <h3
            className="text-xl font-serif"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Edit Microseason
          </h3>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-xs font-mono uppercase tracking-wider mb-2"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Local Name
            </label>
            <input
              type="text"
              value={nameLocal}
              onChange={(e) => setNameLocal(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border focus:outline-none"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
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
              English Name
            </label>
            <input
              type="text"
              value={nameEnglish}
              onChange={(e) => setNameEnglish(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border focus:outline-none"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
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
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 text-sm border focus:outline-none resize-none"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
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
              Colors
            </label>
            <div className="flex gap-2">
              {colors.map((color, i) => (
                <div key={i} className="flex-1">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[i] = e.target.value;
                      setColors(newColors);
                    }}
                    className="w-full h-10 cursor-pointer"
                    style={{ border: 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-textSecondary)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ReviewStep({ onBack }: ReviewStepProps) {
  const { generatedSeasons, updateSeason, locationData, currentSetId } = useGeneratorStore();
  const { user } = useAuthStore();
  const [editingSeason, setEditingSeason] = useState<CustomSeason | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const filteredSeasons = searchQuery
    ? generatedSeasons.filter(
        (s) =>
          s.name_local.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.season_number.toString().includes(searchQuery)
      )
    : generatedSeasons;

  const handleEditSave = (updates: Partial<CustomSeason>) => {
    if (editingSeason) {
      updateSeason(editingSeason.season_number, updates);
    }
  };

  const handleSaveToAccount = async () => {
    if (!currentSetId || !user) return;

    setIsSaving(true);
    try {
      // Save edited seasons to database
      const response = await fetch(`/api/microseasons/${currentSetId}/seasons`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seasons: generatedSeasons }),
      });

      if (!response.ok) throw new Error('Failed to save');

      // Success feedback
      alert('Saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!currentSetId) return;

    try {
      const response = await fetch(`/api/microseasons/${currentSetId}/share`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to generate share link');

      const { shareSlug } = await response.json();
      const url = `${window.location.origin}/s/${shareSlug}`;
      setShareUrl(url);

      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-mono uppercase tracking-wider"
          style={{
            backgroundColor: 'var(--color-bgSecondary)',
            color: 'var(--color-textSecondary)',
          }}
        >
          <span>Step 5</span>
          <span style={{ color: 'var(--color-accent)' }}>·</span>
          <span>Review</span>
        </div>

        <h2
          className="text-3xl font-serif mb-3"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          Your {locationData?.city} Microseasons
        </h2>
        <p style={{ color: 'var(--color-textSecondary)' }}>
          72 unique seasons generated. Click any card to edit.
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or number..."
            className="w-full px-4 py-3 text-sm border focus:outline-none"
            style={{
              backgroundColor: 'var(--color-bgSecondary)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-textPrimary)',
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="px-4 py-2 text-sm border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-textSecondary)',
            }}
          >
            Share
          </button>
          <button
            onClick={handleSaveToAccount}
            disabled={isSaving || !user}
            className="px-6 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-4 mb-8 p-4 border"
        style={{
          backgroundColor: 'var(--color-bgSecondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="text-center">
          <div
            className="text-2xl font-serif"
            style={{ color: 'var(--color-accent)' }}
          >
            72
          </div>
          <div
            className="text-xs font-mono uppercase"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Seasons
          </div>
        </div>
        <div className="text-center">
          <div
            className="text-2xl font-serif"
            style={{ color: 'var(--color-sage)' }}
          >
            {generatedSeasons.filter((s) => s.is_edited).length}
          </div>
          <div
            className="text-xs font-mono uppercase"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Edited
          </div>
        </div>
        <div className="text-center">
          <div
            className="text-2xl font-serif"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            216
          </div>
          <div
            className="text-xs font-mono uppercase"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Colors
          </div>
        </div>
      </div>

      {/* Season Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {filteredSeasons.map((season) => (
          <SeasonCard
            key={season.season_number}
            season={season}
            onEdit={setEditingSeason}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredSeasons.length === 0 && searchQuery && (
        <div
          className="text-center py-12"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          No seasons found matching &quot;{searchQuery}&quot;
        </div>
      )}

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
          Back to Preview
        </button>

        <a
          href="/dashboard"
          className="flex items-center gap-2 px-8 py-3 text-sm font-medium transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'white',
          }}
        >
          Go to Dashboard
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
        </a>
      </div>

      {/* Season Editor Modal */}
      <AnimatePresence>
        {editingSeason && (
          <SeasonEditor
            season={editingSeason}
            onSave={handleEditSave}
            onClose={() => setEditingSeason(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
