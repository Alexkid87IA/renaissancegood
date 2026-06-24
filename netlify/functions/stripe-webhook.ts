import type { Handler, HandlerEvent } from '@netlify/functions';
import Stripe from 'stripe';

// Webhook Stripe -> création de la commande Shopify après paiement validé.
// Déclenché par Stripe (payment_intent.succeeded), pas par le navigateur :
// la commande se crée même si le client ferme l'onglet.
//
// Env requises (Netlify) :
//   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
//   VITE_SHOPIFY_STORE_DOMAIN, VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//   SHOPIFY_ADMIN_TOKEN (app perso Shopify, scopes write_orders + read_orders).

const ADMIN_API_VERSION = '2025-01';
const STOREFRONT_API_VERSION = '2025-07';

interface CartLine {
  quantity: number;
  merchandise?: { id?: string; price?: { amount?: string } };
}

// --- Lecture du panier Shopify (Storefront) pour reconstituer la commande ---
async function fetchCart(cartId: string) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) throw new Error('Storefront non configuré');

  const query = `
    query Cart($id: ID!) {
      cart(id: $id) {
        lines(first: 50) {
          edges { node { quantity merchandise { ... on ProductVariant { id price { amount } } } } }
        }
        cost { totalAmount { amount currencyCode } }
        discountCodes { code applicable }
      }
    }
  `;
  const res = await fetch(`https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables: { id: cartId } }),
  });
  const json = await res.json();
  const cart = json?.data?.cart;
  if (!cart) throw new Error('Panier introuvable côté Shopify');

  const lines: CartLine[] = cart.lines.edges.map((e: { node: CartLine }) => e.node);
  const origMerch = lines.reduce(
    (s, l) => s + parseFloat(l.merchandise?.price?.amount || '0') * l.quantity,
    0,
  );
  const discountedMerch = parseFloat(cart.cost.totalAmount.amount);
  const currencyCode = cart.cost.totalAmount.currencyCode || 'EUR';
  const appliedCode = (cart.discountCodes || []).find((d: { applicable: boolean }) => d.applicable)?.code as
    | string
    | undefined;

  return { lines, origMerch, discountedMerch, currencyCode, appliedCode };
}

// --- Appel Admin API GraphQL ---
async function adminGraphQL(query: string, variables: Record<string, unknown>) {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!domain || !adminToken) throw new Error('SHOPIFY_ADMIN_TOKEN non configuré');

  const res = await fetch(`https://${domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminToken },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error('Admin GraphQL: ' + JSON.stringify(json.errors));
  return json.data;
}

// --- La commande existe-t-elle déjà (idempotence) ? ---
async function orderExists(piId: string): Promise<boolean> {
  const data = await adminGraphQL(
    `query($q: String!) { orders(first: 1, query: $q) { nodes { id } } }`,
    { q: `tag:stripe-${piId}` },
  );
  return (data?.orders?.nodes?.length ?? 0) > 0;
}

