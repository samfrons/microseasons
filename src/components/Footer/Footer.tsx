'use client';

import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

export function Footer() {
  const { darkMode } = useCalendarStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={clsx(
        'py-16 border-t transition-colors duration-500',
        darkMode
          ? 'bg-sumi-950 border-sumi-800'
          : 'bg-white border-washi-200'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className={clsx(
                'text-2xl font-light mb-4 tracking-wide',
                darkMode ? 'text-washi-50' : 'text-sumi-900'
              )}
            >
              Microseasons
            </h3>
            <p
              className={clsx(
                'text-sm leading-relaxed',
                darkMode ? 'text-washi-400' : 'text-sumi-500'
              )}
            >
              A beautiful fusion of Japanese 七十二候 (shichijūni kō) and
              Western calendar traditions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className={clsx(
                'text-xs uppercase tracking-widest mb-4 font-medium',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Learn More
            </h4>
            <ul className="space-y-2">
              {['About Microseasons', 'Calendar Traditions', 'Customization', 'FAQ'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={clsx(
                        'text-sm transition-colors duration-200 hover:underline',
                        darkMode
                          ? 'text-washi-300 hover:text-washi-100'
                          : 'text-sumi-600 hover:text-sumi-900'
                      )}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={clsx(
                'text-xs uppercase tracking-widest mb-4 font-medium',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Connect
            </h4>
            <ul className="space-y-2">
              {['Email', 'Twitter', 'Instagram', 'GitHub'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={clsx(
                      'text-sm transition-colors duration-200 hover:underline',
                      darkMode
                        ? 'text-washi-300 hover:text-washi-100'
                        : 'text-sumi-600 hover:text-sumi-900'
                    )}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={clsx(
            'pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4',
            darkMode ? 'border-sumi-800' : 'border-washi-200'
          )}
        >
          <p
            className={clsx(
              'text-sm',
              darkMode ? 'text-washi-400' : 'text-sumi-500'
            )}
          >
            © {currentYear} Microseasons. Crafted with attention to detail.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className={clsx(
                'text-xs uppercase tracking-wider transition-colors duration-200',
                darkMode
                  ? 'text-washi-400 hover:text-washi-100'
                  : 'text-sumi-500 hover:text-sumi-900'
              )}
            >
              Privacy
            </a>
            <a
              href="#"
              className={clsx(
                'text-xs uppercase tracking-wider transition-colors duration-200',
                darkMode
                  ? 'text-washi-400 hover:text-washi-100'
                  : 'text-sumi-500 hover:text-sumi-900'
              )}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
