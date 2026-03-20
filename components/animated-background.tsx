'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb - Top left */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-700/20 to-yellow-700/15 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary gradient orb - Bottom right */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-800/15 to-orange-700/10 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Tertiary accent - Top right */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-amber-600/10 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Subtle bottom glow */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-t from-amber-700/10 to-transparent rounded-full blur-3xl"
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </div>
  )
}
