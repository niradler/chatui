/**
 * Demo Configuration File
 * 
 * This file demonstrates how to customize the ChatUI application using the
 * comprehensive configuration system. Copy this file and modify it to suit
 * your specific needs.
 */

import type { AppConfig } from '../config/app.config';
import { DEFAULT_CONFIG, mergeConfig } from '../config/app.config';

// ==================== CUSTOM CONFIGURATION EXAMPLES ====================

// Example 1: Minimal Chat Interface
export const minimalConfig: Partial<AppConfig> = {
  app: {
    name: 'Simple Chat',
    description: 'Minimal AI Chat Interface',
    version: '1.0.0',
    author: 'ChatStory Team',
    homepage: 'https://chatstory.com',
  },
  features: {
    // Core features only
    chatHistory: false,
    modelSelector: true,
    darkMode: true,
    multiLanguage: false,
    
    // Disable advanced features
    messageActions: false,
    messageRegeneration: false,
    messageEditing: false,
    messageSearch: false,
    messageExport: false,
    imageUpload: false,
    fileUpload: false,
    voiceInput: false,
    voiceOutput: false,
    suggestedPrompts: false,
    welcomeScreen: false,
    animations: false,
    notifications: false,
    timestamps: false,
    characterCount: false,
    streaming: true,
    autoSave: false,
    chatBackup: false,
    userProfiles: false,
    customThemes: false,
    pluginSystem: false,
    debugMode: false,
    performanceMetrics: false,
    errorReporting: true,
  },
  ui: {
    compactMode: true,
    showBranding: false,
    messageSpacing: 'compact',
    defaultTheme: 'auto',
    accentColor: '#3b82f6',
    borderRadius: 'medium',
    sidebarWidth: 256,
    maxMessagesDisplay: 50,
    showAvatars: false,
    showTimestamps: false,
    timestampFormat: 'relative',
    maxInputLength: 2000,
    showCharacterCount: false,
    showWordCount: false,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    enableAnimations: false,
    animationSpeed: 'normal',
    reducedMotion: true,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
};

// Example 2: Full-Featured Configuration
export const fullFeaturedConfig: Partial<AppConfig> = {
  app: {
    name: 'ChatUI Pro',
    description: 'Professional AI Chat Interface',
    version: '2.0.0',
    author: 'ChatStory Team',
    homepage: 'https://chatstory.com',
  },
  features: {
    // Enable all features
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageRegeneration: true,
    messageEditing: true,
    messageSearch: true,
    messageExport: true,
    imageUpload: true,
    fileUpload: true,
    voiceInput: true,
    voiceOutput: true,
    animations: true,
    notifications: true,
    timestamps: true,
    characterCount: true,
    suggestedPrompts: true,
    welcomeScreen: true,
    streaming: true,
    autoSave: true,
    chatBackup: true,
    userProfiles: true,
    customThemes: true,
    pluginSystem: true,
    debugMode: true,
    performanceMetrics: true,
    errorReporting: true,
  },
  ui: {
    defaultTheme: 'dark',
    accentColor: '#8b5cf6',
    messageSpacing: 'spacious',
    showTimestamps: true,
    showCharacterCount: true,
    enableAnimations: true,
    animationSpeed: 'fast',
    borderRadius: 'large',
    compactMode: false,
    showBranding: true,
    sidebarWidth: 320,
    maxMessagesDisplay: 100,
    showAvatars: true,
    timestampFormat: '24h',
    maxInputLength: 8000,
    showWordCount: true,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    reducedMotion: false,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  chat: {
    maxChatHistory: 100,
    autoSaveInterval: 5000, // 5 seconds
    enableStreaming: true,
    streamingChunkSize: 1, // More responsive
    streamingInterval: 50, // Faster updates
    defaultModel: '',
    allowModelSwitching: true,
    showModelInfo: true,
    messageRetention: 0,
    maxContextLength: 8192,
    contextStrategy: 'recent',
    autoBackup: true,
    backupInterval: 24,
    maxBackups: 30,
  },
};

// Example 3: Enterprise Configuration
export const enterpriseConfig: Partial<AppConfig> = {
  app: {
    name: 'Enterprise Chat',
    description: 'Enterprise AI Chat Solution',
    version: '1.5.0',
    author: 'Enterprise Team',
    homepage: 'https://enterprise.chatstory.com',
  },
  features: {
    // Security-focused features
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageExport: true,
    autoSave: true,
    
    // Disable potentially risky features
    imageUpload: false,
    fileUpload: false,
    voiceInput: false,
    voiceOutput: false,
    debugMode: false,
    performanceMetrics: false,
    messageRegeneration: true,
    messageEditing: false,
    messageSearch: true,
    animations: true,
    notifications: true,
    timestamps: true,
    characterCount: false,
    suggestedPrompts: true,
    welcomeScreen: true,
    streaming: true,
    chatBackup: true,
    userProfiles: false,
    customThemes: false,
    pluginSystem: false,
    errorReporting: true,
  },
  ui: {
    defaultTheme: 'light',
    compactMode: true,
    showBranding: true,
    messageSpacing: 'comfortable',
    accentColor: '#059669',
    borderRadius: 'medium',
    sidebarWidth: 280,
    maxMessagesDisplay: 75,
    showAvatars: false,
    showTimestamps: true,
    timestampFormat: '24h',
    maxInputLength: 4000,
    showCharacterCount: false,
    showWordCount: false,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    enableAnimations: true,
    animationSpeed: 'normal',
    reducedMotion: false,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  chat: {
    maxChatHistory: 25,
    autoSaveInterval: 30000, // 30 seconds
    messageRetention: 90, // 90 days
    enableStreaming: true,
    streamingChunkSize: 2,
    streamingInterval: 100,
    defaultModel: '',
    allowModelSwitching: true,
    showModelInfo: true,
    maxContextLength: 4096,
    contextStrategy: 'recent',
    autoBackup: true,
    backupInterval: 12, // 12 hours
    maxBackups: 7,
  },
  integrations: {
    ollama: {
      baseUrl: 'http://internal-ai-server:11434',
      timeout: 60000, // 60 seconds
      retryAttempts: 5,
      retryDelay: 2000,
      healthCheckInterval: 60000,
    },
    analytics: {
      enabled: true,
      provider: 'custom',
      trackingId: 'enterprise-tracking-id',
    },
    storage: {
      provider: 'indexedDB',
      encryption: true,
      compression: true,
    },
  },
  accessibility: {
    screenReader: true,
    ariaLabels: true,
    keyboardNavigation: true,
    customKeyboardShortcuts: false,
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    focusVisible: true,
    skipLinks: true,
  },
};

// Example 4: Mobile-Optimized Configuration
export const mobileOptimizedConfig: Partial<AppConfig> = {
  app: {
    name: 'ChatUI Mobile',
    description: 'Mobile-Optimized AI Chat',
    version: '1.0.0',
    author: 'ChatStory Team',
    homepage: 'https://mobile.chatstory.com',
  },
  features: {
    // Mobile-friendly features
    chatHistory: true,
    modelSelector: false, // Hidden on mobile
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    imageUpload: true,
    voiceInput: true, // Great for mobile
    suggestedPrompts: true,
    welcomeScreen: true,
    
    // Disable heavy features
    messageRegeneration: false,
    messageEditing: false,
    messageSearch: false,
    messageExport: false,
    fileUpload: false,
    voiceOutput: false,
    animations: false, // Better performance
    notifications: true,
    timestamps: false,
    characterCount: false,
    streaming: true,
    autoSave: true,
    chatBackup: false,
    userProfiles: false,
    customThemes: false,
    pluginSystem: false,
    debugMode: false,
    performanceMetrics: false,
    errorReporting: true,
  },
  ui: {
    compactMode: true,
    showBranding: false,
    messageSpacing: 'compact',
    showTimestamps: false,
    showCharacterCount: false,
    enableAnimations: false,
    maxMessagesDisplay: 50, // Limit for performance
    defaultTheme: 'auto',
    accentColor: '#3b82f6',
    borderRadius: 'medium',
    sidebarWidth: 240,
    showAvatars: false,
    timestampFormat: 'relative',
    maxInputLength: 2000, // Shorter for mobile
    showWordCount: false,
    autofocus: false, // Better for mobile
    submitOnEnter: false, // Use button on mobile
    multilineInput: true,
    animationSpeed: 'normal',
    reducedMotion: true,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  chat: {
    autoSaveInterval: 15000, // Less frequent
    streamingChunkSize: 3, // Larger chunks for mobile
    streamingInterval: 120, // Slower for battery
    maxChatHistory: 30,
    enableStreaming: true,
    defaultModel: '',
    allowModelSwitching: false,
    showModelInfo: false,
    messageRetention: 30,
    maxContextLength: 2048,
    contextStrategy: 'recent',
    autoBackup: false,
    backupInterval: 24,
    maxBackups: 3,
  },
};

// Example 5: Accessibility-First Configuration
export const accessibleConfig: Partial<AppConfig> = {
  app: {
    name: 'Accessible ChatUI',
    description: 'Fully Accessible AI Chat Interface',
    version: '1.0.0',
    author: 'Accessibility Team',
    homepage: 'https://accessible.chatstory.com',
  },
  features: {
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageRegeneration: true,
    messageEditing: false,
    messageSearch: true,
    messageExport: true,
    imageUpload: false, // Keep simple for screen readers
    fileUpload: false,
    voiceInput: true,
    voiceOutput: true,
    suggestedPrompts: true,
    welcomeScreen: true,
    
    // Focus on core functionality
    animations: false, // Reduce motion
    notifications: true,
    timestamps: true, // Important for screen readers
    characterCount: true,
    streaming: true,
    autoSave: true,
    chatBackup: false,
    userProfiles: false,
    customThemes: false,
    pluginSystem: false,
    debugMode: false,
    performanceMetrics: false,
    errorReporting: true,
  },
  ui: {
    defaultTheme: 'auto',
    messageSpacing: 'spacious',
    showTimestamps: true,
    enableAnimations: false,
    reducedMotion: true,
    borderRadius: 'medium',
    compactMode: false,
    showBranding: true,
    maxMessagesDisplay: 50,
    sidebarWidth: 300,
    showAvatars: false,
    timestampFormat: '12h',
    maxInputLength: 4000,
    showCharacterCount: true,
    showWordCount: true,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    animationSpeed: 'normal',
    accentColor: '#059669',
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  accessibility: {
    screenReader: true,
    ariaLabels: true,
    keyboardNavigation: true,
    customKeyboardShortcuts: true,
    highContrast: true,
    largeText: true,
    reduceMotion: true,
    focusVisible: true,
    skipLinks: true,
  },
};

// Example 6: Developer/Debug Configuration
export const developerConfig: Partial<AppConfig> = {
  app: {
    name: 'ChatUI Dev',
    description: 'Development Build with Debug Features',
    version: '2.0.0-dev',
    author: 'Dev Team',
    homepage: 'http://localhost:3000',
  },
  features: {
    // All features enabled for testing
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageRegeneration: true,
    messageEditing: true,
    messageSearch: true,
    messageExport: true,
    imageUpload: true,
    fileUpload: true,
    voiceInput: true,
    voiceOutput: true,
    animations: true,
    notifications: true,
    timestamps: true,
    characterCount: true,
    suggestedPrompts: true,
    welcomeScreen: true,
    streaming: true,
    autoSave: true,
    chatBackup: true,
    userProfiles: true,
    customThemes: true,
    pluginSystem: true,
    
    // Debug features
    debugMode: true,
    performanceMetrics: true,
    errorReporting: true,
  },
  ui: {
    showTimestamps: true,
    showCharacterCount: true,
    enableAnimations: true,
    animationSpeed: 'fast',
    defaultTheme: 'dark',
    accentColor: '#f59e0b',
    borderRadius: 'large',
    compactMode: false,
    showBranding: true,
    messageSpacing: 'comfortable',
    sidebarWidth: 320,
    maxMessagesDisplay: 200,
    showAvatars: true,
    timestampFormat: '24h',
    maxInputLength: 10000,
    showWordCount: true,
    autofocus: true,
    submitOnEnter: true,
    multilineInput: true,
    reducedMotion: false,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
  },
  chat: {
    autoSaveInterval: 5000, // Frequent saves for testing
    enableStreaming: true,
    streamingChunkSize: 1, // Immediate updates
    streamingInterval: 10, // Very fast
    maxChatHistory: 200,
    defaultModel: '',
    allowModelSwitching: true,
    showModelInfo: true,
    messageRetention: 0,
    maxContextLength: 8192,
    contextStrategy: 'recent',
    autoBackup: true,
    backupInterval: 1, // 1 hour
    maxBackups: 50,
  },
  development: {
    enableDevTools: true,
    showConfigInConsole: true,
    enableHotReload: true,
  },
};

// ==================== CONFIGURATION PRESETS ====================
export const configPresets = {
  minimal: minimalConfig,
  full: fullFeaturedConfig,
  enterprise: enterpriseConfig,
  mobile: mobileOptimizedConfig,
  accessible: accessibleConfig,
  developer: developerConfig,
};

// ==================== CONFIGURATION BUILDER ====================
/**
 * Build a custom configuration by merging presets and overrides
 */
export function buildConfig(
  preset: keyof typeof configPresets = 'full',
  overrides: Partial<AppConfig> = {}
): AppConfig {
  const baseConfig = configPresets[preset];
  return mergeConfig(mergeConfig(DEFAULT_CONFIG, baseConfig), overrides);
}

// ==================== THEME CONFIGURATIONS ====================
export const lightThemeConfig = {
  ui: {
    defaultTheme: 'light' as const,
    accentColor: '#2563eb',
    borderRadius: 'medium' as const,
  },
  accessibility: {
    highContrast: false,
  },
} as any;

export const darkThemeConfig = {
  ui: {
    defaultTheme: 'dark' as const,
    accentColor: '#3b82f6',
    borderRadius: 'medium' as const,
  },
  accessibility: {
    highContrast: false,
  },
} as any;

export const highContrastConfig = {
  ui: {
    defaultTheme: 'light' as const,
    accentColor: '#000000',
    borderRadius: 'none' as const,
    messageSpacing: 'spacious' as const,
  },
  accessibility: {
    highContrast: true,
    largeText: true,
    reduceMotion: true,
  },
  features: {
    animations: false,
  },
} as any;

// ==================== LANGUAGE-SPECIFIC CONFIGURATIONS ====================
export const rtlLanguageConfig = {
  ui: {
    // RTL-specific UI adjustments would go here
    messageSpacing: 'comfortable' as const,
  },
  i18n: {
    defaultLanguage: 'ar',
    supportedLanguages: ['ar', 'he', 'fa', 'en'],
    fallbackLanguage: 'en',
    rtlLanguages: ['ar', 'he', 'fa', 'ur'],
  },
} as any;

// ==================== ENVIRONMENT-SPECIFIC CONFIGURATIONS ====================
export const productionConfig: Partial<AppConfig> = {
  features: {
    debugMode: false,
    performanceMetrics: false,
    errorReporting: true,
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageRegeneration: true,
    messageEditing: false,
    messageSearch: true,
    messageExport: true,
    imageUpload: true,
    fileUpload: false,
    voiceInput: false,
    voiceOutput: false,
    animations: true,
    notifications: true,
    timestamps: false,
    characterCount: false,
    suggestedPrompts: true,
    welcomeScreen: true,
    streaming: true,
    autoSave: true,
    chatBackup: false,
    userProfiles: false,
    customThemes: false,
    pluginSystem: false,
  },
  development: {
    enableDevTools: false,
    showConfigInConsole: false,
    enableHotReload: false,
  },
  integrations: {
    analytics: {
      enabled: true,
      provider: 'custom',
    },
    ollama: {
      baseUrl: 'http://localhost:11434',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      healthCheckInterval: 30000,
    },
    storage: {
      provider: 'localStorage',
      encryption: false,
      compression: false,
    },
  },
};

export const developmentConfig: Partial<AppConfig> = {
  features: {
    debugMode: true,
    performanceMetrics: true,
    errorReporting: true,
    chatHistory: true,
    modelSelector: true,
    darkMode: true,
    multiLanguage: true,
    messageActions: true,
    messageRegeneration: true,
    messageEditing: true,
    messageSearch: true,
    messageExport: true,
    imageUpload: true,
    fileUpload: true,
    voiceInput: true,
    voiceOutput: true,
    animations: true,
    notifications: true,
    timestamps: true,
    characterCount: true,
    suggestedPrompts: true,
    welcomeScreen: true,
    streaming: true,
    autoSave: true,
    chatBackup: true,
    userProfiles: true,
    customThemes: true,
    pluginSystem: true,
  },
  development: {
    enableDevTools: true,
    showConfigInConsole: true,
    enableHotReload: true,
  },
  integrations: {
    analytics: {
      enabled: false,
      provider: 'none',
    },
    ollama: {
      baseUrl: 'http://localhost:11434',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      healthCheckInterval: 30000,
    },
    storage: {
      provider: 'localStorage',
      encryption: false,
      compression: false,
    },
  },
};

// ==================== USAGE EXAMPLES ====================
/*
// Example 1: Use a preset
const myConfig = buildConfig('enterprise');

// Example 2: Use a preset with overrides
const customConfig = buildConfig('minimal', {
  app: {
    name: 'My Custom Chat',
  },
  features: {
    darkMode: false,
  },
});

// Example 3: Build from scratch
const scratchConfig = buildConfig('minimal', {
  app: {
    name: 'Brand New Chat',
    description: 'Built from minimal preset',
  },
  features: {
    chatHistory: true,
    messageActions: true,
    suggestedPrompts: true,
  },
  ui: {
    defaultTheme: 'dark',
    accentColor: '#10b981',
    messageSpacing: 'comfortable',
  },
});

// Example 4: Environment-specific configuration
const envConfig = process.env.NODE_ENV === 'production' 
  ? mergeConfig(fullFeaturedConfig, productionConfig)
  : mergeConfig(developerConfig, developmentConfig);
*/

export default configPresets;
