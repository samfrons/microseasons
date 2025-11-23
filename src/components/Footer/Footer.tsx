'use client';

import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

export function Footer() {
  const { darkMode } = useCalendarStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-20 lg:py-24 border-t transition-colors duration-700"
      style={{
        backgroundColor: 'var(--color-bgPrimary)',
        borderColor: 'var(--color-borderSubtle)',
      }}
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[1600px]">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand - elegant serif */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3
                className="text-3xl font-serif tracking-tight"
                style={{
                  color: 'var(--color-textPrimary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Microseasons
              </h3>
              <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-30">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ color: 'var(--color-accent)' }}
                />
              </svg>
            </div>
            <p
              className="text-sm leading-relaxed font-serif"
              style={{
                color: 'var(--color-textSecondary)',
                lineHeight: '1.7',
              }}
            >
              A beautiful fusion of Japanese 七十二候 (shichijūni kō) and
              Western calendar traditions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 opacity-50"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Learn More
            </h4>
            <ul className="space-y-3">
              {['About Microseasons', 'Calendar Traditions', 'Customization', 'FAQ'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-300"
                      style={{
                        color: 'var(--color-textSecondary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-textSecondary)';
                      }}
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
              className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 opacity-50"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {['Email', 'Twitter', 'Instagram', 'GitHub'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300"
                    style={{
                      color: 'var(--color-textSecondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-textSecondary)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar - refined */}
        <div
          className="pt-12 mt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderColor: 'var(--color-borderSubtle)' }}
        >
          <p
            className="text-sm font-serif italic"
            style={{ color: 'var(--color-textSecondary)', opacity: 0.7 }}
          >
            © {currentYear} Microseasons. Crafted with attention to detail.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300"
              style={{ color: 'var(--color-textSecondary)', opacity: 0.6 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-textSecondary)';
                e.currentTarget.style.opacity = '0.6';
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-300"
              style={{ color: 'var(--color-textSecondary)', opacity: 0.6 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-textSecondary)';
                e.currentTarget.style.opacity = '0.6';
              }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
