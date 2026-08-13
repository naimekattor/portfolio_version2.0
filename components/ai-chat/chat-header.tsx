import { X, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-t-3xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
            AI Portfolio Assistant
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
              Online & Ready
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
