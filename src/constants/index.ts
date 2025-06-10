// Error messages and constants for the ChatUI application

export const ERROR_MESSAGES = {
    SERVER_OFFLINE: '❌ Ollama server is not running. Please start your Ollama server and try again.',
    NO_MODELS: '❌ No models found. Please install at least one model using \"ollama pull model-name\".',
    REQUEST_FAILED: '❌ Failed to get response from Ollama server.',
    NETWORK_ERROR: '❌ Network error. Please check your connection and try again.',
    MODEL_NOT_FOUND: '❌ The selected model is not available. Please choose a different model.',
    TIMEOUT_ERROR: '❌ Request timed out. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
    COPIED_TO_CLIPBOARD: '✅ Content copied to clipboard!',
    CHAT_EXPORTED: '✅ Chat exported successfully!',
    MODEL_CHANGED: '✅ Model changed successfully!',
} as const;

export const INFO_MESSAGES = {
    WELCOME: 'Welcome to ChatUI! Select a model and start chatting.',
    LOADING_MODELS: 'Loading available models...',
    CHECKING_SERVER: 'Checking server connection...',
    GENERATING_RESPONSE: 'Generating response...',
} as const;

export const FILE_EXTENSIONS = {
    ALLOWED_UPLOAD: '.txt,.pdf,.doc,.docx,.jpg,.png,.gif,.json,.csv,.md',
    EXPORT_JSON: '.json',
} as const;

export const API_ENDPOINTS = {
    CHAT: '/api/chat',
    MODELS: '/api/tags',
    VERSION: '/api/version',
    GENERATE: '/api/generate',
} as const;

export const STORAGE_KEYS = {
    THEME: 'chatui-theme',
    LAST_MODEL: 'chatui-last-model',
    USER_PREFERENCES: 'chatui-preferences',
    CHAT_HISTORY: 'chatui-history',
} as const;

export const ANIMATION_DURATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;
