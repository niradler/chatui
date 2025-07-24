import React, { useState, useCallback } from 'react';
import { useConfig, useFeatures } from '../contexts/ConfigContext';
import { useI18n } from '../i18n';
import type { AppConfig } from '../config/app.config';

// ==================== SETTINGS MODAL COMPONENT ====================
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig, resetConfig } = useConfig();
  const { features, isFeatureEnabled } = useFeatures();
  const { t, currentLanguage, languages, changeLanguage, isRTL } = useI18n();
  
  const [activeTab, setActiveTab] = useState<'appearance' | 'chat' | 'features' | 'advanced'>('appearance');

  // Handle configuration updates
  const handleConfigUpdate = useCallback((path: string, value: any) => {
    const pathParts = path.split('.');
    const updates: any = {};
    
    // Build nested update object
    let current = updates;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current[pathParts[i]] = {};
      current = current[pathParts[i]];
    }
    current[pathParts[pathParts.length - 1]] = value;
    
    updateConfig(updates);
  }, [updateConfig]);

  // Handle reset settings
  const handleReset = useCallback(() => {
    if (window.confirm(t('settings.resetConfirm'))) {
      resetConfig();
    }
  }, [resetConfig, t]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-neutral-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('settings.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            ✕
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 dark:border-neutral-700 p-4">
            <nav className="space-y-2">
              {[
                { id: 'appearance', label: t('settings.appearance'), icon: '🎨' },
                { id: 'chat', label: t('settings.chatSettings'), icon: '💬' },
                { id: 'features', label: 'Features', icon: '⚡' },
                { id: 'advanced', label: t('settings.advanced'), icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {activeTab === 'appearance' && (
              <AppearanceSettings
                config={config}
                onUpdate={handleConfigUpdate}
                currentLanguage={currentLanguage}
                languages={languages}
                onLanguageChange={changeLanguage}
                t={t}
              />
            )}

            {activeTab === 'chat' && (
              <ChatSettings
                config={config}
                onUpdate={handleConfigUpdate}
                t={t}
              />
            )}

            {activeTab === 'features' && (
              <FeatureSettings
                features={features}
                onUpdate={handleConfigUpdate}
                isFeatureEnabled={isFeatureEnabled}
                t={t}
              />
            )}

            {activeTab === 'advanced' && (
              <AdvancedSettings
                config={config}
                onUpdate={handleConfigUpdate}
                onReset={handleReset}
                t={t}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== APPEARANCE SETTINGS ====================
interface AppearanceSettingsProps {
  config: AppConfig;
  onUpdate: (path: string, value: any) => void;
  currentLanguage: string;
  languages: any[];
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  config,
  onUpdate,
  currentLanguage,
  languages,
  onLanguageChange,
  t,
}) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
      {t('settings.appearance')}
    </h3>

    {/* Theme */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
        {t('settings.theme')}
      </label>
      <select
        value={config.ui.defaultTheme}
        onChange={(e) => onUpdate('ui.defaultTheme', e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
      >
        <option value="light">{t('settings.themeLight')}</option>
        <option value="dark">{t('settings.themeDark')}</option>
        <option value="auto">{t('settings.themeAuto')}</option>
      </select>
    </div>

    {/* Language */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
        {t('settings.language')}
      </label>
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>
    </div>

    {/* Animations */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        Enable Animations
      </label>
      <input
        type="checkbox"
        checked={config.ui.enableAnimations}
        onChange={(e) => onUpdate('ui.enableAnimations', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Compact Mode */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        Compact Mode
      </label>
      <input
        type="checkbox"
        checked={config.ui.compactMode}
        onChange={(e) => onUpdate('ui.compactMode', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>
  </div>
);

// ==================== CHAT SETTINGS ====================
interface ChatSettingsProps {
  config: AppConfig;
  onUpdate: (path: string, value: any) => void;
  t: (key: string) => string;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ config, onUpdate, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
      {t('settings.chatSettings')}
    </h3>

    {/* Max Messages */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
        {t('settings.maxMessages')}
      </label>
      <input
        type="number"
        min="10"
        max="1000"
        value={config.ui.maxMessagesDisplay}
        onChange={(e) => onUpdate('ui.maxMessagesDisplay', parseInt(e.target.value))}
        className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
    </div>

    {/* Auto Save */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.autoSave')}
      </label>
      <input
        type="checkbox"
        checked={config.chat.autoSaveInterval > 0}
        onChange={(e) => onUpdate('chat.autoSaveInterval', e.target.checked ? 10000 : 0)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Show Timestamps */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.showTimestamps')}
      </label>
      <input
        type="checkbox"
        checked={config.ui.showTimestamps}
        onChange={(e) => onUpdate('ui.showTimestamps', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Show Character Count */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.showCharacterCount')}
      </label>
      <input
        type="checkbox"
        checked={config.ui.showCharacterCount}
        onChange={(e) => onUpdate('ui.showCharacterCount', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Streaming */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.streamingEnabled')}
      </label>
      <input
        type="checkbox"
        checked={config.chat.enableStreaming}
        onChange={(e) => onUpdate('chat.enableStreaming', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>
  </div>
);

// ==================== FEATURE SETTINGS ====================
interface FeatureSettingsProps {
  features: AppConfig['features'];
  onUpdate: (path: string, value: any) => void;
  isFeatureEnabled: (feature: keyof AppConfig['features']) => boolean;
  t: (key: string) => string;
}

const FeatureSettings: React.FC<FeatureSettingsProps> = ({ features, onUpdate }) => {
  const featureList = [
    { key: 'messageActions', label: 'Message Actions (Like, Copy, Share)' },
    { key: 'messageRegeneration', label: 'Message Regeneration' },
    { key: 'imageUpload', label: 'Image Upload' },
    { key: 'suggestedPrompts', label: 'Suggested Prompts' },
    { key: 'welcomeScreen', label: 'Welcome Screen' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'timestamps', label: 'Message Timestamps' },
    { key: 'characterCount', label: 'Character Count' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Features
      </h3>

      <div className="space-y-4">
        {featureList.map((feature) => (
          <div key={feature.key} className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              {feature.label}
            </label>
            <input
              type="checkbox"
              checked={features[feature.key as keyof typeof features]}
              onChange={(e) => onUpdate(`features.${feature.key}`, e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== ADVANCED SETTINGS ====================
interface AdvancedSettingsProps {
  config: AppConfig;
  onUpdate: (path: string, value: any) => void;
  onReset: () => void;
  t: (key: string) => string;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ config, onUpdate, onReset, t }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
      {t('settings.advanced')}
    </h3>

    {/* Debug Mode */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.debugMode')}
      </label>
      <input
        type="checkbox"
        checked={config.features.debugMode}
        onChange={(e) => onUpdate('features.debugMode', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Performance Metrics */}
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
        {t('settings.performanceMetrics')}
      </label>
      <input
        type="checkbox"
        checked={config.features.performanceMetrics}
        onChange={(e) => onUpdate('features.performanceMetrics', e.target.checked)}
        className="rounded border-gray-300 dark:border-neutral-600"
      />
    </div>

    {/* Server URL */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
        Ollama Server URL
      </label>
      <input
        type="url"
        value={config.integrations.ollama.baseUrl}
        onChange={(e) => onUpdate('integrations.ollama.baseUrl', e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
      />
    </div>

    {/* Reset Settings */}
    <div className="pt-6 border-t border-gray-200 dark:border-neutral-700">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        {t('settings.resetSettings')}
      </button>
    </div>
  </div>
);

export default SettingsModal;
