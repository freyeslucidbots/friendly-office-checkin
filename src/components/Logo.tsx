
import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const sizeClasses = size === 'small' ? 'h-12 w-auto' : 'h-28 w-auto';
  
  return (
    <div className={`${sizeClasses} flex items-center justify-center animate-fade-in`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="54" fill="#D3E4FD" />
        <circle cx="60" cy="60" r="40" fill="#6AAFE6" />
        <path
          d="M45 60C45 51.716 51.716 45 60 45C68.284 45 75 51.716 75 60"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M45 75H75"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
