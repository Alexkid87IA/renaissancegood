import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '8-12', label: 'Artisans par paire' },
  { value: '250', label: 'Étapes de fabrication' },
  { value: '8-15h', label: 'De travail cumulé' },
  { value: '2', label: 'Pays, un standard' },
];

const DETAILS = [
  { bold: 'Dessinées à Paris.', text: 'Chaque ligne, chaque courbe.' },
  { bold: 'Usinées en Corée.', text: 'Là où la précision est une religion.' },
  { bold: 'Acétate Mazzucchelli. Acier haute résistance.', text: 'Pas de compromis.' },
  { bold: 'Un strass sur la branche gauche.', text: 'Notre signature. Discrète.' },
];

export default function ProductCraftSection() {
  return (
    <section className="relative bg-dark-text overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source
          src="https://res.cloudinary.com/dafo6bvhc/video/upload/v1766499859/61822c99-1122-400c-aa3a-317de2674d17_1_efejw1.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <div className="relative px-6 sm:px-10 md:px-14 lg:px-16 py-16 sm:py-20 lg:py-24 xl:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          {/* Header */}
          <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] text-white/50 uppercase mb-3">
            Savoir-faire
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-[-0.02em] leading-[0.95]">
            FABRICATION
          </h2>

          <p className="font-sans text-white/80 text-sm sm:text-base lg:text-lg leading-[1.8] font-light max-w-2xl mb-8 sm:mb-10 lg:mb-12">
            Une paire de Renaissance, c'est 250 étapes. Des mains françaises pour la vision.
            Des mains coréennes pour la précision. Deux pays. Un seul standard&nbsp;: celui qui dure.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-12 lg:mb-14">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-bold tracking-tight whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="font-sans text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/20 mb-8 sm:mb-10" />

          {/* Detail points */}
          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 max-w-2xl">
            {DETAILS.map((detail) => (
              <p key={detail.bold} className="font-sans text-white/70 text-xs sm:text-sm lg:text-base leading-[1.6] font-light">
                <span className="font-semibold text-white">{detail.bold}</span>{' '}
                {detail.text}
              </p>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/histoire"
            className="inline-block border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-medium uppercase hover:bg-white hover:text-dark-text transition-all duration-400"
          >
            Voir le processus
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
