'use client';

import { HeroSection } from '@/components/HeroSection/HeroSection';
import { MicroseasonsSection } from '@/components/MicroseasonsSection/MicroseasonsSection';
import { PhysicalCalendarSection } from '@/components/PhysicalCalendarSection/PhysicalCalendarSection';
import { ArchitecturalRendersSection } from '@/components/ArchitecturalRenders';
import { Footer } from '@/components/Footer/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function Home() {
  const { darkMode } = useCalendarStore();

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeProvider>
      <main
        className="min-h-screen transition-colors duration-500"
        style={{ backgroundColor: 'var(--color-bgPrimary)' }}
      >
        {/* Theme Switcher - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeSwitcher />
        </div>

        <HeroSection />
        <MicroseasonsSection />
        <PhysicalCalendarSection />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
