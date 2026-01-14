// ========================================
// COMPOSANT OPTIMIZED IMAGE
// Image optimisée avec lazy loading, placeholder blur et WebP
// ========================================

import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Pour les images above the fold
  onLoad?: () => void;
}

// Génère un placeholder blur en base64 (gris très léger)
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWYwIi8+PC9zdmc+';

// Transformer l'URL Cloudinary pour optimiser l'image
function optimizeCloudinaryUrl(url: string, width?: number): string {
  // Si c'est une URL Cloudinary, on ajoute les transformations
  if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) {
    // Ajouter les optimisations Cloudinary
    const optimizations = [
      'f_auto', // Format automatique (WebP si supporté)
      'q_auto:good', // Qualité automatique
    ];

    if (width) {
      optimizations.push(`w_${width}`);
    }

    // Insérer les optimisations dans l'URL
    if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/${optimizations.join(',')}/`);
    }
  }

  // Si c'est une URL Shopify CDN, on peut ajouter des paramètres de taille
  if (url.includes('cdn.shopify.com')) {
    // Shopify CDN supporte les paramètres de taille
    if (width && !url.includes('_')) {
      const extension = url.split('.').pop();
      return url.replace(`.${extension}`, `_${width}x.${extension}`);
    }
  }

  return url;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Charger 200px avant d'entrer dans le viewport
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const optimizedSrc = optimizeCloudinaryUrl(src, width);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={BLUR_PLACEHOLDER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      {/* Image principale */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

// Composant pour les images de fond
export function OptimizedBackgroundImage({
  src,
  alt,
  className = '',
  children,
  priority = false,
}: OptimizedImageProps & { children?: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        backgroundColor: '#f5f5f0',
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
}
