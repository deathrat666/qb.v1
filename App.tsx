
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
import SmoothScroll from './components/SmoothScroll';
import { Helmet } from 'react-helmet-async';

const App: React.FC = () => {
  return (
    <div className="bg-background text-foreground font-sans leading-relaxed overflow-x-hidden relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>QByte IT - Agenție Web Design AI & Automatizare România</title>
        <meta name="description" content="Transformăm afacerea ta cu site-uri web AI, automatizări inteligente și design futurist. Agenție de top Web Design & Software în România." />
        <meta name="keywords" content="Web Design Romania, Agenție AI, Creare Site Web, Chatbot AI, Automatizare Business, QByte IT" />
        <meta name="author" content="QByte IT" />
        <link rel="canonical" href="https://www.qbyte-it.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.qbyte-it.com/" />
        <meta property="og:title" content="QByte IT - Agenție Web Design AI & Automatizare" />
        <meta property="og:description" content="Construim site-uri care gândesc. Soluții web premium, integrate cu Inteligență Artificială pentru companii din România." />
        <meta property="og:image" content="https://www.qbyte-it.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.qbyte-it.com/" />
        <meta property="twitter:title" content="QByte IT - Web Design AI" />
        <meta property="twitter:description" content="Construim site-uri care gândesc. Web Design & AI Automation." />
        <meta property="twitter:image" content="https://www.qbyte-it.com/og-image.jpg" />
      </Helmet>
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 dark:via-slate-900 to-primary/20 dark:to-blue-900/50 bg-4x animate-gradient-bg opacity-40 dark:opacity-40"></div>
      </div>
      
      <Header />
      <SmoothScroll>
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
      </SmoothScroll>
    </div>
  );
};

export default App;
