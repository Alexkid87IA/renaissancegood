import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isSupportedLocale } from '../lib/i18n';

export default function LangLayout() {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  // Determine the active locale
  const locale = (lang && isSupportedLocale(lang)) ? lang : 'fr';

  // Sync i18n language + HTML lang attribute
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  return <Outlet />;
}
