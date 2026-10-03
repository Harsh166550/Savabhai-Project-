import React, { useEffect, useState } from 'react';
import { X, ArrowRight, ArrowLeft, Layers, Compass, CheckCircle2, Maximize2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onStartProject: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
  onStartProject
}) => {
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLightboxImg) {
          setActiveLightboxImg(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImg, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#6E260E]/70 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:my-auto border border-[#DDE1E6]">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-[#DDE1E6]">
          <div className="flex items-center gap-2 sm:gap-3 truncate max-w-[65%]">
            <span className="font-display font-bold text-sm sm:text-base text-[#6E260E] truncate">
              {project.title}
            </span>
            <span className="text-[#DDE1E6] shrink-0">/</span>
            <span className="text-[11px] sm:text-xs font-mono text-[#767E8C] uppercase truncate">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="p-1.5 sm:p-2 rounded-xl text-[#767E8C] hover:text-[#8E3514] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              title="Previous Project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="p-1.5 sm:p-2 rounded-xl text-[#767E8C] hover:text-[#8E3514] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              title="Next Project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-[#DDE1E6] mx-0.5 sm:mx-1" />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-[#767E8C] hover:text-[#8E3514] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Study Content */}
        <div className="p-5 sm:p-10 lg:p-14 space-y-12 sm:space-y-16">
          {/* Header Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-[#767E8C] uppercase tracking-wider">
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">·</span>
              <span className="tabular-nums">{project.year}</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">·</span>
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">·</span>
              <span>{project.duration}</span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6E260E] tracking-tight leading-[1.1] sm:leading-[1.08] [text-wrap:balance]">
              {project.title}
            </h1>
            <p className="font-display text-lg sm:text-2xl text-[#8E3514] font-medium leading-relaxed">
              {project.subtitle}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#767E8C] leading-relaxed max-w-3xl [text-wrap:pretty]">
              {project.summary}
            </p>
          </div>

          {/* Commission Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6]">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Client</p>
              <p className="font-medium text-sm text-[#6E260E] mt-1">{project.client}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Location</p>
              <p className="font-medium text-sm text-[#6E260E] mt-1">{project.location}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Timeline</p>
              <p className="font-medium text-sm text-[#6E260E] mt-1">{project.duration}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Scope</p>
              <p className="font-medium text-sm text-[#6E260E] mt-1">{project.scope}</p>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative rounded-3xl overflow-hidden border border-[#DDE1E6] bg-[#ECEEF2] h-72 sm:h-96 md:h-[480px]">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDE1E6] flex items-center justify-between">
              <span className="text-xs font-mono text-[#6E260E] uppercase tracking-wider">
                Hero Perspective // Principal Angle
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxImg({ url: project.coverImage, caption: `${project.title} — Primary Spatial Perspective` })}
                className="text-xs text-[#8E3514] hover:text-[#D49B28] font-mono flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Inspect</span>
              </button>
            </div>
          </div>

          {/* Narrative Split: Challenge & Concept */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#767E8C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
                <span>The Challenge</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#6E260E]">
                Context & Operational Constraints
              </h3>
              <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#767E8C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
                <span>Design Concept</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#6E260E]">
                Architectural Response
              </h3>
              <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
                {project.designConcept}
              </p>
            </div>
          </div>

          {/* Deep-dive Execution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6]">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Space Planning</p>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#6E260E]">Zoning & Flow</h4>
              <p className="text-xs text-[#767E8C] leading-relaxed">{project.spacePlanning}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Materials</p>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#6E260E]">Finishes & Textures</h4>
              <p className="text-xs text-[#767E8C] leading-relaxed">{project.materials}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Custom Elements</p>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#6E260E]">Joinery & Systems</h4>
              <p className="text-xs text-[#767E8C] leading-relaxed">{project.furniture}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#767E8C]">Atmosphere</p>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#6E260E]">Lighting & Lux</h4>
              <p className="text-xs text-[#767E8C] leading-relaxed">{project.lighting}</p>
            </div>
          </div>

          {/* Execution & Final Result */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#767E8C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
              <span>Turnkey Execution & Delivery</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#6E260E]">
              Execution & Final Outcome
            </h3>
            <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed max-w-3xl">
              {project.execution}
            </p>
            <p className="text-sm sm:text-base text-[#6E260E] leading-relaxed max-w-3xl font-medium">
              {project.finalResult}
            </p>
          </div>

          {/* Project Gallery Plates */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#6E260E]">
                Project Gallery & Documentation
              </h3>
              <span className="text-xs font-mono text-[#767E8C]">
                {project.gallery.length} Plates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className={`group rounded-2xl bg-[#F6F7F9] border border-[#DDE1E6] overflow-hidden flex flex-col justify-between ${
                    item.layoutType === 'full' ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className={`${item.layoutType === 'full' ? 'h-72 sm:h-96' : 'h-64 sm:h-72'} w-full bg-[#ECEEF2] relative overflow-hidden`}>
                    <img
                      src={item.url}
                      alt={item.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setActiveLightboxImg(item)}
                        className="p-2 rounded-xl bg-white/90 text-[#8E3514] shadow-md hover:bg-white"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-[#767E8C]">
                    <p className="text-[#6E260E] font-medium truncate max-w-[80%]">{item.caption}</p>
                    <span className="font-mono text-[#D49B28]">Plate 0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F6F7F9] border border-[#DDE1E6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#6E260E]">
                Interested in a similar commission?
              </h4>
              <p className="text-sm text-[#767E8C]">
                We partner with ambitious teams to create memorable spatial and digital experiences.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#8E3514] hover:bg-[#6E260E] rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Start Similar Project
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-60 bg-[#6E260E]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-[#DDE1E6]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE1E6]">
              <span className="font-mono text-xs text-[#767E8C] uppercase">
                Plate Inspection // SD Design Studio
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxImg(null)}
                className="p-1.5 rounded-lg text-[#767E8C] hover:text-[#8E3514] hover:bg-[#F6F7F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-72 sm:h-96 w-full bg-[#ECEEF2] rounded-2xl overflow-hidden border border-[#DDE1E6]">
              <img
                src={activeLightboxImg.url}
                alt={activeLightboxImg.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-[#F6F7F9]"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#6E260E] font-medium text-center">
              {activeLightboxImg.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
