/**
 * Locales Index
 * 
 * This file exports all available translations for the ChatUI application.
 * Add new language translations here as they become available.
 */

// Import all available translations
import { en } from './en';
import { es } from './es';
import { fr } from './fr';

// Export individual translations
export { en, es, fr };

// Export all translations as a map
export const translations = {
  en,
  es,
  fr,
};

// Export available language codes
export const availableLanguages = Object.keys(translations);

// Default export for convenience
export default translations;
