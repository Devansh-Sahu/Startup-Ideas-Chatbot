'use client'

import { motion } from 'framer-motion'

export function LoadingDots() {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const dotVariants = {
    start: {
      y: 0,
    },
    end: {
      y: -10,
    },
  }

  return (
    <motion.div
      className="flex gap-2 items-center"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"
          variants={dotVariants}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </motion.div>
  )
}
