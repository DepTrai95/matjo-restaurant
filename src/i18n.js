import { createI18n } from 'vue-i18n';

import de from './i18n/de.json';
import en from './i18n/en.json';
import deHome from './i18n/home/de.json';
import enHome from './i18n/home/en.json';
import deCareer from './i18n/career/de.json';
import enCareer from './i18n/career/en.json';
import deContact from './i18n/contact/de.json';
import enContact from './i18n/contact/en.json';

const messages = {
  de: {
    ...de, 
    home: deHome,
    career: deCareer,
    contact: deContact,
  },
  en: {
    ...en, 
    home: enHome,
    career: enCareer,
    contact: enContact,
  }
};

const i18n = createI18n({
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en', // Fallback-Sprache
  messages
});

export default i18n;