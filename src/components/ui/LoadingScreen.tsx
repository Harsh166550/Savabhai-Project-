import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 2000
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-between p-6 sm:p-10 bg-surface-muted transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading SD Design Studio"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,var(--color-rust)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-rust)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Header metadata */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-stone relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
          <span className="uppercase tracking-widest text-[10px] sm:text-xs text-rust-deep font-medium">
            INITIALIZING STUDIO WORKSPACE
          </span>
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-stone">
          <span>RAJKOT · GLOBAL</span>
        </div>
      </div>

      {/* Center Hero: Official Logo Mark & Cinematic Reveal */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 relative z-10 my-auto">
        {/* Animated Architectural Monogram Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Subtle outer rotating ring in mustard */}
          <div className="absolute inset-0 rounded-full border border-dashed border-mustard/40 animate-[spin_12s_linear_infinite]" />
          
          {/* Subtle glowing halo */}
          <div className="absolute inset-2 rounded-full bg-rust/5 blur-xl animate-pulse" />

          {/* Official SD Monogram SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 drop-shadow-md transition-transform duration-500 hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* D Silhouette in Rust with golden outline */}
            <path
              d="M20 10 H50 C74 10 92 28 92 50 C92 72 74 90 50 90 H20 Z"
              fill="#8C432E"
              stroke="#CFA545"
              strokeWidth="1.5"
              className="animate-in fade-in zoom-in duration-700"
            />
            {/* Stylized White S cut-out */}
            <path
              d="M48 28 C37 28 31 34 31 41 C31 52 48 50 48 60 C48 65 43 68 37 68 C30 68 24 64 22 59 L16 66 C20 74 29 78 38 78 C50 78 58 71 58 60 C58 48 41 50 41 39 C41 36 44 34 48 34 C54 34 58 37 61 42 L67 36 C63 30 56 28 48 28 Z"
              fill="#FFFFFF"
              className="animate-in fade-in slide-in-from-top-2 duration-1000"
            />
          </svg>
        </div>

        {/* Brand Name & Typography */}
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-rust-deep tracking-[0.22em] uppercase">
            SD DESIGN STUDIO
          </h1>
          <p className="text-xs sm:text-sm font-mono text-stone uppercase tracking-widest max-w-sm mx-auto">
            Spatial Architecture · 3D Experiences · Digital Craft
          </p>
        </div>

        {/* Hairline Progress Bar & Percentage */}
        <div className="w-56 sm:w-72 space-y-2 pt-2">
          <div className="h-1 w-full bg-surface-sunken rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-mustard to-rust rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-stone">
            <span className="text-rust font-semibold tabular-nums">{progress}%</span>
            <span>CALIBRATING SCENE</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Skip Action */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-stone relative z-10">
        <span>© 2026 SD DESIGN STUDIO</span>
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-mono text-rust hover:text-mustard uppercase tracking-wider underline cursor-pointer transition-colors"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
