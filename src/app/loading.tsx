'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-washi-50 via-white to-washi-100">
      <div className="text-center">
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated circles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-4 border-sakura-300"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-sakura-400" />
          </div>
        </motion.div>

        <motion.h2
          className="text-2xl font-light text-sumi-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loading Microseasons
        </motion.h2>

        <motion.p
          className="text-sm text-sumi-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Preparing your calendar experience...
        </motion.p>
      </div>
    </div>
  );
}
