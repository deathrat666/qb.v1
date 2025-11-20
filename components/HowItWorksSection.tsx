import React, { useState, useEffect } from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
import AnimatedElement from './AnimatedElement';
import SkeletonLoader from './SkeletonLoader';

const StepCard: React.FC<{ step: number; icon: React.ReactNode; title: string; description: string; }> = ({ step, icon, title, description }) => (
  <div className="relative flex flex-col items-center text-center p-6 bg-card/40 dark:bg-slate-800/40 backdrop-blur-xl border border-border/50 dark:border-slate-700/50 rounded-2xl shadow-lg shadow-black/20 transition-all duration-300 hover:bg-muted/60 dark:hover:bg-slate-700/60 hover:backdrop-blur-2xl transform hover:scale-105 h-full">
    <div className="absolute -top-6 bg-background dark:bg-slate-900 px-3 py-1 border border-border dark:border-slate-700 rounded-full text-secondary font-orbitron font-bold text-lg">
      {step}
    </div>
    <div className="mt-6 text-secondary transition-all duration-500 delay-300 transform scale-75 opacity-0 group-[.is-visible]:scale-100 group-[.is-visible]:opacity-100">
      {icon}
    </div>
    <h3 className="mt-5 font-orbitron text-xl font-bold text-foreground">{title}</h3>
    <p className="mt-2 text-muted-foreground text-sm">{description}</p>
  </div>
);

const SkeletonStepCard: React.FC = () => (
    <div className="relative flex flex-col items-center text-center p-6 bg-card/40 dark:bg-slate-800/40 backdrop-blur-xl border border-border/50 dark:border-slate-700/50 rounded-2xl shadow-lg shadow-black/20">
        <div className="absolute -top-6">
            <SkeletonLoader className="h-9 w-9 rounded-full" />
        </div>
        <div className="mt-6">
            <SkeletonLoader className="h-10 w-10 rounded-md" />
        </div>
        <SkeletonLoader className="mt-5 h-6 w-32 rounded-md" />
        <div className="mt-2 space-y-2 w-full">
            <SkeletonLoader className="h-4 w-full rounded-md" />
            <SkeletonLoader className="h-4 w-4/5 mx-auto rounded-md" />
        </div>
    </div>
);

const HowItWorksSection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-background/30 dark:bg-slate-900/30 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedElement>
          <div className="text-center">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground">From Idea to Intelligent System</h2>
          </div>
        </AnimatedElement>
        <div className="mt-20 relative">
            {/* Dashed line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                <div className="w-full border-t-2 border-dashed border-border dark:border-slate-700"></div>
            </div>

            <div className="relative grid gap-16 lg:gap-8 lg:grid-cols-4">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => <SkeletonStepCard key={index} />)
                ) : (
                    HOW_IT_WORKS_STEPS.map((step, index) => (
                        <AnimatedElement key={step.step} delay={index * 150} className="group" variant="zoomIn">
                            <StepCard {...step} />
                        </AnimatedElement>
                    ))
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;