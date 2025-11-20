
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage(null);

    fetch('https://formspree.io/f/myzobqnl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...formData, _subject: 'New contact from QByte IT site' }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error((data?.error as string) || 'Failed to send message.');
        }
        setStatus('success');
        setFormData({ name: '', email: '', company: '', website: '', message: '' });
      })
      .catch((err: Error) => {
        setStatus('error');
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
      });
  };
  
  // Theme-aware input styles (dark)
  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400/70 transition-all duration-300";

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 overflow-hidden bg-[#0B1220] text-slate-100">
      {/* Soft Aurora glow + laser spine behind the form (dark theme) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[88%] sm:w-3/4 max-w-4xl h-[70%] rounded-full blur-[95px] opacity-65"
            style={{
              background: 'radial-gradient(circle at center, rgba(56,189,248,0.45) 0%, rgba(129,140,248,0.5) 45%, rgba(15,23,42,0) 75%)'
            }}
          />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, white 10%, white 90%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0%, white 10%, white 90%, transparent 100%)'
          }}
        >
          <LaserFlow
            className="w-full h-full"
            color="#9fb8ff"
            horizontalBeamOffset={0}
            verticalBeamOffset={0}
            wispDensity={1.35}
            flowSpeed={0.33}
            horizontalSizing={0.16}
            verticalSizing={10}
            fogIntensity={0.5}
            fogScale={0.26}
            wispSpeed={13}
            wispIntensity={5}
            flowStrength={0.3}
            decay={1.05}
            falloffStart={1.05}
            fogFallSpeed={0.5}
          />
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[240px] h-[110px] blur-[48px] opacity-80"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.45) 0%, rgba(59,130,246,0.32) 50%, rgba(99,102,241,0) 100%)'
          }}
        />
      </div>
      {/* Centered logo hovering above footer */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-8 z-10">
        <img
          src="/qbyte it logo.webp"
          alt="QByte IT"
          className="w-28 sm:w-32 h-auto drop-shadow-[0_12px_35px_rgba(59,130,246,0.35)]"
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatedElement>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">Ready to Build Your AI Website?</h2>
          <p className="mt-4 text-lg text-slate-300 drop-shadow-sm">
            Tell us what you want to build and we'll design an intelligent system around it.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={200} variant="zoomIn">
          <div className="mt-12 bg-[#0F172A]/80 border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_-18px_rgba(0,0,0,0.55)] backdrop-blur-xl text-left relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">Company (Optional)</label>
                    <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={inputClasses} />
                 </div>
                 <div>
                    <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-1">Website (Optional)</label>
                    <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className={inputClasses} />
                 </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">What do you want to build?</label>
                <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
              </div>
              <div className="text-center pt-4 flex flex-col items-center gap-3">
                <LiquidButton
                  type="submit"
                  size="xl"
                  variant="default"
                  className="w-full sm:w-auto"
                  disabled={status === 'sending'}
                >
                  <span className="text-slate-50 font-bold tracking-wide">
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Request'}
                  </span>
                </LiquidButton>
                <div className="text-xs text-slate-400 h-4">
                  {status === 'error' && <span className="text-red-300">{errorMessage || 'Failed to send. Please try again.'}</span>}
                  {status === 'success' && <span className="text-emerald-300">Thanks! We received your request.</span>}
                </div>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-slate-400 uppercase tracking-widest relative z-10">No spam, no pressure.</p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactSection;

