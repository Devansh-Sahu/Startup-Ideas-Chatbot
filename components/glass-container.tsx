'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassContainerProps extends MotionProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassContainer({ children, className = '', glow = false, ...props }: GlassContainerProps) {
  return (
    <motion.div
      className={`
        relative
        rounded-2xl
        bg-gradient-to-br from-slate-800/40 to-slate-900/40
        border border-slate-700/50
        backdrop-blur-xl
        ${glow ? 'shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40' : 'hover:shadow-lg hover:shadow-indigo-500/10'}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
