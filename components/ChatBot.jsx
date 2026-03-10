"use client"
import { useState, useRef, useEffect } from 'react'
import { useChatBot } from '../hook/useChatBot'
import { SUGGESTED_QUESTIONS } from '../data/portfolioKnowledge.js'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const { status, loadProgress, messages, initialize, sendMessage, activeModel } = useChatBot()

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize model when chat opens
  useEffect(() => {
    if (open && status === 'idle') initialize()
  }, [open])

  const handleSend = () => {
    if (!input.trim() || status !== 'ready') return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <>
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] sm:w-[420px]
              bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl
              border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl
              flex flex-col overflow-hidden ring-1 ring-slate-900/5"
            style={{ height: '580px' }}>

            {/* Header */}
            <div className="bg-white dark:bg-slate-950 px-6 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-xl">
                  <Bot className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-sm font-outfit">Portfolio Guide</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      {activeModel === 'groq' ? 'Cloud AI (Groq)' : 'Local AI (WebLLM)'}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Loading progress overlay */}
            {status === 'loading' && (
              <div className="absolute inset-0 z-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-4" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Preparing AI Experience</p>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden max-w-[200px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${loadProgress}%` }}
                    className="h-full bg-blue-600 transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400 mt-2">{loadProgress}%</span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {messages.length === 0 && status !== 'loading' && (
                <div className="space-y-6">
                  <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl rounded-tl-none px-5 py-4 text-sm
                    text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200/50 dark:border-slate-800/50">
                    👋 Hi! I&apos;m your assistant. Ask me anything about Naime&apos;s projects, skills, or professional background.
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button key={q}
                        onClick={() => sendMessage(q)}
                        disabled={status !== 'ready'}
                        className="text-left text-xs px-4 py-3 rounded-xl
                          bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 
                          text-slate-600 dark:text-slate-400 hover:border-blue-500/50 hover:bg-blue-50/50
                          dark:hover:bg-blue-500/5 disabled:opacity-40 transition-all flex justify-between items-center group">
                        {q}
                        <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl px-5 py-3.5 text-sm max-w-[85%]
                    leading-relaxed shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-200/50 dark:border-slate-800/50'
                    }`}>
                    {msg.content || (
                      <div className="flex gap-1 py-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.8s]"/>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]"/>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"/>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}/>
            </div>

            {/* Input area */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 items-end flex gap-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex-1 relative">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask a question..."
                  disabled={status !== 'ready'}
                  className="w-full bg-white dark:bg-slate-950 text-sm text-slate-900 dark:text-white
                    placeholder:text-slate-400 rounded-2xl px-4 py-3
                    border border-slate-200 dark:border-slate-800 focus:border-primary-500
                    focus:outline-none focus:ring-4 focus:ring-blue-500/5 disabled:opacity-50 transition-all resize-none overflow-hidden"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || status !== 'ready'}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-40
                  text-white rounded-2xl p-3
                  transition-all disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16
          bg-primary-600 rounded-2xl shadow-2xl shadow-blue-500/30
          flex items-center justify-center text-white
          transition-all"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  )
}