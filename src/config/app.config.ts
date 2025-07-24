/**
 * Global Application Configuration
 * 
 * This configuration system allows for comprehensive customization of the ChatUI application.
 * All features can be enabled/disabled and customized through this centralized configuration.
 */

// ==================== FEATURE FLAGS ====================
export interface FeatureFlags {
  // Core Features
  chatHistory: boolean;
  modelSelector: boolean;
  darkMode: boolean;
  multiLanguage: boolean;
  
  // Chat Features
  messageActions: boolean;  // Like, dislike, copy, share
  messageRegeneration: boolean;
  messageEditing: boolean;
  messageSearch: boolean;
  messageExport: boolean;
  
  // Media Features
  imageUpload: boolean;
  fileUpload: boolean;
  voiceInput: boolean;
  voiceOutput: boolean;
  
  // UI Features
  animations: boolean;
  notifications: boolean;
  timestamps: boolean;
  characterCount: boolean;
  suggestedPrompts: boolean;
  welcomeScreen: boolean;
  
  // Advanced Features
  streaming: boolean;
  autoSave: boolean;
  chatBackup: boolean;
  userProfiles: boolean;
  customThemes: boolean;
  pluginSystem: boolean;
  
  // Developer Features
  debugMode: boolean;
  performanceMetrics: boolean;
  errorReporting: boolean;
}

// ==================== UI CONFIGURATION ====================
export interface UIConfig {
  // Theme Settings
  defaultTheme: 'light' | 'dark' | 'auto';
  accentColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  
  // Layout Settings
  sidebarWidth: number;
  compactMode: boolean;
  showBranding: boolean;
  
  // Message Display
  maxMessagesDisplay: number;
  messageSpacing: 'compact' | 'comfortable' | 'spacious';
  showAvatars: boolean;
  showTimestamps: boolean;
  timestampFormat: '12h' | '24h' | 'relative';
  
  // Input Settings
  maxInputLength: number;
  showCharacterCount: boolean;
  showWordCount: boolean;
  autofocus: boolean;
  submitOnEnter: boolean;
  multilineInput: boolean;
  
  // Animation Settings
  enableAnimations: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  reducedMotion: boolean;
  
  // Responsive Settings
  mobileBreakpoint: number;
  tabletBreakpoint: number;
  desktopBreakpoint: number;
}

// ==================== CHAT CONFIGURATION ====================
export interface ChatConfig {
  // Model Settings
  defaultModel: string;
  allowModelSwitching: boolean;
  showModelInfo: boolean;
  
  // Message Settings
  autoSaveInterval: number; // milliseconds, 0 to disable
  maxChatHistory: number;
  messageRetention: number; // days, 0 for unlimited
  
  // Streaming Settings
  enableStreaming: boolean;
  streamingChunkSize: number;
  streamingInterval: number;
  
  // Context Settings
  maxContextLength: number;
  contextStrategy: 'recent' | 'summary' | 'sliding';
  
  // Backup Settings
  autoBackup: boolean;
  backupInterval: number; // hours
  maxBackups: number;
}

// ==================== INTEGRATION CONFIGURATION ====================
export interface IntegrationConfig {
  // Ollama Settings
  ollama: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
    healthCheckInterval: number;
  };
  
  // External Services
  analytics: {
    enabled: boolean;
    provider: 'none' | 'custom';
    trackingId?: string;
  };
  
  // Storage Settings
  storage: {
    provider: 'localStorage' | 'indexedDB' | 'custom';
    encryption: boolean;
    compression: boolean;
  };
}

// ==================== ACCESSIBILITY CONFIGURATION ====================
export interface AccessibilityConfig {
  // Screen Reader Support
  screenReader: boolean;
  ariaLabels: boolean;
  
  // Keyboard Navigation
  keyboardNavigation: boolean;
  customKeyboardShortcuts: boolean;
  
  // Visual Accessibility
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  
  // Focus Management
  focusVisible: boolean;
  skipLinks: boolean;
}

// ==================== MAIN CONFIGURATION INTERFACE ====================
export interface AppConfig {
  // Application Info
  app: {
    name: string;
    version: string;
    description: string;
    author: string;
    homepage: string;
  };
  
  // Feature Configuration
  features: FeatureFlags;
  
  // UI Configuration
  ui: UIConfig;
  
  // Chat Configuration
  chat: ChatConfig;
  
  // Integration Configuration
  integrations: IntegrationConfig;
  
  // Accessibility Configuration
  accessibility: AccessibilityConfig;
  
  // Internationalization
  i18n: {
    defaultLanguage: string;
    supportedLanguages: string[];
    fallbackLanguage: string;
    rtlLanguages: string[];
  };
  
  // Development Settings
  development: {
    enableDevTools: boolean;
    showConfigInConsole: boolean;
    enableHotReload: boolean;
  };
}

