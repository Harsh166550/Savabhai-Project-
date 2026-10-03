import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { Compass, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 bg-[#F6F7F9] border-t border-[#DDE1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Top Split Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767E8C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
              <span>Studio Philosophy</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
              <span>Our Ethos</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#6E260E] tracking-tight leading-[1.08]">
              {siteConfig.about.heading}
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="font-display text-xl sm:text-2xl text-[#6E260E] font-medium leading-snug [text-wrap:balance]">
              {siteConfig.about.p1}
            </p>
            <p className="text-base sm:text-lg text-[#767E8C] leading-relaxed [text-wrap:pretty]">
              {siteConfig.about.p2}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8E3514] hover:text-[#D49B28] transition-colors cursor-pointer group"
              >
                <span>Discuss Your Next Initiative</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D49B28]" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[#DDE1E6]">
          {siteConfig.about.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE1E6] space-y-4 shadow-xs hover:border-[#8E3514] transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F6F7F9] border border-[#DDE1E6] flex items-center justify-center text-[#8E3514]">
                {idx === 0 && <Compass className="w-5 h-5 text-[#8E3514]" />}
                {idx === 1 && <Sparkles className="w-5 h-5 text-[#D49B28]" />}
                {idx === 2 && <Layers className="w-5 h-5 text-[#8E3514]" />}
              </div>
              <h3 className="font-display text-xl font-bold text-[#6E260E]">
                {pr.title}
              </h3>
              <p className="text-sm text-[#767E8C] leading-relaxed">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Studio Creed Statement Banner - Luxurious Deep Rust with Mustard Accents (NO BLACK) */}
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#8E3514] text-white text-center space-y-5 shadow-xl border border-[#A6441C]">
          <p className="text-xs font-mono uppercase tracking-widest text-[#FBF5E6]">
            OUR DESIGN CREED
          </p>
          <div className="space-y-2 sm:space-y-3">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Every line has a purpose.
            </p>
            <p className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#D49B28] font-serif">
              Every interaction has an intention.
            </p>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Every detail is calibrated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
