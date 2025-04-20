import React, { useRef, useEffect } from 'react';
import { Message } from '../../../types';

interface TranscriptSectionProps {
  messages: Message[];
}

export const TranscriptSection: React.FC<TranscriptSectionProps> = ({ messages }) => {
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="transcript-container">
      <h3 className="transcript-title">Conversation Transcript</h3>
      
      <div className="transcript-content" ref={transcriptRef}>
        {messages.length === 0 ? (
          <div className="transcript-empty">
            <p>No conversation history yet.</p>
            <p>Start a conversation to see the transcript here.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`transcript-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-header">
                <span className="message-sender">{message.role === 'user' ? 'You' : 'Francine'}</span>
                <span className="message-time">{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};