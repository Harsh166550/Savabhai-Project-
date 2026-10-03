import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Compass, Sparkles, Box } from 'lucide-react';
import { ThreeDScene } from '../3d/ThreeDScene';
import { Hero3DCanvas } from './Hero3DCanvas';
import { siteConfig, contactDetails } from '../../data/siteConfig';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onStartProject }) => {
  const [activeScene, setActiveScene] = useState<'architectural' | 'operatory'>('architectural');

  return (
    <section className="relative min-h-[92vh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-white">
      {/* Subtle architectural background grid in delicate rust */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,var(--color-rust)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-rust)_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:5rem_5rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Headline & Studio Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Subtle architectural kicker */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rust">
            <span className="w-1.5 h-1.5 rounded-full bg-rust" />
            <span className="truncate">{siteConfig.disciplines}</span>
          </div>

          {/* Primary Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight text-rust-deep leading-[1.08] sm:leading-[1.06] [text-wrap:balance]">
              Designing Digital <br className="hidden xs:inline" />
              Experiences That <br className="hidden xs:inline" />
              <span className="text-rust font-normal italic font-serif">Stand Apart.</span>
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="text-sm sm:text-base md:text-lg text-stone leading-relaxed max-w-xl [text-wrap:pretty]">
            {siteConfig.subtext}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-rust hover:bg-rust-deep rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-white" />
            </button>

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-rust bg-surface-muted hover:bg-surface-sunken rounded-xl transition-all duration-200 cursor-pointer group border border-line"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-rust" />
            </button>
          </div>

          {/* Disciplines Row */}
          <div className="pt-6 border-t border-line flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs font-mono text-stone">
            <span className="hover:text-rust transition-colors">BRAND IDENTITY</span>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <span className="hover:text-rust transition-colors">UI/UX DESIGN</span>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <span className="hover:text-rust transition-colors">3D INTERACTION</span>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <span className="hover:text-rust transition-colors">SPATIAL ARCHITECTURE</span>
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas with Scene Switcher */}
        <div className="lg:col-span-5 flex flex-col gap-3 w-full">
          {/* Scene Selector Pill Switcher */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-line text-xs">
              <button
                type="button"
                onClick={() => setActiveScene('architectural')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeScene === 'architectural'
                    ? 'bg-rust text-white shadow-xs'
                    : 'text-rust hover:bg-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>R3F Stone & Wood Space</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveScene('operatory')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeScene === 'operatory'
                    ? 'bg-rust text-white shadow-xs'
                    : 'text-rust hover:bg-white'
                }`}
              >
                <Box className="w-3 h-3" />
                <span>Operatory Suite</span>
              </button>
            </div>
            <span className="text-[10px] font-mono text-stone uppercase tracking-widest hidden sm:inline">
              REAL-TIME 3D
            </span>
          </div>

          {/* Interactive Canvas Container */}
          <div className="h-[320px] xs:h-[380px] sm:h-[450px] lg:h-[530px] w-full relative rounded-3xl bg-surface-muted border border-line overflow-hidden shadow-xs flex items-center justify-center">
            {activeScene === 'architectural' ? (
              <ThreeDScene className="w-full h-full" />
            ) : (
              <Hero3DCanvas className="w-full h-full" />
            )}
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone font-mono">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-rust shrink-0" />
          <span>{siteConfig.name} · {contactDetails.city.toUpperCase()}, {contactDetails.state.toUpperCase()}</span>
        </div>
        <div>
          <span className="text-rust font-semibold">MINIMAL + FUTURISTIC + REFINED</span>
        </div>
      </div>
    </section>
  );
};
