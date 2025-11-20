
import React, { useState } from 'react';
import AnimatedElement from './AnimatedElement';
import { LiquidButton } from './ui/liquid-glass-button';

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
  
  // Theme-aware input styles
  const inputClasses = "w-full bg-white border border-[#E2E8F0] rounded-lg py-3 px-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all duration-300";

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 overflow-hidden bg-[#F8FAFC] text-slate-700">
      {/* Soft Aurora glow behind the form */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[90%] sm:w-3/4 max-w-4xl h-[70%] rounded-full blur-[90px] opacity-60"
          style={{
            background: 'radial-gradient(circle at center, #E0F2FE 0%, #F3E8FF 50%, rgba(240,244,255,0) 75%)'
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
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-slate-900 drop-shadow-sm">Ready to Build Your AI Website?</h2>
          <p className="mt-4 text-lg text-slate-600 drop-shadow-sm">
            Tell us what you want to build and we'll design an intelligent system around it.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={200} variant="zoomIn">
          <div className="mt-12 bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] text-left relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-500 mb-1">Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-500 mb-1">Company (Optional)</label>
                    <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={inputClasses} />
                 </div>
                 <div>
                    <label htmlFor="website" className="block text-sm font-medium text-slate-500 mb-1">Website (Optional)</label>
                    <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className={inputClasses} />
                 </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-500 mb-1">What do you want to build?</label>
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
                  <span className="text-slate-800 font-bold tracking-wide">
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Request'}
                  </span>
                </LiquidButton>
                <div className="text-xs text-slate-500 h-4">
                  {status === 'error' && <span className="text-red-400">{errorMessage || 'Failed to send. Please try again.'}</span>}
                  {status === 'success' && <span className="text-emerald-600">Thanks! We received your request.</span>}
                </div>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest relative z-10">No spam, no pressure.</p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactSection;