// ==================== DEFAULT CONFIGURATION ====================
export const DEFAULT_CONFIG: AppConfig = {
  app: {
    name: 'ChatUI',
    version: '2.0.0',
    description: 'Modern AI Chat Interface',
    author: 'ChatStory Team',
    homepage: 'https://chatstory.com',
  },
  
  features: {
    // Core Features
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    
    // Chat Features
    messageActions: true,
    messageRegeneration: true,
    messageEditing: false, // Coming soon
    messageSearch: false, // Coming soon
    messageExport: true,
    
    // Media Features
    imageUpload: true,
    fileUpload: false, // Coming soon
    voiceInput: false, // Coming soon
    voiceOutput: false, // Coming soon
    
    // UI Features
    animations: true,
    notifications: true,
    timestamps: false,
    characterCount: false,
    suggestedPrompts: true,
    welcomeScreen: true,
    
    // Advanced Features
    streaming: true,
    autoSave: true,
    chatBackup: false, // Coming soon
    userProfiles: false, // Coming soon
    customThemes: false, // Coming soon
    pluginSystem: false, // Coming soon
    
    // Developer Features
    debugMode: false,
    performanceMetrics: false,
    errorReporting: true,
  },
  
  ui: {
    // Theme Settings
    defaultTheme: 'auto',
    accentColor: '#3b82f6',
    borderRadius: 'medium',
    
    // Layout Settings
    sidebarWidth: 256,
    compactMode: false,
    showBranding: true,
    
    // Message Display
    maxMessagesDisplay: 100,
    messageSpacing: 'comfortable',
    showAvatars: false,
    showTimestamps: false,
    timestampFormat: 'relative',
    
    // Input Settings
    maxInputLength: 4000,
    showCharacterCount: false,
    showWordCount: false,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    
    // Animation Settings
    enableAnimations: true,
    animationSpeed: 'normal',
    reducedMotion: false,
    
    // Responsive Settings
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  
  chat: {
    // Model Settings
    defaultModel: '',
    allowModelSwitching: true,
    showModelInfo: true,
    
    // Message Settings
    autoSaveInterval: 10000, // 10 seconds
    maxChatHistory: 50,
    messageRetention: 0, // Unlimited
    
    // Streaming Settings
    enableStreaming: true,
    streamingChunkSize: 2,
    streamingInterval: 80,
    
    // Context Settings
    maxContextLength: 4096,
    contextStrategy: 'recent',
    
    // Backup Settings
    autoBackup: false,
    backupInterval: 24, // 24 hours
    maxBackups: 7,
  },
  
  integrations: {
    // Ollama Settings
    ollama: {
      baseUrl: 'http://localhost:11434',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      healthCheckInterval: 30000,
    },
    
    // External Services
    analytics: {
      enabled: false,
      provider: 'none',
    },
    
    // Storage Settings
    storage: {
      provider: 'localStorage',
      encryption: false,
      compression: false,
    },
  },
  
  accessibility: {
    // Screen Reader Support
    screenReader: true,
    ariaLabels: true,
    
    // Keyboard Navigation
    keyboardNavigation: true,
    customKeyboardShortcuts: false,
    
    // Visual Accessibility
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    
    // Focus Management
    focusVisible: true,
    skipLinks: true,
  },
  
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ar', 'he'],
    fallbackLanguage: 'en',
    rtlLanguages: ['ar', 'he'],
  },
  
  development: {
    enableDevTools: false,
    showConfigInConsole: false,
    enableHotReload: true,
  },
};

// ==================== CONFIGURATION UTILITIES ====================

/**
 * Deep merge two configuration objects
 */
export function mergeConfig(base: AppConfig, override: Partial<AppConfig>): AppConfig {
  const merge = (target: any, source: any): any => {
    if (source === null || source === undefined) return target;
    if (typeof source !== 'object') return source;
    
    const result = { ...target };
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          target[key] &&
          typeof target[key] === 'object' &&
          typeof source[key] === 'object' &&
          !Array.isArray(source[key])
        ) {
          result[key] = merge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
    
    return result;
  };
  
  return merge(base, override);
}

/**
 * Validate configuration object
 */
export function validateConfig(config: Partial<AppConfig>): string[] {
  const errors: string[] = [];
  
  // Validate required fields
  if (config.i18n?.defaultLanguage && 
      config.i18n?.supportedLanguages && 
      !config.i18n.supportedLanguages.includes(config.i18n.defaultLanguage)) {
    errors.push('Default language must be included in supported languages');
  }
  
  if (config.ui?.maxInputLength && config.ui.maxInputLength < 1) {
    errors.push('Max input length must be greater than 0');
  }
  
  if (config.chat?.autoSaveInterval && config.chat.autoSaveInterval < 1000) {
    errors.push('Auto save interval must be at least 1000ms');
  }
  
  return errors;
}

/**
 * Get configuration value by path
 */
export function getConfigValue<T = any>(config: AppConfig, path: string): T | undefined {
  return path
    .split('.')
    .reduce((obj: any, key: string) => obj?.[key], config) as T;
}

/**
 * Check if feature is enabled
 */
export function isFeatureEnabled(config: AppConfig, feature: keyof FeatureFlags): boolean {
  return config.features[feature] === true;
}

export default DEFAULT_CONFIG;
