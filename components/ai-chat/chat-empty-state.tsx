import { motion } from 'framer-motion';
import { Sparkles, Code, Briefcase, Layout } from 'lucide-react';

interface ChatEmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SUGGESTIONS = [
  {
    icon: <Briefcase className="w-4 h-4" />,
    text: "Show me your best projects",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    text: "What AI projects have you built?",
  },
  {
    icon: <Code className="w-4 h-4" />,
    text: "What technologies do you use?",
  },
  {
    icon: <Layout className="w-4 h-4" />,
    text: "Tell me about your experience",
  },
];

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Explore my work with AI
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
          Ask about my projects, technologies, experience, or the kind of work I build.
        </p>
      </motion.div>

      <div className="w-full max-w-[320px] flex flex-col gap-2">
        {SUGGESTIONS.map((suggestion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center gap-3 w-full p-3.5 text-left text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-700 dark:hover:text-primary-300 transition-all shadow-sm"
          >
            <span className="text-primary-500 dark:text-primary-400">
              {suggestion.icon}
            </span>
            <span className="font-medium">{suggestion.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
