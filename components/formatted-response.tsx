'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb, Zap, Target, DollarSign } from 'lucide-react'

interface FormattedResponseProps {
  content: string
}

const sectionIcons: Record<string, ReactNode> = {
  'Idea Summary': <CheckCircle className="w-5 h-5" />,
  'Market Potential': <TrendingUp className="w-5 h-5" />,
  'Target Users': <Users className="w-5 h-5" />,
  'Problem Solved': <AlertCircle className="w-5 h-5" />,
  'Solution Approach': <Lightbulb className="w-5 h-5" />,
  'Revenue Model': <DollarSign className="w-5 h-5" />,
  'Competitive Landscape': <Target className="w-5 h-5" />,
  'Go-to-Market Strategy': <Zap className="w-5 h-5" />,
  'Key Challenges': <AlertCircle className="w-5 h-5" />,
  'Next Steps': <CheckCircle className="w-5 h-5" />,
}

export function FormattedResponse({ content }: FormattedResponseProps) {
  const sections = content.split(/(?=\*\*[^*]+\*\*:)/g).filter((s) => s.trim())

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {sections.map((section, idx) => {
        const titleMatch = section.match(/\*\*([^*]+)\*\*:/)
        const title = titleMatch ? titleMatch[1] : ''
        const body = section.replace(/\*\*[^*]+\*\*:/, '').trim()

        const icon = sectionIcons[title] || <CheckCircle className="w-5 h-5" />

        return (
          <motion.div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -2 }}
          >
            {title && (
              <motion.div 
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 + 0.1 }}
              >
                <motion.span 
                  className="text-zinc-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ delay: idx * 0.08 + 0.2, duration: 3, repeat: Infinity }}
                >
                  {icon}
                </motion.span>
                <h3 className="font-semibold text-zinc-100">{title}</h3>
              </motion.div>
            )}
            <p className="text-zinc-300 text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap">{body}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
