export interface ConversationHookProps {
    onConnect?: () => void;
    onDisconnect?: () => void;
    onMessage?: (message: any) => void;
    onError?: (error: any) => void;
  }
  
  export interface ConversationStatus {
    status: string;
    isSpeaking: boolean;
  }
  
  export interface ConversationSessionProps {
    agentId: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
  }
  
  export interface VolumeProps {
    volume: number;
  }
  
  export interface Message {
    role: string;
    content: string;
    timestamp: number;
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    icon?: React.ReactNode;
    fullWidth?: boolean;
  }
  
  export interface StatusCardProps {
    status: string;
    agentStatus: string;
  }
  
  export interface VolumeControlProps {
    volume: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export interface LogoProps {
    size?: 'small' | 'medium' | 'large';
    label?: string;
  }
  
  export interface TranscriptSectionProps {
    messages: Message[];
  }