import React from 'react';
import { StatusCardProps } from '../../../types';

export const StatusCard: React.FC<StatusCardProps> = ({ status, agentStatus }) => {
  return (
    <div className="status-card">
      <div className="status-indicator"></div>
      
      <div className="status-section">
        <h4 className="status-title">STATUS</h4>
        <div className="status-value">
          <span className={`status-text ${status.toLowerCase()}`}>{status.toLowerCase()}</span>
        </div>
      </div>
      
      <div className="status-section">
        <h4 className="status-title">AGENT STATUS</h4>
        <div className="status-value">
          <div className="status-dots">
            <span className="status-dot"></span>
            <span className="status-dot"></span>
            <span className="status-dot"></span>
          </div>
          <span className={`status-text ${agentStatus.toLowerCase()}`}>{agentStatus}</span>
        </div>
      </div>
    </div>
  );
};