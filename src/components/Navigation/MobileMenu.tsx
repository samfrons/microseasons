'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

interface MobileMenuProps {
  links: NavLink[];
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ links, pathname, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-[280px] md:hidden"
        style={{ backgroundColor: 'var(--color-bgPrimary)' }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          {/* Close button area - top right */}
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {links.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-4 text-lg font-serif border-b transition-colors duration-300"
                      style={{
                        color: link.highlight
                          ? 'var(--color-accent)'
                          : isActive
                            ? 'var(--color-textPrimary)'
                            : 'var(--color-textSecondary)',
                        borderColor: 'var(--color-borderSubtle)',
                        fontWeight: link.highlight || isActive ? 500 : 400,
                      }}
                    >
                      {link.label}
                      {link.highlight && (
                        <span
                          className="ml-2 text-xs font-sans uppercase tracking-wider"
                          style={{ color: 'var(--color-accent)', opacity: 0.7 }}
                        >
                          New
                        </span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--color-borderSubtle)' }}>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full py-3 text-sm border transition-all duration-300"
              style={{
                color: 'var(--color-textSecondary)',
                borderColor: 'var(--color-border)',
                backgroundColor: 'transparent',
              }}
            >
              Sign In
            </motion.button>
          </div>

          {/* Brand footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 text-center"
          >
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-textSecondary)', opacity: 0.5 }}
            >
              七十二候
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
