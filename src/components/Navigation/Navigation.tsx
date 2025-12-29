'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from '@/components/Auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Make Your Own', highlight: true },
  { href: '/led-twin', label: 'LED Twin' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled
            ? 'rgba(250, 248, 245, 0.85)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid var(--color-borderSubtle)'
            : '1px solid transparent',
        }}
      >
        <nav className="container mx-auto px-6 lg:px-20 max-w-[1600px]">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span
                className="text-xl lg:text-2xl font-serif tracking-tight transition-colors duration-300"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                Microseasons
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="opacity-40 group-hover:opacity-60 transition-opacity"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ color: 'var(--color-accent)' }}
                />
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-2 text-sm transition-colors duration-300"
                    style={{
                      color: link.highlight
                        ? 'var(--color-accent)'
                        : isActive
                          ? 'var(--color-textPrimary)'
                          : 'var(--color-textSecondary)',
                      fontWeight: link.highlight ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!link.highlight) {
                        e.currentTarget.style.color = 'var(--color-textPrimary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!link.highlight && !isActive) {
                        e.currentTarget.style.color = 'var(--color-textSecondary)';
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* User menu / Sign in */}
              <div className="ml-4">
                <UserMenu />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-full h-0.5 origin-left"
                  style={{ backgroundColor: 'var(--color-textPrimary)' }}
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-full h-0.5"
                  style={{ backgroundColor: 'var(--color-textPrimary)' }}
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-full h-0.5 origin-left"
                  style={{ backgroundColor: 'var(--color-textPrimary)' }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            links={navLinks}
            pathname={pathname}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
