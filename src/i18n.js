import { createI18n } from 'vue-i18n';

import de from './i18n/de.json';
import en from './i18n/en.json';
import deHome from './i18n/home/de.json';
import enHome from './i18n/home/en.json';
import deMenu from './i18n/menu/de.json';
import enMenu from './i18n/menu/en.json';
import deBBQ from './i18n/bbq/de.json';
import enBBQ from './i18n/bbq/en.json';
import deHotpot from './i18n/hotpot/de.json';
import enHotpot from './i18n/hotpot/en.json';
import deCareer from './i18n/career/de.json';
import enCareer from './i18n/career/en.json';
import deContact from './i18n/contact/de.json';
import enContact from './i18n/contact/en.json';
import deImprint from './i18n/imprint/de.json';
import enImprint from './i18n/imprint/en.json';
import dePrivacy from './i18n/privacy/de.json';
import enPrivacy from './i18n/privacy/en.json';

const messages = {
  de: {
    ...de, 
    home: deHome,
    menu: deMenu,
    bbq: deBBQ,
    hotpot: deHotpot,
    career: deCareer,
    contact: deContact,
    imprint: deImprint,
    privacy: dePrivacy,
  },
  en: {
    ...en, 
    home: enHome,
    menu: enMenu,
    bbq: enBBQ,
    hotpot: enHotpot,
    career: enCareer,
    contact: enContact,
    imprint: enImprint,
    privacy: enPrivacy,
  }
};

const i18n = createI18n({
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en', // Fallback-Sprache
  messages
});

export default i18n;