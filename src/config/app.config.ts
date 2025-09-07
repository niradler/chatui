export interface FeatureFlags {
  chatHistory: boolean;
  modelSelector: boolean;
  darkMode: boolean;
  messageActions: boolean;
  messageRegeneration: boolean;
  messageExport: boolean;
  imageUpload: boolean;
  voiceInput: boolean;
  welcomeScreen: boolean;
  suggestedPrompts: boolean;
  streaming: boolean;
  autoSave: boolean;
  debugMode: boolean;
}

export interface UIConfig {
  defaultTheme: 'light' | 'dark' | 'auto';
  maxInputLength: number;
  showCharacterCount: boolean;
  showTimestamps: boolean;
  submitOnEnter: boolean;
  autofocus: boolean;
}

export interface ChatConfig {
  defaultModel: string;
  allowModelSwitching: boolean;
  autoSaveInterval: number;
  maxChatHistory: number;
  streamingChunkSize: number;
  streamingInterval: number;
}

export interface IntegrationConfig {
  ollama: {
    baseUrl: string;
    timeout: number;
    healthCheckInterval: number;
  };
}

export interface AppConfig {
  app: {
    name: string;
    version: string;
  };
  features: FeatureFlags;
  ui: UIConfig;
  chat: ChatConfig;
  integrations: IntegrationConfig;
}

export const DEFAULT_CONFIG: AppConfig = {
  app: {
    name: 'ChatUI',
    version: '2.0.0',
  },

  features: {
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    messageActions: true,
    messageRegeneration: true,
    messageExport: true,
    imageUpload: true,
    voiceInput: false,
    welcomeScreen: true,
    suggestedPrompts: true,
    streaming: true,
    autoSave: true,
    debugMode: false,
  },

  ui: {
    defaultTheme: 'auto',
    maxInputLength: 4000,
    showCharacterCount: false,
    showTimestamps: false,
    submitOnEnter: true,
    autofocus: true,
  },

  chat: {
    defaultModel: '',
    allowModelSwitching: true,
    autoSaveInterval: 10000,
    maxChatHistory: 50,
    streamingChunkSize: 2,
    streamingInterval: 80,
  },

  integrations: {
    ollama: {
      baseUrl: 'http://localhost:11434',
      timeout: 30000,
      healthCheckInterval: 30000,
    },
  },
};

export function isFeatureEnabled(config: AppConfig, feature: keyof FeatureFlags): boolean {
  return config.features[feature] === true;
}

export default DEFAULT_CONFIG;