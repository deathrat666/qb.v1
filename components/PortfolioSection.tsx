
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import { ArrowRight } from 'lucide-react';
import ShinyText from './ShinyText';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  isReal: boolean;
  tags: string;
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
      className="group relative flex flex-col h-full space-y-6"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-[26px] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-700 group-hover:shadow-[0_25px_70px_rgba(94,234,212,0.18)]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale-[0.1] group-hover:grayscale-0"
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
      <div className="flex-1 flex flex-col items-start px-1">
        <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-3">
          {item.tags}
        </div>
        <h3 className="text-[26px] md:text-[28px] font-bold text-white mb-3 leading-tight">{item.title}</h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">{item.subtitle}</p>

        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white transition-colors group/link"
          >
            <span className="underline underline-offset-4 decoration-white/30 group-hover/link:decoration-white">View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400">
            View Mockup
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
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
      tags: "AI / FACE ANALYSIS",
      link: "https://al-ferasa-v1.vercel.app/"
    },
    {
      id: 2,
      title: "Psychotherapist Teodora Herteg",
      subtitle: "Professional portfolio and booking platform for mental health services.",
      image: "/Psychotherapist Teodora Herteg Project presentation.png",
      isReal: true,
      tags: "HEALTHCARE / WEB DESIGN",
      link: "https://psihoterapeut-teodoraherteg.com/"
    },
    {
      id: 3,
      title: "BNet AI News",
      subtitle: "Centralized control hub for managing multi-agent autonomous workflows.",
      image: "/BNet AI News Project presentation.png",
      isReal: true,
      tags: "AI / PLATFORM",
      link: "https://bnet339.com/"
    },
    {
      id: 4,
      title: "AI Chat Assistant UI",
      subtitle: "Conversational interface design for high-context customer support bots.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
      isReal: false,
      tags: "UI / CONCEPT"
    },
    {
      id: 5,
      title: "SMB Website Redesign",
      subtitle: "Modernizing local business presence with AI-generated copy and SEO.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
      isReal: false,
      tags: "BRANDING / WEB"
    },
    {
      id: 6,
      title: "Digital Workflow System",
      subtitle: "Internal tool UI for visualizing complex data pipelines and logistics.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop",
      isReal: false,
      tags: "DATA / DASHBOARD"
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
        <div className="md:hidden flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} item={project} delay={0} />
          ))}
        </div>

        {/* Desktop View: 2-Column Waterfall Grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-10 gap-y-16">
          {/* Left Column - No delay */}
          <div className="flex flex-col gap-16">
            {leftColumnProjects.map((project) => (
              <ProjectCard key={project.id} item={project} delay={0} />
            ))}
          </div>

          {/* Right Column - Offset + Delay */}
          <div className="flex flex-col gap-16 mt-20">
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
