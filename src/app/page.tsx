'use client';

import { HeroSection } from '@/components/HeroSection/HeroSection';
import { MicroseasonsSection } from '@/components/MicroseasonsSection/MicroseasonsSection';
import { PhysicalCalendarSection } from '@/components/PhysicalCalendarSection/PhysicalCalendarSection';
import { ArchitecturalRendersSection } from '@/components/ArchitecturalRenders';
import { Footer } from '@/components/Footer/Footer';
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
    <main
      className={clsx(
        'min-h-screen transition-colors duration-500',
        darkMode ? 'bg-sumi-900' : 'bg-washi-50'
      )}
    >
      <HeroSection />
      <MicroseasonsSection />
      <PhysicalCalendarSection />
      <ArchitecturalRendersSection />
      <Footer />
    </main>
  );
}
