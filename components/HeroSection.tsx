
import React from 'react';
import { motion } from "framer-motion";
import { BRAND_CONFIG } from '../constants';
import { handleSmoothScroll } from '../utils/smoothScroll';
import { LiquidButton, Button } from './ui/liquid-glass-button';
import SpinningQ from './SpinningQ';
import ShinyText from './ShinyText';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900">
       {/* Spinning Q Background */}
       {/* 
          Mobile: Full width/height for immersion.
          Desktop: Constrained width (65%), centered horizontally, positioned higher (top-15%) to support text.
       */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] md:w-[65%] md:h-[85%] z-0 md:top-[15%] md:translate-y-0">
          <SpinningQ />
        </div>

       {/* Content Overlay - pointer-events-none allows mouse to pass through to Q for hover effects */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 pointer-events-none h-full py-12">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center justify-center text-center"
        >
          <h1 className="font-orbitron font-extrabold tracking-tighter leading-[1.1] text-[clamp(2.8rem,5vw,4.5rem)] mb-6">
             <ShinyText text={BRAND_CONFIG.tagline} speed={4} />
          </h1>
          <p className="max-w-[640px] mx-auto text-[1.125rem] md:text-[1.2rem] leading-relaxed text-slate-700 dark:text-neutral-200 text-center font-medium mb-8">
            Smart. Beautiful. Autonomous. QByte IT creates AI-powered web systems that design, write, and grow alongside your business.
          </p>
          {/* Enable pointer events for buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
             <LiquidButton size="xl" asChild>
               <a href="#contact" onClick={handleSmoothScroll}>
                 Get Your AI Website
               </a>
            </LiquidButton>
            <Button variant="outline" size="lg" asChild className="bg-white/50 dark:bg-black/20 backdrop-blur-md border-slate-300 dark:border-slate-700 h-12 px-8 text-base">
              <a href="#services" onClick={handleSmoothScroll}>
                Explore Services
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;