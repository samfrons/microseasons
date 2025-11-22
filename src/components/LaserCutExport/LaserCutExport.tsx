'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  generateLaserCutFiles,
  downloadLaserCutFile,
  downloadAllLaserCutFiles,
  type LaserCutOptions,
  type LaserCutFile,
} from '@/utils/laserCutGenerator';

export const LaserCutExport = () => {
  const [options, setOptions] = useState<LaserCutOptions>({
    size: '20',
    material: 'walnut',
    thickness: 6,
    includeAssemblyGuide: true,
    includeMountingHoles: true,
    tileGridSize: { rows: 12, cols: 6 }, // 72 tiles for microseasons
  });

  const [generatedFiles, setGeneratedFiles] = useState<LaserCutFile[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewFile, setPreviewFile] = useState<LaserCutFile | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate processing time
    setTimeout(() => {
      const files = generateLaserCutFiles(options);
      setGeneratedFiles(files);
      setPreviewFile(files[0]);
      setIsGenerating(false);
    }, 500);
  };

  const handleDownloadAll = async () => {
    if (!generatedFiles) return;
    await downloadAllLaserCutFiles(generatedFiles);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Laser Cut Files
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate production-ready vector files for laser cutting and engraving your physical microseasons calendar.
          Files include separate layers for cutting, engraving, and scoring.
        </p>
      </div>

      {/* Configuration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Size Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Calendar Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['16', '20', '24'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setOptions(prev => ({ ...prev, size }))}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all
                    ${options.size === size
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {size}"
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Diagonal measurement (width will be 4:3 ratio)
            </p>
          </div>

          {/* Material Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Wood Material
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['walnut', 'maple', 'oak'] as const).map(material => (
                <button
                  key={material}
                  onClick={() => setOptions(prev => ({ ...prev, material }))}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all capitalize
                    ${options.material === material
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {material}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Label will be engraved on frame
            </p>
          </div>

          {/* Material Thickness */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Material Thickness (mm)
            </label>
            <input
              type="number"
              min="3"
              max="12"
              step="0.5"
              value={options.thickness}
              onChange={e => setOptions(prev => ({ ...prev, thickness: parseFloat(e.target.value) }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Recommended: 6mm for wood, 3mm for acrylic
            </p>
          </div>

          {/* Grid Configuration */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tile Grid
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="24"
                value={options.tileGridSize.rows}
                onChange={e => setOptions(prev => ({
                  ...prev,
                  tileGridSize: { ...prev.tileGridSize, rows: parseInt(e.target.value) }
                }))}
                className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
              />
              <span className="text-gray-500 dark:text-gray-400">×</span>
              <input
                type="number"
                min="1"
                max="24"
                value={options.tileGridSize.cols}
                onChange={e => setOptions(prev => ({
                  ...prev,
                  tileGridSize: { ...prev.tileGridSize, cols: parseInt(e.target.value) }
                }))}
                className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                = {options.tileGridSize.rows * options.tileGridSize.cols} tiles
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Default 12×6 = 72 tiles (one per microseason)
            </p>
          </div>
        </div>

        {/* Options Toggles */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeMountingHoles}
              onChange={e => setOptions(prev => ({ ...prev, includeMountingHoles: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Include mounting holes
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                4 corner holes for wall mounting (6mm diameter)
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeAssemblyGuide}
              onChange={e => setOptions(prev => ({ ...prev, includeAssemblyGuide: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generate assembly guide
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Includes step-by-step instructions and parts diagram
              </p>
            </div>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600
                   text-white font-semibold rounded-lg shadow-lg
                   hover:from-emerald-600 hover:to-teal-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all transform hover:scale-[1.02]"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating Files...
            </span>
          ) : (
            'Generate Laser Cut Files'
          )}
        </button>
      </motion.div>

      {/* Generated Files */}
      {generatedFiles && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Files List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Files ({generatedFiles.length})
              </h3>
              <button
                onClick={handleDownloadAll}
                className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg
                         hover:bg-emerald-600 transition-colors shadow-md"
              >
                Download All
              </button>
            </div>

            <div className="space-y-3">
              {generatedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg
                           bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700
                           transition-colors cursor-pointer group"
                  onClick={() => setPreviewFile(file)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {file.filename}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {file.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewFile(file);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300
                               hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadLaserCutFile(file);
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg
                               hover:bg-emerald-600 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {previewFile && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Preview: {previewFile.filename}
              </h3>
              <div className="bg-white rounded-lg p-8 border border-gray-200 dark:border-gray-700 overflow-auto">
                <div
                  className="max-w-full"
                  dangerouslySetInnerHTML={{ __html: previewFile.svg }}
                />
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Layer Guide:
                </h4>
                <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded"></span>
                    <strong>Red:</strong> Cut through material
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-500 rounded"></span>
                    <strong>Blue:</strong> Engrave (surface etch)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-500 rounded"></span>
                    <strong>Green:</strong> Score (light cut/fold line)
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Technical Specifications */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Frame Dimensions</p>
                <p className="font-mono text-lg">
                  {(parseInt(options.size) * 25.4).toFixed(1)} × {(parseInt(options.size) * 0.75 * 25.4).toFixed(1)} mm
                </p>
              </div>
              <div>
                <p className="text-gray-400">Material</p>
                <p className="font-mono text-lg capitalize">{options.material} ({options.thickness}mm)</p>
              </div>
              <div>
                <p className="text-gray-400">Tile Grid</p>
                <p className="font-mono text-lg">
                  {options.tileGridSize.rows} × {options.tileGridSize.cols} = {options.tileGridSize.rows * options.tileGridSize.cols} tiles
                </p>
              </div>
              <div>
                <p className="text-gray-400">File Format</p>
                <p className="font-mono text-lg">SVG (vector)</p>
              </div>
              <div>
                <p className="text-gray-400">Kerf Compensation</p>
                <p className="font-mono text-lg">0.2mm (adjustable in laser settings)</p>
              </div>
              <div>
                <p className="text-gray-400">Mounting</p>
                <p className="font-mono text-lg">{options.includeMountingHoles ? '4 corner holes (6mm)' : 'No holes'}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-medium mb-2">Manufacturing Notes:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Recommended laser power: 60-80% for cutting, 20-40% for engraving</li>
                <li>• Cut speed: 10-15 mm/s for {options.thickness}mm wood</li>
                <li>• Engrave speed: 150-200 mm/s for detail work</li>
                <li>• LED diffuser: Use 3mm frosted acrylic (separate material)</li>
                <li>• Test cut settings on scrap material first</li>
                <li>• Ensure proper ventilation during laser cutting</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Getting Started Guide */}
      {!generatedFiles && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h3>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Configure your calendar</p>
                <p>Choose size, material, and grid layout above</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Generate vector files</p>
                <p>Click the button to create all necessary SVG files</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Send to laser cutter</p>
                <p>Download files and import into your laser cutting software (e.g., LightBurn, RDWorks)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                4
              </span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Assemble your calendar</p>
                <p>Follow the assembly guide to put all pieces together</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
