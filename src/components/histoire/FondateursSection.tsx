import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FondateursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:h-screen lg:sticky lg:top-0 z-20 bg-beige overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
      </div>

      <div className="relative h-full flex flex-col">

        <div className="pt-6 md:pt-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">02</span>
              <div className="h-px flex-1 max-w-[60px] bg-bronze/20" />
              <span className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase">L'Origine</span>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 flex items-center py-8 md:py-12 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1400px] mx-auto w-full">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <p className="font-sans text-lg md:text-xl lg:text-2xl text-dark-text font-light leading-[1.7] md:leading-[1.8]">
                  Renaissance est née d'un refus.<br/>
                  Refus que tout se ressemble.<br/>
                  Refus que le travail bien fait disparaisse.<br/>
                  Refus de regarder ailleurs.<br/>
                  <span className="block mt-6 md:mt-8">
                    Nous sommes Les 3. Pas des héritiers. Pas des diplômés. Des gens du métier. On a vu. On a refusé. On a construit.
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dafo6bvhc/image/upload/v1764957807/16982509-bf2b-4ba3-8129-e65f2a9e17bb_fkmk4i.jpg"
                    alt="Les fondateurs de Renaissance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-bronze/20" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        <div className="pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-10 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] uppercase">Défiler</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
