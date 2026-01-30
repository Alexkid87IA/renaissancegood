// ========================================
// HOOK DE TRADUCTION AUTOMATIQUE
// Traduit un texte dynamique (ex: contenu Shopify)
// ========================================

import { useState, useEffect, useRef } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { translateText, translateHtml, translateBatch } from '../lib/translate';

/**
 * Traduit un texte brut automatiquement selon la langue active.
 * Retourne le texte original en français, traduit sinon.
 * Le texte original est affiché pendant le chargement.
 */
export function useAutoTranslate(text: string | undefined | null): string {
  const { locale } = useLocale();
  const [translated, setTranslated] = useState(text || '');
  const prevRef = useRef({ text, locale });

  useEffect(() => {
    if (prevRef.current.text === text && prevRef.current.locale === locale) return;
    prevRef.current = { text, locale };

    if (!text || locale === 'fr') {
      setTranslated(text || '');
      return;
    }

    let cancelled = false;
    translateText(text, locale).then((result) => {
      if (!cancelled) setTranslated(result);
    });

    return () => { cancelled = true; };
  }, [text, locale]);

  // Initial sync for SSR/first render
  useEffect(() => {
    if (!text || locale === 'fr') {
      setTranslated(text || '');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return translated;
}

/**
 * Traduit du contenu HTML automatiquement (ex: descriptionHtml Shopify).
 */
export function useAutoTranslateHtml(html: string | undefined | null): string {
  const { locale } = useLocale();
  const [translated, setTranslated] = useState(html || '');
  const prevRef = useRef({ html, locale });

  useEffect(() => {
    if (prevRef.current.html === html && prevRef.current.locale === locale) return;
    prevRef.current = { html, locale };

    if (!html || locale === 'fr') {
      setTranslated(html || '');
      return;
    }

    let cancelled = false;
    translateHtml(html, locale).then((result) => {
      if (!cancelled) setTranslated(result);
    });

    return () => { cancelled = true; };
  }, [html, locale]);

  return translated;
}

/**
 * Traduit un lot de textes en un seul appel API.
 * Utile pour les listes de produits (titres, descriptions).
 */
export function useAutoTranslateBatch(texts: string[]): string[] {
  const { locale } = useLocale();
  const [translated, setTranslated] = useState<string[]>(texts);
  const textsKey = texts.join('||');

  useEffect(() => {
    if (locale === 'fr') {
      setTranslated(texts);
      return;
    }

    let cancelled = false;
    translateBatch(texts, locale).then((result) => {
      if (!cancelled) setTranslated(result);
    });

    return () => { cancelled = true; };
  }, [textsKey, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return translated;
}
