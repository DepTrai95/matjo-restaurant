import { createI18n } from 'vue-i18n';

import de from './i18n/de.json';
import en from './i18n/en.json';
import deHome from './i18n/home/de.json';
import enHome from './i18n/home/en.json';

const messages = {
  de: {
    ...de, 
    home: deHome
  },
  en: {
    ...en, 
    home: enHome
  }
};

const i18n = createI18n({
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en', // Fallback-Sprache
  messages
});

export default i18n;