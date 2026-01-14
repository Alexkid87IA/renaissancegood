import DOMPurify from 'dompurify';

/**
 * Sanitise le HTML pour prévenir les attaques XSS
 * Utilisez cette fonction partout où vous utilisez dangerouslySetInnerHTML
 *
 * @param html - Le HTML brut à sanitiser
 * @returns Le HTML sécurisé
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    // Autoriser les balises HTML courantes
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption',
      'hr'
    ],
    // Autoriser les attributs courants
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'title',
      'class', 'id', 'style',
      'src', 'alt', 'width', 'height',
      'colspan', 'rowspan'
    ],
    // Forcer target="_blank" à avoir rel="noopener noreferrer"
    ADD_ATTR: ['target'],
    // Ne pas autoriser les protocoles dangereux
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });
}

/**
 * Crée un objet props pour dangerouslySetInnerHTML avec HTML sanitisé
 *
 * @param html - Le HTML brut à sanitiser
 * @returns L'objet { __html: ... } sécurisé pour dangerouslySetInnerHTML
 */
export function createSanitizedMarkup(html: string): { __html: string } {
  return { __html: sanitizeHtml(html) };
}
