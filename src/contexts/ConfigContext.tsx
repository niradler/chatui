import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import type { AppConfig } from '../config/app.config';
import { DEFAULT_CONFIG, mergeConfig, validateConfig, isFeatureEnabled, getConfigValue } from '../config/app.config';

// ==================== CONTEXT TYPES ====================
interface ConfigContextType {
  // Current configuration
  config: AppConfig;
  
  // Configuration management
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetConfig: () => void;
  loadConfig: (config: Partial<AppConfig>) => void;
  
  // Utility functions
  isFeatureEnabled: (feature: keyof AppConfig['features']) => boolean;
  getConfigValue: <T = any>(path: string) => T | undefined;
  
  // Configuration state
  isConfigLoaded: boolean;
  configErrors: string[];
}

// ==================== STORAGE UTILITIES ====================
const CONFIG_STORAGE_KEY = 'chatui-app-config';

const saveConfigToStorage = (config: AppConfig): void => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save configuration to storage:', error);
  }
};

const loadConfigFromStorage = (): Partial<AppConfig> | null => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load configuration from storage:', error);
    return null;
  }
};

// ==================== CONTEXT CREATION ====================
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// ==================== PROVIDER COMPONENT ====================
interface ConfigProviderProps {
  children: React.ReactNode;
  initialConfig?: Partial<AppConfig>;
  enablePersistence?: boolean;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  initialConfig = {},
  enablePersistence = true,
}) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    // Load from storage if persistence is enabled
    if (enablePersistence) {
      const storedConfig = loadConfigFromStorage();
      if (storedConfig) {
        return mergeConfig(DEFAULT_CONFIG, storedConfig);
      }
    }
    
    // Merge initial config with defaults
    return mergeConfig(DEFAULT_CONFIG, initialConfig);
  });
  
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [configErrors, setConfigErrors] = useState<string[]>([]);

  // Initialize configuration on mount
  useEffect(() => {
    const initializeConfig = async () => {
      try {
        // Validate the current configuration
        const errors = validateConfig(config);
        setConfigErrors(errors);
        
        if (errors.length > 0 && config.development.showConfigInConsole) {
          console.warn('Configuration validation errors:', errors);
        }
        
        // Log configuration if debug mode is enabled
        if (config.development.showConfigInConsole) {
          console.log('ChatUI Configuration:', config);
        }
        
        setIsConfigLoaded(true);
      } catch (error) {
        console.error('Failed to initialize configuration:', error);
        setConfigErrors(['Failed to initialize configuration']);
      }
    };
    
    initializeConfig();
  }, []); // Only run on mount

  // Update configuration
  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    setConfig(prevConfig => {
      const newConfig = mergeConfig(prevConfig, updates);
      
      // Validate the new configuration
      const errors = validateConfig(newConfig);
      setConfigErrors(errors);
      
      // Save to storage if persistence is enabled and no errors
      if (enablePersistence && errors.length === 0) {
        saveConfigToStorage(newConfig);
      }
      
      return newConfig;
    });
  }, [enablePersistence]);

  // Reset configuration to defaults
  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setConfigErrors([]);
    
    if (enablePersistence) {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    }
  }, [enablePersistence]);

  // Load configuration from external source
  const loadConfig = useCallback((newConfig: Partial<AppConfig>) => {
    const mergedConfig = mergeConfig(DEFAULT_CONFIG, newConfig);
    const errors = validateConfig(mergedConfig);
    
    if (errors.length > 0) {
      setConfigErrors(errors);
      console.error('Configuration validation failed:', errors);
      return;
    }
    
    setConfig(mergedConfig);
    setConfigErrors([]);
    
    if (enablePersistence) {
      saveConfigToStorage(mergedConfig);
    }
  }, [enablePersistence]);

  // Check if feature is enabled
  const checkFeatureEnabled = useCallback((feature: keyof AppConfig['features']) => {
    return isFeatureEnabled(config, feature);
  }, [config]);

  // Get configuration value by path
  const getConfigValueByPath = useCallback(<T = any>(path: string): T | undefined => {
    return getConfigValue<T>(config, path);
  }, [config]);

  // Context value
  const contextValue: ConfigContextType = {
    config,
    updateConfig,
    resetConfig,
    loadConfig,
    isFeatureEnabled: checkFeatureEnabled,
    getConfigValue: getConfigValueByPath,
    isConfigLoaded,
    configErrors,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================
export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  
  return context;
};

// ==================== HOOK VARIANTS ====================

/**
 * Hook to get feature flags only
 */
export const useFeatures = () => {
  const { config, isFeatureEnabled } = useConfig();
  return {
    features: config.features,
    isFeatureEnabled,
  };
};

/**
 * Hook to get UI configuration only
 */
export const useUIConfig = () => {
  const { config, updateConfig } = useConfig();
  
  const updateUIConfig = useCallback((updates: Partial<AppConfig['ui']>) => {
    updateConfig({ ui: { ...config.ui, ...updates } });
  }, [updateConfig, config.ui]);
  
  return {
    ui: config.ui,
    updateUIConfig,
  };
};

/**
 * Hook to get chat configuration only
 */
export const useChatConfig = () => {
  const { config, updateConfig } = useConfig();
  
  const updateChatConfig = useCallback((updates: Partial<AppConfig['chat']>) => {
    updateConfig({ chat: { ...config.chat, ...updates } });
  }, [updateConfig, config.chat]);
  
  return {
    chat: config.chat,
    updateChatConfig,
  };
};

/**
 * Hook to get integration configuration only
 */
export const useIntegrationConfig = () => {
  const { config, updateConfig } = useConfig();
  
  const updateIntegrationConfig = useCallback((updates: Partial<AppConfig['integrations']>) => {
    updateConfig({ integrations: { ...config.integrations, ...updates } });
  }, [updateConfig, config.integrations]);
  
  return {
    integrations: config.integrations,
    updateIntegrationConfig,
  };
};

/**
 * Hook to get accessibility configuration only
 */
export const useAccessibilityConfig = () => {
  const { config, updateConfig } = useConfig();
  
  const updateAccessibilityConfig = useCallback((updates: Partial<AppConfig['accessibility']>) => {
    updateConfig({ accessibility: { ...config.accessibility, ...updates } });
  }, [updateConfig, config.accessibility]);
  
  return {
    accessibility: config.accessibility,
    updateAccessibilityConfig,
  };
};

export default ConfigProvider;
