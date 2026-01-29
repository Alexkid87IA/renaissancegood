import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ColorVariant, getColorSwatchStyle, getModelName } from '../../lib/productGrouping';

interface ColorVariantsSectionProps {
  colorVariants: ColorVariant[];
  selectedColorVariantIndex: number;
  onColorVariantChange: (index: number) => void;
  currentHandle?: string;
}

export default function ColorVariantsSection({
  colorVariants,
  selectedColorVariantIndex,
  onColorVariantChange,
  currentHandle,
}: ColorVariantsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Ne pas afficher s'il n'y a qu'un seul coloris
  if (colorVariants.length <= 1) return null;

  // Filtrer le coloris actuel
  const otherVariants = colorVariants.filter((_, i) => i !== selectedColorVariantIndex);
  if (otherVariants.length === 0) return null;

  return (
    <section className="bg-white">
      {/* Séparateur */}
      <div className="mx-6 sm:mx-10 lg:mx-14 xl:mx-20">
        <div className="h-px bg-dark-text/10" />
      </div>

      <div className="px-6 sm:px-10 lg:px-14 xl:px-20 py-16 sm:py-20 lg:py-24">
        {/* En-tête éditorial — même style que "Vous aimerez aussi" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/35 uppercase mb-4 font-medium">
            Autres coloris
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
            CE MODÈLE
            <br />
            <span className="font-light italic tracking-[-0.02em]">existe aussi en</span>
          </h2>
        </motion.div>

        {/* Cards centrées */}
        <div className={`flex justify-center gap-5 sm:gap-6 lg:gap-8 flex-wrap`}>
          {otherVariants.map((variant, index) => {
            const price = parseFloat(variant.product.priceRange.minVariantPrice.amount).toFixed(0);
            const modelName = getModelName(variant.product.title);

            return (
              <motion.div
                key={variant.handle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-[calc(50%-0.625rem)] sm:w-[260px] lg:w-[280px]"
              >
                <Link
                  to={`/product/${variant.handle}`}
                  className="group block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f4f0]">
                    {variant.thumbnail ? (
                      <img
                        src={variant.thumbnail}
                        alt={variant.colorName}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                          hoveredIndex === index ? 'scale-[1.04]' : 'scale-100'
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-sans text-dark-text/20 text-xs">Image non disponible</span>
                      </div>
                    )}

                    {/* Overlay hover */}
                    <div className={`absolute inset-0 bg-dark-text/[0.03] transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>

                  {/* Infos */}
                  <div className="pt-4 sm:pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-3 h-3 rounded-full border border-dark-text/10 flex-shrink-0"
                        style={getColorSwatchStyle(variant.colorNumber, variant.colorName)}
                      />
                      <p className={`font-sans text-[8px] sm:text-[9px] tracking-[0.25em] text-dark-text/30 uppercase transition-colors duration-500 ${
                        hoveredIndex === index ? 'text-dark-text/50' : ''
                      }`}>
                        {variant.colorName}
                      </p>
                    </div>
                    <h3 className={`font-display font-bold text-dark-text text-base sm:text-lg leading-tight uppercase tracking-[-0.01em] transition-all duration-500 ${
                      hoveredIndex === index ? 'translate-x-1' : ''
                    }`}>
                      {modelName}
                    </h3>
                    <p className={`font-sans text-sm text-dark-text/50 mt-1 transition-all duration-500 ${
                      hoveredIndex === index ? 'text-dark-text/80' : ''
                    }`}>
                      {price}&nbsp;€
                    </p>
                  </div>

                  {/* Ligne d'accentuation */}
                  <div className="mt-4 h-px bg-dark-text/5 relative overflow-hidden">
                    <div className={`absolute inset-y-0 left-0 bg-dark-text/30 transition-all duration-700 ease-out ${
                      hoveredIndex === index ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
