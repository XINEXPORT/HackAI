import React from 'react';
import { StatusCard } from './ui/StatusCard';
import { Button } from './ui/Button';
import { VolumeControl } from './ui/VolumeControl';
import { TranscriptSection } from './ui/TranscriptSection';
import { Logo } from './ui/Logo';
import { useVoiceChat } from '../../hooks/useVoiceChat';

export default function VoiceChatApp() {
  const {
    status,
    isSpeaking,
    conversationId,
    volume,
    messages,
    startConversation,
    endConversation,
    handleVolumeChange
  } = useVoiceChat({});

  const getAgentStatus = () => {
    if (status !== 'connected') return 'Inactive';
    if (isSpeaking) return 'Speaking';
    return 'Listening';
  };

  const handleStartConversation = async () => {
    await startConversation({
      agentId: 'kjp5chENICxrEdmq4GaP'
    });
  };

  const onVolumeChange = (newVolume: number) => {
    const syntheticEvent = {
      target: { value: newVolume.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleVolumeChange(syntheticEvent);
  };

  return (
    <div className="app-container">
      
      <div className="main-content">
        <Logo isSpeaking={isSpeaking} />
        
        <div className="control-buttons">
          <Button 
            onClick={handleStartConversation} 
            disabled={status === 'connected' && conversationId !== null}
            variant="primary"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            Start Conversation
          </Button>
          
          <Button 
            onClick={endConversation} 
            disabled={status !== 'connected' || conversationId === null}
            variant="secondary"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10H15V14H9V10Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            End Conversation
          </Button>
        </div>
        
        <StatusCard 
          status={status} 
          agentStatus={getAgentStatus()}
        />
        
        <VolumeControl 
          volume={volume || 7} 
          onChange={onVolumeChange} 
        />
        
        <TranscriptSection 
          messages={messages} 
        />
      </div>
      
      <div className="footer">
        &#xa9; {new Date().getFullYear()} Courtesy of This Dot Labs
      </div>
    </div>
  );
}