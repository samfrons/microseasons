/**
 * Social sharing utilities for microseasons calendar
 */

export interface ShareableCalendarConfig {
  material?: string;
  colorPalette?: string;
  displayMode?: string;
  regionId?: string;
  vibeId?: string;
}

export interface ShareableMicroseason {
  name: string;
  japaneseKanji: string;
  date: string;
  description: string;
}

/**
 * Generate a shareable URL for calendar configuration
 */
export function generateShareUrl(config: ShareableCalendarConfig): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams();

  if (config.material) params.set('material', config.material);
  if (config.colorPalette) params.set('palette', config.colorPalette);
  if (config.displayMode) params.set('mode', config.displayMode);
  if (config.regionId) params.set('region', config.regionId);
  if (config.vibeId) params.set('vibe', config.vibeId);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Parse share parameters from URL
 */
export function parseShareParams(): ShareableCalendarConfig | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const config: ShareableCalendarConfig = {};

  const material = params.get('material');
  const palette = params.get('palette');
  const mode = params.get('mode');
  const region = params.get('region');
  const vibe = params.get('vibe');

  if (material) config.material = material;
  if (palette) config.colorPalette = palette;
  if (mode) config.displayMode = mode;
  if (region) config.regionId = region;
  if (vibe) config.vibeId = vibe;

  return Object.keys(config).length > 0 ? config : null;
}

/**
 * Generate share text for social media
 */
export function generateShareText(config: ShareableCalendarConfig): string {
  let text = 'Check out my custom Microseasons Calendar! ';

  if (config.regionId && config.vibeId) {
    text += `Personalized for my location with a ${config.vibeId} vibe. `;
  }

  if (config.material) {
    text += `Beautiful ${config.material} finish. `;
  }

  text += '🌸🍂❄️🌱';

  return text;
}

/**
 * Generate share text for a specific microseason
 */
export function generateMicroseasonShareText(microseason: ShareableMicroseason): string {
  return `"${microseason.name}" (${microseason.japaneseKanji}) - ${microseason.description} 🌸 #Microseasons #JapaneseCalendar`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Share via Web Share API (mobile)
 */
export async function shareViaWebApi(data: {
  title: string;
  text: string;
  url: string;
}): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch (err) {
    // User cancelled or share failed
    console.error('Share failed:', err);
    return false;
  }
}

/**
 * Generate Twitter/X share URL
 */
export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text,
    url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(url: string): string {
  const params = new URLSearchParams({
    u: url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(url: string): string {
  const params = new URLSearchParams({
    url,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate Reddit share URL
 */
export function getRedditShareUrl(title: string, url: string): string {
  const params = new URLSearchParams({
    title,
    url,
  });
  return `https://reddit.com/submit?${params.toString()}`;
}

/**
 * Generate Pinterest share URL
 */
export function getPinterestShareUrl(url: string, description: string, media?: string): string {
  const params = new URLSearchParams({
    url,
    description,
  });
  if (media) {
    params.set('media', media);
  }
  return `https://pinterest.com/pin/create/button/?${params.toString()}`;
}

/**
 * Generate email share URL
 */
export function getEmailShareUrl(subject: string, body: string): string {
  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:?${params.toString()}`;
}

/**
 * Download share image (for future implementation with actual screenshots)
 */
export async function downloadShareImage(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create blob'));
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/png');
  });
}
