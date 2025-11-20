
import React from 'react';
import { InfiniteSlider } from './motion-primitives/infinite-slider'

// Logo Components
const LogoClass = "h-6 sm:h-7 w-auto fill-current opacity-60 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";

const ReactLogo = () => (
  <svg viewBox="-10.5 -9.45 21 18.9" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"/>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
    </g>
  </svg>
);

const VueLogo = () => (
  <svg viewBox="0 0 261.76 226.69" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
    <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.69L261.76.001z"/>
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 180 180" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
      <path d="M90 0C40.3 0 0 40.3 0 90s40.3 90 90 90 90-40.3 90-90S139.7 0 90 0zM150.4 136.3c-1.3-2.1-2.6-4.2-4.1-6.2L82.6 51.4h-16v77.1h12.6V69l54.8 69.8c-12.4 9.1-27.8 14.5-44.5 14.5-41.4 0-75-33.6-75-75s33.6-75 75-75 75 33.6 75 75c0 22.3-9.8 42.2-25.1 56z"/>
  </svg>
);

const TailwindLogo = () => (
   <svg viewBox="0 0 24 24" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
   </svg>
);

const VercelLogo = () => (
  <svg viewBox="0 0 1155 1000" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
    <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
  </svg>
);

const OpenAILogo = () => (
    <svg viewBox="0 0 24 24" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9723l.142.0852 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685V7.7306a.0804.0804 0 0 1-.0332.0615L9.74 11.3752a4.5087 4.5087 0 0 1-7.3992-3.4796zm8.5377-6.4767a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V5.9133a4.504 4.504 0 0 1 4.4945-4.4944zm9.6607 4.1254a4.4708 4.4708 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.4943 9.0833V6.7509a.0804.0804 0 0 1 .0332-.0615l4.9711-2.8776a4.4992 4.4992 0 0 1 6.1408 1.6464zm4.131 6.3905a4.485 4.485 0 0 1-2.3655 1.9723l-.142-.0852-4.7783-2.7582a.7712.7712 0 0 0-.7806 0l-5.8428 3.3685v-2.3324a.0804.0804 0 0 1 .0332-.0615l4.9711-2.8776a4.5087 4.5087 0 0 1 7.3992 3.4796z"/>
    </svg>
);

const GoogleLogo = () => (
     <svg viewBox="0 0 24 24" className={LogoClass} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.38 0 9.25-4.04 9.25-9.25 0-.48-.11-1.03-.15-1.65z"/>
    </svg>
);

const TextLogo = ({ text }: { text: string }) => (
    <span className={`${LogoClass} flex items-center font-orbitron font-bold text-sm tracking-wider whitespace-nowrap`}>
        {text}
    </span>
);

export default function LogoCloud() {
    return (
        <section className="relative z-40 w-full pointer-events-none">
            {/* Full width background container with gradient and liquid-glass styles */}
            <div className="w-full bg-gradient-to-b from-zinc-50/80 via-zinc-50/50 to-background/80 dark:from-zinc-900/80 dark:via-zinc-900/50 dark:to-background/80 backdrop-blur-xl border-y border-white/20 dark:border-white/5 shadow-lg shadow-black/5">
                <div className="pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    
                    {/* Left Text */}
                    <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-foreground/10 pb-4 md:pb-0 md:pr-8 w-full md:w-auto text-center md:text-left">
                        <span className="text-sm font-orbitron font-bold uppercase tracking-[0.2em] text-muted-foreground/90 glow-sm">
                            Powered by
                        </span>
                    </div>
                    
                    {/* Right Slider */}
                    <div className="flex-1 w-full overflow-hidden min-w-0 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={35}
                            gap={40}
                            className="text-muted-foreground"
                        >
                            <div className="flex items-center justify-center w-24 sm:w-32"><ReactLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><VueLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><NextLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><TailwindLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><VercelLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><OpenAILogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><GoogleLogo /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><TextLogo text="LOVABLE" /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><TextLogo text="AURA" /></div>
                            <div className="flex items-center justify-center w-24 sm:w-32"><TextLogo text="BASE44" /></div>
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    )
}
