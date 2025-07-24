/**
 * Legacy Configuration (Backward Compatibility)
 * 
 * This file maintains the original configuration structure for backward compatibility
 * while the application transitions to the new configuration system.
 */

import { DEFAULT_CONFIG } from './app.config';

// ==================== LEGACY CONFIGURATION ====================
// These are the original configurations from the existing codebase

// Ollama Configuration
export const OLLAMA_CONFIG = {
    // Default Ollama server URL
    baseUrl: DEFAULT_CONFIG.integrations.ollama.baseUrl,

    // Enable streaming responses (recommended)
    enableStreaming: DEFAULT_CONFIG.features.streaming,

    // Request timeout in milliseconds
    requestTimeout: DEFAULT_CONFIG.integrations.ollama.timeout,

    // Server check timeout in milliseconds
    serverCheckTimeout: DEFAULT_CONFIG.integrations.ollama.healthCheckInterval,
};

// App Configuration
export const APP_CONFIG = {
    // App name displayed in the UI
    appName: DEFAULT_CONFIG.app.name,

    // Maximum number of chat history items to display
    maxChatHistory: DEFAULT_CONFIG.chat.maxChatHistory,

    // Auto-save chat interval (in milliseconds, 0 to disable)
    autoSaveInterval: DEFAULT_CONFIG.chat.autoSaveInterval,

    // Enable debug logging
    debugMode: DEFAULT_CONFIG.features.debugMode,
};

// UI Configuration
export const UI_CONFIG = {
    // Default theme ('light', 'dark', or 'auto')
    defaultTheme: DEFAULT_CONFIG.ui.defaultTheme,

    // Enable animations
    enableAnimations: DEFAULT_CONFIG.ui.enableAnimations,

    // Message display options
    showTimestamps: DEFAULT_CONFIG.ui.showTimestamps,
    showMessageActions: DEFAULT_CONFIG.features.messageActions,

    // Input options
    maxInputLength: DEFAULT_CONFIG.ui.maxInputLength,
    showCharacterCount: DEFAULT_CONFIG.ui.showCharacterCount,
};

// ==================== MIGRATION HELPERS ====================

/**
 * Get legacy configuration from new configuration system
 */
export const getLegacyConfig = () => {
    return {
        OLLAMA_CONFIG,
        APP_CONFIG,
        UI_CONFIG,
    };
};

/**
 * Convert legacy configuration to new format
 */
export const migrateLegacyConfig = (legacyConfig: any) => {
    // This would be used to migrate old configuration files
    // to the new configuration system
    console.warn('Legacy configuration migration not yet implemented', legacyConfig);
    return DEFAULT_CONFIG;
};

// Export for backward compatibility
export default {
    OLLAMA_CONFIG,
    APP_CONFIG,
    UI_CONFIG,
};
