import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const narrativeSteps = [
  {
    text: 'Regarde la branche gauche. Un strass. Pas plus gros qu\'une tête d\'épingle.',
    detail: 'Invisible pour les autres. Évident pour toi.'
  },
  {
    text: 'Approche-toi. Des gravures apparaissent. Tu ne les avais jamais vues.',
    detail: 'Les symboles sacrés, cachés dans le métal.'
  },
  {
    text: 'Retourne la pièce. Un numéro. Le tien. Le seul.',
    detail: 'Édition limitée. Jamais reproduite.'
  },
  {
    text: 'Ce n\'est pas une lunette. C\'est un secret que tu portes sur le visage.',
    detail: 'Le luxe silencieux. La signature Renaissance.'
  }
];

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:sticky lg:top-0 z-[70] bg-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ?
          { opacity: 1, y: 0 } :
          { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full w-full relative flex flex-col"
      >
        {/* Fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/30 to-white" />
        
        {/* Lignes décoratives subtiles */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        {/* Élément décoratif coin */}
        <div className="absolute top-20 right-12 hidden lg:block">
          <div className="w-24 h-24 border border-bronze/10 rotate-45" />
          <div className="absolute top-4 left-4 w-16 h-16 border border-bronze/20 rotate-45" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">06</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">Le Secret</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[7px] tracking-[0.25em] uppercase">La Signature</p>
            </div>
          </div>
        </div>

        {/* Titre principal */}
        <div className="relative z-10 px-6 md:px-8 lg:px-12 mt-8 md:mt-12">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mb-12 md:mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-dark-text font-light leading-[1.2] mb-4">
                Le luxe qui ne crie pas.
              </h2>
              <p className="font-sans text-dark-text/60 text-lg md:text-xl max-w-2xl">
                Pas de logo visible. Pas de monogramme. Juste des détails que seul le porteur connaît.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contenu narratif */}
        <div className="relative z-10 flex-1 flex items-start px-6 md:px-8 lg:px-12 py-6">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="space-y-8 lg:space-y-10">
              {narrativeSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.7 }}
                  className="flex items-start gap-6 md:gap-8 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 md:w-14 md:h-14 border border-bronze/30 bg-white flex items-center justify-center group-hover:border-bronze group-hover:bg-bronze/5 transition-all duration-500 shadow-sm">
                      <span className="font-display text-bronze text-lg md:text-xl font-light">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-display text-dark-text text-xl md:text-2xl lg:text-2xl font-light leading-[1.5] mb-2 group-hover:text-dark-text/90 transition-colors duration-500">
                      {step.text}
                    </p>
                    <p className="font-sans text-bronze/80 text-sm md:text-base font-light">
                      {step.detail}
                    </p>
                  </div>
                  <div className="hidden lg:block flex-shrink-0 w-20 h-px bg-gradient-to-r from-bronze/20 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pb-6 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-dark-text text-base md:text-lg font-light">06</span>
                <span className="font-sans text-dark-text/30 text-xs">/</span>
                <span className="font-sans text-dark-text/40 text-xs">07</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[6px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}