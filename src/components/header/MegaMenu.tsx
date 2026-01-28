// ========================================
// COMPOSANT MEGA MENU RÉUTILISABLE
// Design éditorial aligné sur la homepage Renaissance
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

// Stagger rapide
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

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
    <div className="max-w-[1400px] mx-auto px-8 md:px-10 lg:px-12 laptop:px-14 py-6 md:py-8 lg:py-10">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] uppercase font-medium">
            Aucun produit disponible
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 lg:gap-10 laptop:gap-12 xl:gap-14">

          {/* Colonne éditoriale — à gauche */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-dark-text/30 font-medium mb-4">
              {subtitle}
            </p>
            <h3 className="font-display text-2xl lg:text-3xl text-dark-text leading-[1.15] tracking-[-0.03em] whitespace-pre-line mb-4">
              {title}
            </h3>
            <div className="w-12 h-px bg-dark-text/15 mb-4" />
            <p className="font-sans text-dark-text/50 text-[13px] leading-[1.8] mb-8 font-light max-w-[300px]">
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

          {/* Grille de produits — à droite */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((item) => (
              <motion.div key={item.handle} variants={itemVariants}>
                <Link
                  to={`/product/${item.handle}`}
                  onClick={onClose}
                >
                  <div className="group cursor-pointer">
                    {/* Image 16:9 — format natif des lunettes */}
                    <div className="relative aspect-video mb-5 overflow-hidden bg-dark-text/[0.03]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-text/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {/* Infos produit */}
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dark-text/30 font-medium mb-2">
                      {item.description}
                    </p>
                    <h3 className="font-display text-base tracking-[-0.01em] text-dark-text mb-2 group-hover:text-bronze transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-dark-text/60 font-light">
                      {item.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
