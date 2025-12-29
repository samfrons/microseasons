'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useSupabase } from './AuthProvider';

export function UserMenu() {
  const supabase = useSupabase();
  const { user, profile, openAuthModal, isLoading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="w-8 h-8 animate-pulse"
        style={{ backgroundColor: 'var(--color-bgSecondary)' }}
      />
    );
  }

  // Not logged in - show sign in button
  if (!user) {
    return (
      <button
        onClick={() => openAuthModal('login')}
        className="px-4 py-2 text-sm border transition-all duration-300"
        style={{
          color: 'var(--color-textSecondary)',
          borderColor: 'var(--color-border)',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)';
          e.currentTarget.style.color = 'var(--color-accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.color = 'var(--color-textSecondary)';
        }}
      >
        Sign In
      </button>
    );
  }

  // Logged in - show user menu
  const displayName =
    profile?.display_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 transition-colors"
      >
        {/* Avatar */}
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-8 h-8 object-cover"
          />
        ) : (
          <div
            className="w-8 h-8 flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            {initials}
          </div>
        )}

        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-textSecondary)' }}
        >
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 py-2 border shadow-lg z-50"
            style={{
              backgroundColor: 'var(--color-bgPrimary)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* User info */}
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: 'var(--color-borderSubtle)' }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                {displayName}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {user.email}
              </p>
              {profile && (
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase px-2 py-0.5"
                    style={{
                      backgroundColor:
                        profile.subscription_tier === 'premium'
                          ? 'var(--color-accent)'
                          : 'var(--color-bgSecondary)',
                      color:
                        profile.subscription_tier === 'premium'
                          ? 'white'
                          : 'var(--color-textSecondary)',
                    }}
                  >
                    {profile.subscription_tier}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {profile.generations_count} generation
                    {profile.generations_count !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm transition-colors"
                style={{ color: 'var(--color-textPrimary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-bgSecondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                My Microseasons
              </Link>

              <Link
                href="/generate"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm transition-colors"
                style={{ color: 'var(--color-accent)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-bgSecondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Create New
              </Link>
            </div>

            {/* Sign out */}
            <div
              className="pt-1 border-t"
              style={{ borderColor: 'var(--color-borderSubtle)' }}
            >
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm transition-colors"
                style={{ color: 'var(--color-textSecondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--color-bgSecondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
