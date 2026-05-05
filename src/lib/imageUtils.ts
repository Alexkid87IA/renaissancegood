/**
 * Transform a Shopify CDN image URL to request a specific width + WebP format.
 *
 * Uses Shopify's modern query-param API (`?width=800&format=webp`) instead of
 * the legacy path-segment approach (`_800x.jpg`) which is fragile and breaks
 * on filenames that already contain `_NNNx` patterns.
 *
 * `URL.searchParams.set` handles deduplication automatically: calling
 * `resizeShopifyImage(url, 800)` twice on the same URL produces the same
 * output — no double params.
 *
 * Non-Shopify URLs (e.g. bunny CDN) are returned unchanged.
 */
export function resizeShopifyImage(url: string, width: number): string {
  if (!url || !url.includes('cdn.shopify.com')) return url;

  try {
    const u = new URL(url);
    u.searchParams.set('width', String(width));
    u.searchParams.set('format', 'webp');
    return u.toString();
  } catch {
    // Fallback for malformed URLs — return as-is rather than crash
    return url;
  }
}
