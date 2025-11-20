
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { Button } from './ui/liquid-glass-button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import ShinyText from './ShinyText';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  isReal: boolean;
  link?: string;
}

const ProjectCard = ({ item, delay }: { item: Project; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
        delay: delay,
      }}
      className="group relative bg-zinc-900/60 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:bg-zinc-800/80 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden border-b border-white/5">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
        />
        {item.isReal && (
          <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg backdrop-blur-md">
            Live
          </div>
        )}
        {!item.isReal && (
          <div className="absolute top-4 right-4 bg-zinc-700/80 text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/10">
            Concept
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 flex flex-col">
        <h3 className="font-orbitron text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{item.title}</h3>
        <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-1">{item.subtitle}</p>

        <div className="flex gap-4 mt-auto">
          {item.isReal ? (
            <>
              {item.link ? (
                <Button variant="cool" size="lg" className="flex-1 text-xs font-bold tracking-wide uppercase" asChild>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 mr-2" /> View Live
                  </a>
                </Button>
              ) : (
                <Button variant="cool" size="lg" className="flex-1 text-xs font-bold tracking-wide uppercase">
                  <ExternalLink className="w-3 h-3 mr-2" /> View Live
                </Button>
              )}
              <Button variant="outline" size="lg" className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs font-bold tracking-wide uppercase">
                Case Study
              </Button>
            </>
          ) : (
            <Button variant="outline" size="lg" className="w-full border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white text-xs font-bold tracking-wide uppercase group/btn">
              View Mockup <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "AL-Ferasa AI Face Reading",
      subtitle: "AI-powered physiognomy app with generative analysis and real-time scanning.",
      image: "/al-ferasa-face-reading.png",
      isReal: true,
      link: "https://al-ferasa-v1.vercel.app/"
    },
    {
      id: 2,
      title: "Psychotherapist Teodora Herteg",
      subtitle: "Professional portfolio and booking platform for mental health services.",
      image: "/Psychotherapist Teodora Herteg Project presentation.png",
      isReal: true,
      link: "https://psihoterapeut-teodoraherteg.com/"
    },
    {
      id: 3,
      title: "BNet AI News",
      subtitle: "Centralized control hub for managing multi-agent autonomous workflows.",
      image: "/BNet AI News Project presentation.png",
      isReal: true,
      link: "https://bnet339.com/"
    },
    {
      id: 4,
      title: "AI Chat Assistant UI",
      subtitle: "Conversational interface design for high-context customer support bots.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
      isReal: false
    },
    {
      id: 5,
      title: "SMB Website Redesign",
      subtitle: "Modernizing local business presence with AI-generated copy and SEO.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
      isReal: false
    },
    {
      id: 6,
      title: "Digital Workflow System",
      subtitle: "Internal tool UI for visualizing complex data pipelines and logistics.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop",
      isReal: false
    }
  ];

  // For the desktop masonry effect, we split projects into two columns
  const leftColumnProjects = projects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <section id="portfolio" className="py-20 sm:py-32 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedElement>
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <ShinyText text="Our Work" disabled={false} speed={3} className="shiny-text-blue" />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Real results and future-ready concepts powered by us.</p>
          </div>
        </AnimatedElement>

        {/* Mobile View: Stacked */}
        <div className="md:hidden flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} item={project} delay={0} />
          ))}
        </div>

        {/* Desktop View: 2-Column Waterfall Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {/* Left Column - No delay */}
          <div className="flex flex-col gap-8">
            {leftColumnProjects.map((project) => (
              <ProjectCard key={project.id} item={project} delay={0} />
            ))}
          </div>

          {/* Right Column - Offset + Delay */}
          <div className="flex flex-col gap-8 mt-24">
            {rightColumnProjects.map((project) => (
              <ProjectCard key={project.id} item={project} delay={0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
