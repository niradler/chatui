import React from 'react';

export interface MessageImage {
  id: string;
  file: File;
  url: string;
  type: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  liked?: boolean;
  disliked?: boolean;
  images?: MessageImage[];
  contentType?: 'text' | 'markdown' | 'code';
  metadata?: {
    model?: string;
    processingTime?: number;
    tokenCount?: number;
  };
}

export interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount?: number;
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  icon: React.ReactNode;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
}

export interface SidebarState {
  isOpen: boolean;
  darkMode: boolean;
  chatHistory: ChatHistory[];
}

export interface AppContextType {
  // Chat state
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  chatHistory: ChatHistory[];
  
  // Actions
  handleSubmit: (e: React.FormEvent, promptText?: string) => Promise<void>;
  handleNewChat: () => void;
  handleLike: (messageId: string) => void;
  handleDislike: (messageId: string) => void;
  handleCopy: (content: string) => Promise<void>;
  toggleDarkMode: () => void;
}
