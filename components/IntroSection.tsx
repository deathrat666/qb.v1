import React from 'react';
import { CircularRevealHeading } from './ui/circular-reveal-heading';
import AnimatedElement from './AnimatedElement';

const items = [
    {
        text: "STRATEGY",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
    },
    {
        text: "DESIGN",
        image: "https://images.unsplash.com/photo-1572044162444-24c95c2174b3?q=80&w=800&auto=format&fit=crop"
    },
    {
        text: "GROWTH",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    },
    {
        text: "INNOVATION",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop"
    }
];

const IntroSection: React.FC = () => {
    return (
        <section id="intro" className="py-20 sm:py-32 flex flex-col items-center justify-center bg-background px-4 overflow-hidden">
             <AnimatedElement>
                 <div className="text-center mb-16">
                   <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-foreground">Our Core Focus</h2>
                   <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Blending creativity with technology to build the future, one intelligent system at a time.</p>
                 </div>
             </AnimatedElement>
             <AnimatedElement delay={200}>
                <CircularRevealHeading
                    items={items}
                    centerText={
                        <div className="text-xl font-bold text-foreground/70">
                            QBYTE IT
                        </div>
                    }
                    size="md"
                />
             </AnimatedElement>
        </section>
    );
};

export default IntroSection;