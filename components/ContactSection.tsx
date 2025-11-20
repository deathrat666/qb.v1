
import React, { useState } from 'react';
import AnimatedElement from './AnimatedElement';
import { LiquidButton } from './ui/liquid-glass-button';
import LaserFlow from './LaserFlow';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here (e.g., API call)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', website: '', message: '' });
  };
  
  // Theme-aware input styles
  const inputClasses = "w-full bg-background/50 backdrop-blur-md border border-border rounded-lg py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* Laser-inspired spine with fogged base (reactbits.dev/animations/laser-flow reference) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, white 12%, white 90%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0%, white 12%, white 90%, transparent 100%)'
          }}
        >
          <LaserFlow
            className="w-full h-full"
            color="#cfe5ff"
            horizontalBeamOffset={0}
            verticalBeamOffset={0}
            wispDensity={1.4}
            flowSpeed={0.32}
            horizontalSizing={0.18}
            verticalSizing={11}
            fogIntensity={0.55}
            fogScale={0.28}
            wispSpeed={14}
            wispIntensity={5.5}
            flowStrength={0.32}
            decay={1.05}
            falloffStart={1.05}
            fogFallSpeed={0.52}
          />
        </div>
        {/* Base flare to anchor the spine at the footer line */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-56 h-24"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(207,229,255,0.35) 0%, rgba(126,180,255,0.22) 45%, rgba(84,144,255,0.1) 70%, rgba(59,130,246,0) 100%)',
            filter: 'blur(14px)'
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatedElement>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground drop-shadow-lg">Ready to Build Your AI Website?</h2>
          <p className="mt-4 text-lg text-muted-foreground drop-shadow-md">
            Tell us what you want to build and we'll design an intelligent system around it.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={200} variant="zoomIn">
          <div className="mt-12 bg-card/30 dark:bg-slate-900/30 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 shadow-2xl shadow-black/10 text-left ring-1 ring-border/5 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company (Optional)</label>
                    <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={inputClasses} />
                 </div>
                 <div>
                    <label htmlFor="website" className="block text-sm font-medium text-muted-foreground mb-1">Website (Optional)</label>
                    <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className={inputClasses} />
                 </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">What do you want to build?</label>
                <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
              </div>
              <div className="text-center pt-4">
                <LiquidButton type="submit" size="xl" variant="default" className="w-full sm:w-auto">
                  <span className="text-foreground font-bold tracking-wide">Send Request</span>
                </LiquidButton>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-muted-foreground uppercase tracking-widest relative z-10">No spam, no pressure.</p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactSection;

