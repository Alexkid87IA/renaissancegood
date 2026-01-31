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

    const { amount, currency, metadata, cartItems, shippingAddress } = JSON.parse(event.body || '{}');

    // Validation
    if (!amount || amount < 50) {
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
      amount,
      currency: currency || 'eur',
      automatic_payment_methods: { enabled: true },
      description: `Renaissance Paris — Commande de ${metadata?.customerName || 'client'}`,
      metadata: {
        source: metadata?.source || 'checkout',
        customer_name: metadata?.customerName || '',
        customer_email: metadata?.customerEmail || '',
        shipping_address: addressLine,
        cart_summary: cartSummary.slice(0, 500),
        items_count: String((cartItems || []).length),
        cart_items: JSON.stringify((cartItems || []).slice(0, 5)),
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
