import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

export default function CollectionIsis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.3]);

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
            src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover grayscale-[30%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/15 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* MOBILE */}
      <div className="min-h-[82vh] bg-beige md:hidden relative overflow-hidden">
        <div className="relative h-full flex flex-col px-6 pt-14 pb-6">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/30 text-[8px] tracking-[0.4em] font-medium uppercase mb-5 flex-shrink-0"
          >
            Collection Isis
          </motion.p>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-2"
          >
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] leading-[0.9] text-dark-text">
              ISIS
            </h3>
            <p className="font-display text-xl font-light italic text-dark-text/60 tracking-[-0.02em] mt-1">
              Le Cobra. Le Scarabée. L'Œil.
            </p>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-3"
          >
            <span className="inline-block border border-dark-text/15 text-dark-text/35 text-[7px] px-3 py-1 tracking-[0.3em] font-medium uppercase">
              Bientôt Disponible
            </span>
          </motion.div>

          {/* Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-3 origin-left"
          >
            <div className="w-10 h-px bg-dark-text/15" />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mb-4"
          >
            <div className="relative w-full h-[40vh] overflow-hidden">
              <img
                src="https://26.staticbtf.eno.do/v1/91-default/80de95ed4756e81d2e731b5faff6c051/media.jpg"
                alt="Collection Isis"
                className="w-full h-full object-cover grayscale-[40%] opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-beige/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-dark-text/50 text-xs leading-[1.7] font-light mb-5 flex-shrink-0"
          >
            Le Cobra : la garde. Le Scarabée : la renaissance. L'Œil : celui qui voit tout. Ce qui traverse 5 000 ans ne se porte pas par hasard.
          </motion.p>

          {/* CTA - disabled */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <button
              disabled
              className="w-full border border-dark-text/12 px-6 py-3.5 font-sans text-[8px] tracking-[0.3em] font-medium uppercase text-dark-text/25 cursor-not-allowed bg-beige"
            >
              BIENTÔT DISPONIBLE
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
