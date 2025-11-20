
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
      {/* Vertical energy spine tying header to footer */}
      <div className="pointer-events-none absolute inset-0 flex justify-center z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px]"
          style={{
            background: 'linear-gradient(180deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.85) 20%, rgba(59,130,246,1) 55%, rgba(59,130,246,0.85) 90%, rgba(59,130,246,0.4) 100%)',
            boxShadow: '0 0 55px 20px rgba(59,130,246,0.35)'
          }}
        />
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-16"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.45) 0%, rgba(59,130,246,0.15) 60%, rgba(59,130,246,0) 100%)',
            filter: 'blur(8px)'
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-24"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.12) 35%, rgba(59,130,246,0.06) 60%, rgba(59,130,246,0) 100%)',
            filter: 'blur(18px)',
            opacity: 0.9
          }}
        />
      </div>
      {/* Background LaserFlow - keep subtle motion without washing out */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-35 mix-blend-screen">
        <LaserFlow 
            color="#3B82F6"
            horizontalBeamOffset={0.0}
            verticalBeamOffset={0.0}
            wispDensity={1.2}
            flowSpeed={0.4}
            horizontalSizing={0.01}
            verticalSizing={10}
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

