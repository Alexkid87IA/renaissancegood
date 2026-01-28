import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

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

export default function FabricationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

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
      className="min-h-[85vh] laptop:h-screen relative sticky top-0 z-[90]"
      id="fabrication"
    >
      <div className="relative min-h-[85vh] laptop:h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src="https://renaissance-cdn.b-cdn.net/FABRICATION-VIDEO.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/40" />

        <div className="relative min-h-[85vh] laptop:h-full flex items-center px-6 md:px-12 lg:px-20 xl:px-28 py-16 laptop:py-0">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="max-w-xl"
          >

            {/* Label */}
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Fabrication
            </motion.p>

            {/* Title */}
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl md:text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              NOTRE
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl sm:text-2xl md:text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
              Fabrication.
            </motion.p>

            {/* Line */}
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 md:mb-10" />

            {/* Description */}
            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10 xl:mb-14 max-w-md">
              Une paire de Renaissance, c'est 250 étapes. Des mains françaises pour la vision. Des mains coréennes pour la précision. Deux pays. Un seul standard : celui qui dure.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fade} className="flex items-start gap-0 mb-10 xl:mb-14">
              <div className="pr-6 md:pr-8">
                <p className="font-display text-2xl md:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-none mb-2">8-12</p>
                <p className="font-sans text-white/40 text-[8px] tracking-[0.25em] uppercase font-medium">Artisans par paire</p>
              </div>
              <div className="border-l border-white/10 pl-6 md:pl-8 pr-6 md:pr-8">
                <p className="font-display text-2xl md:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-none mb-2">250</p>
                <p className="font-sans text-white/40 text-[8px] tracking-[0.25em] uppercase font-medium">Étapes</p>
              </div>
              <div className="border-l border-white/10 pl-6 md:pl-8 pr-6 md:pr-8">
                <p className="font-display text-2xl md:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-none mb-2">8-15h</p>
                <p className="font-sans text-white/40 text-[8px] tracking-[0.25em] uppercase font-medium">De travail</p>
              </div>
              <div className="border-l border-white/10 pl-6 md:pl-8">
                <p className="font-display text-2xl md:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-none mb-2">2</p>
                <p className="font-sans text-white/40 text-[8px] tracking-[0.25em] uppercase font-medium">Pays</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fade}>
              <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Voir le processus
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
