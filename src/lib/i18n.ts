import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LOCALES = ['fr', 'en', 'ru', 'it', 'de', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_TO_SHOPIFY: Record<SupportedLocale, string> = {
  fr: 'FR',
  en: 'EN',
  ru: 'RU',
  it: 'IT',
  de: 'DE',
  es: 'ES',
};

export const LOCALE_TO_OG: Record<SupportedLocale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  ru: 'ru_RU',
  it: 'it_IT',
  de: 'de_DE',
  es: 'es_ES',
};

export const LOCALE_TO_HREFLANG: Record<SupportedLocale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  ru: 'ru-RU',
  it: 'it-IT',
  de: 'de-DE',
  es: 'es-ES',
};

export function isSupportedLocale(lang: string): lang is SupportedLocale {
  return SUPPORTED_LOCALES.includes(lang as SupportedLocale);
}

const NAMESPACES = [
  'common',
  'home',
  'product',
  'shop',
  'cart',
  'collections',
  'histoire',
  'legal',
  'faq',
  'contact',
  'seo',
];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    fallbackLng: 'fr',
    defaultNS: 'common',
    ns: NAMESPACES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
