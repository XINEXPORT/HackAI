import React from 'react';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onChange }) => {
  const getVolumeGradient = (volume: number) => {
    const percentage = (volume / 10) * 100;
    return `linear-gradient(to right, #6366F1 0%, #6366F1 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
  };

  return (
    <div className="volume-container">
      <h3 className="volume-title">Volume Control</h3>
      
      <div className="volume-controls">
        <div className="volume-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#6366F1" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="volume-slider-container">
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="1"
            value={volume} 
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="volume-slider"
            style={{
              background: getVolumeGradient(volume),
            }}
          />
        </div>
        
        <div className="volume-value">
          {volume}/10
        </div>
      </div>
    </div>
  );
};