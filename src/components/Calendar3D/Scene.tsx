'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Calendar3D } from './Calendar3D';
import { useCalendarStore } from '@/store/useCalendarStore';

export function Scene() {
  const { darkMode } = useCalendarStore();

  return (
    <div className="relative w-full h-full">
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
    </div>
  );
}
