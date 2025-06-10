// Ollama Configuration
export const OLLAMA_CONFIG = {
    // Default Ollama server URL
    baseUrl: 'http://localhost:11434',

    // Enable streaming responses (recommended)
    enableStreaming: true,

    // Request timeout in milliseconds
    requestTimeout: 30000, // 30 seconds

    // Server check timeout in milliseconds
    serverCheckTimeout: 5000, // 5 seconds
};

// App Configuration
export const APP_CONFIG = {
    // App name displayed in the UI
    appName: 'Ollama Chat',

    // Maximum number of chat history items to display
    maxChatHistory: 50,

    // Auto-save chat interval (in milliseconds, 0 to disable)
    autoSaveInterval: 0,

    // Enable debug logging
    debugMode: false,
};

// UI Configuration
export const UI_CONFIG = {
    // Default theme ('light', 'dark', or 'auto')
    defaultTheme: 'auto',

    // Enable animations
    enableAnimations: true,

    // Message display options
    showTimestamps: false,
    showMessageActions: true,

    // Input options
    maxInputLength: 4000,
    showCharacterCount: false,
};
