'use client';

import { HeroSection } from '@/components/HeroSection/HeroSection';
import ConvergenceSection from '@/components/ConvergenceSection';
import LocationSpecificSection from '@/components/LocationSpecificSection';
import { MicroseasonsSection } from '@/components/MicroseasonsSection/MicroseasonsSection';
import CommunityObservationsSection from '@/components/CommunityObservationsSection';
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
        {/* New bioreactor-focused hero */}
        <HeroSection />

        {/* The Convergence - bioelectrochemistry meets daily ritual */}
        <ConvergenceSection />

        {/* Location-specific microseasons */}
        <LocationSpecificSection />

        {/* 72 Microseasons showcase */}
        <MicroseasonsSection />

        {/* Community observations platform */}
        <CommunityObservationsSection />

        {/* Physical product showcase */}
        <PhysicalCalendarSection />

        <Footer />
      </main>
    </ThemeProvider>
  );
}
