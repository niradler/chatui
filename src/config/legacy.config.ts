import { DEFAULT_CONFIG } from './app.config';

export const OLLAMA_CONFIG = {
    baseUrl: DEFAULT_CONFIG.integrations.ollama.baseUrl,
    enableStreaming: DEFAULT_CONFIG.features.streaming,
    requestTimeout: DEFAULT_CONFIG.integrations.ollama.timeout,
    serverCheckTimeout: DEFAULT_CONFIG.integrations.ollama.healthCheckInterval,
};

export const APP_CONFIG = {
    appName: DEFAULT_CONFIG.app.name,
    maxChatHistory: DEFAULT_CONFIG.chat.maxChatHistory,
    autoSaveInterval: DEFAULT_CONFIG.chat.autoSaveInterval,
    debugMode: DEFAULT_CONFIG.features.debugMode,
};

export const UI_CONFIG = {
    defaultTheme: DEFAULT_CONFIG.ui.defaultTheme,
    showMessageActions: DEFAULT_CONFIG.features.messageActions,
    maxInputLength: DEFAULT_CONFIG.ui.maxInputLength,
    showCharacterCount: DEFAULT_CONFIG.ui.showCharacterCount,
};

export default {
    OLLAMA_CONFIG,
    APP_CONFIG,
    UI_CONFIG,
};