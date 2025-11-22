// Export utilities for calendar images and videos

export interface ExportOptions {
  format: 'png' | 'jpg' | 'gif' | 'mp4';
  quality: number; // 0-1
  resolution: {
    width: number;
    height: number;
  };
  includeDate?: boolean;
  backgroundColor?: string;
}

export interface VideoExportOptions extends ExportOptions {
  duration: number; // seconds
  fps: number;
  animationType: 'rotate' | 'zoom' | 'transition' | 'seasonal';
}

// Capture canvas as image
export async function captureCanvasAsImage(
  canvas: HTMLCanvasElement,
  options: ExportOptions
): Promise<Blob> {
  const { format, quality } = options;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to capture canvas'));
        }
      },
      `image/${format === 'jpg' ? 'jpeg' : format}`,
      quality
    );
  });
}

// Download blob as file
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Capture multiple frames for video/GIF
export async function captureFrames(
  canvas: HTMLCanvasElement,
  frameCount: number,
  onProgress?: (progress: number) => void
): Promise<Blob[]> {
  const frames: Blob[] = [];

  for (let i = 0; i < frameCount; i++) {
    const blob = await captureCanvasAsImage(canvas, {
      format: 'png',
      quality: 0.95,
      resolution: { width: canvas.width, height: canvas.height },
    });

    frames.push(blob);

    if (onProgress) {
      onProgress((i + 1) / frameCount);
    }

    // Small delay between captures
    await new Promise(resolve => setTimeout(resolve, 16)); // ~60fps
  }

  return frames;
}

// Get timestamp for filename
export function getTimestampFilename(prefix: string, extension: string): string {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .split('.')[0];
  return `${prefix}_${timestamp}.${extension}`;
}

// Resize canvas to target resolution
export function resizeCanvas(
  sourceCanvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
): HTMLCanvasElement {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = targetWidth;
  resizedCanvas.height = targetHeight;

  const ctx = resizedCanvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2d context');

  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);

  return resizedCanvas;
}

// Create GIF from frames using browser API
export async function createGifFromFrames(
  frames: Blob[],
  options: { fps: number; quality: number }
): Promise<Blob> {
  // This is a simplified version - in production, you'd use a library like gif.js
  // For now, we'll just return the first frame
  // TODO: Implement proper GIF encoding with a library
  return frames[0];
}

// Record video using MediaRecorder API
export async function recordCanvasVideo(
  canvas: HTMLCanvasElement,
  duration: number,
  fps: number = 30,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 5000000, // 5 Mbps
  });

  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      resolve(blob);
    };

    recorder.onerror = (e) => {
      reject(e);
    };

    recorder.start();

    // Progress tracking
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      if (onProgress) {
        onProgress(progress);
      }

      if (progress >= 1) {
        clearInterval(progressInterval);
      }
    }, 100);

    const startTime = Date.now();

    // Stop recording after duration
    setTimeout(() => {
      clearInterval(progressInterval);
      recorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, duration * 1000);
  });
}

// Add watermark or date overlay
export function addOverlayToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right'
): HTMLCanvasElement {
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = canvas.width;
  overlayCanvas.height = canvas.height;

  const ctx = overlayCanvas.getContext('2d');
  if (!ctx) return canvas;

  // Draw original canvas
  ctx.drawImage(canvas, 0, 0);

  // Add text overlay
  ctx.font = '24px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = 3;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = 24;
  const padding = 20;

  let x, y;
  switch (position) {
    case 'top-left':
      x = padding;
      y = padding + textHeight;
      break;
    case 'top-right':
      x = canvas.width - textWidth - padding;
      y = padding + textHeight;
      break;
    case 'bottom-left':
      x = padding;
      y = canvas.height - padding;
      break;
    case 'bottom-right':
    default:
      x = canvas.width - textWidth - padding;
      y = canvas.height - padding;
      break;
  }

  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);

  return overlayCanvas;
}
