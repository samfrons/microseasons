'use client';

import { GeneratorWizard } from '@/components/Generator';

export default function GeneratePage() {
  return (
    <main
      className="min-h-screen pt-24 lg:pt-32 pb-16"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[1600px]">
        <GeneratorWizard />
      </div>
    </main>
  );
}
