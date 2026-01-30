import { createContext, useContext } from 'react';
import type { SupportedLocale } from '../lib/i18n';

interface LocaleContextValue {
  locale: SupportedLocale;
  shopifyLanguage: string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  shopifyLanguage: 'FR',
});

export const LocaleProvider = LocaleContext.Provider;

export function useLocale() {
  return useContext(LocaleContext);
}
