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

        <div className="absolute inset-0 bg-dark-text/50" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-20">
          <div className="space-y-6 mb-20">
            <h3 className="font-display text-5xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9]">
              UN MOT OUBLIÉ.
            </h3>
            <h3 className="font-display text-5xl md:text-7xl lg:text-8xl laptop:text-8xl xl:text-[9rem] font-bold text-white tracking-[-0.04em] leading-[0.9]">
              UN MOT TROP GRAND.
            </h3>
          </div>
          <Link to="/histoire">
            <button className="border-2 border-white/30 text-white px-12 laptop:px-14 py-5 laptop:py-6 font-sans text-[10px] tracking-[0.25em] font-bold hover:bg-white hover:text-dark-text hover:border-white transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              DÉCOUVRIR NOTRE HISTOIRE
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
