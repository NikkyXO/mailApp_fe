 
import React from 'react';

  interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    message?: string;
    className?: string;
  }


  export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 6,
    color = 'blue-700',
    message = 'Loading...',
    className = ''
  }) => (
    <div
      className={`flex flex-col justify-center items-center w-full ${className}`}
      role="status"
      aria-label={message}
    >
      <div 
        className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-${color} mb-4`}
        style={{
          height: `${size}rem`,
          width: `${size}rem`,
          borderWidth: `${size/6}rem`
        }}
      />
      {message && (
        <p className="text-gray-600 text-sm tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );