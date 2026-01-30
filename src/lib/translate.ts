// ========================================
// SERVICE DE TRADUCTION AUTOMATIQUE
// Google Cloud Translation API v2 + cache localStorage
// ========================================

const CACHE_PREFIX = 'gt_';
const CACHE_VERSION = 1;

function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getCacheKey(text: string, targetLang: string): string {
  return `${CACHE_PREFIX}v${CACHE_VERSION}_${targetLang}_${hashText(text)}`;
}

function getFromCache(text: string, targetLang: string): string | null {
  try {
    return localStorage.getItem(getCacheKey(text, targetLang));
  } catch {
    return null;
  }
}

function setToCache(text: string, targetLang: string, translated: string): void {
  try {
    localStorage.setItem(getCacheKey(text, targetLang), translated);
  } catch {
    // localStorage full — ignore
  }
}

/**
 * Traduit un texte via Google Cloud Translation API v2.
 * Retourne le texte original si la langue source === cible ou si pas de clé API.
 */
export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'fr'
): Promise<string> {
  if (!text || !text.trim() || targetLang === sourceLang) return text;

  const cached = getFromCache(text, targetLang);
  if (cached) return cached;

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return text;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        }),
      }
    );

    if (!response.ok) return text;

    const data = await response.json();
    const translated = data?.data?.translations?.[0]?.translatedText || text;

    setToCache(text, targetLang, translated);
    return translated;
  } catch {
    return text;
  }
}

/**
 * Traduit du contenu HTML via Google Cloud Translation API v2.
 */
export async function translateHtml(
  html: string,
  targetLang: string,
  sourceLang: string = 'fr'
): Promise<string> {
  if (!html || !html.trim() || targetLang === sourceLang) return html;

  const cached = getFromCache(html, targetLang);
  if (cached) return cached;

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return html;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: html,
          source: sourceLang,
          target: targetLang,
          format: 'html',
        }),
      }
    );

    if (!response.ok) return html;

    const data = await response.json();
    const translated = data?.data?.translations?.[0]?.translatedText || html;

    setToCache(html, targetLang, translated);
    return translated;
  } catch {
    return html;
  }
}

/**
 * Traduit un lot de textes en un seul appel API (max 128 segments).
 * Retourne un tableau de textes traduits dans le même ordre.
 */
export async function translateBatch(
  texts: string[],
  targetLang: string,
  sourceLang: string = 'fr'
): Promise<string[]> {
  if (targetLang === sourceLang) return texts;

  const results: string[] = new Array(texts.length);
  const toTranslate: { index: number; text: string }[] = [];

  // Check cache for each text
  for (let i = 0; i < texts.length; i++) {
    if (!texts[i] || !texts[i].trim()) {
      results[i] = texts[i] || '';
      continue;
    }
    const cached = getFromCache(texts[i], targetLang);
    if (cached) {
      results[i] = cached;
    } else {
      toTranslate.push({ index: i, text: texts[i] });
      results[i] = texts[i]; // fallback
    }
  }

  if (toTranslate.length === 0) return results;

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return results;

  try {
    // Google Translate API allows max 128 segments per request
    const chunks = [];
    for (let i = 0; i < toTranslate.length; i += 128) {
      chunks.push(toTranslate.slice(i, i + 128));
    }

    for (const chunk of chunks) {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: chunk.map((t) => t.text),
            source: sourceLang,
            target: targetLang,
            format: 'text',
          }),
        }
      );

      if (!response.ok) continue;

      const data = await response.json();
      const translations = data?.data?.translations || [];

      chunk.forEach((item, i) => {
        const translated = translations[i]?.translatedText || item.text;
        results[item.index] = translated;
        setToCache(item.text, targetLang, translated);
      });
    }
  } catch {
    // Return originals on failure
  }

  return results;
}
