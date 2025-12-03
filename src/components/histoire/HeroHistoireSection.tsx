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

        <div className="relative z-10 pt-8 md:pt-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">01</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-xs font-medium tracking-[0.3em] uppercase">Manifeste</span>
            </div>

            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">Paris • 2019 • Les 3</p>
              <p className="font-mono text-white/20 text-[9px] tracking-wider mt-1">48°51'24"N 2°21'04"E</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="max-w-6xl mx-auto w-full text-center space-y-12 md:space-y-16">

            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-[-0.02em] leading-[0.9]"
              >
                UN MOT<br />OUBLIÉ.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl mx-auto space-y-4"
              >
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-light text-white/70 leading-[1.4]">
                  Un mot trop grand pour ceux qui n'ont rien à dire.
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-light text-bronze leading-[1.4]">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-3xl md:text-4xl font-bold">2019</p>
                  <p className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase">Fondation</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-3xl md:text-4xl font-bold">3</p>
                  <p className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase">Fondateurs</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-3xl md:text-4xl font-bold">5</p>
                  <p className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase">Symboles</p>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-bronze text-3xl md:text-4xl font-bold">300</p>
                  <p className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase">Pièces max</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8"
            >
              <div className="inline-flex items-center gap-4 px-8 py-4 border border-bronze/30 bg-white/[0.02]">
                <div className="w-2 h-2 bg-bronze rotate-45" />
                <p className="font-sans text-white/60 text-sm md:text-base leading-[1.7] italic">
                  Renaissance n'est pas fait pour crier.<br className="hidden md:block" />
                  C'est fait pour être reconnu par ceux qui savent.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center gap-6"
            >
              <div className="h-px w-16 bg-bronze/30" />
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
                <p className="font-display text-3xl md:text-4xl text-white font-bold tracking-tight">
                  Renaissance.
                </p>
              </div>
              <div className="h-px w-16 bg-bronze/30" />
            </motion.div>

          </div>
        </div>

        <div className="relative z-10 pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-white text-xl md:text-2xl font-light">01</span>
                <span className="font-sans text-white/30 text-sm">/</span>
                <span className="font-sans text-white/40 text-sm">09</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>

              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[9px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
