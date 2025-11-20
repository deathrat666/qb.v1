import React from 'react';
import { cn } from '../../lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  className?: string;
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  gap = 112,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn('w-full overflow-hidden', className)}
      style={{ '--gap': `${gap}px` } as React.CSSProperties}
    >
      <div className="flex w-max animate-infinite-scroll motion-safe:group-hover:[animation-play-state:paused]">
        {childrenArray.map((child, index) => (
          <div key={index} className="flex-shrink-0" style={{ padding: `0 calc(var(--gap) / 2)` }}>
            {child}
          </div>
        ))}
        {childrenArray.map((child, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0" aria-hidden="true" style={{ padding: `0 calc(var(--gap) / 2)` }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
