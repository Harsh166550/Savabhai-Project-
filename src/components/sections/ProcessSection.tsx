import React from 'react';
import { processData } from '../../data/process';
import { CheckCircle2, Clock } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 sm:py-28 lg:py-32 bg-white border-t border-[#DDE1E6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767E8C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
            <span>Structured Methodology</span>
            <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
            <span>6 Studio Phases</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#6E260E] tracking-tight">
            How We Build.
          </h2>
          <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
            Our disciplined execution methodology ensures clarity, artistic fidelity, and on-time delivery across every engagement.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-[#DDE1E6] ml-3 sm:ml-8 pl-5 sm:pl-12 space-y-8 sm:space-y-12">
          {processData.map((item) => (
            <div key={item.step} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[32px] sm:-left-[60px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2 border-[#8E3514] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#D49B28]" />
              </div>

              {/* Step Card Content */}
              <div className="p-5 sm:p-7 md:p-9 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6] space-y-4 hover:border-[#8E3514] transition-colors shadow-xs">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#D49B28]">
                      PHASE {item.step}
                    </span>
                    <span className="text-[#DDE1E6]">/</span>
                    <span className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#6E260E]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#767E8C] flex items-center gap-1.5 self-start xs:self-auto">
                    <Clock className="w-3.5 h-3.5 text-[#8E3514]" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#6E260E] font-medium leading-relaxed">
                  "{item.description}"
                </p>

                <div className="pt-3 border-t border-[#ECEEF2]">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C] mb-2">
                    Key Deliverables:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5 text-xs text-[#767E8C]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B28] mt-0.5 shrink-0" />
                        <span className="text-[#6E260E]">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
