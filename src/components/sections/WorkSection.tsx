import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types';
import { ProjectCard } from '../cards/ProjectCard';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Architecture & Spatial',
    'Brand Identity',
    'UI/UX Design',
    '3D & Interactive'
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-20 sm:py-28 lg:py-32 bg-[#F6F7F9] border-t border-[#DDE1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DDE1E6]">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767E8C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49B28]" />
              <span>Portfolio of Built Works</span>
              <span aria-hidden="true" className="text-[#DDE1E6]">/</span>
              <span className="tabular-nums">{projects.length} Commissions</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#6E260E] tracking-tight">
              Selected Work.
            </h2>
            <p className="text-sm sm:text-base text-[#767E8C] leading-relaxed">
              Explore our portfolio of thoughtful digital products, architectural spaces, visual identities, and interactive 3D platforms.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white rounded-xl overflow-x-auto max-w-full border border-[#DDE1E6] scrollbar-none py-1.5 sm:py-1 w-full md:w-auto shadow-xs">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#8E3514] text-white shadow-xs'
                      : 'text-[#767E8C] hover:text-[#6E260E] hover:bg-[#F6F7F9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              featuredLayout={idx === 0}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#767E8C] bg-white rounded-3xl border border-[#DDE1E6] p-8">
            <p className="text-sm">No commissions currently visible under this category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-3 text-xs font-mono underline uppercase tracking-wider text-[#8E3514] hover:text-[#6E260E]"
            >
              Reset to All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
