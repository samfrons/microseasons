/**
 * The registry the gallery page, the linter tests and the static exporter
 * iterate. Add a sheet here and it is linted, rendered and listed.
 */
import { microseasons } from '@/data/microseasons';
import { buildCalendarTwin } from '../build-calendar';
import type { CalendarTwinSpec, PidSpec } from '../spec';
import { arrayPid } from './array-pid';
import { buildPanelPid } from './panel-pid';

export { arrayPid, buildPanelPid };

/** A fixed date so the registry is deterministic in tests and static export. */
export const REGISTRY_TODAY = new Date(2026, 1, 4);

export const CALENDAR_TWIN: CalendarTwinSpec = buildCalendarTwin(microseasons, { today: REGISTRY_TODAY });

/** Every P&ID sheet: the array plus one per panel. */
export const PID_SHEETS: Record<string, PidSpec> = {
  [arrayPid.id]: arrayPid,
  ...Object.fromEntries(CALENDAR_TWIN.panels.map((p) => [`pid-panel-${p.id}`, buildPanelPid(p)])),
};

export function getPanelPid(panelId: string): PidSpec | undefined {
  return PID_SHEETS[`pid-panel-${panelId}`];
}
