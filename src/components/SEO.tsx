import { Helmet } from 'react-helmet-async';
import { useLocale } from '../contexts/LocaleContext';
import { SUPPORTED_LOCALES, LOCALE_TO_HREFLANG, LOCALE_TO_OG } from '../lib/i18n';

interface FAQItem {
  question: string;
  answer: string;
}

interface LocalBusinessProps {
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  openingHours?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
}

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
  // Pour les pages FAQ
  faqItems?: FAQItem[];
  // Pour les pages avec LocalBusiness (opticiens)
  localBusiness?: LocalBusinessProps;
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
  faqItems,
  localBusiness,
  noIndex = false,
}: SEOProps) {
  const { locale } = useLocale();

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Lunettes de Luxe Artisanales | Excellence Française`;

  // Build canonical URL with locale prefix
  const pathForUrl = url || '/';
  const localizedPath = locale === 'fr' ? pathForUrl : `/${locale}${pathForUrl}`;
  const canonicalUrl = `${BASE_URL}${localizedPath}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Build hreflang alternates
  const hreflangLinks = SUPPORTED_LOCALES.map(lang => ({
    lang: LOCALE_TO_HREFLANG[lang],
    href: lang === 'fr' ? `${BASE_URL}${pathForUrl}` : `${BASE_URL}/${lang}${pathForUrl}`,
  }));
  // x-default points to French
  const xDefaultHref = `${BASE_URL}${pathForUrl}`;

  const ogLocale = LOCALE_TO_OG[locale];

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

  // JSON-LD pour FAQ
  const faqSchema = faqItems && faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  // JSON-LD pour LocalBusiness
  const localBusinessSchema = localBusiness ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: localBusiness.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: localBusiness.address.street,
      addressLocality: localBusiness.address.city,
      postalCode: localBusiness.address.postalCode,
      addressCountry: localBusiness.address.country,
    },
    ...(localBusiness.phone && { telephone: localBusiness.phone }),
    ...(localBusiness.openingHours && { openingHours: localBusiness.openingHours }),
    ...(localBusiness.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: localBusiness.geo.latitude,
        longitude: localBusiness.geo.longitude,
      },
    }),
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
      <meta property="og:locale" content={ogLocale} />

      {/* hreflang alternates */}
      {hreflangLinks.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />

      {/* Dynamic html lang */}
      <html lang={locale} />

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

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
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
