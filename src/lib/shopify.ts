import { createStorefrontClient } from '@shopify/hydrogen-react';

const client = createStorefrontClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  storefrontApiVersion: '2025-07',
});

export const { getStorefrontApiUrl, getPublicTokenHeaders } = client;

// Fonction pour récupérer tous les produits
export async function getProducts() {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          products(first: 250) {
            edges {
              node {
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
                images(first: 5) {
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
                      quantityAvailable
                      priceV2 {
                        amount
                        currencyCode
                      }
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
      `,
    }),
  });

  const { data } = await response.json();
  
  // Récupérer tous les produits publiés (sans filtrer par stock)
  const products = data.products.edges.map((edge: any) => edge.node);
    
  return products;
}

// Fonction pour récupérer un produit spécifique (avec metafields dimensions)
export async function getProduct(handle: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          productByHandle(handle: "${handle}") {
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
            images(first: 10) {
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
      `,
    }),
  });

  const { data } = await response.json();
  return data.productByHandle;
}

// Fonction pour récupérer les produits par collection (Heritage, Versailles, etc.)
export async function getProductsByCollection(collectionHandle: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          collection(handle: "${collectionHandle}") {
            title
            products(first: 250) {
              edges {
                node {
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
                  images(first: 5) {
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
                        quantityAvailable
                        priceV2 {
                          amount
                          currencyCode
                        }
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
      `,
    }),
  });

  const { data } = await response.json();
  
  if (!data.collection) {
    return [];
  }
  
  // Récupérer tous les produits de la collection (sans filtrer par stock)
  const products = data.collection.products.edges.map((edge: any) => edge.node);
  
  return products;
}

// ===== FONCTIONS DE GESTION DU PANIER =====

// Créer un nouveau panier
export async function createCart() {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation {
          cartCreate {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cartCreate.cart;
}

// Ajouter un article au panier
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation {
          cartLinesAdd(
            cartId: "${cartId}"
            lines: [
              {
                merchandiseId: "${variantId}"
                quantity: ${quantity}
              }
            ]
          ) {
            cart {
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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cartLinesAdd.cart;
}

// Mettre à jour la quantité d'un article dans le panier
export async function updateCartItem(cartId: string, lineId: string, quantity: number) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation {
          cartLinesUpdate(
            cartId: "${cartId}"
            lines: [
              {
                id: "${lineId}"
                quantity: ${quantity}
              }
            ]
          ) {
            cart {
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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cartLinesUpdate.cart;
}

// Supprimer un article du panier
export async function removeFromCart(cartId: string, lineId: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation {
          cartLinesRemove(
            cartId: "${cartId}"
            lineIds: ["${lineId}"]
          ) {
            cart {
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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cartLinesRemove.cart;
}

// Récupérer le panier existant
export async function getCart(cartId: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          cart(id: "${cartId}") {
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
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cart;
}

// ===== FONCTIONS POUR LE BLOG =====

// Récupérer tous les articles du blog
export async function getBlogPosts(blogHandle: string = 'actualites') {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          blog(handle: "${blogHandle}") {
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
      `,
    }),
  });

  const { data } = await response.json();
  
  if (!data.blog) {
    return [];
  }
  
  return data.blog.articles.edges.map((edge: any) => edge.node);
}

// Récupérer un article spécifique par son handle
export async function getBlogPostByHandle(blogHandle: string = 'actualites', articleHandle: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          blog(handle: "${blogHandle}") {
            articleByHandle(handle: "${articleHandle}") {
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
      `,
    }),
  });

  const { data } = await response.json();
  
  if (!data.blog || !data.blog.articleByHandle) {
    return null;
  }
  
  return data.blog.articleByHandle;
}

// Récupérer les articles récents (pour suggestions)
export async function getRecentBlogPosts(blogHandle: string = 'actualites', limit: number = 3) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          blog(handle: "${blogHandle}") {
            articles(first: ${limit}, sortKey: PUBLISHED_AT, reverse: true) {
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
      `,
    }),
  });

  const { data } = await response.json();
  
  if (!data.blog) {
    return [];
  }
  
  return data.blog.articles.edges.map((edge: any) => edge.node);
}

// ===== FONCTIONS POUR LE CHECKOUT =====

// Convertir le cartId en checkoutId
function cartIdToCheckoutId(cartId: string): string {
  const base64Part = cartId.split('/').pop();
  return `gid://shopify/Checkout/${base64Part}`;
}

// Mettre à jour l'email du checkout
export async function updateCheckoutEmail(cartId: string, email: string) {
  const checkoutId = cartIdToCheckoutId(cartId);
  
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
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
      `,
      variables: {
        checkoutId,
        email
      }
    }),
  });

  const { data } = await response.json();
  
  if (data.checkoutEmailUpdateV2.checkoutUserErrors.length > 0) {
    console.error('Erreur lors de la mise à jour de l\'email:', data.checkoutEmailUpdateV2.checkoutUserErrors);
  }
  
  return data.checkoutEmailUpdateV2;
}

// Mettre à jour l'adresse de livraison du checkout
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
  
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
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
      `,
      variables: {
        checkoutId,
        shippingAddress
      }
    }),
  });

  const { data } = await response.json();
  
  if (data.checkoutShippingAddressUpdateV2.checkoutUserErrors.length > 0) {
    console.error('Erreur lors de la mise à jour de l\'adresse:', data.checkoutShippingAddressUpdateV2.checkoutUserErrors);
  }
  
  return data.checkoutShippingAddressUpdateV2;
}