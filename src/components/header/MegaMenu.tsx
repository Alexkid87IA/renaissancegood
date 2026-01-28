// ========================================
// COMPOSANT MEGA MENU RÉUTILISABLE
// Utilisé pour afficher les menus des collections (Versailles, Heritage)
// ========================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  onClose: () => void;
}

export default function MegaMenu({
  products,
  loading,
  title,
  subtitle,
  description,
  collectionLink,
  onClose
}: MegaMenuProps) {
  return (
    <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-12 laptop:px-14 py-8 md:py-10 lg:py-12 laptop:py-14">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-text"></div>
          <p className="font-sans text-dark-text/60 text-xs tracking-wider uppercase mt-4">
            Chargement...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-sans text-dark-text/60 text-sm tracking-wider uppercase">
            Aucun produit disponible
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-16">
          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 laptop:gap-8">
            {products.map((item, index) => (
              <Link
                key={item.handle}
                to={`/product/${item.handle}`}
                onClick={onClose}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video mb-5 overflow-hidden bg-beige">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-sm tracking-[-0.01em] text-dark-text mb-2">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-dark-text/50 mb-2.5 font-light">
                    {item.description}
                  </p>
                  <p className="font-sans text-sm text-dark-text font-light">
                    {item.price}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Colonne de description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col justify-center lg:pl-8 lg:border-l border-dark-text/[0.06]"
          >
            <h3 className="font-display text-2xl md:text-3xl text-dark-text mb-4 md:mb-6 leading-[1.2] tracking-[-0.02em] whitespace-pre-line">
              {title}
            </h3>
            <p className="font-sans text-dark-text/50 text-[13px] md:text-sm leading-[1.8] mb-6 md:mb-10 font-light">
              {description}
            </p>
            <Link to={collectionLink} onClick={onClose}>
              <button className="group relative overflow-hidden border border-dark-text px-8 py-3 transition-all duration-500">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text group-hover:text-beige transition-colors duration-500">
                  Explorer la collection
                </span>
                <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
