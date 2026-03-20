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
      className="px-6 py-2 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-amber-600/40 text-slate-100 text-sm font-medium hover:border-amber-500/70 transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.08,
        boxShadow: '0 0 30px rgba(192, 160, 128, 0.5)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        delay,
        duration: 0.4,
        ease: 'easeOut',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/20 to-amber-600/0 opacity-0 group-hover:opacity-100"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="relative">{text}</span>
    </motion.button>
  )
}
