import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useLocale } from '../contexts/LocaleContext';

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return useCallback(
    (to: string, options?: { replace?: boolean; state?: unknown }) => {
      const localizedPath = locale === 'fr' ? to : `/${locale}${to}`;
      navigate(localizedPath, options);
    },
    [navigate, locale]
  );
}
