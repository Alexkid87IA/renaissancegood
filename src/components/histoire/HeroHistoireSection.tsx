import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HeroHistoireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:sticky lg:top-0 z-10 bg-dark-text overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ willChange: 'opacity, transform' }}
        className="min-h-screen relative flex flex-col"
      >
        <div className="absolute inset-0 bg-dark-text" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,115,85,0.08)_0%,transparent_70%)]" />

        <div className="absolute inset-0 opacity-[0.02] hidden lg:block">
          <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
          <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
        </div>

        <div className="relative z-10 pt-6 md:pt-9 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.7rem] font-bold tracking-[0.4em] uppercase">01</span>
              <div className="w-6 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[0.6rem] font-medium tracking-[0.3em] uppercase">Manifeste</span>
            </div>

            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[8px] tracking-[0.25em] uppercase">Paris • 2019 • Les 3</p>
              <p className="font-mono text-white/20 text-[7px] tracking-wider mt-1">48°51'24"N 2°21'04"E</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="max-w-6xl mx-auto w-full text-center space-y-9 md:space-y-12">

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-[3.2rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[6.4rem] font-bold text-white tracking-[-0.02em] leading-[0.9]"
              >
                UN MOT<br />OUBLIÉ.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl mx-auto space-y-3"
              >
                <p className="font-sans text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-light text-white/70 leading-[1.4]">
                  Un mot trop grand pour ceux qui n'ont rien à dire.
                </p>
                <p className="font-sans text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-light text-bronze leading-[1.4]">
                  Mais parfait pour ceux qui ont quelque chose à restaurer.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-9">
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-[1.5rem] md:text-[1.8rem] font-bold">2019</p>
                  <p className="font-sans text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">Fondation</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-[1.5rem] md:text-[1.8rem] font-bold">3</p>
                  <p className="font-sans text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">Fondateurs</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-[1.5rem] md:text-[1.8rem] font-bold">5</p>
                  <p className="font-sans text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">Symboles</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-[1.5rem] md:text-[1.8rem] font-bold">300</p>
                  <p className="font-sans text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">Pièces max</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-6"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-bronze/30 bg-white/[0.02]">
                <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
                <p className="font-sans text-white/60 text-[0.7rem] md:text-[0.8rem] leading-[1.7] italic">
                  Renaissance n'est pas fait pour crier.<br className="hidden md:block" />
                  C'est fait pour être reconnu par ceux qui savent.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center gap-5"
            >
              <div className="h-px w-12 bg-bronze/30" />
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 bg-bronze rotate-45" />
                <p className="font-display text-[1.5rem] md:text-[1.8rem] text-white font-bold tracking-tight">
                  Renaissance.
                </p>
              </div>
              <div className="h-px w-12 bg-bronze/30" />
            </motion.div>

          </div>
        </div>

        <div className="relative z-10 pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-sans text-white text-[1rem] md:text-[1.2rem] font-light">01</span>
                <span className="font-sans text-white/30 text-[0.7rem]">/</span>
                <span className="font-sans text-white/40 text-[0.7rem]">09</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-9 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[7px] tracking-[0.4em] uppercase">Défiler</span>
              </div>

              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[7px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
