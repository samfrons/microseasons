import * as THREE from 'three';
import { MaterialType } from '@/store/useCalendarStore';

export function getMaterialProperties(type: MaterialType, darkMode: boolean) {
  const baseProps = {
    wood: {
      color: darkMode ? '#3a2f26' : '#8b6f47',
      roughness: 0.8,
      metalness: 0.1,
      normalScale: 0.3,
    },
    paper: {
      color: darkMode ? '#e8e0d5' : '#faf8f3',
      roughness: 0.9,
      metalness: 0.0,
      normalScale: 0.1,
    },
    metal: {
      color: darkMode ? '#4a4a4a' : '#b8b8b8',
      roughness: 0.3,
      metalness: 0.9,
      normalScale: 0.2,
    },
    ceramic: {
      color: darkMode ? '#d8d0c8' : '#f5f0ea',
      roughness: 0.4,
      metalness: 0.2,
      normalScale: 0.15,
    },
  };

  return baseProps[type];
}

export function createCalendarMaterial(type: MaterialType, darkMode: boolean): THREE.MeshStandardMaterial {
  const props = getMaterialProperties(type, darkMode);

  return new THREE.MeshStandardMaterial({
    color: props.color,
    roughness: props.roughness,
    metalness: props.metalness,
    side: THREE.DoubleSide,
  });
}

export function getSeasonalColor(seasonId: number, palette: string): string {
  // Import color from microseason data or generate based on season
  const seasonalColors = {
    spring: ['#FFD8E8', '#C8E8D4', '#E8F4F8'],
    summer: ['#F8E888', '#A8D890', '#78C898'],
    autumn: ['#F8B878', '#E8A858', '#D84860'],
    winter: ['#E8F0F8', '#D8E0E8', '#C8D0D8'],
  };

  const season = Math.floor((seasonId - 1) / 18);
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  const seasonKey = seasons[season] as keyof typeof seasonalColors;

  return seasonalColors[seasonKey][seasonId % 3];
}
