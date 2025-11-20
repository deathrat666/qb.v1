
import React from 'react';

export const BRAND_CONFIG = {
  name: "QByte IT",
  tagline: "We build websites that think.",
  agencyName: "QByte IT – The AI Web Agency",
};

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Case Study", href: "#case-study" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    icon: <CodeIcon />,
    title: "AI Website Design",
    description: "Next-generation websites with AI-assisted copy, built-in SEO, and high-performance responsive design.",
  },
  {
    icon: <FeatherIcon />,
    title: "Content Autopilot",
    description: "Your site becomes its own writer—AI researches, writes, and publishes SEO-ready articles automatically.",
  },
  {
    icon: <MessageIcon />,
    title: "AI Chatbots & Integrations",
    description: "Branded AI assistants that answer questions, qualify leads, and capture contacts 24/7.",
  },
  {
    icon: <RocketIcon />,
    title: "Digital Autopilot Systems",
    description: "We connect your website, analytics, and tools into one seamless, automated growth engine.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    icon: <DiscoverIcon />,
    title: "Discover",
    description: "We clarify your goals and uncover where AI and automation can help most.",
  },
  {
    step: 2,
    icon: <DesignIcon />,
    title: "Design",
    description: "We create a liquid-glass, high-conversion interface tailored to your brand.",
  },
  {
    step: 3,
    icon: <IntegrateIcon />,
    title: "Integrate",
    description: "We plug in AI models, automations, and analytics behind the scenes.",
  },
  {
    step: 4,
    icon: <ScaleIcon />,
    title: "Scale",
    description: "Your system learns from data and we refine it for better performance over time.",
  },
];


// SVG Icons - Styled with Tailwind's `currentColor` for easy color changes
function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function DiscoverIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
}

function DesignIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
}

function IntegrateIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
}

function ScaleIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
}