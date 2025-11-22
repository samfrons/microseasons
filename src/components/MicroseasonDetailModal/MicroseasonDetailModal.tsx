'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MicroseasonDetail } from '@/data/microseasonDetails/types';
import { ShareButton } from '@/components/SocialShare';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface MicroseasonDetailModalProps {
  microseason: MicroseasonDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MicroseasonDetailModal = ({
  microseason,
  isOpen,
  onClose,
}: MicroseasonDetailModalProps) => {
  const { darkMode } = useCalendarStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'nature' | 'culture' | 'art' | 'modern'>('overview');

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!microseason) return null;

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '🌱' },
    { id: 'nature' as const, label: 'Nature', icon: '🍃' },
    { id: 'culture' as const, label: 'Culture', icon: '🎎' },
    { id: 'art' as const, label: 'Art & Poetry', icon: '🎨' },
    { id: 'modern' as const, label: 'Modern Life', icon: '✨' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={clsx(
                  'relative w-full max-w-5xl rounded-2xl shadow-2xl',
                  darkMode ? 'bg-gray-900' : 'bg-white'
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="microseason-title"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button and Share */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <ShareButton
                    type="microseason"
                    microseason={{
                      name: microseason.name,
                      japaneseKanji: microseason.japaneseKanji,
                      date: `${microseason.startDate} - ${microseason.endDate}`,
                      description: microseason.description,
                    }}
                  />
                  <button
                    onClick={onClose}
                    className={clsx(
                      'p-2 rounded-full transition-colors',
                      darkMode
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    )}
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Header with gradient background */}
                <div
                  className="relative h-48 rounded-t-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${microseason.imagery.colors.join(', ')})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-sm font-medium mb-2 opacity-90">
                        {microseason.solarTerm}
                      </div>
                      <h2 id="microseason-title" className="text-4xl font-light mb-2">
                        {microseason.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <span>{microseason.japaneseKanji}</span>
                        <span>•</span>
                        <span>{microseason.japaneseRomaji}</span>
                        <span>•</span>
                        <span>{microseason.startDate} - {microseason.endDate}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Tabs */}
                <div className={clsx(
                  'border-b sticky top-0 z-10',
                  darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
                )}>
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                          'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap',
                          activeTab === tab.id
                            ? darkMode
                              ? 'text-emerald-400 border-b-2 border-emerald-400'
                              : 'text-emerald-600 border-b-2 border-emerald-600'
                            : darkMode
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-600 hover:text-gray-900'
                        )}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'overview' && (
                        <OverviewTab microseason={microseason} darkMode={darkMode} />
                      )}
                      {activeTab === 'nature' && (
                        <NatureTab microseason={microseason} darkMode={darkMode} />
                      )}
                      {activeTab === 'culture' && (
                        <CultureTab microseason={microseason} darkMode={darkMode} />
                      )}
                      {activeTab === 'art' && (
                        <ArtTab microseason={microseason} darkMode={darkMode} />
                      )}
                      {activeTab === 'modern' && (
                        <ModernTab microseason={microseason} darkMode={darkMode} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Tab Components
const OverviewTab = ({ microseason, darkMode }: { microseason: MicroseasonDetail; darkMode: boolean }) => (
  <div className="space-y-8">
    <div>
      <p className={clsx('text-xl leading-relaxed mb-4', darkMode ? 'text-gray-200' : 'text-gray-700')}>
        {microseason.longDescription}
      </p>
      <p className={clsx('text-lg italic', darkMode ? 'text-gray-400' : 'text-gray-600')}>
        "{microseason.imagery.mood}"
      </p>
    </div>

    <div>
      <h3 className={clsx('text-2xl font-light mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
        Historical Context
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className={clsx('font-medium mb-2', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
            Origin
          </h4>
          <p className={clsx('leading-relaxed', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            {microseason.history.origin}
          </p>
        </div>
        <div>
          <h4 className={clsx('font-medium mb-2', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
            Evolution
          </h4>
          <p className={clsx('leading-relaxed', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            {microseason.history.evolution}
          </p>
        </div>
        <div>
          <h4 className={clsx('font-medium mb-2', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
            Cultural Significance
          </h4>
          <p className={clsx('leading-relaxed', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            {microseason.history.significance}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const NatureTab = ({ microseason, darkMode }: { microseason: MicroseasonDetail; darkMode: boolean }) => (
  <div className="space-y-8">
    <Section title="Natural Phenomena" darkMode={darkMode}>
      <ul className="space-y-2">
        {microseason.nature.phenomena.map((item, i) => (
          <li key={i} className={clsx('flex items-start gap-3', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            <span className="text-emerald-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>

    <div className="grid md:grid-cols-3 gap-6">
      <Section title="Flora" darkMode={darkMode}>
        <ul className="space-y-2">
          {microseason.nature.flora.map((item, i) => (
            <li key={i} className={clsx('text-sm', darkMode ? 'text-gray-300' : 'text-gray-700')}>
              🌸 {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Fauna" darkMode={darkMode}>
        <ul className="space-y-2">
          {microseason.nature.fauna.map((item, i) => (
            <li key={i} className={clsx('text-sm', darkMode ? 'text-gray-300' : 'text-gray-700')}>
              🦋 {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Weather" darkMode={darkMode}>
        <ul className="space-y-2">
          {microseason.nature.weather.map((item, i) => (
            <li key={i} className={clsx('text-sm', darkMode ? 'text-gray-300' : 'text-gray-700')}>
              🌤️ {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  </div>
);

const CultureTab = ({ microseason, darkMode }: { microseason: MicroseasonDetail; darkMode: boolean }) => (
  <div className="space-y-8">
    <Section title="Traditions" darkMode={darkMode}>
      <ul className="space-y-2">
        {microseason.culture.traditions.map((item, i) => (
          <li key={i} className={clsx('flex items-start gap-3', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            <span className="text-amber-500 mt-1">⛩️</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Seasonal Activities" darkMode={darkMode}>
      <ul className="grid md:grid-cols-2 gap-3">
        {microseason.culture.activities.map((item, i) => (
          <li key={i} className={clsx('flex items-start gap-3', darkMode ? 'text-gray-300' : 'text-gray-700')}>
            <span className="text-emerald-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Seasonal Foods" darkMode={darkMode}>
      <div className="grid md:grid-cols-2 gap-4">
        {microseason.culture.foods.map((item, i) => (
          <div
            key={i}
            className={clsx(
              'p-4 rounded-lg',
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            )}
          >
            <span className="text-2xl mb-2 block">🍱</span>
            <span className={clsx('font-medium', darkMode ? 'text-gray-200' : 'text-gray-800')}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </Section>

    {microseason.culture.festivals && microseason.culture.festivals.length > 0 && (
      <Section title="Festivals" darkMode={darkMode}>
        <ul className="space-y-2">
          {microseason.culture.festivals.map((item, i) => (
            <li key={i} className={clsx('flex items-start gap-3 text-lg', darkMode ? 'text-gray-300' : 'text-gray-700')}>
              <span className="text-red-500">🎊</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>
    )}
  </div>
);

const ArtTab = ({ microseason, darkMode }: { microseason: MicroseasonDetail; darkMode: boolean }) => (
  <div className="space-y-8">
    {microseason.art.haiku && microseason.art.haiku.length > 0 && (
      <Section title="Haiku" darkMode={darkMode}>
        <div className="space-y-6">
          {microseason.art.haiku.map((haiku, i) => (
            <div
              key={i}
              className={clsx(
                'p-6 rounded-lg border',
                darkMode
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              )}
            >
              <div className={clsx('text-xl mb-3 font-light', darkMode ? 'text-gray-200' : 'text-gray-800')}>
                {haiku.japanese}
              </div>
              <div className={clsx('text-sm mb-2 italic', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                {haiku.romaji}
              </div>
              <div className={clsx('text-lg mb-3', darkMode ? 'text-gray-300' : 'text-gray-700')}>
                "{haiku.translation}"
              </div>
              {haiku.author && (
                <div className={clsx('text-sm font-medium', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
                  — {haiku.author}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    )}

    <Section title="Symbolism" darkMode={darkMode}>
      <ul className="space-y-3">
        {microseason.art.symbolism.map((item, i) => (
          <li
            key={i}
            className={clsx(
              'flex items-start gap-3 p-3 rounded',
              darkMode ? 'bg-gray-800/30' : 'bg-gray-50'
            )}
          >
            <span className="text-purple-500 mt-1">◆</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
          </li>
        ))}
      </ul>
    </Section>

    {microseason.art.poetry && microseason.art.poetry.length > 0 && (
      <Section title="Poetic Imagery" darkMode={darkMode}>
        <div className="space-y-3">
          {microseason.art.poetry.map((poem, i) => (
            <p
              key={i}
              className={clsx(
                'italic text-lg leading-relaxed',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}
            >
              "{poem}"
            </p>
          ))}
        </div>
      </Section>
    )}
  </div>
);

const ModernTab = ({ microseason, darkMode }: { microseason: MicroseasonDetail; darkMode: boolean }) => (
  <div className="space-y-8">
    <div>
      <h3 className={clsx('text-2xl font-light mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
        Contemporary Relevance
      </h3>
      <p className={clsx('text-lg leading-relaxed', darkMode ? 'text-gray-300' : 'text-gray-700')}>
        {microseason.modern.relevance}
      </p>
    </div>

    <Section title="Modern Activities" darkMode={darkMode}>
      <div className="grid md:grid-cols-2 gap-4">
        {microseason.modern.activities.map((item, i) => (
          <div
            key={i}
            className={clsx(
              'p-4 rounded-lg border-l-4 border-emerald-500',
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            )}
          >
            <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{item}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Mindfulness Practices" darkMode={darkMode}>
      <div className="space-y-3">
        {microseason.modern.mindfulness.map((item, i) => (
          <div
            key={i}
            className={clsx(
              'flex items-center gap-4 p-4 rounded-lg',
              darkMode ? 'bg-gray-800/50' : 'bg-amber-50'
            )}
          >
            <span className="text-2xl">🧘</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

const Section = ({
  title,
  darkMode,
  children,
}: {
  title: string;
  darkMode: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className={clsx('text-xl font-medium mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
      {title}
    </h3>
    {children}
  </div>
);
