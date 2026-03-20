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
            className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {title && (
              <motion.div 
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 + 0.1 }}
              >
                <motion.span 
                  className="text-indigo-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: idx * 0.08 + 0.2, duration: 2, repeat: Infinity }}
                >
                  {icon}
                </motion.span>
                <h3 className="font-semibold text-indigo-300">{title}</h3>
              </motion.div>
            )}
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
