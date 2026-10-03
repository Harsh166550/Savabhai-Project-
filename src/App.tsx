import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { WorkSection } from './components/sections/WorkSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectDetailModal } from './components/sections/ProjectDetailModal';
import { Footer } from './components/footer/Footer';
import { LegalPage } from './components/legal/LegalPage';
import { Toast } from './components/ui/Toast';
import { NotFoundPage } from './components/ui/NotFoundPage';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { projectsData } from './data/projects';
import { Project } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [initialContactService, setInitialContactService] = useState<string | undefined>(undefined);
  const [is404, setIs404] = useState(false);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';

      if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const found = projectsData.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
          setIs404(false);
        } else {
          setIs404(true);
        }
        return;
      }

      if (hash === 'privacy') {
        setActiveLegal('privacy');
        return;
      }
      if (hash === 'terms') {
        setActiveLegal('terms');
        return;
      }

      const validRoutes = ['home', 'work', 'services', 'about', 'process', 'contact'];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
        setIs404(false);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setIs404(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: string) => {
    setIs404(false);
    setCurrentRoute(route);
    window.location.hash = route;
    if (route === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project/${project.slug}`;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.location.hash = 'work';
  };

  const handleInquireService = (serviceName?: string) => {
    setInitialContactService(serviceName);
    handleNavigate('contact');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-white text-[#6E260E] selection:bg-[#D49B28] selection:text-white flex flex-col justify-between">
      {/* Starting Loading Logo Animation */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Floating Navigation Card */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenContact={() => handleNavigate('contact')}
      />

      {/* Main Page Flow - The First Theme */}
      <main className="flex-1">
        {is404 ? (
          <NotFoundPage onReturnHome={() => handleNavigate('home')} />
        ) : (
          <>
            {/* 1. Hero Section with 3D Architectural Interactive Scene */}
            <div id="home">
              <HeroSection
                onExploreWork={() => handleNavigate('work')}
                onStartProject={() => handleNavigate('contact')}
              />
            </div>

            {/* 2. Selected Work / Projects */}
            <WorkSection
              projects={projectsData}
              onSelectProject={handleSelectProject}
            />

            {/* 3. Core Studio Services & Practices */}
            <ServicesSection
              onInquire={handleInquireService}
            />

            {/* 4. About Us & Studio Ethos */}
            <AboutSection
              onStartProject={() => handleNavigate('contact')}
            />

            {/* 5. How We Build / Structured Process */}
            <ProcessSection />

            {/* 6. Contact & Collaboration Inquiry */}
            <ContactSection
              initialService={initialContactService}
              onShowToast={showToast}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setActiveLegal('privacy')}
        onOpenTerms={() => setActiveLegal('terms')}
        onReplayIntro={() => setIsLoading(true)}
      />

      {/* Project Detail Case Study Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          allProjects={projectsData}
          onClose={handleCloseProject}
          onSelectProject={handleSelectProject}
          onStartProject={() => {
            handleCloseProject();
            handleNavigate('contact');
          }}
        />
      )}

      {/* Legal Dialog */}
      {activeLegal && (
        <LegalPage
          type={activeLegal}
          onClose={() => setActiveLegal(null)}
        />
      )}

      {/* Feedback Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
