
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ServicesSection from './components/ServicesSection';
import LogoCloud from './components/LogoCloud';
import HowItWorksSection from './components/HowItWorksSection';
import CaseStudySection from './components/CaseStudySection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-background text-foreground font-sans leading-relaxed overflow-x-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 dark:via-slate-900 to-primary/20 dark:to-blue-900/50 bg-4x animate-gradient-bg opacity-40 dark:opacity-40"></div>
      </div>
      
      <Header />
      <main>
        <HeroSection />
        <LogoCloud />
        <ServicesSection />
        <CaseStudySection />
        <HowItWorksSection />
        <PortfolioSection />
        <IntroSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;