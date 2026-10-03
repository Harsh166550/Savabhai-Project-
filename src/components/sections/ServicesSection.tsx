import React from 'react';
import { servicesData } from '../../data/services';
import { ServiceCard } from '../cards/ServiceCard';
import { ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onInquire: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquire }) => {
  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DDE1E6]">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767E8C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
              <span>Studio Capabilities</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
              <span>Core Practices</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#6E260E] tracking-tight">
              Services & Expertise.
            </h2>
            <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
              We partner with ambitious companies to define brand identities, build scalable digital products, and engineer real-time 3D web platforms.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onInquire()}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#8E3514] hover:bg-[#6E260E] rounded-xl transition-all shadow-xs shrink-0 self-start md:self-end cursor-pointer"
          >
            <span>Commission a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B28]" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onInquire={(title) => onInquire(title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
