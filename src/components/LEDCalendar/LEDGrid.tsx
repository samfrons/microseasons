'use client';

import { motion } from 'framer-motion';
import { useLEDStore, LEDColor } from '@/store/useLEDStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface LEDGridProps {
  year: number;
  month: number;
  onDayClick?: (day: number) => void;
}

const LED_COLORS: Record<LEDColor, { bg: string; glow: string; ring: string }> = {
  off: { bg: 'bg-gray-300 dark:bg-gray-700', glow: '', ring: 'ring-gray-400 dark:ring-gray-600' },
  green: { bg: 'bg-green-500', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.6)]', ring: 'ring-green-400' },
  blue: { bg: 'bg-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.6)]', ring: 'ring-blue-400' },
  amber: { bg: 'bg-amber-500', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.6)]', ring: 'ring-amber-400' },
  red: { bg: 'bg-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]', ring: 'ring-red-400' },
  purple: { bg: 'bg-purple-500', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]', ring: 'ring-purple-400' },
  pink: { bg: 'bg-pink-500', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.6)]', ring: 'ring-pink-400' },
};

export const LEDGrid = ({ year, month, onDayClick }: LEDGridProps) => {
  const { darkMode } = useCalendarStore();
  const { getLEDForDate, toggleLED, activeColor } = useLEDStore();

  // Get days in month
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null); // Empty cells before month starts
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDayClick = (day: number | null) => {
    if (!day) return;

    toggleLED(year, month, day);
    onDayClick?.(day);
  };

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className={clsx(
              'text-center text-xs font-medium',
              darkMode ? 'text-washi-400' : 'text-sumi-600'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const led = getLEDForDate(year, month, day);
          const ledColor = led?.color || 'off';
          const colorStyle = LED_COLORS[ledColor];
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() + 1 &&
            year === new Date().getFullYear();

          return (
            <motion.button
              key={day}
              onClick={() => handleDayClick(day)}
              className={clsx(
                'aspect-square rounded-lg relative flex items-center justify-center',
                'transition-all duration-200',
                'hover:scale-110 hover:z-10',
                colorStyle.bg,
                ledColor !== 'off' && colorStyle.glow,
                isToday && 'ring-2 ring-offset-2',
                isToday ? colorStyle.ring : '',
                darkMode ? 'ring-offset-sumi-900' : 'ring-offset-white'
              )}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01, duration: 0.2 }}
            >
              {/* Day number */}
              <span
                className={clsx(
                  'text-sm font-medium z-10',
                  ledColor === 'off'
                    ? darkMode
                      ? 'text-washi-300'
                      : 'text-sumi-700'
                    : 'text-white drop-shadow-md'
                )}
              >
                {day}
              </span>

              {/* LED indicator dot */}
              {ledColor !== 'off' && (
                <motion.div
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Today indicator */}
              {isToday && ledColor === 'off' && (
                <div className="absolute inset-0 rounded-lg border-2 border-amber-500 pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
