
import React, { useState, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';
import SkeletonLoader from './SkeletonLoader';
import { handleSmoothScroll } from '../utils/smoothScroll';
import { LiquidButton } from './ui/liquid-glass-button';
import LaserFlow from './LaserFlow';

const SkeletonCaseStudy: React.FC = () => (
    <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-3 space-y-4">
            <SkeletonLoader className="h-8 w-3/4 rounded-md bg-white/10" />
            <SkeletonLoader className="h-5 w-full rounded-md bg-white/10" />
            <SkeletonLoader className="h-5 w-full rounded-md bg-white/10" />
            <SkeletonLoader className="h-5 w-5/6 rounded-md bg-white/10" />
            <SkeletonLoader className="h-12 w-48 rounded-md mt-4 bg-white/10" />
        </div>
        <div className="md:col-span-2 space-y-4">
            <SkeletonLoader className="h-6 w-1/2 rounded-md bg-white/10" />
            <SkeletonLoader className="h-14 w-full rounded-lg bg-white/10" />
            <SkeletonLoader className="h-14 w-full rounded-lg bg-white/10" />
            <SkeletonLoader className="h-14 w-full rounded-lg bg-white/10" />
        </div>
    </div>
);


const CaseStudySection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

  return (
    <section id="case-study" className="py-20 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedElement>
          <div className="text-center">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground">A Glimpse of What’s Possible</h2>
          </div>
        </AnimatedElement>
          <div className="relative mt-12 bg-black rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10 overflow-hidden border border-white/10">
            
            <div className="relative z-10">
                {isLoading ? <SkeletonCaseStudy /> : (
                    <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                        <AnimatedElement className="md:col-span-3" variant="slideInLeft" delay={200}>
                            <h3 className="font-orbitron text-2xl font-bold text-white">AI-Powered Media Publisher</h3>
                            <p className="mt-4 text-slate-300 leading-relaxed">
                            We developed an AI-driven platform for a news outlet that automatically curates trending topics, generates SEO-optimized articles, and schedules them for social media publication. The system learns from audience engagement to refine its content strategy over time.
                            </p>
                            <div className="mt-8">
                              <LiquidButton size="lg" asChild forceDark className="text-white hover:text-white">
                                  <a href="#contact" onClick={handleSmoothScroll}>
                                    Let’s Build Your Version
                                  </a>
                              </LiquidButton>
                            </div>
                        </AnimatedElement>
                        
                        {/* Key Outcomes Section with Laser Background */}
                        <AnimatedElement className="md:col-span-2 relative rounded-2xl overflow-hidden" variant="slideInRight" delay={400}>
                            <div className="absolute inset-0 z-0">
                                <LaserFlow 
                                    color="#3B82F6" 
                                    horizontalBeamOffset={0} 
                                    verticalBeamOffset={0}
                                    wispDensity={1.2}
                                    flowSpeed={0.3}
                                />
                            </div>
                            
                            <div className="relative z-10 p-4">
                                <h4 className="font-orbitron text-lg font-semibold text-white mb-4">Key Outcomes:</h4>
                                <ul className="space-y-3">
                                <li className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 text-sm text-slate-200 flex items-center gap-3">
                                    <span className="font-bold text-blue-400 text-lg">+300%</span> 
                                    <span>more content published monthly</span>
                                </li>
                                <li className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 text-sm text-slate-200 flex items-center gap-3">
                                    <span className="font-bold text-blue-400 text-lg">40+</span> 
                                    <span>hours saved per week</span>
                                </li>
                                <li className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 text-sm text-slate-200 flex items-center gap-3">
                                    <span className="font-bold text-blue-400 text-lg">+150%</span> 
                                    <span>organic traffic in 6 months</span>
                                </li>
                                </ul>
                            </div>
                        </AnimatedElement>
                    </div>
                )}
            </div>
          </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
