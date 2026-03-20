'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MessageBubbleProps {
  content: ReactNode
  isUser: boolean
  delay?: number
}

export function MessageBubble({ content, isUser, delay = 0 }: MessageBubbleProps) {
  const bubbleVariants = {
    hidden: {
      opacity: 0,
      x: isUser ? 30 : -30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-md px-4 py-3 rounded-lg backdrop-blur-xl transition-all duration-300 ${
          isUser
            ? 'bg-gradient-to-br from-amber-700/30 to-yellow-700/20 text-white rounded-br-none border border-amber-600/40 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40'
            : 'bg-slate-900/40 text-slate-100 rounded-bl-none border border-slate-700/60 shadow-lg shadow-black/40 hover:border-slate-600/60'
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {content}
        </motion.div>
      </div>
    </motion.div>
  )
}
