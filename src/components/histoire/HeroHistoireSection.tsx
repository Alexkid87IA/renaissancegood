import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { stagger, fade } from './shared';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function HeroHistoireSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const { isMobile } = useDeviceType();

  return (
    <motion.section
      className="h-screen relative z-10"
    >
      {/* DESKTOP */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <img
          src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
          alt="Renaissance Paris - Notre Histoire"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute left-8 bottom-8 max-w-xl">
          <motion.div
            ref={contentRef}
            variants={stagger}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Notre Histoire
            </motion.p>

            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.95]">
              UN MOT OUBLIÉ.
              <br />
              <span className="font-light italic">Parfait pour restaurer.</span>
            </motion.h1>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light">
              Un mot trop grand pour ceux qui n'ont rien à dire. Mais parfait pour ceux qui ont quelque chose à restaurer.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <div className="absolute inset-0">
          <img
            src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
            alt="Renaissance Paris - Notre Histoire"
            className="w-full h-full object-cover object-[center_30%]"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        <div className="relative h-full flex flex-col justify-end pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-sm mb-6"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]">
              Un mot oublié.
              <br />
              <span className="font-light italic">Parfait pour restaurer.</span>
            </h1>
            <p className="text-white/80 text-sm font-sans leading-relaxed mb-8">
              Un mot trop grand pour ceux qui n'ont rien à dire. Mais parfait pour ceux qui ont quelque chose à restaurer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <ChevronDown className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
