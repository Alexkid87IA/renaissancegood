import type { Handler, HandlerEvent } from '@netlify/functions';

// Retrouve le numéro de commande Shopify (#1043) à partir de l'ID PaymentIntent
// Stripe. La commande est créée par stripe-webhook de façon asynchrone : la page
// de confirmation interroge cette fonction en boucle jusqu'à ce qu'elle réponde.

const ADMIN_API_VERSION = '2025-01';

const ALLOWED_ORIGINS = [
  'https://www.renaissance-paris.com',
  'https://renaissance-paris.com',
  'https://renaissance-paris.netlify.app',
  'http://localhost:4444',
  'http://localhost:3000',
];

function getCorsHeaders(origin?: string) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };
}

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  const headers = getCorsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const pi = event.queryStringParameters?.pi;
  if (!pi || !/^pi_[A-Za-z0-9]+$/.test(pi)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'pi invalide' }) };
  }

  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!domain || !adminToken) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Config manquante' }) };
  }

  try {
    const res = await fetch(`https://${domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminToken },
      body: JSON.stringify({
        query: `query($q: String!) { orders(first: 1, query: $q) { nodes { name } } }`,
        variables: { q: `tag:stripe-${pi}` },
      }),
    });
    const json = await res.json();
    const name = json?.data?.orders?.nodes?.[0]?.name || null;
    // 200 même si null : la commande n'est peut-être pas encore créée, la page réessaiera.
    return { statusCode: 200, headers, body: JSON.stringify({ orderName: name }) };
  } catch (err) {
    console.error('[get-order-number] échec:', err instanceof Error ? err.message : err);
    return { statusCode: 200, headers, body: JSON.stringify({ orderName: null }) };
  }
};

export { handler };
