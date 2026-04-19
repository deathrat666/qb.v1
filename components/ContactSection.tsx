import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    _gotcha: '',
  });
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) {
      if (step === 1 && !formData.message.trim()) {
        setErrorMessage("Please tell us what you want to build.");
        return;
      }
      setErrorMessage(null);
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setErrorMessage(null);
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return;
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your name and email.");
      return;
    }

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
      })
      .catch((err: Error) => {
        setStatus('error');
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
      });
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400/70 transition-all duration-300";

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      position: 'absolute' as any,
      width: '100%',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative' as any,
      width: '100%',
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
      position: 'absolute' as any,
      width: '100%',
      transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
    })
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 overflow-hidden bg-[#0B1220] text-slate-100">
      {/* Soft Aurora glow + laser spine behind the form (dark theme) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[88%] sm:w-3/4 max-w-4xl h-[70%] rounded-full blur-[95px] opacity-65"
            style={{ background: 'radial-gradient(circle at center, rgba(56,189,248,0.45) 0%, rgba(129,140,248,0.5) 45%, rgba(15,23,42,0) 75%)' }}
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
            className="w-full h-full" color="#9fb8ff" horizontalBeamOffset={0} verticalBeamOffset={0}
            wispDensity={1.35} flowSpeed={0.33} horizontalSizing={0.16} verticalSizing={10}
            fogIntensity={0.5} fogScale={0.26} wispSpeed={13} wispIntensity={5} flowStrength={0.3}
            decay={1.05} falloffStart={1.05} fogFallSpeed={0.5}
          />
        </div>
      </div>
      
      {/* Centered logo hovering above footer */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-8 z-10">
        <img src="/qbyte it logo.webp" alt="QByte IT" className="w-28 sm:w-32 h-auto drop-shadow-[0_12px_35px_rgba(59,130,246,0.35)]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatedElement>
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">Get Your Free AI Audit</h2>
          <p className="mt-4 text-lg text-slate-300 drop-shadow-sm">
            Discover exactly how AI automation can save you hundreds of hours.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={200} variant="zoomIn">
          <div className="mt-12 bg-[#0F172A]/80 border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_-18px_rgba(0,0,0,0.55)] backdrop-blur-xl relative overflow-hidden flex flex-col min-h-[380px]">
            {/* Progress Indicator */}
            {status !== 'success' && (
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">Step {step} of 3</span>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-sky-400' : i < step ? 'w-4 bg-sky-400/50' : 'w-4 bg-white/10'}`} />
                  ))}
                </div>
              </div>
            )}
            
            {status === 'error' && errorMessage && <div className="mb-4 text-sm text-red-400 bg-red-400/10 p-3 rounded-md">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="flex-grow flex flex-col relative z-10">
              <div className="hidden" aria-hidden="true">
                <label>Do not fill this field<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={formData._gotcha} onChange={handleChange} className="hidden" /></label>
              </div>

              <div className="relative flex-grow flex items-center overflow-hidden min-h-[160px]">
                <AnimatePresence initial={false} custom={direction} mode="sync">
                  {status === 'success' ? (
                     <motion.div
                       key="success"
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="w-full text-center py-12"
                     >
                       <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                       <p className="text-slate-300">We will review your submission and get back to you shortly with next steps.</p>
                     </motion.div>
                  ) : step === 1 ? (
                    <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="text-left w-full">
                      <label htmlFor="message" className="block text-lg font-medium text-white mb-3">1. What is your biggest bottleneck or what do you want to build?</label>
                      <textarea name="message" id="message" rows={4} required placeholder="E.g., I want to automate my customer support or build a web app..." value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
                    </motion.div>
                  ) : step === 2 ? (
                    <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="text-left w-full">
                      <h3 className="block text-lg font-medium text-white mb-4">2. Tell us a bit about your business (Optional)</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
                          <input type="text" name="company" id="company" placeholder="Acme Corp" value={formData.company} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-1">Website URL</label>
                          <input type="url" name="website" id="website" placeholder="https://..." value={formData.website} onChange={handleChange} className={inputClasses} />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="text-left w-full">
                       <h3 className="block text-lg font-medium text-white mb-4">3. Who should we send the audit to?</h3>
                       <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                          <input type="text" name="name" id="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Work Email</label>
                          <input type="email" name="email" id="email" required placeholder="john@company.com" value={formData.email} onChange={handleChange} className={inputClasses} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {status !== 'success' && (
                <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                  {step > 1 ? (
                    <button type="button" onClick={prevStep} className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      Back
                    </button>
                  ) : <div></div>}

                  {step < 3 ? (
                    <button type="button" onClick={nextStep} className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
                      Continue
                    </button>
                  ) : (
                    <LiquidButton type="submit" size="default" variant="default" disabled={status === 'sending'}>
                      <span className="text-slate-50 font-bold tracking-wide">
                        {status === 'sending' ? 'Sending...' : 'Request Free Audit'}
                      </span>
                    </LiquidButton>
                  )}
                </div>
              )}
            </form>
          </div>
        </AnimatedElement>
        <p className="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest relative z-10">No spam, no pressure. 100% Free.</p>
      </div>
    </section>
  );
};

export default ContactSection;
