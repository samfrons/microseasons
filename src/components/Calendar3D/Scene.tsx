'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Calendar3D } from './Calendar3D';
import { useCalendarStore } from '@/store/useCalendarStore';

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
      <div className="text-center">
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
          style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Loading 3D view...</p>
      </div>
    </div>
  );
}

export function Scene() {
  const { darkMode } = useCalendarStore();

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />

        {/* Lighting setup for premium look */}
        <ambientLight intensity={darkMode ? 0.3 : 0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={darkMode ? 0.8 : 1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-10, 5, -5]}
          intensity={darkMode ? 0.3 : 0.5}
        />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={darkMode ? 0.5 : 0.8}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset={darkMode ? 'night' : 'city'} />

        {/* Main calendar */}
        <Calendar3D />

        {/* Interactive controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={8}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      </Suspense>
    </div>
  );
}
