import React, { useEffect, useRef, useState } from 'react';

type AnimationVariant = 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn';

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
}

const animationStyles = {
  initial: {
    fadeInUp: 'opacity-0 translate-y-4',
    slideInLeft: 'opacity-0 -translate-x-8',
    slideInRight: 'opacity-0 translate-x-8',
    zoomIn: 'opacity-0 scale-95',
  },
  final: 'opacity-100 translate-y-0 translate-x-0 scale-100',
};


const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0, variant = 'fadeInUp' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Adding 'is-visible' ensures compatibility with child components using group selectors
  const appliedClassName = `${className || ''} transition-all duration-1000 ${
    isVisible ? `${animationStyles.final} is-visible` : animationStyles.initial[variant]
  }`;

  return (
    <div
      ref={ref}
      className={appliedClassName}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
