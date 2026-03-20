'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroTextProps {
  children: ReactNode
  delay?: number
}

export function HeroText({ children, delay = 0 }: HeroTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedGradient({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 bg-clip-text text-transparent bg-300% animate-pulse"
      animate={{
        backgroundPosition: ['0%', '100%', '0%'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}
