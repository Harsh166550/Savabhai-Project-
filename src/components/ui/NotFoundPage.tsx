import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#F6F7F9] flex items-center justify-center mx-auto text-[#8E3514] border border-[#DDE1E6]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-[#767E8C]">
            Error 404 // Coordinate Out of Bounds
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#6E260E] tracking-tight">
            Page Not Located
          </h1>
          <p className="text-sm text-[#767E8C] leading-relaxed">
            The spatial plate or case study reference you requested does not exist or has been archived into our offline repository.
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#8E3514] hover:bg-[#6E260E] rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#D49B28]" />
          <span>Return to Studio Home</span>
        </button>
      </div>
    </div>
  );
};
