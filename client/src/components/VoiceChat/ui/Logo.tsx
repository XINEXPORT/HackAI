import React from 'react';

interface LogoProps {
  isSpeaking?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isSpeaking = false }) => {
  return (
    <div className="logo-container">
      <div className={`logo-circle ${isSpeaking ? 'speaking' : ''}`}>
        <div className={`logo-glow ${isSpeaking ? 'active' : ''}`} />
        
        <div className="logo-label">
          Francine
        </div>
      </div>
    </div>
  );
};