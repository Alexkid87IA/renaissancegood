import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const narrativeSteps = [
  'Regarde la branche gauche. Un strass. Pas plus gros qu\'une tête d\'épingle.',
  'Approche-toi. Des gravures apparaissent. Tu ne les avais jamais vues.',
  'Retourne la pièce. Un numéro. Le tien. Le seul.',
  'Ce n\'est pas une lunette. C\'est un secret que tu portes sur le visage.'
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
      className="min-h-screen lg:sticky lg:top-0 z-[70] bg-dark-text overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-dark-text/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">07</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">Le Secret</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[7px] tracking-[0.25em] uppercase">La Signature</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="space-y-10 lg:space-y-14">
              {narrativeSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
                  className="flex items-start gap-6 md:gap-8 group"
                >
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-bronze/40 flex items-center justify-center group-hover:border-bronze group-hover:bg-bronze/10 transition-all duration-500">
                      <span className="font-sans text-bronze text-base md:text-lg font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="font-sans text-white text-xl md:text-2xl lg:text-3xl font-light leading-[1.5] group-hover:text-white/90 transition-colors duration-500">
                      {step}
                    </p>
                  </div>
                  <div className="hidden lg:block flex-shrink-0 w-16 h-px bg-gradient-to-r from-bronze/30 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-white text-base md:text-lg font-light">07</span>
                <span className="font-sans text-white/30 text-xs">/</span>
                <span className="font-sans text-white/40 text-xs">09</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[6px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}