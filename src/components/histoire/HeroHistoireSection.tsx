import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { stagger, fade } from './shared';

export default function HeroHistoireSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

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
      className="h-screen relative lg:sticky top-0 lg:z-10"
    >
      {/* DESKTOP */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <img
          src="https://renaissance-cdn.b-cdn.net/PHOTO%20CAMPAGNE%20TRIDENT.png"
          alt="Renaissance Paris - Notre Histoire"
          className="absolute inset-0 w-full h-full object-cover object-center"
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

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light mb-10">
              Un mot trop grand pour ceux qui n'ont rien à dire. Mais parfait pour ceux qui ont quelque chose à restaurer.
            </motion.p>

            <motion.div variants={fade}>
              <Link to="/shop">
                <button className="group relative overflow-hidden border border-white/20 px-10 py-4 transition-all duration-500 hover:border-bronze/60">
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/80 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    Découvrir nos créations
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </motion.div>
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
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        <div className="relative h-full flex flex-col justify-between pt-24 pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <p className="text-white/90 text-[9px] tracking-[0.3em] uppercase font-sans font-bold mb-2">
              NOTRE HISTOIRE
            </p>
            <div className="w-12 h-px bg-white/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 flex flex-col justify-center max-w-sm"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex-shrink-0 space-y-3"
          >
            <Link to="/shop" className="block">
              <button className="w-full bg-white text-dark-text px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/95 transition-all duration-300 active:scale-[0.98]">
                Découvrir nos créations
              </button>
            </Link>

            <Link to="/store-locator" className="block">
              <button className="w-full border-2 border-white/80 text-white px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-[0.98]">
                Trouver un opticien
              </button>
            </Link>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center pt-4"
            >
              <ChevronDown className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
