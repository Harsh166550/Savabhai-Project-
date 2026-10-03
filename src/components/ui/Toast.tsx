import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#8E3514] text-white p-4 rounded-2xl shadow-2xl border border-[#A6441C] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#D49B28] shrink-0" />
        <p className="text-xs sm:text-sm font-medium leading-snug text-white">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
