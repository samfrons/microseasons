/**
 * Calendar export utilities for iCal and Google Calendar
 */

import { Microseason } from '@/data/microseasons';

/**
 * Generate iCal format event
 */
function generateICalEvent(microseason: Microseason, year: number): string {
  const startDate = new Date(`${year}-${microseason.startDate}`);
  const endDate = new Date(`${year}-${microseason.endDate}`);

  // Format dates for iCal (YYYYMMDD)
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  // Generate unique ID
  const uid = `microseason-${microseason.id}-${year}@microseasons.app`;

  // Current timestamp
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${timestamp}
DTSTART;VALUE=DATE:${formatDate(startDate)}
DTEND;VALUE=DATE:${formatDate(endDate)}
SUMMARY:${microseason.nameEn}
DESCRIPTION:${microseason.nameJa}\\n\\n${microseason.description || 'A Japanese microseason marking subtle environmental changes.'}
LOCATION:
STATUS:CONFIRMED
TRANSP:TRANSPARENT
CATEGORIES:Microseasons,Nature,Japanese Calendar
END:VEVENT
`;
}

/**
 * Generate complete iCal file for all microseasons
 */
export function generateICalFile(microseasons: Microseason[], year: number = new Date().getFullYear()): string {
  const events = microseasons.map(ms => generateICalEvent(ms, year)).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microseasons Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Microseasons ${year}
X-WR-TIMEZONE:UTC
X-WR-CALDESC:The 72 Japanese microseasons for ${year}
${events}
END:VCALENDAR
`;
}

/**
 * Download iCal file
 */
export function downloadICalFile(microseasons: Microseason[], year?: number): void {
  const icalContent = generateICalFile(microseasons, year);
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `microseasons-${year || new Date().getFullYear()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate Google Calendar URL for a single microseason
 */
export function getGoogleCalendarUrl(microseason: Microseason, year: number = new Date().getFullYear()): string {
  const startDate = new Date(`${year}-${microseason.startDate}`);
  const endDate = new Date(`${year}-${microseason.endDate}`);

  // Format dates for Google Calendar (YYYYMMDD)
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${microseason.nameEn} (${microseason.nameJa})`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: microseason.description || 'A Japanese microseason marking subtle environmental changes.',
    ctz: 'UTC',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Add single microseason to Google Calendar
 */
export function addToGoogleCalendar(microseason: Microseason, year?: number): void {
  const url = getGoogleCalendarUrl(microseason, year);
  window.open(url, '_blank');
}

/**
 * Generate Outlook/Office 365 calendar URL
 */
export function getOutlookCalendarUrl(microseason: Microseason, year: number = new Date().getFullYear()): string {
  const startDate = new Date(`${year}-${microseason.startDate}`);
  const endDate = new Date(`${year}-${microseason.endDate}`);

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `${microseason.nameEn} (${microseason.nameJa})`,
    body: microseason.description || 'A Japanese microseason marking subtle environmental changes.',
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
    allday: 'true',
  });

  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Add single microseason to Outlook
 */
export function addToOutlook(microseason: Microseason, year?: number): void {
  const url = getOutlookCalendarUrl(microseason, year);
  window.open(url, '_blank');
}

/**
 * Get Apple Calendar webcal URL (for iCal download)
 */
export function getAppleCalendarUrl(icalBlob: Blob): string {
  const url = URL.createObjectURL(icalBlob);
  return url.replace('http://', 'webcal://').replace('https://', 'webcal://');
}

/**
 * Export calendar events to JSON (for backup/restore)
 */
export function exportToJSON(microseasons: Microseason[], year: number = new Date().getFullYear()): string {
  const events = microseasons.map(ms => ({
    id: ms.id,
    name: ms.nameEn,
    nameJa: ms.nameJa,
    startDate: `${year}-${ms.startDate}`,
    endDate: `${year}-${ms.endDate}`,
    description: ms.description,
    solarTerm: ms.solarTerm,
  }));

  return JSON.stringify({
    year,
    exportDate: new Date().toISOString(),
    events,
  }, null, 2);
}

/**
 * Download JSON backup
 */
export function downloadJSONBackup(microseasons: Microseason[], year?: number): void {
  const jsonContent = exportToJSON(microseasons, year);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `microseasons-${year || new Date().getFullYear()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export to CSV format
 */
export function exportToCSV(microseasons: Microseason[], year: number = new Date().getFullYear()): string {
  const headers = ['Start Date', 'End Date', 'English Name', 'Japanese Name', 'Solar Term', 'Description'];
  const rows = microseasons.map(ms => [
    `${year}-${ms.startDate}`,
    `${year}-${ms.endDate}`,
    `"${ms.nameEn}"`,
    `"${ms.nameJa}"`,
    `"${ms.solarTerm}"`,
    `"${(ms.description || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(microseasons: Microseason[], year?: number): void {
  const csvContent = exportToCSV(microseasons, year);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `microseasons-${year || new Date().getFullYear()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
