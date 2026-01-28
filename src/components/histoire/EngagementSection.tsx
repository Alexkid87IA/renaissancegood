import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { stagger, fade } from './shared';

const engagements = [
  {
    title: 'Durabilité',
    description: "Nos grands-parents gardaient leurs affaires. Nos parents ont commencé à jeter. Nous, on choisit.",
    stat: "10 ans",
    statLabel: "Minimum garanti"
  },
  {
    title: 'Traçabilité',
    description: "Chaque pièce a une origine. Design français. Fabrication coréenne. On te dit tout parce qu'on n'a rien à cacher.",
    stat: "100%",
    statLabel: "Transparent"
  },
  {
    title: 'Équité',
    description: "200 partenaires. Certains depuis le premier jour. On construit des relations, pas des contrats.",
    stat: "200+",
    statLabel: "Partenaires"
  }
];

export default function EngagementSection() {
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
      className="min-h-screen relative z-[70] bg-[#0a0a0a] overflow-hidden"
    >
      <div className="min-h-screen flex items-center justify-center px-6 md:px-16 py-20 md:py-0">
        <motion.div
          ref={contentRef}
          variants={stagger}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="max-w-[1600px] w-full"
        >
          {/* Centered header */}
          <div className="text-center mb-14 lg:mb-20">
            <motion.p variants={fade} className="font-sans text-white/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
              Notre Engagement
            </motion.p>

            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl md:text-5xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              AVANT, ON RÉPARAIT.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-xl sm:text-2xl md:text-3xl laptop:text-4xl xl:text-5xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 md:mb-10">
              Nous, on répare.
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8 md:mb-10" />

            <motion.p variants={fade} className="font-sans text-white/40 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light max-w-lg mx-auto mb-14">
              On construit pour dix ans. On garantit deux ans. On fournit les pièces tant que la monture existe. On ajuste gratuitement. À vie.
            </motion.p>
          </div>

          {/* 3 Engagements - ReassuranceSection grid pattern */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-14 lg:mb-20">
            {engagements.map((e, index) => (
              <motion.div
                key={e.title}
                variants={fade}
                className={`py-8 md:py-0 md:pr-10 xl:pr-14 ${
                  index > 0 ? 'md:pl-10 xl:pl-14 md:border-l md:border-white/[0.07]' : ''
                } ${index > 0 ? 'border-t md:border-t-0 border-white/[0.07]' : ''}`}
              >
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white tracking-[-0.02em] leading-none mb-2">
                  {e.stat}
                </p>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-white/30 uppercase font-medium mb-3 sm:mb-4">
                  {e.statLabel}
                </p>
                <h3 className="font-display text-lg md:text-xl text-white font-bold mb-3 tracking-wide leading-tight">
                  {e.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed">
                  {e.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fade} className="text-center">
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
    </motion.section>
  );
}
