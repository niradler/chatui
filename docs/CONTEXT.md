# ChatUI Configuration & Internationalization System

This document describes the comprehensive configuration and internationalization system implemented in ChatUI v2.0.

## 🚀 Overview

The new configuration system provides:
- **Global Configuration**: Centralized control over all application features
- **Multi-Language Support**: Complete internationalization with RTL language support
- **Feature Flags**: Easy enable/disable of specific functionality
- **Theme Management**: Comprehensive appearance customization
- **Preset Configurations**: Pre-built configurations for different use cases

## 📁 File Structure

```
src/
├── config/
│   ├── app.config.ts       # Main configuration definitions
│   ├── legacy.config.ts    # Backward compatibility
│   ├── demo.config.ts      # Example configurations
│   └── index.ts           # Configuration exports
├── contexts/
│   └── ConfigContext.tsx   # Configuration context provider
├── i18n/
│   ├── types.ts           # Translation type definitions
│   ├── index.tsx          # I18n context provider
│   └── locales/
│       ├── index.ts       # Locale exports
│       ├── en.ts          # English translations
│       ├── es.ts          # Spanish translations
│       └── fr.ts          # French translations
└── components/
    └── SettingsModal.tsx   # Configuration UI
```

## 🔧 Configuration System

### Basic Usage

```typescript
import { ConfigProvider } from './contexts/ConfigContext';
import { I18nProvider } from './i18n';

function App() {
  return (
    <ConfigProvider>
      <I18nProvider>
        <YourAppContent />
      </I18nProvider>
    </ConfigProvider>
  );
}
```

### Using Configuration Hooks

```typescript
import { useConfig, useFeatures, useUIConfig } from './contexts/ConfigContext';

function MyComponent() {
  const { config, updateConfig } = useConfig();
  const { isFeatureEnabled } = useFeatures();
  const { ui, updateUIConfig } = useUIConfig();

  // Check if a feature is enabled
  if (isFeatureEnabled('chatHistory')) {
    // Render chat history component
  }

  // Update configuration
  const handleThemeChange = (theme: string) => {
    updateUIConfig({ defaultTheme: theme });
  };

  return <div>...</div>;
}
```

## 🌍 Internationalization

### Adding New Languages

1. Create a new translation file in `src/i18n/locales/`:

```typescript
// src/i18n/locales/de.ts
import type { TranslationKeys } from '../types';

export const de: TranslationKeys = {
  common: {
    loading: 'Laden...',
    error: 'Fehler',
    // ... complete translation
  },
  // ... all other sections
};
```

2. Add the language to the locales index:

```typescript
// src/i18n/locales/index.ts
import { de } from './de';

export const translations = {
  en,
  es,
  fr,
  de, // Add new language
};
```

3. Update the supported languages in configuration:

```typescript
// In your configuration
i18n: {
  supportedLanguages: ['en', 'es', 'fr', 'de'],
}
```

### Using Translations

```typescript
import { useI18n, useTranslation } from './i18n';

function MyComponent() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useI18n();

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('chat.messageFrom', { name: 'Assistant' })}</p>
      <button onClick={() => changeLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  );
}
```

## 🎛️ Configuration Presets

### Available Presets

1. **Minimal**: Basic chat functionality only
2. **Full-Featured**: All features enabled
3. **Enterprise**: Security-focused configuration
4. **Mobile-Optimized**: Performance-optimized for mobile devices
5. **Accessible**: Accessibility-first configuration
6. **Developer**: Debug and development features enabled

### Using Presets

```typescript
import { buildConfig, configPresets } from './config/demo.config';

// Use a preset directly
const myConfig = buildConfig('enterprise');

// Use a preset with custom overrides
const customConfig = buildConfig('minimal', {
  app: {
    name: 'My Custom Chat',
  },
  features: {
    darkMode: true,
    messageActions: true,
  },
});
```

## ⚙️ Feature Flags

### Core Features
- `chatHistory`: Enable chat history sidebar
- `modelSelector`: Show model selection dropdown
- `darkMode`: Enable dark/light theme switching
- `multiLanguage`: Enable language selection

### Chat Features
- `messageActions`: Like, copy, share buttons
- `messageRegeneration`: Regenerate response button
- `messageExport`: Export chat functionality
- `imageUpload`: Upload images to chat
- `suggestedPrompts`: Show suggested prompts

