
import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 4, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${className} ${disabled ? 'disabled' : ''}`}
      style={{ animationDuration } as React.CSSProperties}
    >
      {text}
    </span>
  );
};

export default ShinyText;
