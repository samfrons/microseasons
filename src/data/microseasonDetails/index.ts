import { springMicroseasons } from './springDetails';
import { MicroseasonDetail } from './types';

export * from './types';

// Aggregate all microseason details
// For now, we have spring details. Add more seasons as needed.
export const allMicroseasonDetails: Record<string, MicroseasonDetail> = {};

// Index spring microseasons
springMicroseasons.forEach(ms => {
  allMicroseasonDetails[ms.id] = ms;
});

// Helper function to get microseason detail by ID
export function getMicroseasonDetail(id: string): MicroseasonDetail | null {
  return allMicroseasonDetails[id] || null;
}

// Helper to get microseason detail by name (fuzzy match)
export function getMicroseasonDetailByName(name: string): MicroseasonDetail | null {
  const normalized = name.toLowerCase().trim();
  return Object.values(allMicroseasonDetails).find(
    ms => ms.name.toLowerCase() === normalized ||
          ms.japaneseRomaji.toLowerCase() === normalized
  ) || null;
}

// Get all details
export function getAllMicroseasonDetails(): MicroseasonDetail[] {
  return Object.values(allMicroseasonDetails);
}
