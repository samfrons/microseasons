'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';
import { captureCanvasAsImage, recordCanvasVideo, downloadBlob, getTimestampFilename } from '@/utils/exportUtils';

interface ExportControlsProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export const ExportControls = ({ canvasRef }: ExportControlsProps) => {
  const { darkMode } = useCalendarStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportType, setExportType] = useState<'image' | 'video' | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  // Export options
  const [imageQuality, setImageQuality] = useState(0.95);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpg'>('png');
  const [videoD

uration, setVideoDuration] = useState(5);

  const handleImageExport = async () => {
    if (!canvasRef?.current) {
      alert('Calendar not ready for export. Please try again.');
      return;
    }

    setIsExporting(true);
    setExportType('image');
    setExportProgress(0);

    try {
      const canvas = canvasRef.current;

      // Simulate progress for better UX
      for (let i = 0; i <= 90; i += 10) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      const blob = await captureCanvasAsImage(canvas, {
        format: imageFormat,
        quality: imageQuality,
        resolution: { width: canvas.width, height: canvas.height },
      });

      setExportProgress(100);

      const filename = getTimestampFilename('microseasons-calendar', imageFormat);
      downloadBlob(blob, filename);

      setTimeout(() => {
        setIsExporting(false);
        setExportType(null);
        setExportProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to export image. Please try again.');
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleVideoExport = async () => {
    if (!canvasRef?.current) {
      alert('Calendar not ready for export. Please try again.');
      return;
    }

    setIsExporting(true);
    setExportType('video');
    setExportProgress(0);

    try {
      const canvas = canvasRef.current;

      const blob = await recordCanvasVideo(
        canvas,
        videoDuration,
        30,
        (progress) => {
          setExportProgress(Math.round(progress * 100));
        }
      );

      const filename = getTimestampFilename('microseasons-calendar', 'webm');
      downloadBlob(blob, filename);

      setTimeout(() => {
        setIsExporting(false);
        setExportType(null);
        setExportProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Failed to export video:', error);
      alert('Failed to export video. Please try again.');
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Export Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          onClick={handleImageExport}
          disabled={isExporting}
          className={clsx(
            'px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3',
            isExporting
              ? darkMode
                ? 'bg-sumi-700 text-washi-500'
                : 'bg-washi-300 text-sumi-500'
              : darkMode
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
          )}
          whileHover={!isExporting ? { scale: 1.02 } : {}}
          whileTap={!isExporting ? { scale: 0.98 } : {}}
        >
          <span className="text-2xl">📸</span>
          <div className="text-left">
            <div>Export Image</div>
            <div className="text-xs opacity-70">{imageFormat.toUpperCase()} • {Math.round(imageQuality * 100)}% quality</div>
          </div>
        </motion.button>

        <motion.button
          onClick={handleVideoExport}
          disabled={isExporting}
          className={clsx(
            'px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3',
            isExporting
              ? darkMode
                ? 'bg-sumi-700 text-washi-500'
                : 'bg-washi-300 text-sumi-500'
              : darkMode
              ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
              : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
          )}
          whileHover={!isExporting ? { scale: 1.02 } : {}}
          whileTap={!isExporting ? { scale: 0.98 } : {}}
        >
          <span className="text-2xl">🎥</span>
          <div className="text-left">
            <div>Export Video</div>
            <div className="text-xs opacity-70">{videoDuration}s • 30fps</div>
          </div>
        </motion.button>
      </div>

      {/* Progress Bar */}
      {isExporting && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={clsx(
            'p-4 rounded-xl',
            darkMode ? 'bg-sumi-700' : 'bg-white shadow-md'
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={clsx('text-sm font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              {exportType === 'image' ? 'Exporting Image...' : 'Recording Video...'}
            </span>
            <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
              {exportProgress}%
            </span>
          </div>
          <div className={clsx('h-2 rounded-full overflow-hidden', darkMode ? 'bg-sumi-800' : 'bg-sumi-200')}>
            <motion.div
              className={clsx(
                'h-full rounded-full',
                exportType === 'image' ? 'bg-blue-500' : 'bg-purple-500'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${exportProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      {/* Options Toggle */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={clsx(
          'w-full p-4 rounded-xl text-left transition-all duration-200',
          darkMode ? 'bg-sumi-700 hover:bg-sumi-600' : 'bg-white hover:shadow-md'
        )}
      >
        <div className="flex items-center justify-between">
          <span className={clsx('font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
            ⚙️ Export Options
          </span>
          <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
            {showOptions ? '▼' : '▶'}
          </span>
        </div>
      </button>

      {/* Options Panel */}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={clsx(
            'p-6 rounded-xl space-y-6',
            darkMode ? 'bg-sumi-700/50' : 'bg-white/50'
          )}
        >
          {/* Image Options */}
          <div>
            <h4 className={clsx('text-sm font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              Image Settings
            </h4>

            <div className="space-y-4">
              {/* Format Selection */}
              <div>
                <label className={clsx('text-sm mb-2 block', darkMode ? 'text-washi-300' : 'text-sumi-700')}>
                  Format
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setImageFormat('png')}
                    className={clsx(
                      'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      imageFormat === 'png'
                        ? darkMode
                          ? 'bg-blue-500/30 text-blue-300 ring-2 ring-blue-500/50'
                          : 'bg-blue-500 text-white ring-2 ring-blue-500/30'
                        : darkMode
                        ? 'bg-sumi-800 text-washi-400 hover:bg-sumi-700'
                        : 'bg-washi-200 text-sumi-700 hover:bg-washi-300'
                    )}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => setImageFormat('jpg')}
                    className={clsx(
                      'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      imageFormat === 'jpg'
                        ? darkMode
                          ? 'bg-blue-500/30 text-blue-300 ring-2 ring-blue-500/50'
                          : 'bg-blue-500 text-white ring-2 ring-blue-500/30'
                        : darkMode
                        ? 'bg-sumi-800 text-washi-400 hover:bg-sumi-700'
                        : 'bg-washi-200 text-sumi-700 hover:bg-washi-300'
                    )}
                  >
                    JPG
                  </button>
                </div>
              </div>

              {/* Quality Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className={clsx('text-sm', darkMode ? 'text-washi-300' : 'text-sumi-700')}>
                    Quality
                  </label>
                  <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                    {Math.round(imageQuality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={imageQuality}
                  onChange={(e) => setImageQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Video Options */}
          <div>
            <h4 className={clsx('text-sm font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              Video Settings
            </h4>

            <div className="space-y-4">
              {/* Duration Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className={clsx('text-sm', darkMode ? 'text-washi-300' : 'text-sumi-700')}>
                    Duration
                  </label>
                  <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                    {videoDuration}s
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
