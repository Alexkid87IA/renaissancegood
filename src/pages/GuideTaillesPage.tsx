import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Ruler, Eye, ArrowLeftRight } from 'lucide-react';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

const SIZES = [
  {
    label: 'Taille S',
    subtitle: 'Petite',
    description: 'Idéal pour les visages fins et les morphologies délicates.',
    verre: '45-50mm',
    pont: '16-18mm',
    branches: '135-140mm',
  },
  {
    label: 'Taille M',
    subtitle: 'Moyenne',
    description: 'La taille la plus courante, convient à la majorité des morphologies.',
    verre: '50-54mm',
    pont: '18-20mm',
    branches: '140-145mm',
    highlight: true,
  },
  {
    label: 'Taille L',
    subtitle: 'Grande',
    description: 'Pour les visages larges et les morphologies imposantes.',
    verre: '54-58mm',
    pont: '20-24mm',
    branches: '145-150mm',
  },
];

const FACE_SHAPES = [
  {
    shape: 'Visage Ovale',
    advice: 'La forme la plus équilibrée. Toutes les formes de montures vous vont bien. Privilégiez les modèles qui ne sont ni trop grands ni trop petits pour maintenir les proportions.',
  },
  {
    shape: 'Visage Rond',
    advice: 'Optez pour des montures rectangulaires ou géométriques pour affiner le visage. Évitez les formes trop rondes qui accentueraient la rondeur.',
  },
  {
    shape: 'Visage Carré',
    advice: 'Les montures rondes ou ovales adoucissent les traits anguleux. Les formes papillon sont particulièrement flatteuses.',
  },
  {
    shape: 'Visage Rectangulaire',
    advice: 'Choisissez des montures avec une hauteur de verre importante pour raccourcir visuellement le visage. Les formes hexagonales fonctionnent bien.',
  },
];

export default function GuideTaillesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title="Guide des Tailles"
        description="Trouvez la monture RENAISSANCE Paris parfaitement adaptée à votre visage. Guide des dimensions, formes de visage et conseils pour choisir vos lunettes."
        url="/guide-tailles"
      />

      {/* HERO — Dark éditorial */}
      <section className="bg-[#000000] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Aide & Conseils
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              GUIDE DES
              <br />TAILLES.
            </motion.h1>
            <motion.p variants={fade} className="font-display text-xl lg:text-2xl xl:text-3xl font-light italic text-white/40 tracking-[-0.02em] mb-8">
              Trouvez la monture idéale.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />
            <motion.p variants={fade} className="font-sans text-white/30 text-[13px] lg:text-sm leading-[1.8] font-light max-w-lg">
              Un guide complet pour comprendre les dimensions de nos montures et choisir celle qui s'adapte parfaitement à votre morphologie.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* COMPRENDRE LES DIMENSIONS */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-2">01</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] mb-4">
              Comprendre les dimensions
            </h2>
            <div className="w-8 h-px bg-dark-text/15" />
          </motion.div>

          {/* Schéma placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[2/1] bg-dark-text/[0.03] border border-dark-text/8 flex items-center justify-center mb-12"
          >
            <div className="text-center">
              <Ruler className="text-bronze/40 mx-auto mb-3" size={40} />
              <p className="font-sans text-dark-text/25 text-[11px] tracking-[0.15em] uppercase font-medium">
                Schéma des mesures
              </p>
            </div>
          </motion.div>

          {/* 3 mesures */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Eye, title: 'Largeur du verre', desc: 'Distance horizontale d\'un verre, mesurée à son point le plus large.', range: '45mm — 58mm' },
              { icon: ArrowLeftRight, title: 'Pont', desc: 'Distance entre les deux verres, au niveau de l\'arête du nez.', range: '14mm — 24mm' },
              { icon: Ruler, title: 'Branches', desc: 'Longueur des branches, de la charnière à l\'extrémité.', range: '135mm — 150mm' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <item.icon className="text-bronze mb-4" size={20} strokeWidth={1.5} />
                <h3 className="font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light mb-3">
                  {item.desc}
                </p>
                <p className="font-display text-lg font-bold text-dark-text tracking-[-0.02em]">
                  {item.range}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Format standard */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-l-2 border-bronze/40 pl-6 py-4"
          >
            <p className="font-sans text-[9px] tracking-[0.25em] font-bold text-bronze uppercase mb-3">
              Format Standard Renaissance
            </p>
            <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light mb-3">
              Nos dimensions sont indiquées dans ce format : <span className="font-display text-dark-text font-bold text-lg">52-20-145</span>
            </p>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <p className="font-display text-xl font-bold text-dark-text">52</p>
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-dark-text/30 font-medium mt-1">Verre (mm)</p>
              </div>
              <div className="w-px h-8 bg-dark-text/10" />
              <div>
                <p className="font-display text-xl font-bold text-dark-text">20</p>
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-dark-text/30 font-medium mt-1">Pont (mm)</p>
              </div>
              <div className="w-px h-8 bg-dark-text/10" />
              <div>
                <p className="font-display text-xl font-bold text-dark-text">145</p>
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-dark-text/30 font-medium mt-1">Branches (mm)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TROUVER VOTRE TAILLE */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-2">02</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] mb-4">
              Trouver votre taille
            </h2>
            <div className="w-8 h-px bg-dark-text/15" />
          </motion.div>

          <div className="space-y-6">
            {SIZES.map((size, i) => (
              <motion.div
                key={size.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`border ${size.highlight ? 'border-bronze/30 bg-bronze/[0.03]' : 'border-dark-text/8'} p-6 lg:p-8`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display text-lg font-bold text-dark-text tracking-[-0.02em]">
                    {size.label}
                  </h3>
                  <span className="font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-dark-text/30">
                    {size.subtitle}
                  </span>
                  {size.highlight && (
                    <span className="ml-auto font-sans text-[8px] tracking-[0.2em] font-bold uppercase text-bronze border border-bronze/30 px-3 py-1">
                      Plus courant
                    </span>
                  )}
                </div>
                <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light mb-6">
                  {size.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Verre', value: size.verre },
                    { label: 'Pont', value: size.pont },
                    { label: 'Branches', value: size.branches },
                  ].map((dim) => (
                    <div key={dim.label} className="text-center">
                      <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-dark-text/30 font-medium mb-1">{dim.label}</p>
                      <p className="font-display text-base lg:text-lg font-bold text-dark-text">{dim.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORME DU VISAGE */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-2">03</p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] mb-4">
              Choisir selon la forme du visage
            </h2>
            <div className="w-8 h-px bg-dark-text/15" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-text/8">
            {FACE_SHAPES.map((item, i) => (
              <motion.div
                key={item.shape}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-beige p-6 lg:p-8"
              >
                <h3 className="font-display text-lg font-bold text-dark-text tracking-[-0.02em] mb-3">
                  {item.shape}
                </h3>
                <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light">
                  {item.advice}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Besoin d'essayer
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              Essayez en boutique.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              200+ opticiens partenaires en France.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8" />
            <motion.p variants={fade} className="font-sans text-white/30 text-[13px] lg:text-sm leading-[1.8] font-light mb-10 max-w-lg mx-auto">
              Rendez-vous chez l'un de nos opticiens partenaires pour essayer nos collections et bénéficier de conseils personnalisés.
            </motion.p>
            <motion.div variants={fade} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/opticiens"
                className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Trouver un opticien
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
              <a
                href="/contact"
                className="group border border-white/8 px-10 py-4 transition-all duration-500 hover:border-white/20"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  Nous contacter
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
