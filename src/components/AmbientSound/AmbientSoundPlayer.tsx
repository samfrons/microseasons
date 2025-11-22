'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSoundForMicroseason, getAllSounds, type SoundProfile } from '@/data/soundMappings';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface AmbientSoundPlayerProps {
  microseasonName?: string;
  className?: string;
}

export const AmbientSoundPlayer = ({ microseasonName, className }: AmbientSoundPlayerProps) => {
  const { darkMode } = useCalendarStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSound, setCurrentSound] = useState<SoundProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update sound based on microseason
  useEffect(() => {
    if (microseasonName) {
      const sound = getSoundForMicroseason(microseasonName);
      if (sound && sound.id !== currentSound?.id) {
        setCurrentSound(sound);
      }
    }
  }, [microseasonName, currentSound?.id]);

  // Handle audio playback
  useEffect(() => {
    if (!currentSound) return;

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = currentSound.loop;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      // Load and play new sound
      audio.src = currentSound.soundUrl;
      audio.volume = isMuted ? 0 : volume * currentSound.volume;
      audio.loop = currentSound.loop;

      // Fade in
      fadeIn(audio, currentSound);

      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
        setIsPlaying(false);
      });
    } else {
      // Fade out and pause
      fadeOut(audio, currentSound);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [isPlaying, currentSound, volume, isMuted]);

  const fadeIn = (audio: HTMLAudioElement, sound: SoundProfile) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const targetVolume = isMuted ? 0 : volume * sound.volume;
    const steps = 50;
    const increment = targetVolume / steps;
    const interval = sound.fadeInDuration / steps;

    audio.volume = 0;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      audio.volume = Math.min(targetVolume, audio.volume + increment);

      if (step >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, interval);
  };

  const fadeOut = (audio: HTMLAudioElement, sound: SoundProfile) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVolume = audio.volume;
    const steps = 50;
    const decrement = startVolume / steps;
    const interval = sound.fadeOutDuration / steps;

    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      audio.volume = Math.max(0, audio.volume - decrement);

      if (step >= steps || audio.volume === 0) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audio.pause();
      }
    }, interval);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && isPlaying && !isMuted) {
      audioRef.current.volume = newVolume * (currentSound?.volume || 1);
    }
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume * (currentSound?.volume || 1);
    }
  };

  const handleSelectSound = (sound: SoundProfile) => {
    setCurrentSound(sound);
    setIsMenuOpen(false);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const allSounds = getAllSounds();

  return (
    <div className={clsx('relative', className)}>
      {/* Main control button */}
      <motion.button
        onClick={handleTogglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors shadow-lg',
          darkMode
            ? isPlaying
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            : isPlaying
            ? 'bg-purple-500 hover:bg-purple-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        )}
        aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
            <span className="text-sm">Pause</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm">Ambient Sound</span>
          </>
        )}
      </motion.button>

      {/* Sound controls panel */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={clsx(
              'absolute top-full right-0 mt-2 w-64 rounded-xl shadow-2xl overflow-hidden z-50',
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            )}
          >
            {/* Current sound info */}
            <div className={clsx('p-4 border-b', darkMode ? 'border-gray-700' : 'border-gray-200')}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className={clsx('font-medium', darkMode ? 'text-white' : 'text-gray-900')}>
                    {currentSound?.name || 'Select a sound'}
                  </h4>
                  <p className={clsx('text-xs', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                    {currentSound?.description}
                  </p>
                </div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={clsx(
                    'p-1 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors',
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  )}
                  aria-label="Change sound"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>

              {/* Volume control */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className={clsx('p-1', darkMode ? 'text-gray-400' : 'text-gray-600')}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1 accent-purple-500"
                    aria-label="Volume"
                  />
                  <span className={clsx('text-xs w-10 text-right', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Sound selection menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className={clsx('p-2 max-h-64 overflow-y-auto', darkMode ? 'bg-gray-900/50' : 'bg-gray-50')}>
                    <p className={clsx('px-2 py-1 text-xs font-medium', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                      Choose a sound:
                    </p>
                    {allSounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => handleSelectSound(sound)}
                        className={clsx(
                          'w-full text-left px-3 py-2 rounded-lg transition-colors',
                          currentSound?.id === sound.id
                            ? darkMode
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-500 text-white'
                            : darkMode
                            ? 'hover:bg-gray-800 text-gray-200'
                            : 'hover:bg-gray-200 text-gray-700'
                        )}
                      >
                        <div className="font-medium text-sm">{sound.name}</div>
                        <div className={clsx(
                          'text-xs',
                          currentSound?.id === sound.id
                            ? 'text-purple-100'
                            : darkMode ? 'text-gray-500' : 'text-gray-600'
                        )}>
                          {sound.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