### UI Features
- `animations`: Enable UI animations
- `notifications`: Show toast notifications
- `timestamps`: Display message timestamps
- `characterCount`: Show character count in input

### Advanced Features
- `streaming`: Enable real-time response streaming
- `autoSave`: Automatically save chat history
- `debugMode`: Enable debug features
- `performanceMetrics`: Track performance metrics

## 🎨 UI Configuration

### Theme Settings
```typescript
ui: {
  defaultTheme: 'auto', // 'light' | 'dark' | 'auto'
  accentColor: '#3b82f6',
  borderRadius: 'medium', // 'none' | 'small' | 'medium' | 'large'
}
```

### Layout Settings
```typescript
ui: {
  sidebarWidth: 256,
  compactMode: false,
  messageSpacing: 'comfortable', // 'compact' | 'comfortable' | 'spacious'
}
```

### Input Settings
```typescript
ui: {
  maxInputLength: 4000,
  showCharacterCount: false,
  submitOnEnter: true,
  multilineInput: true,
}
```

## 🔌 Integration Configuration

### Ollama Settings
```typescript
integrations: {
  ollama: {
    baseUrl: 'http://localhost:11434',
    timeout: 30000,
    retryAttempts: 3,
    healthCheckInterval: 30000,
  }
}
```

### Storage Settings
```typescript
integrations: {
  storage: {
    provider: 'localStorage', // 'localStorage' | 'indexedDB' | 'custom'
    encryption: false,
    compression: false,
  }
}
```

## ♿ Accessibility Configuration

```typescript
accessibility: {
  screenReader: true,
  ariaLabels: true,
  keyboardNavigation: true,
  highContrast: false,
  largeText: false,
  reduceMotion: false,
}
```

## 🛠️ Development Configuration

### Debug Features
```typescript
features: {
  debugMode: true,
  performanceMetrics: true,
  errorReporting: true,
}

development: {
  enableDevTools: true,
  showConfigInConsole: true,
  enableHotReload: true,
}
```

## 📱 Mobile Optimization

### Mobile-Specific Settings
```typescript
ui: {
  mobileBreakpoint: 768,
  compactMode: true,
  messageSpacing: 'compact',
}

features: {
  modelSelector: false, // Hidden on mobile
  animations: false,    // Better performance
  voiceInput: true,     // Great for mobile
}

chat: {
  streamingChunkSize: 3, // Larger chunks
  streamingInterval: 120, // Slower for battery
}
```

## 🔒 Security Considerations

### Enterprise Configuration
```typescript
features: {
  // Disable potentially risky features
  imageUpload: false,
  fileUpload: false,
  voiceInput: false,
  debugMode: false,
}

integrations: {
  storage: {
    encryption: true,
    compression: true,
  }
}
```

## 🚀 Performance Optimization

### Performance Settings
```typescript
ui: {
  maxMessagesDisplay: 50,  // Limit displayed messages
  enableAnimations: false, // Disable for better performance
  reducedMotion: true,     // Reduce motion for accessibility
}

chat: {
  streamingChunkSize: 2,   // Optimal chunk size
  streamingInterval: 80,   // Balanced update frequency
}
```

## 🔄 Migration from Old Configuration

The system maintains backward compatibility with the old configuration format:

```typescript
// Old format still works
import { OLLAMA_CONFIG, APP_CONFIG, UI_CONFIG } from './config';

// But new format is recommended
import { useConfig } from './contexts/ConfigContext';
```

## 📋 Best Practices

1. **Use Presets**: Start with a preset and customize as needed
2. **Feature Flags**: Use feature flags to gradually roll out new features
3. **Environment-Specific**: Use different configurations for development/production
4. **Accessibility**: Always consider accessibility settings
5. **Performance**: Monitor performance metrics in production
6. **Security**: Use appropriate security settings for your deployment

## 🤝 Contributing

To add new configuration options:

1. Update the `AppConfig` interface in `app.config.ts`
2. Add the new option to `DEFAULT_CONFIG`
3. Update TypeScript types as needed
4. Add configuration UI in `SettingsModal.tsx`
5. Update documentation

## 📚 Examples

See `src/config/demo.config.ts` for comprehensive examples of different configuration scenarios.

---

For more information, see the inline documentation in the configuration files.
