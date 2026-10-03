import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig, contactDetails } from '../../data/siteConfig';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms, onReplayIntro }) => {
  return (
    <footer className="bg-[#6E260E] text-white pt-20 sm:pt-24 pb-12 border-t border-[#8E3514] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-[#8E3514]">
          {/* Brand Manifesto */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#D49B28] text-white flex items-center justify-center font-display text-xs font-extrabold shadow-sm">
                SD
              </span>
              <span className="font-display font-bold text-xl sm:text-2xl tracking-wider text-white">
                {siteConfig.name}
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-display font-bold text-lg sm:text-xl text-white">
                {siteConfig.tagline}
              </p>
              <p className="text-xs font-mono text-[#D49B28] tracking-wider uppercase font-semibold">
                {siteConfig.disciplines}
              </p>
            </div>

            <p className="text-sm text-[#FDF2EC]/85 max-w-md leading-relaxed">
              {siteConfig.subtext}
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-white underline underline-offset-8 hover:text-[#D49B28] transition-colors"
              >
                <span>{siteConfig.contact.email}</span>
                <ArrowUpRight className="w-4 h-4 text-[#D49B28]" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D49B28] font-semibold">
              Navigation
            </p>
            <ul className="space-y-3 text-sm text-[#FDF2EC]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('work')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About SD Design Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Studio Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D49B28] font-semibold">
              Connect
            </p>
            <ul className="space-y-3 text-sm text-[#FDF2EC]/85">
              {siteConfig.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group hover:text-white transition-colors"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#D49B28]" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#8E3514] space-y-2 text-xs text-[#FDF2EC]/80">
              <p className="font-semibold text-white">Direct Phone & WhatsApp:</p>
              <a href={`tel:${contactDetails.phoneClean}`} className="font-mono text-[#D49B28] hover:underline block">
                {contactDetails.phone}
              </a>
              <p className="font-semibold text-white pt-2">Studio Location:</p>
              <p className="text-[#FDF2EC]/80 leading-relaxed font-sans text-[11px]">
                {contactDetails.address}
              </p>
            </div>
          </div>
        </div>

        {/* Monogram Display Watermark */}
        <div className="pt-4 overflow-hidden select-none pointer-events-none text-center">
          <p className="font-display font-extrabold text-[9vw] tracking-tighter text-[#8E3514] leading-none uppercase opacity-60 whitespace-nowrap">
            SD DESIGN STUDIO
          </p>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-[#8E3514] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDF2EC]/70 font-mono">
          <p>
            © 2026 SD DESIGN STUDIO. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#8E3514]">·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            {onReplayIntro && (
              <>
                <span className="text-[#8E3514]">·</span>
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="hover:text-white transition-colors cursor-pointer text-[#D49B28]"
                >
                  Replay Intro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
