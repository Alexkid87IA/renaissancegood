import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroHistoireSection() {
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
      className="h-screen sticky top-0 z-10"
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
            src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761857994/6054c53a-a148-4ac5-a522-5039a5bcc4d3_bmoqoe.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-dark-text/50 via-dark-text/65 to-dark-text/80" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-20"
          >
            <div className="space-y-10 max-w-5xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.1]">
                Un mot oublié.
              </h1>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.1]">
                Un mot trop grand pour ceux qui n'ont rien à dire.
              </h1>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl laptop:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.1]">
                Mais parfait pour ceux qui ont quelque chose à restaurer.
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="h-px w-32 bg-white/40 mx-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <p className="font-sans text-white/90 text-base md:text-lg laptop:text-lg xl:text-xl leading-[1.8] font-light">
                Nous avons créé Renaissance en 2019 pour redonner vie à ce qui avait été négligé.
                Pas en imitant le passé. Mais en l'honorant. En remettant au goût du jour des formes délaissées,
                des modèles que l'époque jugeait "paresseux" — trop classiques, trop exigeants, trop silencieux.
              </p>
              <p className="font-sans text-white text-base md:text-lg laptop:text-lg xl:text-xl leading-[1.8] font-light italic">
                Tu ne portes pas juste une paire de lunettes. Tu portes une correction. Un regard sur l'oubli.
              </p>
              <p className="font-display text-2xl md:text-3xl laptop:text-3xl xl:text-4xl text-white font-bold tracking-wide mt-8">
                Renaissance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <div className="inline-block border-b border-white/20 pb-2">
                <p className="font-sans text-white/60 text-xs tracking-[0.4em] uppercase font-light">
                  Scroll pour découvrir notre histoire
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
