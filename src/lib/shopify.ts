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
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                description
                availableForSale
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
                      priceV2 {
                        amount
                        currencyCode
                      }
                      availableForSale
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
  
  // Filtrer seulement les produits disponibles à la vente
  const products = data.products.edges
    .map((edge: any) => edge.node)
    .filter((product: any) => product.availableForSale);
    
  return products;
}

// Fonction pour récupérer un produit spécifique
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
            availableForSale
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
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.productByHandle;
}

// Fonction pour récupérer les produits par collection (Heritage, Versailles)
export async function getProductsByCollection(collectionHandle: string) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({
      query: `
        {
          collection(handle: "${collectionHandle}") {
            title
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  availableForSale
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
                        priceV2 {
                          amount
                          currencyCode
                        }
                        availableForSale
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
  
  // Filtrer seulement les produits disponibles à la vente
  const products = data.collection.products.edges
    .map((edge: any) => edge.node)
    .filter((product: any) => product.availableForSale);
  
  return products;
}