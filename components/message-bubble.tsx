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
      className="w-full flex"
    >
      <div
        className={`w-full max-w-4xl mx-auto px-4 sm:px-6 py-3 transition-all duration-300 ${
          isUser
            ? 'flex justify-end'
            : 'flex justify-start'
        }`}
      >
        <div 
          className={`px-5 py-3.5 text-[15px] sm:text-base leading-relaxed ${
            isUser
              ? 'bg-zinc-800 text-zinc-100 rounded-3xl rounded-br-sm max-w-[85%] sm:max-w-[75%]'
              : 'bg-transparent text-zinc-200 min-w-full'
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
      </div>
    </motion.div>
  )
}
