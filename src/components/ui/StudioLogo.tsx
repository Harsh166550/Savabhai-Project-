import React from 'react';

interface StudioLogoProps {
  className?: string;
  variant?: 'full' | 'mark-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md'
}) => {
  // Brand terracotta and rust colors
  const terracotta = '#8E3514';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#6E260E';
  const subtextColor = theme === 'dark' ? '#D49B28' : '#767E8C';

  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  if (variant === 'mark-only') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${heights[size]} w-auto ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="S D Design Studio Monogram"
      >
        {/* D Silhouette */}
        <path
          d="M20 10 H50 C74 10 92 28 92 50 C92 72 74 90 50 90 H20 Z"
          fill={terracotta}
        />
        {/* Stylized S in white cut out */}
        <path
          d="M48 28 C37 28 31 34 31 41 C31 52 48 50 48 60 C48 65 43 68 37 68 C30 68 24 64 22 59 L16 66 C20 74 29 78 38 78 C50 78 58 71 58 60 C58 48 41 50 41 39 C41 36 44 34 48 34 C54 34 58 37 61 42 L67 36 C63 30 56 28 48 28 Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official S D Logo Mark */}
      <svg
        viewBox="0 0 100 100"
        className={`${heights[size]} w-auto shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* D Silhouette */}
        <path
          d="M20 10 H50 C74 10 92 28 92 50 C92 72 74 90 50 90 H20 Z"
          fill={terracotta}
        />
        {/* Stylized S cut out */}
        <path
          d="M48 28 C37 28 31 34 31 41 C31 52 48 50 48 60 C48 65 43 68 37 68 C30 68 24 64 22 59 L16 66 C20 74 29 78 38 78 C50 78 58 71 58 60 C58 48 41 50 41 39 C41 36 44 34 48 34 C54 34 58 37 61 42 L67 36 C63 30 56 28 48 28 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Typography: DESIGN STUDIO / INTERIOR | ARCHITECTURE */}
      <div className="flex flex-col justify-center">
        <div
          className="font-display font-semibold tracking-[0.14em] leading-[1.05]"
          style={{
            color: textColor,
            fontSize: size === 'sm' ? '13px' : size === 'lg' ? '20px' : '15px'
          }}
        >
          <div>DESIGN</div>
          <div>STUDIO</div>
        </div>
        <div
          className="font-sans font-medium tracking-[0.24em] uppercase"
          style={{
            color: subtextColor,
            fontSize: size === 'sm' ? '7.5px' : size === 'lg' ? '10px' : '8.5px',
            marginTop: '2px'
          }}
        >
          INTERIOR | ARCHITECTURE
        </div>
      </div>
    </div>
  );
};
