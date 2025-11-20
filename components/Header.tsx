import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG, NAV_LINKS } from '../constants';
import { handleSmoothScroll } from '../utils/smoothScroll';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium px-3 py-2 rounded-md text-sm";
  const mobileNavLinkClasses = "block text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium px-3 py-3 text-base rounded-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/50 backdrop-blur-lg border-b border-border/40 shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#home" className="text-foreground font-orbitron text-2xl font-bold tracking-wider" onClick={handleSmoothScroll}>
              {BRAND_CONFIG.name}
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className={navLinkClasses} onClick={handleSmoothScroll}>
                  {link.name}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-muted/50 inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-lg">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className={mobileNavLinkClasses} onClick={(e) => { handleSmoothScroll(e); setIsOpen(false); }}>
                {link.name}
              </a>
            ))}
            <div className="px-2 pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;