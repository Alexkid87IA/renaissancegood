import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HistoireSection() {
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
      className="h-screen sticky top-0 z-[60] bg-dark-text"
      id="histoire"
    >
      <div className="relative h-full overflow-hidden">
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-8 md:mx-6 py-20">
          <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-20">
            <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9]">
              UN MOT OUBLIÉ.
            </h3>
            <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9]">
              UN MOT TROP GRAND.
            </h3>
          </div>
          <Link to="/histoire">
            <button className="border-2 border-white/40 text-white px-8 sm:px-10 md:px-12 laptop:px-14 py-4 sm:py-5 laptop:py-6 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text hover:border-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              DÉCOUVRIR NOTRE HISTOIRE
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
