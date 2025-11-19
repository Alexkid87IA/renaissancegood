import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FondateursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen sticky top-0 z-20 bg-dark-text"
    >
      <div className="h-full flex flex-col items-center justify-center text-center px-8 py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.1]">
              Renaissance est née d'un refus.
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="font-sans text-white/90 text-lg md:text-xl leading-[1.8] font-light">
              Refus de voir le luxe devenir une industrie où tout finit par se ressembler.
            </p>
            <p className="font-sans text-white/90 text-lg md:text-xl leading-[1.8] font-light">
              Refus que le geste artisanal disparaisse.
            </p>
            <p className="font-sans text-white/90 text-lg md:text-xl leading-[1.8] font-light">
              Refus de l'uniformité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <p className="font-sans text-white text-lg md:text-xl leading-[1.8] font-light">
              Nous sommes Les 3. Pas trois héritiers. Pas trois diplômés.
              Trois hommes du métier qui ont vu de l'intérieur l'industrie se dégrader.
              Et qui ont décidé de faire autrement.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