const money = (amount: number, currencyCode: string) => ({
  shopMoney: { amount: amount.toFixed(2), currencyCode },
});

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    console.error('[webhook] STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET manquant');
    return { statusCode: 500, body: 'Config manquante' };
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });

  // Vérification de signature : nécessite le corps brut.
  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const rawBody = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || '';

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
  } catch (err) {
    console.error('[webhook] signature invalide:', err instanceof Error ? err.message : err);
    return { statusCode: 400, body: 'Signature invalide' };
  }

  if (stripeEvent.type !== 'payment_intent.succeeded') {
    return { statusCode: 200, body: 'ignored' };
  }

  const pi = stripeEvent.data.object as Stripe.PaymentIntent;

  try {
    if (await orderExists(pi.id)) {
      return { statusCode: 200, body: 'already created' };
    }

    const cartId = pi.metadata?.cart_id;
    if (!cartId) throw new Error('cart_id absent des metadata');

    const { lines, origMerch, discountedMerch, currencyCode, appliedCode } = await fetchCart(cartId);
    if (!lines.length) throw new Error('Panier vide');

    const chargedTotal = pi.amount / 100;
    const discount = Math.max(0, origMerch - discountedMerch);
    const shipping = Math.max(0, chargedTotal - discountedMerch);

    // Coordonnées client : depuis les metadata (paiement par carte, formulaire),
    // avec repli sur les détails de facturation du charge (paiement express
    // Apple/Google Pay, où l'info vient du wallet et pas du formulaire).
    let billing: Stripe.PaymentMethod.BillingDetails | undefined;
    if (pi.latest_charge) {
      try {
        const charge = await stripe.charges.retrieve(pi.latest_charge as string);
        billing = charge.billing_details;
      } catch { /* repli silencieux */ }
    }

    const ship = pi.shipping;
    const email = pi.metadata?.customer_email || billing?.email || pi.receipt_email || undefined;
    const phone = pi.metadata?.customer_phone || ship?.phone || billing?.phone || undefined;
    const fullName = (pi.metadata?.customer_name || ship?.name || billing?.name || '').trim();
    const nameParts = fullName.split(' ');
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ');

    // TVA française : prix TTC, donc TVA incluse = total × 0,20/1,20. Shopify ne
    // la calcule pas seul sur une commande créée par API, on la fournit.
    const tva = Math.round(chargedTotal * (0.2 / 1.2) * 100) / 100;

    const order: Record<string, unknown> = {
      email,
      phone,
      financialStatus: 'PAID',
      taxesIncluded: true,
      taxLines: [{ title: 'TVA', rate: 0.2, priceSet: money(tva, currencyCode) }],
      lineItems: lines.map((l) => ({ variantId: l.merchandise?.id, quantity: l.quantity })),
      shippingLines: [{ title: 'Livraison', priceSet: money(shipping, currencyCode) }],
      transactions: [
        { kind: 'SALE', status: 'SUCCESS', gateway: 'stripe', amountSet: money(chargedTotal, currencyCode) },
      ],
      note: `Paiement Stripe : ${pi.id}`,
      tags: ['stripe-checkout', `stripe-${pi.id}`],
    };

    if (discount > 0.005) {
      order.discountCode = {
        itemFixedDiscountCode: { code: appliedCode || 'REMISE', amountSet: money(discount, currencyCode) },
      };
    }

    if (ship?.address) {
      const addr = {
        firstName,
        lastName,
        address1: ship.address.line1 || undefined,
        address2: ship.address.line2 || undefined,
        city: ship.address.city || undefined,
        zip: ship.address.postal_code || undefined,
        countryCode: ship.address.country || 'FR',
        phone: ship.phone || undefined,
      };
      order.shippingAddress = addr;
      order.billingAddress = addr; // facturation = livraison, comme une vraie commande
    }

    const data = await adminGraphQL(
      `mutation CreateOrder($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
        orderCreate(order: $order, options: $options) {
          order { id name }
          userErrors { field message }
        }
      }`,
      {
        order,
        // sendReceipt : email de confirmation au client. inventoryBehaviour :
        // décrémente le stock selon la politique du produit (évite la survente).
        options: { sendReceipt: true, inventoryBehaviour: 'DECREMENT_OBEYING_POLICY' },
      },
    );

    const errs = data?.orderCreate?.userErrors;
    if (errs && errs.length) {
      console.error('[webhook] orderCreate userErrors:', JSON.stringify(errs));
      // 200 quand même : ne pas faire boucler Stripe sur une erreur métier.
      return { statusCode: 200, body: 'order errors' };
    }

    console.log('[webhook] commande créée:', data?.orderCreate?.order?.name, 'pour', pi.id);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('[webhook] échec création commande:', err instanceof Error ? err.message : err);
    // 200 pour éviter les relances en boucle ; l'erreur est loguée pour reprise manuelle.
    return { statusCode: 200, body: 'error logged' };
  }
};

export { handler };
