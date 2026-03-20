'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HeroText, AnimatedGradient } from '@/components/hero-text'
import { AnimatedButton } from '@/components/animated-button'
import { IdeaChip } from '@/components/idea-chip'
import { Sparkles, ArrowRight, Brain, Zap, Target } from 'lucide-react'

const exampleIdeas = [
  'AI Writing Assistant',
  'Fitness App with AI Coach',
  'Smart Home Automation',
  'Personal Finance AI',
  'Mental Health Bot',
]

export default function Home() {
  const router = useRouter()

  const handleStartChat = () => {
    router.push('/chat')
  }

  const handleIdeaClick = (idea: string) => {
    router.push(`/chat?idea=${encodeURIComponent(idea)}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 max-w-5xl mx-auto">
        {/* Logo/Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-200 text-sm font-medium">AI-Powered Startup Mentor</span>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-8 text-center px-2">
          <HeroText delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Turn Your <AnimatedGradient>Ideas Into Reality</AnimatedGradient>
            </h1>
          </HeroText>

          <HeroText delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Get instant AI feedback on your startup ideas. Validate, refine, and launch with confidence.
            </p>
          </HeroText>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { icon: Brain, label: 'Smart Analysis', desc: 'AI analyzes your idea comprehensively' },
            { icon: Zap, label: 'Instant Feedback', desc: 'Get results in seconds' },
            { icon: Target, label: 'Market Insights', desc: 'Understand your target market' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <feature.icon className="w-8 h-8 text-indigo-400 mb-3" />
              <h3 className="font-semibold text-lg mb-2">{feature.label}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <HeroText delay={0.4}>
          <div className="mb-12">
            <AnimatedButton onClick={handleStartChat} size="lg">
              <span className="flex items-center gap-2">
                Start Chat <ArrowRight className="w-5 h-5" />
              </span>
            </AnimatedButton>
          </div>
        </HeroText>

        {/* Example Ideas */}
        <HeroText delay={0.5}>
          <div className="text-center w-full">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-6">Or try an example idea:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {exampleIdeas.map((idea, i) => (
                <IdeaChip
                  key={i}
                  text={idea}
                  onClick={() => handleIdeaClick(idea)}
                  delay={0.5 + i * 0.08}
                />
              ))}
            </div>
          </div>
        </HeroText>
      </div>

      {/* Footer accent */}
      <motion.div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </main>
  )
}
