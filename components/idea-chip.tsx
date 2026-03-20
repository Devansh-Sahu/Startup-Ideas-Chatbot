'use client'

import { motion } from 'framer-motion'

interface IdeaChipProps {
  text: string
  onClick: () => void
  delay?: number
}

export function IdeaChip({ text, onClick, delay = 0 }: IdeaChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className="px-6 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500/70 transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        delay,
        duration: 0.4,
        ease: 'easeOut',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.button>
  )
}
