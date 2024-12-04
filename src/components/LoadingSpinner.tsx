 
import React from 'react';

  interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    message?: string;
  }
  
  export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 6, 
    color = 'blue-700',
    message = 'Loading...',
  }) => (
    <div 
      className="flex flex-col justify-center items-center h-screen" 
      role="status" 
      aria-label={message} 
    >
      <div
        className={`animate-spin rounded-full border-t-4 border-${color}`}
        style={{
          height: `${size}rem`,
          width: `${size}rem`,
        }}
      ></div>
      {message && (
        <p className="mt-4 text-gray-600">{message}</p>
      )}
    </div>
  );