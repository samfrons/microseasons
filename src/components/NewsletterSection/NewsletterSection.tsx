'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

export const NewsletterSection = () => {
  const { darkMode } = useCalendarStore();
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'physical' | 'digital' | 'both'>('both');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, this would call an API endpoint
    console.log('Newsletter signup:', { email, interest });

    setSubmitted(true);
    setLoading(false);
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const interests = [
    {
      id: 'physical' as const,
      label: 'Physical Calendar',
      description: 'Handcrafted wall calendar',
      icon: '🎨',
    },
    {
      id: 'digital' as const,
      label: 'Digital Version',
      description: 'App and web platform',
      icon: '💻',
    },
    {
      id: 'both' as const,
      label: 'Both',
      description: 'Get all the updates',
      icon: '✨',
    },
  ];

  return (
    <section
      className={clsx(
        'py-32 px-6 transition-colors duration-500',
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-sakura-50 via-washi-50 to-sakura-100'
      )}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={clsx(
            'rounded-3xl p-12 md:p-16 shadow-2xl backdrop-blur-sm border',
            darkMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/80 border-sakura-200'
          )}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="text-6xl">📬</span>
            </motion.div>

            <h2
              className={clsx(
                'text-4xl md:text-5xl font-light mb-6 tracking-tight',
                darkMode ? 'text-white' : 'text-gray-900'
              )}
            >
              Join the Waitlist
            </h2>

            <p
              className={clsx(
                'text-xl leading-relaxed max-w-2xl mx-auto',
                darkMode ? 'text-gray-300' : 'text-gray-600'
              )}
            >
              Be the first to know when the Microseasons Calendar launches.
              Get exclusive early-bird pricing and behind-the-scenes updates.
            </p>
          </div>

          {/* Interest Selection */}
          <div className="mb-8">
            <label
              className={clsx(
                'block text-sm font-medium mb-4 text-center',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}
            >
              I'm interested in:
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {interests.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setInterest(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    'p-6 rounded-xl border-2 transition-all text-left',
                    interest === item.id
                      ? darkMode
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-emerald-600 bg-emerald-50'
                      : darkMode
                      ? 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  )}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div
                    className={clsx(
                      'font-medium mb-1',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {item.label}
                  </div>
                  <div
                    className={clsx(
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    )}
                  >
                    {item.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Email Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className={clsx(
                    'block text-sm font-medium mb-2',
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  )}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className={clsx(
                    'w-full px-6 py-4 rounded-xl border-2 transition-colors text-lg',
                    'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    darkMode
                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  )}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  'w-full py-4 px-8 rounded-xl font-semibold text-lg shadow-lg transition-all',
                  'focus:outline-none focus:ring-4 focus:ring-emerald-500/50',
                  loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-xl',
                  darkMode
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                )}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  'Join the Waitlist'
                )}
              </motion.button>

              <p
                className={clsx(
                  'text-sm text-center',
                  darkMode ? 'text-gray-500' : 'text-gray-600'
                )}
              >
                No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={clsx(
                'text-center py-12 rounded-xl',
                darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
              )}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3
                className={clsx(
                  'text-2xl font-medium mb-2',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}
              >
                You're on the list!
              </h3>
              <p
                className={clsx(
                  'text-lg',
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                Check your inbox for a confirmation email.
                We can't wait to share this with you!
              </p>
            </motion.div>
          )}

          {/* Stats */}
          <div className="mt-12 pt-12 border-t border-current opacity-20" />

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
            <div>
              <div
                className={clsx(
                  'text-4xl font-light mb-2',
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                )}
              >
                2,847
              </div>
              <div
                className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                On the waitlist
              </div>
            </div>

            <div>
              <div
                className={clsx(
                  'text-4xl font-light mb-2',
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                )}
              >
                Q2 2025
              </div>
              <div
                className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                Estimated launch
              </div>
            </div>

            <div>
              <div
                className={clsx(
                  'text-4xl font-light mb-2',
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                )}
              >
                30%
              </div>
              <div
                className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}
              >
                Early-bird discount
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
