import type { Handler, HandlerEvent } from '@netlify/functions';
import Stripe from 'stripe';

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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

interface CartItem {
  title: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  address: string;
  addressComplement?: string;
  city: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

// Livraison (doit rester aligné sur src/constants/shipping.ts).
const SHIPPING_FREE_THRESHOLD = 500;
const SHIPPING_STANDARD_RATE = 15;

// Montant faisant autorité : lu depuis Shopify par cartId (remise comprise),
// jamais envoyé par le navigateur. Ferme la fraude au prix.
async function fetchCartAmount(cartId: string): Promise<{ amountCents: number; currency: string }> {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error('Shopify Storefront non configuré (VITE_SHOPIFY_STORE_DOMAIN / VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN).');
  }

  const query = `
    query CartCost($cartId: ID!) {
      cart(id: $cartId) {
        cost {
          totalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              quantity
              merchandise { ... on ProductVariant { price { amount } } }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${domain}/api/2025-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables: { cartId } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}`);
  }

  const json = await res.json();
  const cart = json?.data?.cart;
  if (!cart) {
    throw new Error('Panier introuvable côté Shopify.');
  }

  const discountedMerch = parseFloat(cart.cost.totalAmount.amount); // après toutes remises
  // Total marchandise AVANT remise (somme des lignes) : base du port offert, pour
  // que la livraison reste gratuite même avec un code promo.
  const origMerch = (cart.lines?.edges || []).reduce(
    (sum: number, edge: { node: { quantity: number; merchandise?: { price?: { amount?: string } } } }) =>
      sum + parseFloat(edge.node.merchandise?.price?.amount || '0') * edge.node.quantity,
    0,
  );
  const currency = (cart.cost.totalAmount.currencyCode || 'EUR').toLowerCase();
  const shipping = origMerch >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_STANDARD_RATE;
  const amountCents = Math.round((discountedMerch + shipping) * 100);

  return { amountCents, currency };
}

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  const headers = getCorsHeaders(origin);

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

    const { metadata, cartItems, shippingAddress, cartId } = JSON.parse(event.body || '{}');

    if (!cartId) {
      throw new Error('cartId manquant');
    }

    // Montant calculé côté serveur depuis le panier Shopify (remise incluse).
    const { amountCents, currency } = await fetchCartAmount(cartId);
    if (amountCents < 50) {
      throw new Error('Invalid amount');
    }

    // Construire le résumé du panier pour les metadata
    const cartSummary = (cartItems || [])
      .slice(0, 5)
      .map((item: CartItem) => `${item.quantity}x ${item.title} (${item.price}€)`)
      .join(' | ');

    // Construire l'adresse pour les metadata
    const addressLine = shippingAddress
      ? `${shippingAddress.address}, ${shippingAddress.postalCode} ${shippingAddress.city}, ${shippingAddress.country}`
      : '';

    // Construire les options du PaymentIntent
    const piOptions: Stripe.PaymentIntentCreateParams = {
      amount: amountCents,
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      description: `Renaissance Paris — Commande de ${metadata?.customerName || 'client'}`,
      metadata: {
        source: metadata?.source || 'checkout',
        customer_name: metadata?.customerName || '',
        customer_email: metadata?.customerEmail || '',
        customer_phone: metadata?.customerPhone || '',
        shipping_address: addressLine,
        cart_summary: cartSummary.slice(0, 500),
        items_count: String((cartItems || []).length),
        cart_items: JSON.stringify((cartItems || []).slice(0, 5)),
        // cartId : le webhook stripe-webhook re-lit ce panier pour créer la
        // commande Shopify (lignes, remise, total) après paiement validé.
        cart_id: cartId,
      },
    };

    // Ajouter receipt_email uniquement si présent
    if (metadata?.customerEmail) {
      piOptions.receipt_email = metadata.customerEmail;
    }

    // Ajouter shipping uniquement si l'adresse est remplie
    if (shippingAddress && (shippingAddress as ShippingAddress).address) {
      piOptions.shipping = {
        name: metadata?.customerName || 'Client',
        phone: metadata?.customerPhone || undefined,
        address: {
          line1: (shippingAddress as ShippingAddress).address,
          line2: (shippingAddress as ShippingAddress).addressComplement || undefined,
          city: (shippingAddress as ShippingAddress).city || undefined,
          postal_code: (shippingAddress as ShippingAddress).postalCode || undefined,
          country: (shippingAddress as ShippingAddress).countryCode || 'FR',
        },
      };
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create(piOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create payment intent';
    console.error('Error creating payment intent:', message);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: message }),
    };
  }
};

export { handler };
