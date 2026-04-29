import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Robust IntersectionObserver ───────────────────────────────────────────
  // Keeps a map of which sections are currently visible and always picks
  // the one closest to the top of the viewport as the "active" one.
  useEffect(() => {
    const sectionIds = ['about', 'services', 'solutions', 'distinguishes', 'backing'];
    const visibleSections = new Map(); // id → boundingClientRect.top

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) return;

        // Pick the section whose top is closest to (but below) the navbar
        const topmost = [...visibleSections.entries()].reduce((a, b) =>
          Math.abs(a[1]) < Math.abs(b[1]) ? a : b
        );
        setActiveSection(`#${topmost[0]}`);
      },
      {
        root: null,
        // Trigger when section enters the band between 80 px and 50 % of viewport
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  // ──────────────────────────────────────────────────────────────────────────

  const navLinks = [
    { href: '#about',        label: t('nav.about') },
    { href: '#services',     label: t('nav.services') },
    { href: '#solutions',    label: t('nav.solutions') },
    { href: '#distinguishes',label: t('nav.distinguishes') },
    { href: '#backing',      label: t('nav.backing') },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('');
      } else {
        const element = document.querySelector(href);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="w-full px-4 md:px-8">
        <div className="relative flex items-center justify-between h-20 md:h-28">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 z-50"
            data-testid="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setActiveSection('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src="/img/logo_grande_vincco.png"
              alt="Vincco Logo"
              className="h-12 md:h-16"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`group relative text-base font-semibold transition-colors whitespace-nowrap pb-1 ${
                    isActive
                      ? 'text-[#04608E]'
                      : 'text-slate-600 hover:text-[#04608E]'
                  }`}
                  data-testid={`nav-link-${link.href.slice(1)}`}
                >
                  {link.label}

                  {/*
                    Underline indicator
                    – Solid & full-width when the section is active
                    – Fades in at 40 % width on hover (when not already active)
                  */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#04608E] transition-all duration-300 origin-left ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-2/5 opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3 z-50">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#04608E] transition-colors"
              data-testid="language-toggle"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {/* CTA Button */}
            <Button
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden md:inline-flex bg-[#04608E] hover:bg-[#1A4277] text-white rounded-full px-5 lg:px-6 text-sm transition-all hover:scale-[1.02] active:scale-95"
              data-testid="nav-cta-button"
            >
              {t('nav.contact')}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-[#04608E] relative z-50"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm xl:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 md:top-28 left-0 right-0 bg-white border-b border-slate-200 shadow-lg xl:hidden z-40 max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`flex items-center gap-2 py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#04608E] bg-[#04608E]/5'
                          : 'text-slate-700 hover:text-[#04608E] hover:bg-slate-50'
                      }`}
                      data-testid={`mobile-nav-link-${link.href.slice(1)}`}
                    >
                      {/* Active dot indicator for mobile */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#04608E] flex-shrink-0" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Button
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="w-full bg-[#04608E] hover:bg-[#1A4277] text-white rounded-full py-3"
                    data-testid="mobile-nav-cta-button"
                  >
                    {t('nav.contact')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};