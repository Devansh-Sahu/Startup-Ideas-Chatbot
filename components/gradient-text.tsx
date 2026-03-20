'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function GradientText({ children, className = '', animate = true }: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent font-semibold ${className}`}
      animate={
        animate
          ? {
              backgroundPosition: ['0%', '100%', '0%'],
            }
          : {}
      }
      transition={
        animate
          ? {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }
          : {}
      }
    >
      {children}
    </motion.span>
  )
}
