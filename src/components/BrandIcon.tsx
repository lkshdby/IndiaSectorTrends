import React from 'react';

interface BrandIconProps {
  className?: string;
  size?: number | string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ className = 'w-full h-full', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size || '100%'}
      height={size || '100%'}
      className={className}
      aria-label="Industry Trends Chart Icon"
    >
      {/* Background Solid Sage Green #A2AB73 */}
      <rect width="512" height="512" rx="105" fill="#A2AB73" />

      {/* Chart Graphic Container */}
      <g transform="translate(68, 68) scale(0.734)">
        {/* Axes (Thick Charcoal/Black #231F20) */}
        <path d="M 0 456 L 476 456" stroke="#231F20" strokeWidth="26" strokeLinecap="square" />
        <path
          d="M 450 426 L 502 456 L 450 486"
          fill="none"
          stroke="#231F20"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d="M 44 502 L 44 26" stroke="#231F20" strokeWidth="26" strokeLinecap="square" />
        <path
          d="M 14 52 L 44 0 L 74 52"
          fill="none"
          stroke="#231F20"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 1. Top Trendline (Deep Red/Brown #A8240D) */}
        <path
          d="M 50 176 L 120 110 L 235 240 L 300 160 L 345 220 L 460 108"
          fill="none"
          stroke="#A8240D"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Middle Trendline (Vibrant Amber Gold #F5B800) */}
        <path
          d="M 50 324 L 84 286 L 176 390 L 320 264 L 366 324 L 466 220"
          fill="none"
          stroke="#F5B800"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Bottom Trendline (Vibrant Electric Blue #1971C2) */}
        <path
          d="M 50 442 L 176 244 L 285 418 L 345 356 L 456 356"
          fill="none"
          stroke="#1971C2"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default BrandIcon;
