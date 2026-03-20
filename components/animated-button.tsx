'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
}: AnimatedButtonProps) {
  const variantStyles = {
    primary: 'bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-xl hover:shadow-white/10 relative overflow-hidden border border-zinc-200/40 backdrop-blur-xl',
    secondary: 'bg-zinc-800/40 text-zinc-100 border border-zinc-700/60 hover:bg-zinc-700/50 backdrop-blur-xl',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      onClick={onClick}
      className={`rounded-lg font-semibold transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/15 rounded-lg"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.span className="relative block">{children}</motion.span>
    </motion.button>
  )
}
