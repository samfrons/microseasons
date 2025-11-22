'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  generateShareUrl,
  generateShareText,
  generateMicroseasonShareText,
  copyToClipboard,
  shareViaWebApi,
  getTwitterShareUrl,
  getFacebookShareUrl,
  getLinkedInShareUrl,
  getRedditShareUrl,
  getEmailShareUrl,
  type ShareableCalendarConfig,
  type ShareableMicroseason,
} from '@/utils/sharing/shareUtils';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface ShareButtonProps {
  type: 'calendar' | 'microseason';
  config?: ShareableCalendarConfig;
  microseason?: ShareableMicroseason;
  className?: string;
}

export const ShareButton = ({ type, config, microseason, className }: ShareButtonProps) => {
  const { darkMode } = useCalendarStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = type === 'calendar' && config
    ? generateShareUrl(config)
    : typeof window !== 'undefined' ? window.location.href : '';

  const shareText = type === 'calendar' && config
    ? generateShareText(config)
    : microseason
    ? generateMicroseasonShareText(microseason)
    : 'Check out the Microseasons Calendar!';

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    const shared = await shareViaWebApi({
      title: type === 'calendar' ? 'My Microseasons Calendar' : microseason?.name || 'Microseason',
      text: shareText,
      url: shareUrl,
    });

    if (!shared) {
      // Fallback to showing share menu if Web Share API not available
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: handleCopyLink,
      color: 'text-gray-600 dark:text-gray-300',
    },
    {
      name: 'Twitter/X',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      onClick: () => window.open(getTwitterShareUrl(shareText, shareUrl), '_blank'),
      color: 'text-black dark:text-white',
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      onClick: () => window.open(getFacebookShareUrl(shareUrl), '_blank'),
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      onClick: () => window.open(getLinkedInShareUrl(shareUrl), '_blank'),
      color: 'text-blue-700 dark:text-blue-500',
    },
    {
      name: 'Reddit',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      onClick: () => window.open(getRedditShareUrl('Check out this Microseasons Calendar', shareUrl), '_blank'),
      color: 'text-orange-600 dark:text-orange-400',
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => window.location.href = getEmailShareUrl(
        'Check out this Microseasons Calendar',
        `${shareText}\n\n${shareUrl}`
      ),
      color: 'text-gray-600 dark:text-gray-300',
    },
  ];

  return (
    <div className={clsx('relative', className)}>
      <motion.button
        onClick={handleNativeShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
          darkMode
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        )}
        aria-label="Share"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>Share</span>
      </motion.button>

      {/* Share menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className={clsx(
                'absolute right-0 mt-2 w-64 rounded-xl shadow-2xl z-50 overflow-hidden',
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              )}
            >
              <div className={clsx('p-3', darkMode ? 'bg-gray-900/50' : 'bg-gray-50')}>
                <p className={clsx('text-sm font-medium', darkMode ? 'text-gray-200' : 'text-gray-700')}>
                  Share via
                </p>
              </div>

              <div className="p-2">
                {shareOptions.map((option, index) => (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.onClick();
                      if (option.name !== 'Copy Link') {
                        setIsOpen(false);
                      }
                    }}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left',
                      darkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    <span className={option.color}>{option.icon}</span>
                    <span className={clsx('text-sm font-medium', darkMode ? 'text-gray-200' : 'text-gray-700')}>
                      {option.name}
                    </span>
                    {option.name === 'Copy Link' && copied && (
                      <span className="ml-auto text-xs text-emerald-500">
                        Copied!
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
