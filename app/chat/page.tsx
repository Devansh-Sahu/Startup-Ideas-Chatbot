'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble } from '@/components/message-bubble'
import { AnimatedButton } from '@/components/animated-button'
import { LoadingDots } from '@/components/loading-dots'
import { FormattedResponse } from '@/components/formatted-response'
import { AnimatedBackground } from '@/components/animated-background'
import { ArrowLeft, Send, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [idea, setIdea] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with idea from URL parameter
  useEffect(() => {
    const ideaParam = searchParams.get('idea')
    if (ideaParam) {
      setIdea(ideaParam)
      // Automatically send the idea
      sendMessage(ideaParam)
    }
  }, [searchParams])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userMessage: textToSend,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.statusText}`)
      }

      // Create assistant message to update with streaming content
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let content = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          content += chunk

          // Update the last message with streamed content
          setMessages((prev) => {
            const updated = [...prev]
            const lastMsg = updated[updated.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
              lastMsg.content = content
            }
            return updated
          })
        }
      } else {
        // Fallback for non-streaming response
        const data = await response.json()
        setMessages((prev) => {
          const updated = [...prev]
          const lastMsg = updated[updated.length - 1]
          if (lastMsg && lastMsg.role === 'assistant') {
            lastMsg.content = data.content || data.message || ''
          }
          return updated
        })
      }
    } catch (error) {
      const errorDetails = error instanceof Error ? error.message : String(error)
      console.error('[v0] Error caught in chat:', errorDetails)
      console.error('[v0] Full error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorDetails}. Please try again. (Check console for details)`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[100dvh] bg-[#09090b] flex flex-col overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <div className="relative z-20 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => router.push('/')}
              className="p-2 -ml-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <h1 className="text-base sm:text-lg font-medium text-zinc-100">Startup Idea Analyzer</h1>
            </div>
          </div>
          {idea && (
            <motion.div
              className="hidden sm:block px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-zinc-300 max-w-[200px] truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {idea}
            </motion.div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="relative z-10 flex-1 overflow-y-auto w-full flex flex-col">
        <AnimatePresence>
          {messages.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="m-auto flex flex-col items-center justify-center text-center py-10 px-4 sm:px-6 w-full max-w-4xl"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-6"
              >
                <Sparkles className="w-12 h-12 text-zinc-500 mx-auto" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 mb-2">Start Your Startup Journey</h2>
              <p className="text-sm text-zinc-400 max-w-sm">
                Share your startup idea and I'll provide comprehensive feedback on market viability, target users, revenue models, and more.
              </p>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message.role === 'user' ? (
                <MessageBubble
                  content={message.content}
                  isUser={true}
                  delay={index * 0.05}
                />
              ) : (
                <MessageBubble
                  content={<FormattedResponse content={message.content} />}
                  isUser={false}
                  delay={index * 0.05}
                />
              )}
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <MessageBubble content={<LoadingDots />} isUser={false} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-20 bg-[#09090b] pb-safe pb-4 pt-2 sm:pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="w-full flex gap-2 sm:gap-3 items-end bg-zinc-900 border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 rounded-[28px] p-1 shadow-sm transition-all relative">
          <textarea
            ref={inputRef as any}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask a follow-up question..."
            className="flex-1 bg-transparent max-h-32 min-h-[52px] resize-none px-4 py-3.5 text-[16px] sm:text-[15px] text-zinc-100 placeholder-zinc-500 focus:outline-none"
            disabled={isLoading}
            rows={1}
          />
          <motion.button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="p-2 sm:p-2.5 mb-1.5 mr-1.5 rounded-full bg-white text-zinc-950 disabled:opacity-30 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-200 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 ml-0.5" />
          </motion.button>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-3">
          <p className="text-[11px] text-zinc-500">AI can make mistakes. Consider verifying important information.</p>
        </div>
      </div>
    </div>
    </div>
  )
}
