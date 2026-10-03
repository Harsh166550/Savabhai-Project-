import React, { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  featuredLayout?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  featuredLayout = false
}) => {
  const [imgError, setImgError] = useState(false);

  // Architectural graphic fallback for zero broken image states
  const renderArchitecturalGraphic = () => {
    switch (project.category) {
      case '3D & Interactive':
        return (
          <div className="w-full h-full bg-[#ECEEF2] flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8E3514_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-48 rounded-full border border-[#DDE1E6]" />
            
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#767E8C]">
              <span>3D & INTERACTIVE</span>
              <span className="tabular-nums">{project.location}</span>
            </div>

            <div className="relative z-10 space-y-2 max-w-sm">
              <div className="w-12 h-1 bg-[#8E3514] mb-4" />
              <p className="text-xs uppercase tracking-widest text-[#767E8C] font-mono">
                Real-Time Spatial Systems
              </p>
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#6E260E] tracking-tight">
                {project.title}
              </h4>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-[#767E8C] border-t border-[#DDE1E6] pt-4 font-mono">
              <span>{project.scope}</span>
              <span>Plate 01</span>
            </div>
          </div>
        );

      case 'Architecture & Spatial':
      default:
        return (
          <div className="w-full h-full bg-[#F6F7F9] flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,#8E3514_25%,transparent_25%),linear-gradient(-45deg,#8E3514_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#8E3514_75%),linear-gradient(-45deg,transparent_75%,#8E3514_75%)] [background-size:20px_20px]" />
            <div className="absolute top-4 right-4 w-32 h-32 border border-[#DDE1E6]" />
            
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#767E8C]">
              <span>SPATIAL ARCHITECTURE</span>
              <span className="tabular-nums">{project.year}</span>
            </div>

            <div className="relative z-10 space-y-2 max-w-sm">
              <div className="w-12 h-1 bg-[#D49B28] mb-4" />
              <p className="text-xs uppercase tracking-widest text-[#767E8C] font-mono">
                Architectural Sanctuary
              </p>
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#6E260E] tracking-tight">
                {project.title}
              </h4>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-[#767E8C] border-t border-[#DDE1E6] pt-4 font-mono">
              <span>{project.subtitle}</span>
              <span>Plate 02</span>
            </div>
          </div>
        );
    }
  };

  return (
    <article
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer flex flex-col justify-between rounded-3xl bg-white border border-[#DDE1E6] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#8E3514] transition-all duration-300"
    >
      {/* Visual Viewport */}
      <div className={`relative w-full overflow-hidden ${featuredLayout ? 'h-60 sm:h-80 md:h-96' : 'h-56 sm:h-72 md:h-84'}`}>
        {!imgError ? (
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          renderArchitecturalGraphic()
        )}

        {/* Hover Arrow Badge */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="p-2.5 rounded-full bg-white/95 text-[#8E3514] backdrop-blur-sm shadow-md flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#767E8C]">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
            <span className="tabular-nums">{project.year}</span>
            <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
            <span>{project.location}</span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#6E260E] tracking-tight group-hover:text-[#8E3514] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-[#D49B28] group-hover:text-[#8E3514] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-2" />
          </h3>
          <p className="text-xs font-medium text-[#8E3514]">
            {project.subtitle}
          </p>

          {/* Short Narrative */}
          <p className="text-sm text-[#767E8C] line-clamp-2 leading-relaxed pt-1">
            {project.summary}
          </p>
        </div>

        {/* Bottom Role Row */}
        <div className="pt-4 border-t border-[#ECEEF2] flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs text-[#767E8C]">
          <div className="flex items-center gap-1.5 truncate max-w-full xs:max-w-[70%]">
            <Layers className="w-3.5 h-3.5 shrink-0 text-[#D49B28]" />
            <span className="truncate">{project.role.join(' · ')}</span>
          </div>
          <span className="font-mono text-[11px] text-[#8E3514] font-semibold shrink-0 group-hover:translate-x-0.5 group-hover:text-[#D49B28] transition-all">
            View Project →
          </span>
        </div>
      </div>
    </article>
  );
};
