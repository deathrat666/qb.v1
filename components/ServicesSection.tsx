
import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import AnimatedElement from './AnimatedElement';
import SkeletonLoader from './SkeletonLoader';
import ShinyText from './ShinyText';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="group relative bg-card/30 dark:bg-slate-800/30 backdrop-blur-2xl border border-border/50 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col items-start space-y-4 transition-all duration-500 hover:scale-[1.015] shadow-lg shadow-black/20 overflow-hidden h-full">
        <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(40,40,40,0.06))',
                boxShadow: '0 8px 22px rgba(0,0,0,0.28), inset 0 0 32px rgba(255,255,255,0.08), 0 0 18px rgba(180,180,180,0.15)',
                border: '1px solid rgba(200,200,200,0.20)',
                backdropFilter: 'blur(12px) brightness(1.05)',
                WebkitBackdropFilter: 'blur(12px) brightness(1.05)'
            }}
        ></div>
        <div className="relative z-10 flex flex-col items-start space-y-4 w-full">
            <div className="bg-background/50 dark:bg-slate-900/50 p-3 rounded-lg border border-border dark:border-slate-700 [&>svg]:transition-all [&>svg]:duration-500 [&>svg]:group-hover:drop-shadow-[0_0_4px_rgba(200,200,200,0.25)]">
                {icon}
            </div>
            <h3 className="font-orbitron text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const SkeletonCard = () => (
    <div className="bg-card/30 dark:bg-slate-800/30 backdrop-blur-2xl border border-border/50 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col items-start space-y-4">
        <SkeletonLoader className="h-14 w-14 rounded-lg" />
        <SkeletonLoader className="h-6 w-3/4 rounded-md" />
        <div className="space-y-2 w-full">
            <SkeletonLoader className="h-4 w-full rounded-md" />
            <SkeletonLoader className="h-4 w-5/6 rounded-md" />
        </div>
    </div>
);

const ServicesSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="pb-20 pt-12 sm:pb-32 sm:pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedElement>
        <div className="text-center">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground">
            <ShinyText text="What We Build" disabled={false} speed={3} className="shiny-text-blue" />
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Intelligent web systems, powered by AI.</p>
        </div>
        </AnimatedElement>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
                SERVICES.map((service, index) => (
                    <AnimatedElement key={service.title} delay={index * 150} variant="zoomIn">
                        <ServiceCard {...service} />
                    </AnimatedElement>
                ))
            )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
