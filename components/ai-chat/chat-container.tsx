"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare } from 'lucide-react';
import { useAiChat } from '../../hooks/use-ai-chat';
import { ChatHeader } from './chat-header';
import { ChatEmptyState } from './chat-empty-state';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';

export default function ChatContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat
  } = useAiChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-colors ${
          isOpen
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/30'
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <Sparkles className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-24 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[440px] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl ring-1 ring-slate-900/5 overflow-hidden"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {messages.length === 0 ? (
                <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
              ) : (
                <div className="flex flex-col gap-6 p-6">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30 text-center"
                    >
                      {error}
                      <button 
                        onClick={resetChat}
                        className="block w-full mt-2 text-xs font-semibold hover:underline"
                      >
                        Reset Conversation
                      </button>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <ChatInput onSend={sendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
