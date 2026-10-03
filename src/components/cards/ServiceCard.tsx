import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  onInquire: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onInquire }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`group rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between ${
        isExpanded
          ? 'border-[#8E3514] shadow-lg'
          : 'border-[#DDE1E6] shadow-xs hover:border-[#8E3514] hover:shadow-md'
      }`}
    >
      <div className="p-6 sm:p-8 md:p-9 flex flex-col justify-between h-full">
        <div>
          {/* Top Header: Number and Accordion Toggle */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#D49B28] group-hover:text-[#8E3514] transition-colors">
              {service.number}
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl text-[#767E8C] hover:text-[#8E3514] hover:bg-[#F6F7F9] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Title and Tagline */}
          <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#6E260E] tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm font-medium text-[#8E3514] leading-snug">
              {service.tagline}
            </p>
            <p className="text-sm text-[#767E8C] leading-relaxed pt-1">
              {service.description}
            </p>
          </div>

          {/* Expandable Section: Deliverables and Tech Stack */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-[#DDE1E6] space-y-6 animate-in fade-in duration-200">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C] mb-3">
                  Scope of Deliverables
                </p>
                <ul className="space-y-2 text-xs text-[#6E260E]">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B28] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.techStack && (
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C] mb-2">
                    Tools & Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono text-[#767E8C]">
                    {service.techStack.map((tool, idx) => (
                      <span key={idx} className="bg-[#F6F7F9] px-2.5 py-1 rounded-md border border-[#DDE1E6]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-4 border-t border-[#ECEEF2] flex items-center justify-between">
          <span className="text-xs text-[#767E8C] font-mono">
            {service.deliverables.length} Deliverables
          </span>
          <button
            type="button"
            onClick={() => onInquire(service.title)}
            className="text-xs font-semibold text-[#8E3514] hover:text-[#D49B28] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire Practice</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
