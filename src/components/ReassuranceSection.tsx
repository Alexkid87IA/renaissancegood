import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const guarantees = [
  {
    number: '200+',
    title: 'Opticiens',
    description: 'Partout en France',
  },
  {
    number: '0€',
    title: 'Livraison',
    description: 'Offerte dès 500€',
  },
  {
    number: '2 ans',
    title: 'Garantie',
    description: 'On assume ce qu\'on fabrique',
  },
  {
    number: '100%',
    title: 'Sécurisé',
    description: 'Paiement crypté',
  },
];

export default function ReassuranceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative z-[100] bg-beige">
      {/* Séparateur haut */}
      <div className="mx-6 sm:mx-10 lg:mx-14 xl:mx-20">
        <div className="h-px bg-dark-text/[0.07]" />
      </div>

      <div className="px-6 sm:px-10 lg:px-14 xl:px-20 py-20 sm:py-24 lg:py-32">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-[1600px] mx-auto"
        >
          {/* En-tête éditorial */}
          <motion.div variants={fade} className="mb-14 sm:mb-16 lg:mb-20">
            <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/30 uppercase mb-4 font-medium">
              Nos engagements
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
              À VOS CÔTÉS.
              <br />
              <span className="font-light italic tracking-[-0.02em]">Toujours.</span>
            </h2>
          </motion.div>

          {/* Grille des garanties */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fade}
                className={`group py-8 sm:py-10 lg:py-0 lg:pr-10 xl:pr-14 ${
                  index > 0 ? 'lg:pl-10 xl:pl-14 lg:border-l lg:border-dark-text/[0.07]' : ''
                } ${index >= 2 ? 'border-t lg:border-t-0 border-dark-text/[0.07]' : ''} ${
                  index === 1 ? 'border-l border-dark-text/[0.07] pl-6 sm:pl-8 lg:pl-10 xl:pl-14' : ''
                } ${index === 3 ? 'border-l border-dark-text/[0.07] pl-6 sm:pl-8 lg:pl-10 xl:pl-14' : ''}`}
              >
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-dark-text tracking-[-0.02em] leading-none mb-2">
                  {item.number}
                </p>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-dark-text/30 uppercase font-medium mb-3 sm:mb-4">
                  {item.title}
                </p>
                <p className="font-sans text-xs sm:text-sm text-dark-text/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
