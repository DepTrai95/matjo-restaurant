import { createI18n } from 'vue-i18n';

import de from './de.json';
import en from './en.json';
import deHome from './home/de.json';
import enHome from './home/en.json';
import deMenu from './menu/de.json';
import enMenu from './menu/en.json';
import deBBQ from './bbq/de.json';
import enBBQ from './bbq/en.json';
import deHotpot from './hotpot/de.json';
import enHotpot from './hotpot/en.json';
import deCareer from './career/de.json';
import enCareer from './career/en.json';
import deContact from './contact/de.json';
import enContact from './contact/en.json';
import deImprint from './imprint/de.json';
import enImprint from './imprint/en.json';
import dePrivacy from './privacy/de.json';
import enPrivacy from './privacy/en.json';

import deVoucher from './voucher/de.json';
import enVoucher from './voucher/en.json';

import deDialog from './dialog/de.json';
import enDialog from './dialog/en.json';

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
    voucher: deVoucher,
    dialog: deDialog,
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
    voucher: enVoucher,
    dialog: enDialog,
  }
};

const i18n = createI18n({
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en', // Fallback-Sprache
  messages
});

export default i18n;