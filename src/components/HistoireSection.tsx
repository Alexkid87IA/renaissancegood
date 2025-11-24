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
      className="h-screen sticky top-0 z-40"
      id="histoire"
    >
      <div className="relative h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761872989/e511daa2-38fc-4de3-ba0f-988711676573_dhuo3m.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-dark-text/70 via-dark-text/60 to-dark-text/75" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-8 py-20">
          <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-20">
            <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              UN MOT OUBLIÉ.
            </h3>
            <h3 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              UN MOT TROP GRAND.
            </h3>
          </div>
          <Link to="/histoire">
            <button className="border-2 border-white/40 bg-dark-text/20 backdrop-blur-sm text-white px-8 sm:px-10 md:px-12 laptop:px-14 py-4 sm:py-5 laptop:py-6 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text hover:border-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              DÉCOUVRIR NOTRE HISTOIRE
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
