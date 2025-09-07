import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { AppConfig } from "../config/app.config";
import { DEFAULT_CONFIG, isFeatureEnabled } from "../config/app.config";

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetConfig: () => void;
  isFeatureEnabled: (feature: keyof AppConfig["features"]) => boolean;
  isConfigLoaded: boolean;
}

const CONFIG_STORAGE_KEY = "chatui-app-config";

const saveConfigToStorage = (config: AppConfig): void => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save configuration to storage:", error);
  }
};

const loadConfigFromStorage = (): Partial<AppConfig> | null => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load configuration from storage:", error);
    return null;
  }
};

const mergeConfig = (
  base: AppConfig,
  override: Partial<AppConfig>
): AppConfig => {
  return {
    ...base,
    app: { ...base.app, ...override.app },
    features: { ...base.features, ...override.features },
    ui: { ...base.ui, ...override.ui },
    chat: { ...base.chat, ...override.chat },
    integrations: {
      ...base.integrations,
      ollama: { ...base.integrations.ollama, ...override.integrations?.ollama },
    },
  };
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

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
    if (enablePersistence) {
      const storedConfig = loadConfigFromStorage();
      if (storedConfig) {
        return mergeConfig(DEFAULT_CONFIG, storedConfig);
      }
    }
    return mergeConfig(DEFAULT_CONFIG, initialConfig);
  });

  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    setIsConfigLoaded(true);
  }, []);

  const updateConfig = useCallback(
    (updates: Partial<AppConfig>) => {
      setConfig((prevConfig) => {
        const newConfig = mergeConfig(prevConfig, updates);
        if (enablePersistence) {
          saveConfigToStorage(newConfig);
        }
        return newConfig;
      });
    },
    [enablePersistence]
  );

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    if (enablePersistence) {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    }
  }, [enablePersistence]);

  const checkFeatureEnabled = useCallback(
    (feature: keyof AppConfig["features"]) => {
      return isFeatureEnabled(config, feature);
    },
    [config]
  );

  const contextValue: ConfigContextType = {
    config,
    updateConfig,
    resetConfig,
    isFeatureEnabled: checkFeatureEnabled,
    isConfigLoaded,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
};

export const useFeatures = () => {
  const { config, isFeatureEnabled } = useConfig();
  return {
    features: config.features,
    isFeatureEnabled,
  };
};

export const useUIConfig = () => {
  const { config } = useConfig();
  return config.ui;
};

export const useChatConfig = () => {
  const { config } = useConfig();
  return config.chat;
};
