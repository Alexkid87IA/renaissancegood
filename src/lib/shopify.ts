import { createStorefrontClient } from '@shopify/hydrogen-react';

const client = createStorefrontClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  storefrontApiVersion: '2025-07',
});

export const { getStorefrontApiUrl, getPublicTokenHeaders } = client;

// ========================================
// TYPES POUR LES RÉPONSES GRAPHQL
// ========================================
interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string; locations?: Array<{ line: number; column: number }> }>;
}

// ========================================
// FONCTION UTILITAIRE POUR LES REQUÊTES AVEC TIMEOUT ET VALIDATION
// ========================================
async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>, language?: string): Promise<T> {
  // Inject @inContext directive for localized content
  if (language && language !== 'FR') {
    query = query.replace(
      /^(\s*(?:query|mutation)\s+\w+)/m,
      `$1 @inContext(language: ${language})`
    );
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout

  try {
    const response = await fetch(getStorefrontApiUrl(), {
      method: 'POST',
      headers: getPublicTokenHeaders(),
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    // Vérifier les erreurs GraphQL
    if (result.errors && result.errors.length > 0) {
      const errorMessages = result.errors.map(e => e.message).join(', ');
      throw new Error(`Erreur GraphQL: ${errorMessages}`);
    }

    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('La requête a expiré. Veuillez réessayer.');
    }
    throw error;
  }
}

// ========================================
// CACHE MÉMOIRE AVEC TTL
// ========================================
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ========================================
// FONCTION POUR RÉCUPÉRER TOUS LES PRODUITS
// ========================================
export async function getProducts(language?: string) {
  const cacheKey = `all-products-${language || 'FR'}`;
  const cached = getCached<ReturnType<typeof getProducts>>(cacheKey);
  if (cached) return cached;
  const query = `
    query GetProducts {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 6) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: Array<{ node: unknown }> } }>(query, undefined, language);
  const products = data.products.edges.map((edge) => edge.node);
  setCache(cacheKey, products);
  return products;
}

// ========================================
// FONCTION POUR RÉCUPÉRER UN PRODUIT PAR HANDLE
// ========================================
export async function getProduct(handle: string, language?: string) {
  const cacheKey = `product-${handle}-${language || 'FR'}`;
  const cached = getCached<ReturnType<typeof getProduct>>(cacheKey);
  if (cached) return cached;
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        availableForSale
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 50) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        collections(first: 5) {
          edges {
            node {
              handle
              title
            }
          }
        }
        lensWidth: metafield(namespace: "custom", key: "lens_width") {
          value
          type
        }
        bridgeWidth: metafield(namespace: "custom", key: "bridge_width") {
          value
          type
        }
        templeLength: metafield(namespace: "custom", key: "temple_length") {
          value
          type
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: unknown }>(query, { handle }, language);
  setCache(cacheKey, data.productByHandle);
  return data.productByHandle;
}

// ========================================
// FONCTION POUR RÉCUPÉRER LES PRODUITS PAR COLLECTION
// ========================================
export async function getProductsByCollection(collectionHandle: string, language?: string) {
  const cacheKey = `collection-${collectionHandle}-${language || 'FR'}`;
  const cached = getCached<ReturnType<typeof getProductsByCollection>>(cacheKey);
  if (cached) return cached;
  const query = `
    query GetProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 6) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                  }
                }
              }
              collections(first: 5) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collection: { products: { edges: Array<{ node: unknown }> } } | null }>(
    query,
    { handle: collectionHandle },
    language
  );

  if (!data.collection) {
    return [];
  }

  const products = data.collection.products.edges.map((edge) => edge.node);
  setCache(cacheKey, products);
  return products;
}

// ========================================
// FRAGMENT CART POUR ÉVITER LA DUPLICATION
// ========================================
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              product {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
  }
