import type { TranslationKeys } from '../types';

export const en: TranslationKeys = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    copy: 'Copy',
    share: 'Share',
    export: 'Export',
    import: 'Import',
    search: 'Search',
    settings: 'Settings',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    retry: 'Retry',
    help: 'Help',
    about: 'About',
    version: 'Version',
  },

  // App Specific
  app: {
    title: 'ChatUI',
    description: 'Modern AI Chat Interface',
    welcome: 'Welcome to ChatUI! Select a model and start chatting.',
    newChat: 'New Chat',
    chatHistory: 'Chat History',
    noMessages: 'No messages yet. Start a conversation!',
    typing: 'Typing...',
    connecting: 'Connecting...',
    connected: 'Connected',
    disconnected: 'Disconnected',
    reconnecting: 'Reconnecting...',
  },

  // Chat Interface
  chat: {
    // Input
    inputPlaceholder: 'Type your message here...',
    sendMessage: 'Send message',
    voiceInput: 'Voice input',
    uploadFile: 'Upload file',
    uploadImage: 'Upload image',
    
    // Messages
    messageFrom: 'Message from {{name}}',
    messageTime: 'Sent at {{time}}',
    messageActions: 'Message actions',
    regenerate: 'Regenerate response',
    stopGeneration: 'Stop generation',
    copyMessage: 'Copy message',
    shareMessage: 'Share message',
    likeMessage: 'Like message',
    dislikeMessage: 'Dislike message',
    
    // Chat Management
    deleteChat: 'Delete chat',
    deleteConfirm: 'Are you sure you want to delete this chat? This action cannot be undone.',
    exportChat: 'Export chat',
    shareChat: 'Share chat',
    clearChat: 'Clear chat',
    clearConfirm: 'Are you sure you want to clear all messages? This action cannot be undone.',
    chatTitle: 'Chat title',
    renameChat: 'Rename chat',
    
    // Prompts
    suggestedPrompts: 'Suggested prompts',
    tryPrompt: 'Try this prompt',
  },

  // Models
  models: {
    selectModel: 'Select a model',
    currentModel: 'Current model: {{model}}',
    noModels: 'No models available',
    loadingModels: 'Loading models...',
    modelInfo: 'Model information',
    modelSize: 'Size: {{size}}',
    modelModified: 'Modified: {{date}}',
    switchModel: 'Switch to {{model}}',
  },

  // Settings
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeAuto: 'Auto',
    
    // Chat Settings
    chatSettings: 'Chat Settings',
    maxMessages: 'Maximum messages to display',
    autoSave: 'Auto-save chats',
    showTimestamps: 'Show timestamps',
    showCharacterCount: 'Show character count',
    streamingEnabled: 'Enable streaming responses',
    
    // Accessibility
    accessibility: 'Accessibility',
    screenReader: 'Screen reader support',
    keyboardNavigation: 'Keyboard navigation',
    highContrast: 'High contrast mode',
    largeText: 'Large text',
    
    // Advanced
    advanced: 'Advanced',
    debugMode: 'Debug mode',
    performanceMetrics: 'Performance metrics',
    resetSettings: 'Reset settings',
    resetConfirm: 'Are you sure you want to reset all settings to default?',
  },

  // Sidebar
  sidebar: {
    toggle: 'Toggle sidebar',
    newChat: 'New chat',
    chatHistory: 'Chat history',
    settings: 'Settings',
    export: 'Export',
    share: 'Share',
    upgrade: 'Upgrade',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
  },

  // Errors
  errors: {
    // Server Errors
    serverOffline: 'Ollama server is not running. Please start your Ollama server and try again.',
    noModels: 'No models found. Please install at least one model using "ollama pull model-name".',
    requestFailed: 'Failed to get response from Ollama server.',
    networkError: 'Network error. Please check your connection and try again.',
    modelNotFound: 'The selected model is not available. Please choose a different model.',
    timeoutError: 'Request timed out. Please try again.',
    
    // Chat Errors
    chatLoadFailed: 'Failed to load chat history.',
    chatSaveFailed: 'Failed to save chat.',
    chatDeleteFailed: 'Failed to delete chat.',
    messageLoadFailed: 'Failed to load messages.',
    messageSendFailed: 'Failed to send message.',
    
    // File Errors
    fileUploadFailed: 'Failed to upload file.',
    fileNotSupported: 'File type not supported.',
    fileTooLarge: 'File is too large.',
    
    // General Errors
    unknownError: 'An unknown error occurred.',
    permissionDenied: 'Permission denied.',
    configurationError: 'Configuration error.',
  },

  // Success Messages
  success: {
    copied: 'Content copied to clipboard!',
    chatExported: 'Chat exported successfully!',
    chatShared: 'Chat shared successfully!',
    chatDeleted: 'Chat deleted successfully!',
    chatRenamed: 'Chat renamed successfully!',
    settingsSaved: 'Settings saved successfully!',
    modelChanged: 'Model changed successfully!',
    fileUploaded: 'File uploaded successfully!',
  },

  // Accessibility
  accessibility: {
    // Screen Reader Labels
    chatInput: 'Chat input field',
    sendButton: 'Send message button',
    messageList: 'Chat message list',
    sidebarToggle: 'Toggle sidebar button',
    modelSelector: 'Model selector dropdown',
    themeToggle: 'Toggle theme button',
    
    // Actions
    clickToExpand: 'Click to expand',
    clickToCollapse: 'Click to collapse',
    messageOptions: 'Message options',
    chatOptions: 'Chat options',
    
    // Status
    chatLoading: 'Chat is loading',
    modelLoading: 'Model is loading',
    messageLoading: 'Message is loading',
    
    // Navigation
    goToTop: 'Go to top',
    goToBottom: 'Go to bottom',
    previousMessage: 'Previous message',
    nextMessage: 'Next message',
  },

  // Time and Dates
  time: {
    now: 'now',
    minuteAgo: '1 minute ago',
    minutesAgo: '{{count}} minutes ago',
    hourAgo: '1 hour ago',
    hoursAgo: '{{count}} hours ago',
    dayAgo: '1 day ago',
    daysAgo: '{{count}} days ago',
    weekAgo: '1 week ago',
    weeksAgo: '{{count}} weeks ago',
    monthAgo: '1 month ago',
    monthsAgo: '{{count}} months ago',
    yearAgo: '1 year ago',
    yearsAgo: '{{count}} years ago',
  },

  // File Types
  fileTypes: {
    image: 'Image',
    document: 'Document',
    text: 'Text file',
    code: 'Code file',
    archive: 'Archive',
    video: 'Video',
    audio: 'Audio',
    unknown: 'Unknown file type',
  },

  // Keyboard Shortcuts
  shortcuts: {
    newChat: 'Ctrl+N - New chat',
    sendMessage: 'Ctrl+Enter - Send message',
    focusInput: 'Ctrl+I - Focus input',
    toggleSidebar: 'Ctrl+B - Toggle sidebar',
    toggleTheme: 'Ctrl+T - Toggle theme',
    scrollToTop: 'Home - Scroll to top',
    scrollToBottom: 'End - Scroll to bottom',
  },
};

export default en;
