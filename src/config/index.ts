/**
 * Configuration Module - Main Entry Point
 * 
 * This module exports the main configuration system for the ChatUI application.
 * It provides backward compatibility with the existing configuration while
 * introducing the new comprehensive configuration system.
 */

// Re-export the new configuration system
export * from './app.config';
export { default as appConfig } from './app.config';

// Export legacy configuration for backward compatibility
export * from './legacy.config';

// Export configuration utilities
export { ConfigProvider, useConfig, useFeatures, useUIConfig, useChatConfig } from '../contexts/ConfigContext';
