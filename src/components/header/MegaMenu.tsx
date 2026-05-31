// ========================================
// COMPOSANT MEGA MENU — "LE SALON NOIR"
// Design immersif, showroom privé haute joaillerie
// Inspiré Cartier, Boucheron, Dior Couture
// ========================================

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import LocaleLink from '../LocaleLink';

export interface MenuProduct {
  name: string;
  image: string;
  description: string;
  price: string;
  handle: string;
}

interface MegaMenuProps {
  products: MenuProduct[];
  loading: boolean;
  title: string;
  subtitle: string;
  description: string;
  collectionLink: string;
  collectionImage?: string;
  collectionVideo?: string;
  onClose: () => void;
}

const menuEase = [0.22, 1, 0.36, 1] as const;
let productPagePreloaded = false;

function preloadProductPage() {
  if (productPagePreloaded) return;
  productPagePreloaded = true;
  void import('../../pages/ProductPage');
}

// Orchestration : révélation séquentielle comme un rideau de scène
const curtainVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 }
  }
};

// Colonne hero — slide depuis la gauche
const heroVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: menuEase }
  }
};

// Bloc éditorial — fondu élégant
const editorialVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: menuEase }
  }
};

// Produits — cascade avec scale
const productCardVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: menuEase,
      delay: 0.12 + i * 0.07
    }
  })
};

// Ligne décorative
const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: menuEase, delay: 0.4 }
  }
};

export default function MegaMenu({
  products,
  loading,
  title,
  subtitle,
  description,
  collectionLink,
  collectionImage,
  collectionVideo,
  onClose
}: MegaMenuProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.85;
    video.play().catch(() => {});
  }, []);
  return (
    <div className="relative max-w-[1600px] mx-auto px-8 md:px-10 lg:px-12 laptop:px-14 xl:px-16 py-8 lg:py-10">

      {/* Grain texture overlay — profondeur atmosphérique */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Halo lumineux subtil — effet éclairage de vitrine */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <motion.div
            className="w-8 h-8 border border-white/10 border-t-white/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] uppercase font-medium">
            Aucun produit disponible
          </p>
        </div>
      ) : (
        <motion.div
          variants={curtainVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Layout principal : Image hero | Produits | Éditorial */}
          <div className="grid grid-cols-[240px_1fr_240px] laptop:grid-cols-[260px_1fr_260px] xl:grid-cols-[280px_1fr_280px] gap-6 laptop:gap-8 xl:gap-10 items-stretch">

            {/* ─── Col 1 — Vidéo ou image hero collection (pleine hauteur) ─── */}
            <motion.div variants={heroVariants} className="relative">
              {collectionVideo ? (
                <div className="relative h-full overflow-hidden group/hero">
                  <video
                    ref={videoRef}
                    src={collectionVideo}
                    poster={collectionImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover/hero:scale-[1.03]"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>
              ) : collectionImage ? (
                <div className="relative h-full overflow-hidden group/hero">
                  <img
                    src={collectionImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover/hero:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                    sizes="(max-width: 1280px) 260px, 280px"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>
              ) : (
                <div className="h-full bg-white/[0.02] border border-white/[0.04]" />
              )}
            </motion.div>

            {/* ─── Col 2 — Grille de produits 2×2 ─── */}
            <div className="grid grid-cols-2 gap-4 laptop:gap-5 content-start">
              {products.map((item, index) => (
                <motion.div
                  key={`${item.handle}-${index}`}
                  custom={index}
                  variants={productCardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <LocaleLink
                    to={`/product/${item.handle}`}
                    onClick={onClose}
                    onMouseEnter={preloadProductPage}
                    onFocus={preloadProductPage}
                  >
                    <div className="group cursor-pointer relative">
                      {/* Conteneur image avec cadre subtil */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0eeeb] border border-white/[0.04] group-hover:border-white/[0.1] transition-all duration-500">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-3 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
                          loading="eager"
                          decoding="async"
                          sizes="(max-width: 1280px) 34vw, 420px"
                        />

                        {/* Overlay gradient au hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Infos produit au hover — slide up */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                          <h4 className="font-display text-[13px] text-white tracking-[-0.01em] leading-tight mb-1">
                            {item.name}
                          </h4>
                          <p className="font-sans text-[10px] text-white/40 font-light tracking-wide">
                            {item.price}
                          </p>
                        </div>

                        {/* Coin décoratif — marque de luxe */}
                        <div className="absolute top-0 right-0 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-full h-px bg-white/20" />
                          <div className="absolute top-0 right-0 h-full w-px bg-white/20" />
                        </div>
                      </div>

                      {/* Nom + prix sous l'image */}
                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50 font-medium group-hover:text-white/80 transition-colors duration-300">
                          {item.name}
                        </p>
                        <span className="font-sans text-[10px] text-white/40 group-hover:text-white/70 transition-colors duration-300 font-medium tabular-nums">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </LocaleLink>
                </motion.div>
              ))}
            </div>

            {/* ─── Col 3 — Bloc éditorial ─── */}
            <motion.div variants={editorialVariants} className="flex flex-col justify-start pt-2 pl-2">
              {/* Label collection */}
              <p className="font-sans text-[7px] tracking-[0.5em] uppercase text-white/[0.15] font-medium mb-5">
                {subtitle}
              </p>

              {/* Titre collection — typographie monumentale */}
              <h3 className="font-display text-[22px] laptop:text-[26px] xl:text-[28px] text-white leading-[1.1] tracking-[-0.025em] mb-4 font-medium">
                {title}
              </h3>

              {/* Séparateur décoratif avec point central */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-px bg-white/10" />
                <div className="w-[3px] h-[3px] bg-bronze/30 rounded-full" />
              </div>

              {/* Description */}
              <p className="font-sans text-white/25 text-[11.5px] leading-[2] mb-8 font-light">
                {description}
              </p>

              {/* CTA — lien direct (collectionLink est déjà localisé) */}
              <Link
                to={collectionLink}
                onClick={onClose}
                className="group/btn relative overflow-hidden inline-flex items-center justify-center border border-white/[0.15] px-8 py-3.5 transition-all duration-600 hover:border-white/40"
              >
                <span className="relative z-10 font-sans text-[8px] tracking-[0.35em] font-medium uppercase text-white/50 group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
                  Explorer la collection
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-600 origin-left" />
              </Link>
            </motion.div>
          </div>

          {/* ─── Ligne décorative bas — losange central ─── */}
          <motion.div
            className="flex items-center mt-8 lg:mt-10"
            variants={lineVariants}
            style={{ transformOrigin: 'center' }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.06]" />
            <div className="w-1.5 h-1.5 border border-white/[0.08] mx-4" style={{ transform: 'rotate(45deg)' }} />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/[0.06] to-white/[0.06]" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