`;

// ========================================
// CRÉATION DU PANIER
// ========================================
export async function createCart() {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>(query);
  return data.cartCreate.cart;
}

// ========================================
// AJOUTER AU PANIER
// ========================================
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }]
  });

  return data.cartLinesAdd.cart;
}

// ========================================
// METTRE À JOUR UN ARTICLE DU PANIER
// ========================================
export async function updateCartItem(cartId: string, lineId: string, quantity: number) {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCartItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }]
  });

  return data.cartLinesUpdate.cart;
}

// ========================================
// SUPPRIMER DU PANIER
// ========================================
export async function removeFromCart(cartId: string, lineId: string) {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>(query, {
    cartId,
    lineIds: [lineId]
  });

  return data.cartLinesRemove.cart;
}

// ========================================
// RÉCUPÉRER LE PANIER
// ========================================
export async function getCart(cartId: string) {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  const data = await shopifyFetch<{ cart: unknown }>(query, { cartId });
  return data.cart;
}

// ========================================
// FONCTIONS POUR LE BLOG
// ========================================
export async function getBlogPosts(blogHandle: string = 'actualites', language?: string) {
  const query = `
    query GetBlogPosts($handle: String!) {
      blog(handle: $handle) {
        articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              excerptHtml
              contentHtml
              image {
                url
                altText
              }
              publishedAt
              author {
                name
              }
              tags
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ blog: { articles: { edges: Array<{ node: unknown }> } } | null }>(
    query,
    { handle: blogHandle },
    language
  );

  if (!data.blog) {
    return [];
  }

  return data.blog.articles.edges.map((edge) => edge.node);
}

export async function getBlogPostByHandle(blogHandle: string = 'actualites', articleHandle: string, language?: string) {
  const query = `
    query GetBlogPostByHandle($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        articleByHandle(handle: $articleHandle) {
          id
          title
          handle
          excerpt
          excerptHtml
          contentHtml
          image {
            url
            altText
          }
          publishedAt
          author {
            name
          }
          tags
        }
      }
    }
  `;

  const data = await shopifyFetch<{ blog: { articleByHandle: unknown } | null }>(query, {
    blogHandle,
    articleHandle
  }, language);

  if (!data.blog || !data.blog.articleByHandle) {
    return null;
  }

  return data.blog.articleByHandle;
}

export async function getRecentBlogPosts(blogHandle: string = 'actualites', limit: number = 3, language?: string) {
  const query = `
    query GetRecentBlogPosts($handle: String!, $limit: Int!) {
      blog(handle: $handle) {
        articles(first: $limit, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              image {
                url
                altText
              }
              publishedAt
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ blog: { articles: { edges: Array<{ node: unknown }> } } | null }>(
    query,
    { handle: blogHandle, limit },
    language
  );

  if (!data.blog) {
    return [];
  }

  return data.blog.articles.edges.map((edge) => edge.node);
}

// ========================================
// FONCTIONS POUR LE CHECKOUT
// ========================================
function cartIdToCheckoutId(cartId: string): string {
  const base64Part = cartId.split('/').pop();
  return `gid://shopify/Checkout/${base64Part}`;
}

export async function updateCheckoutEmail(cartId: string, email: string) {
  const checkoutId = cartIdToCheckoutId(cartId);

  const query = `
    mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          id
          email
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutEmailUpdateV2: { checkout: unknown; checkoutUserErrors: Array<{ field: string; message: string }> } }>(
    query,
    { checkoutId, email }
  );

  if (data.checkoutEmailUpdateV2.checkoutUserErrors.length > 0) {
    const errors = data.checkoutEmailUpdateV2.checkoutUserErrors.map(e => e.message).join(', ');
    throw new Error(`Erreur lors de la mise à jour de l'email: ${errors}`);
  }

  return data.checkoutEmailUpdateV2;
}

export async function updateCheckoutShippingAddress(cartId: string, shippingAddress: {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
}) {
  const checkoutId = cartIdToCheckoutId(cartId);

  const query = `
    mutation CheckoutShippingAddressUpdate($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
      checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
        checkout {
          id
          email
          shippingAddress {
            firstName
            lastName
            address1
            address2
            city
            zip
            country
            phone
          }
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{ checkoutShippingAddressUpdateV2: { checkout: unknown; checkoutUserErrors: Array<{ field: string; message: string }> } }>(
    query,
    { checkoutId, shippingAddress }
  );

  if (data.checkoutShippingAddressUpdateV2.checkoutUserErrors.length > 0) {
    const errors = data.checkoutShippingAddressUpdateV2.checkoutUserErrors.map(e => e.message).join(', ');
    throw new Error(`Erreur lors de la mise à jour de l'adresse: ${errors}`);
  }

  return data.checkoutShippingAddressUpdateV2;
}

// ========================================
// FONCTION POUR RÉCUPÉRER LES IMAGES D'UN PRODUIT (utilisée par CartPage)
// ========================================
export async function getProductImages(handle: string, language?: string) {
  const query = `
    query GetProductImages($handle: String!) {
      productByHandle(handle: $handle) {
        images(first: 50) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: { images: { edges: Array<{ node: { url: string; altText: string | null } }> } } | null }>(
    query,
    { handle },
    language
  );

  if (!data.productByHandle) {
    return [];
  }

  return data.productByHandle.images.edges.map((edge) => edge.node);
}
