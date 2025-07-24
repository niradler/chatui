/**
 * Internationalization Types and Interfaces
 */

// ==================== TRANSLATION STRUCTURE ====================
interface TranslationKeys {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    copy: string;
    share: string;
    export: string;
    import: string;
    search: string;
    settings: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    retry: string;
    help: string;
    about: string;
    version: string;
  };

  // App Specific
  app: {
    title: string;
    description: string;
    welcome: string;
    newChat: string;
    chatHistory: string;
    noMessages: string;
    typing: string;
    connecting: string;
    connected: string;
    disconnected: string;
    reconnecting: string;
  };

  // Chat Interface
  chat: {
    // Input
    inputPlaceholder: string;
    sendMessage: string;
    voiceInput: string;
    uploadFile: string;
    uploadImage: string;
    
    // Messages
    messageFrom: string;
    messageTime: string;
    messageActions: string;
    regenerate: string;
    stopGeneration: string;
    copyMessage: string;
    shareMessage: string;
    likeMessage: string;
    dislikeMessage: string;
    
    // Chat Management
    deleteChat: string;
    deleteConfirm: string;
    exportChat: string;
    shareChat: string;
    clearChat: string;
    clearConfirm: string;
    chatTitle: string;
    renameChat: string;
    
    // Prompts
    suggestedPrompts: string;
    tryPrompt: string;
  };

  // Models
  models: {
    selectModel: string;
    currentModel: string;
    noModels: string;
    loadingModels: string;
    modelInfo: string;
    modelSize: string;
    modelModified: string;
    switchModel: string;
  };

  // Settings
  settings: {
    title: string;
    appearance: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeAuto: string;
    
    // Chat Settings
    chatSettings: string;
    maxMessages: string;
    autoSave: string;
    showTimestamps: string;
    showCharacterCount: string;
    streamingEnabled: string;
    
    // Accessibility
    accessibility: string;
    screenReader: string;
    keyboardNavigation: string;
    highContrast: string;
    largeText: string;
    
    // Advanced
    advanced: string;
    debugMode: string;
    performanceMetrics: string;
    resetSettings: string;
    resetConfirm: string;
  };

  // Sidebar
  sidebar: {
    toggle: string;
    newChat: string;
    chatHistory: string;
    settings: string;
    export: string;
    share: string;
    upgrade: string;
    darkMode: string;
    lightMode: string;
  };

  // Errors
  errors: {
    // Server Errors
    serverOffline: string;
    noModels: string;
    requestFailed: string;
    networkError: string;
    modelNotFound: string;
    timeoutError: string;
    
    // Chat Errors
    chatLoadFailed: string;
    chatSaveFailed: string;
    chatDeleteFailed: string;
    messageLoadFailed: string;
    messageSendFailed: string;
    
    // File Errors
    fileUploadFailed: string;
    fileNotSupported: string;
    fileTooLarge: string;
    
    // General Errors
    unknownError: string;
    permissionDenied: string;
    configurationError: string;
  };

  // Success Messages
  success: {
    copied: string;
    chatExported: string;
    chatShared: string;
    chatDeleted: string;
    chatRenamed: string;
    settingsSaved: string;
    modelChanged: string;
    fileUploaded: string;
  };

  // Accessibility
  accessibility: {
    // Screen Reader Labels
    chatInput: string;
    sendButton: string;
    messageList: string;
    sidebarToggle: string;
    modelSelector: string;
    themeToggle: string;
    
    // Actions
    clickToExpand: string;
    clickToCollapse: string;
    messageOptions: string;
    chatOptions: string;
    
    // Status
    chatLoading: string;
    modelLoading: string;
    messageLoading: string;
    
    // Navigation
    goToTop: string;
    goToBottom: string;
    previousMessage: string;
    nextMessage: string;
  };

  // Time and Dates
  time: {
    now: string;
    minuteAgo: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
    dayAgo: string;
    daysAgo: string;
    weekAgo: string;
    weeksAgo: string;
    monthAgo: string;
    monthsAgo: string;
    yearAgo: string;
    yearsAgo: string;
  };

  // File Types
  fileTypes: {
    image: string;
    document: string;
    text: string;
    code: string;
    archive: string;
    video: string;
    audio: string;
    unknown: string;
  };

  // Keyboard Shortcuts
  shortcuts: {
    newChat: string;
    sendMessage: string;
    focusInput: string;
    toggleSidebar: string;
    toggleTheme: string;
    scrollToTop: string;
    scrollToBottom: string;
  };
}

// ==================== LANGUAGE METADATA ====================
interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  timeFormat: string;
  locale: string;
}

// ==================== TRANSLATION CONTEXT ====================
interface I18nContextType {
  // Current language
  currentLanguage: string;
  
  // Available languages
  languages: LanguageInfo[];
  
  // Translations
  t: (key: string, params?: Record<string, any>) => string;
  
  // Language management
  changeLanguage: (language: string) => Promise<void>;
  
  // Utilities
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  formatRelativeTime: (date: Date) => string;
  formatNumber: (num: number) => string;
  formatFileSize: (bytes: number) => string;
  
  // State
  isLoading: boolean;
  isRTL: boolean;
}

// ==================== SUPPORTED LANGUAGES ====================
export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'h:mm a',
    locale: 'en-US',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    locale: 'es-ES',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    locale: 'fr-FR',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
    locale: 'de-DE',
  },
  {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    rtl: false,
    dateFormat: 'yyyy/MM/dd',
    timeFormat: 'HH:mm',
    locale: 'zh-CN',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    rtl: false,
    dateFormat: 'yyyy/MM/dd',
    timeFormat: 'HH:mm',
    locale: 'ja-JP',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    rtl: false,
    dateFormat: 'yyyy.MM.dd',
    timeFormat: 'HH:mm',
    locale: 'ko-KR',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    locale: 'ar-SA',
  },
  {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    flag: '🇮🇱',
    rtl: true,
    dateFormat: 'dd/MM/yyyy',
    timeFormat: 'HH:mm',
    locale: 'he-IL',
  },
];

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get language information by code
 */
export function getLanguageInfo(code: string): LanguageInfo | null {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || null;
}

/**
 * Check if language is RTL
 */
export function isRTLLanguage(code: string): boolean {
  const lang = getLanguageInfo(code);
  return lang?.rtl || false;
}

/**
 * Get browser language preference
 */
export function getBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    const code = lang.split('-')[0];
    if (SUPPORTED_LANGUAGES.some(supported => supported.code === code)) {
      return code;
    }
  }
  
  return 'en'; // Default fallback
}

/**
 * Interpolate translation string with parameters
 */
export function interpolateString(template: string, params: Record<string, any> = {}): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date, locale: string): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, locale: string): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toLocaleString(locale, { maximumFractionDigits: 1 })} ${sizes[i]}`;
}

// Export types and interfaces for external use
export type { TranslationKeys, LanguageInfo, I18nContextType };
