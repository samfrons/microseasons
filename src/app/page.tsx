'use client';

import { HeroSection } from '@/components/HeroSection/HeroSection';
import { MicroseasonsSection } from '@/components/MicroseasonsSection/MicroseasonsSection';
import { PhysicalCalendarSection } from '@/components/PhysicalCalendarSection/PhysicalCalendarSection';
import { Footer } from '@/components/Footer/Footer';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useEffect } from 'react';

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
        <HeroSection />
        <MicroseasonsSection />
        <PhysicalCalendarSection />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
