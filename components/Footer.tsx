import React from 'react';
import { BRAND_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border mt-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p className="font-semibold text-foreground">{BRAND_CONFIG.agencyName} &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-sm">Design. Automate. Evolve.</p>
        <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-foreground transition-colors duration-300">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Twitter</a>
            <a href="mailto:contact@qbyte-it.com" className="hover:text-foreground transition-colors duration-300">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;