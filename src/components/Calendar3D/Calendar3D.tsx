'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useCalendarStore } from '@/store/useCalendarStore';
import { getCurrentMicroseason, microseasons } from '@/data/microseasons';
import { createCalendarMaterial } from '@/utils/materials';

export function Calendar3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { material, darkMode, autoRotate, rotationSpeed, displayMode, colorPalette } =
    useCalendarStore();

  const currentMicroseason = getCurrentMicroseason();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  // Auto-rotate the calendar
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.1;
    }

    // Subtle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const calendarMaterial = useMemo(
    () => createCalendarMaterial(material, darkMode),
    [material, darkMode]
  );

  const accentColor = useMemo(() => {
    if (colorPalette === 'sakura') return '#FFB8C8';
    if (colorPalette === 'sumi') return '#495057';
    if (colorPalette === 'seasonal') {
      return currentMicroseason.colors[0];
    }
    return darkMode ? '#78716c' : '#44403c';
  }, [colorPalette, darkMode, currentMicroseason]);

  // Generate calendar grid for current month
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [currentMonth, currentDate]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main calendar base */}
      <RoundedBox
        args={[6, 0.3, 8]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          {...calendarMaterial}
          color={calendarMaterial.color}
        />
      </RoundedBox>

      {/* Microseason display panel - top section */}
      <RoundedBox
        args={[5.5, 0.35, 2]}
        radius={0.08}
        smoothness={4}
        position={[0, 0.35, 2.8]}
      >
        <meshStandardMaterial
          color={accentColor}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Microseason text */}
      <Text
        position={[0, 0.55, 2.8]}
        fontSize={displayMode === 'microseason-primary' ? 0.35 : 0.25}
        color={darkMode ? '#1c1917' : '#fafaf9'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSerifJP-Regular.otf"
        maxWidth={5}
      >
        {currentMicroseason.nameJa}
      </Text>

      <Text
        position={[0, 0.4, 3.2]}
        fontSize={0.15}
        color={darkMode ? '#292524' : '#f5f5f4'}
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        {currentMicroseason.nameEn}
      </Text>

      {/* Calendar grid - 7 columns for days of week */}
      {calendarDays.slice(0, 31).map((day, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        const xPos = -2.5 + col * 0.75;
        const zPos = 1.5 - row * 0.75;
        const isToday = day === currentDay;

        return (
          <group key={day} position={[xPos, 0.35, zPos]}>
            {/* Day cell */}
            <RoundedBox
              args={[0.65, 0.02, 0.65]}
              radius={0.05}
              smoothness={4}
            >
              <meshStandardMaterial
                color={isToday ? accentColor : darkMode ? '#44403c' : '#e7e5e4'}
                roughness={0.5}
                metalness={0.1}
              />
            </RoundedBox>

            {/* Day number */}
            <Text
              position={[0, 0.05, 0]}
              fontSize={displayMode === 'western-primary' ? 0.3 : 0.22}
              color={isToday ? '#fafaf9' : darkMode ? '#e7e5e4' : '#1c1917'}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.ttf"
            >
              {day}
            </Text>
          </group>
        );
      })}

      {/* Decorative elements based on current microseason */}
      {currentMicroseason.imagery.includes('blossoms') && (
        <>
          <mesh position={[2.8, 0.5, 3]} scale={0.15}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFB8C8" roughness={0.4} />
          </mesh>
          <mesh position={[-2.8, 0.5, 3]} scale={0.15}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#FFD8E8" roughness={0.4} />
          </mesh>
        </>
      )}

      {/* Ambient glow effect */}
      <pointLight
        position={[0, 2, 0]}
        intensity={0.5}
        distance={10}
        decay={2}
        color={accentColor}
      />
    </group>
  );
}
