import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  // Pour les produits
  product?: {
    name: string;
    description: string;
    price: string;
    currency: string;
    image: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    sku?: string;
    brand?: string;
  };
  // Pour les articles/blog
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
  };
  noIndex?: boolean;
}

const BASE_URL = 'https://www.renaissance-paris.com';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/dsm0b18br/image/upload/f_auto,q_auto/v1/Renaissance%20Paris/og-image.webp';
const SITE_NAME = 'RENAISSANCE Paris';

export default function SEO({
  title,
  description = 'Découvrez les lunettes de luxe RENAISSANCE Paris. Savoir-faire artisanal français, matériaux nobles et design intemporel. Créées à Paris avec passion.',
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  product,
  article,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Lunettes de Luxe Artisanales | Excellence Française`;

  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // JSON-LD pour Organisation (sur toutes les pages)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RENAISSANCE Paris',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Maison française de lunettes de luxe artisanales',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.instagram.com/renaissance.paris',
      'https://www.facebook.com/renaissanceparis',
    ],
  };

  // JSON-LD pour Produit
  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'RENAISSANCE Paris',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: 'RENAISSANCE Paris',
      },
    },
    ...(product.sku && { sku: product.sku }),
  } : null;

  // JSON-LD pour Article
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: fullImage,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RENAISSANCE Paris',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  } : null;

  // JSON-LD pour BreadcrumbList (basé sur l'URL)
  const getBreadcrumbs = () => {
    if (!url || url === '/') return null;

    const parts = url.split('/').filter(Boolean);
    const items = [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    ];

    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      items.push({
        '@type': 'ListItem',
        position: index + 2,
        name,
        item: `${BASE_URL}${currentPath}`,
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  };

  const breadcrumbSchema = getBreadcrumbs();

  return (
    <Helmet>
      {/* Balises de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Product specific Open Graph */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price} />
          <meta property="product:price:currency" content={product.currency} />
          <meta property="product:availability" content={product.availability === 'InStock' ? 'in stock' : 'out of stock'} />
        </>
      )}

      {/* Article specific Open Graph */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          <meta property="article:author" content={article.author} />
        </>
      )}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}
