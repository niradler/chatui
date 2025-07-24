import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { I18nContextType, LanguageInfo, TranslationKeys } from './types';
import { 
  SUPPORTED_LANGUAGES, 
  getBrowserLanguage, 
  interpolateString, 
  formatRelativeTime, 
  formatFileSize,
  getLanguageInfo,
  isRTLLanguage
} from './types';

// Import translations dynamically
const loadTranslation = async (language: string): Promise<TranslationKeys> => {
  try {
    const module = await import(`./locales/${language}.ts`);
    return module[language] || module.default;
  } catch (error) {
    console.warn(`Failed to load translation for ${language}, falling back to English`);
    const fallback = await import('./locales/en.ts');
    return fallback.en || fallback.default;
  }
};

// ==================== CONTEXT CREATION ====================
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// ==================== STORAGE UTILITIES ====================
const I18N_STORAGE_KEY = 'chatui-language';

const saveLanguageToStorage = (language: string): void => {
  try {
    localStorage.setItem(I18N_STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

const loadLanguageFromStorage = (): string | null => {
  try {
    return localStorage.getItem(I18N_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to load language preference:', error);
    return null;
  }
};

// ==================== PROVIDER COMPONENT ====================
interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
  supportedLanguages?: string[];
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  defaultLanguage,
  supportedLanguages = SUPPORTED_LANGUAGES.map(lang => lang.code),
}) => {
  // Initialize language state
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Priority: stored preference > default prop > browser preference > fallback
    const stored = loadLanguageFromStorage();
    if (stored && supportedLanguages.includes(stored)) {
      return stored;
    }
    
    if (defaultLanguage && supportedLanguages.includes(defaultLanguage)) {
      return defaultLanguage;
    }
    
    const browser = getBrowserLanguage();
    if (supportedLanguages.includes(browser)) {
      return browser;
    }
    
    return 'en'; // Final fallback
  });

  const [translations, setTranslations] = useState<TranslationKeys | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get available languages
  const languages: LanguageInfo[] = SUPPORTED_LANGUAGES.filter(
    lang => supportedLanguages.includes(lang.code)
  );
  
  // Check if current language is RTL
  const isRTL = isRTLLanguage(currentLanguage);
  
  // Get current language info
  const currentLanguageInfo = getLanguageInfo(currentLanguage);

  // Load translations for current language
  const loadCurrentTranslations = useCallback(async (language: string) => {
    setIsLoading(true);
    try {
      const translationData = await loadTranslation(language);
      setTranslations(translationData);
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Try to load English as fallback
      if (language !== 'en') {
        const fallback = await loadTranslation('en');
        setTranslations(fallback);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize translations on mount and language change
  useEffect(() => {
    loadCurrentTranslations(currentLanguage);
  }, [currentLanguage, loadCurrentTranslations]);

  // Update document attributes for RTL support
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  }, [currentLanguage, isRTL]);

  // Change language function
  const changeLanguage = useCallback(async (newLanguage: string) => {
    if (!supportedLanguages.includes(newLanguage)) {
      console.warn(`Language ${newLanguage} is not supported`);
      return;
    }
    
    if (newLanguage === currentLanguage) {
      return; // No change needed
    }
    
    setCurrentLanguage(newLanguage);
    saveLanguageToStorage(newLanguage);
  }, [currentLanguage, supportedLanguages]);

  // Translation function with parameter interpolation
  const t = useCallback((key: string, params?: Record<string, any>): string => {
    if (!translations) {
      return key; // Return key if translations not loaded
    }
    
    // Navigate through nested object using dot notation
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key if not found
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }
    
    // Interpolate parameters if provided
    return params ? interpolateString(value, params) : value;
  }, [translations]);

  // Format date using current language locale
  const formatDate = useCallback((date: Date): string => {
    if (!currentLanguageInfo?.locale) return date.toLocaleDateString();
    
    return new Intl.DateTimeFormat(currentLanguageInfo.locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }, [currentLanguageInfo]);

  // Format time using current language locale
  const formatTime = useCallback((date: Date): string => {
    if (!currentLanguageInfo?.locale) return date.toLocaleTimeString();
    
    const use24Hour = currentLanguageInfo.timeFormat === 'HH:mm';
    
    return new Intl.DateTimeFormat(currentLanguageInfo.locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24Hour,
    }).format(date);
  }, [currentLanguageInfo]);

  // Format relative time
  const formatRelativeTimeLocal = useCallback((date: Date): string => {
    if (!currentLanguageInfo?.locale) {
      return formatRelativeTime(date, 'en-US');
    }
    
    return formatRelativeTime(date, currentLanguageInfo.locale);
  }, [currentLanguageInfo]);

  // Format number using current language locale
  const formatNumber = useCallback((num: number): string => {
    if (!currentLanguageInfo?.locale) return num.toString();
    
    return new Intl.NumberFormat(currentLanguageInfo.locale).format(num);
  }, [currentLanguageInfo]);

  // Format file size using current language locale
  const formatFileSizeLocal = useCallback((bytes: number): string => {
    if (!currentLanguageInfo?.locale) {
      return formatFileSize(bytes, 'en-US');
    }
    
    return formatFileSize(bytes, currentLanguageInfo.locale);
  }, [currentLanguageInfo]);

  // Context value
  const contextValue: I18nContextType = {
    currentLanguage,
    languages,
    t,
    changeLanguage,
    formatDate,
    formatTime,
    formatRelativeTime: formatRelativeTimeLocal,
    formatNumber,
    formatFileSize: formatFileSizeLocal,
    isLoading,
    isRTL,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
};

// ==================== HOOK VARIANTS ====================

/**
 * Hook for simple translation function access
 */
export const useTranslation = () => {
  const { t, isLoading } = useI18n();
  return { t, isLoading };
};

/**
 * Hook for language management
 */
export const useLanguage = () => {
  const { currentLanguage, languages, changeLanguage, isRTL } = useI18n();
  return { currentLanguage, languages, changeLanguage, isRTL };
};

/**
 * Hook for formatting utilities
 */
export const useFormatting = () => {
  const { formatDate, formatTime, formatRelativeTime, formatNumber, formatFileSize } = useI18n();
  return { formatDate, formatTime, formatRelativeTime, formatNumber, formatFileSize };
};

// ==================== UTILITIES ====================

/**
 * HOC to wrap components with translation capabilities
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: (key: string, params?: Record<string, any>) => string }>
) {
  return function TranslatedComponent(props: P) {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  };
}

/**
 * Utility function to get translation outside of React components
 */
let globalTranslationFunction: ((key: string, params?: Record<string, any>) => string) | null = null;

export const setGlobalTranslationFunction = (fn: (key: string, params?: Record<string, any>) => string) => {
  globalTranslationFunction = fn;
};

export const translate = (key: string, params?: Record<string, any>): string => {
  if (globalTranslationFunction) {
    return globalTranslationFunction(key, params);
  }
  console.warn('Global translation function not set, returning key:', key);
  return key;
};

// ==================== TRANSLATION LOADER COMPONENT ====================
interface TranslationLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const TranslationLoader: React.FC<TranslationLoaderProps> = ({
  children,
  fallback = <div>Loading translations...</div>
}) => {
  const { isLoading } = useI18n();
  
  if (isLoading) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default I18nProvider;
