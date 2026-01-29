import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stagger, fade } from './shared';

export default function CollectionIsis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="min-h-screen lg:h-screen relative sticky top-0 z-40"
    >
      {/* DESKTOP */}
      <div className="h-full bg-beige hidden md:flex flex-row">

        {/* TEXT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-20 xl:p-28">
          <motion.div
            ref={textRef}
            variants={stagger}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="max-w-lg"
          >

            {/* Label */}
            <motion.p variants={fade} className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Collection
            </motion.p>

            {/* Title */}
            <motion.h3 variants={fade} className="font-display text-4xl md:text-5xl laptop:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.03em] leading-[0.9] mb-3">
              ISIS
            </motion.h3>
            <motion.p variants={fade} className="font-display text-2xl md:text-3xl laptop:text-[2rem] xl:text-4xl font-light italic text-dark-text/70 tracking-[-0.02em] leading-[1] mb-8">
              Le Cobra. Le Scarabée. L'Œil.
            </motion.p>

            {/* Status badge */}
            <motion.div variants={fade} className="mb-8">
              <span className="inline-block border border-dark-text/15 text-dark-text/40 text-[8px] px-4 py-1.5 tracking-[0.3em] font-medium uppercase">
                Bientôt Disponible
              </span>
            </motion.div>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-dark-text/15 mb-8" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-dark-text/50 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14">
              Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout. Ce qui traverse 5 000 ans ne se porte pas par hasard.
            </motion.p>

            {/* CTA - disabled */}
            <motion.div variants={fade}>
              <button className="border border-dark-text/15 px-10 py-4 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/30 cursor-not-allowed">
                BIENTÔT DISPONIBLE
              </button>
            </motion.div>

          </motion.div>
        </div>

        {/* IMAGE SIDE */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <img
            src="https://renaissance-cdn.b-cdn.net/collection%20isis%20comming%20soon.png"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover grayscale-[30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden relative h-screen bg-[#000000] overflow-hidden">
        {/* Image — remontée */}
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/collection%20isis%20comming%20soon.png"
            alt="Collection Isis"
            className="w-full h-full object-cover object-[center_35%] grayscale-[30%] opacity-80"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent to-[#000000]" />
        </div>

        {/* Content — bas */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="font-sans text-white/50 text-[8px] tracking-[0.4em] font-medium uppercase mb-3">
            Collection
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[0.9] text-white mb-1">
            ISIS
          </h3>
          <p className="font-display text-lg font-light italic text-white/50 tracking-[-0.02em] mb-3">
            Le Cobra. Le Scarabée. L'Œil.
          </p>
          <div className="w-full border border-white/20 px-6 py-4 flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white/50">
              Bientôt Disponible
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
