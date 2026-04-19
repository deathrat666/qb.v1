
"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from "../../lib/utils"
import { useTheme } from '../../contexts/ThemeProvider';

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}


const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-xs',
        tracking: 'tracking-[0.25em]',
        radius: 120, // Adjusted for smaller size
        gap: 40,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.3em]',
        radius: 160,
        gap: 30,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.35em]',
        radius: 200, // Adjusted for larger size
        gap: 20,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    }
};

const usePreloadImages = (images: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = url;
                img.onload = () => resolve();
                img.onerror = (err) => {
                    console.warn(`Could not preload image: ${url}`, err);
                    resolve(); // Resolve anyway to not break Promise.all
                };
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true));
    }, [images]);

    return loaded;
};

const ImagePreloader = ({ images }: { images: string[] }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" crossOrigin="anonymous" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            crossOrigin="anonymous"
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);
export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image));
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: '0px 0px -10% 0px' });

    const isSystemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && isSystemDark);

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems;
        const availableDegrees = 360 - totalGapDegrees;
        const segmentDegrees = availableDegrees / totalItems;
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            
            const charWidth = 8; 
            const textPixelLength = item.text.length * charWidth * (size === 'sm' ? 0.8 : size === 'lg' ? 1.2 : 1);
            const textLengthInDegrees = (textPixelLength / (2 * Math.PI * config.radius)) * 360;
            const textLength = (segmentDegrees / 360) * (2 * Math.PI * config.radius);

            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer fill-muted-foreground hover:fill-foreground transition-colors duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            transition: 'fill 0.3s ease'
                        }}
                    >
                        <textPath
                            href="#curve"
                            startOffset={startOffset}
                            textLength={`${textLength}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                ref={containerRef}
                whileHover={isDark ? {} : {
                    boxShadow: "20px 20px 40px #bebebe, -20px -20px 40px #ffffff"
                }}
                whileTap={{ scale: 0.98 }}
                animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                    duration: 5,
                    repeat: isInView ? Infinity : 0,
                    ease: "easeInOut"
                }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full",
                    isDark
                      ? "bg-background shadow-[16px_16px_32px_#0a0a0a,-16px_-16px_32px_#2a2a2a]"
                      : "bg-[#e6e6e6] shadow-[16px_16px_32px_#bebebe,-16px_-16px_32px_#ffffff]",
                    "transition-all duration-500 ease-out",
                    className
                )}
            >
                <AnimatePresence>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} size={size} />
                    )}
                </AnimatePresence>

                <motion.div
                    className="absolute inset-[2px] rounded-full"
                    style={isDark ? {
                        background: 'hsl(var(--background))',
                        boxShadow: "inset 6px 6px 12px #0a0a0a, inset -6px -6px 12px #2a2a2a"
                    } : {
                        background: '#e6e6e6',
                        boxShadow: "inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff"
                    }}
                />

                <motion.div
                    className="absolute inset-[12px] rounded-full"
                     style={isDark ? {
                        background: 'hsl(var(--background))',
                        boxShadow: "inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #2a2a2a"
                    } : {
                        background: '#e6e6e6',
                        boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff"
                    }}
                />

                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 p-6 rounded-3xl"
                                style={isDark ? {
                                    background: 'hsl(var(--background))'
                                } : {
                                    background: '#e6e6e6'
                                }}
                                whileHover={isDark ? {} : {
                                    boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff"
                                }}
                            >
                                {centerText}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={isInView ? { rotate: 360 } : {}}
                    transition={{
                        duration: 40,
                        repeat: isInView ? Infinity : 0,
                        ease: "linear"
                    }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <path
                            id="curve"
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </>
    );
};