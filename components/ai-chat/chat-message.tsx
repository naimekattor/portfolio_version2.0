import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Bot, User, FileText } from 'lucide-react';
import { ChatMessage as IChatMessage } from '../../types/ai';
import { ProjectCard } from './project-card';

interface ChatMessageProps {
  message: IChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex max-w-[90%] sm:max-w-[85%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        } items-start gap-3`}
      >
        {/* Avatar */}
        <div
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full shadow-sm border ${
            isUser
              ? 'bg-primary-600 border-primary-700 text-white'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-primary-600 dark:text-primary-400'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-2 min-w-0">
          <div
            className={`px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm ${
              isUser
                ? 'bg-primary-600 text-white rounded-tr-sm'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm'
            }`}
          >
            {message.isStreaming && !message.content ? (
              <div className="flex items-center h-5 gap-1 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce"></span>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 break-words">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Project Cards (Rendered inside AI message) */}
          {!isUser && message.projects && message.projects.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {message.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
