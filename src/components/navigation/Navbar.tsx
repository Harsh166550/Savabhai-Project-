import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig, contactDetails } from '../../data/siteConfig';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', route: 'work' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Process', route: 'process' },
  ];

  const handleLinkClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-7 transition-all duration-300 pointer-events-auto rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-[#DDE1E6] shadow-xs ${
            isScrolled ? 'py-2.5 sm:py-3 shadow-md border-[#CAD0D8] bg-white' : 'py-3 sm:py-4'
          }`}
        >
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#6E260E] group"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#8E3514] text-white flex items-center justify-center font-display text-xs sm:text-sm font-extrabold group-hover:scale-105 group-hover:bg-[#D49B28] transition-all duration-200 shadow-xs">
              SD
            </span>
            <span className="font-display font-bold tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap text-[#6E260E]">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs font-semibold uppercase tracking-wider text-[#767E8C]">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  className={`relative py-1.5 transition-colors duration-150 hover:text-[#8E3514] ${
                    isActive ? 'text-[#8E3514] font-bold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D49B28] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#8E3514] hover:bg-[#6E260E] rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B28]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#6E260E] hover:bg-[#ECEEF2] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#8E3514]" /> : <Menu className="w-5 h-5 text-[#6E260E]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#6E260E]/40 backdrop-blur-sm transition-opacity">
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#DDE1E6]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DDE1E6]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#8E3514] text-white flex items-center justify-center font-display text-xs font-bold">
                    SD
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#6E260E]">
                    {siteConfig.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#767E8C] hover:text-[#8E3514] rounded-lg hover:bg-[#ECEEF2]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.route}
                    href={`#${item.route}`}
                    onClick={(e) => handleLinkClick(e, item.route)}
                    className="block text-base font-display font-semibold text-[#6E260E] py-2.5 px-3 rounded-xl border-b border-[#F6F7F9] hover:bg-[#F6F7F9] hover:text-[#8E3514] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#DDE1E6] space-y-4">
              <button
                type="button"
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-center text-white bg-[#8E3514] hover:bg-[#6E260E] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D49B28]" />
              </button>
              <div className="space-y-1 text-center">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-xs text-[#767E8C] hover:text-[#8E3514] font-mono block"
                >
                  {contactDetails.email}
                </a>
                <a
                  href={`tel:${contactDetails.phoneClean}`}
                  className="text-xs text-[#8E3514] hover:text-[#D49B28] font-mono block font-semibold"
                >
                  {contactDetails.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
