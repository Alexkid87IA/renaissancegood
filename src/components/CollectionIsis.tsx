import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Pyramid } from 'lucide-react';

export default function CollectionIsis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-screen sticky top-0 z-50"
    >
      {/* DESKTOP VERSION */}
      <div className="h-full bg-beige hidden md:flex flex-row px-6 md:px-0">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-10 md:p-16 lg:p-20 laptop:p-20 md:ml-6">
          <div className="max-w-2xl">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl laptop:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-4 sm:mb-6">
                COLLECTION<br />ISIS
              </h3>
              <span className="inline-block bg-dark-text/5 border border-dark-text/15 text-dark-text/50 text-[8px] sm:text-[9px] px-4 sm:px-5 py-2 sm:py-2.5 tracking-[0.25em] font-bold uppercase">
                En Développement
              </span>
            </div>
            <div className="inline-block mb-8 sm:mb-12">
              <p className="font-sans text-bronze text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
                Ankh • Scarabée • Cobra
              </p>
              <div className="h-px bg-bronze/20 mt-3" />
            </div>
            <p className="font-sans text-dark-text/70 text-base sm:text-lg md:text-xl laptop:text-xl xl:text-2xl leading-[1.75] mb-8 sm:mb-12 laptop:mb-14 xl:mb-16 font-light">
              Une fusion audacieuse entre l'héritage égyptien millénaire et l'excellence
              du design français. Des symboles sacrés réinterprétés avec modernité.
            </p>
            <button className="border-2 border-dark-text/25 px-8 sm:px-10 laptop:px-12 py-3.5 sm:py-4 laptop:py-5 font-sans text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-dark-text/30 cursor-not-allowed">
              BIENTÔT DISPONIBLE
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full md:mr-6">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
            alt="Collection Isis - Egyptian inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* MOBILE VERSION - MYSTERIOUS COMING SOON DESIGN */}
      <div ref={contentRef} className="h-full bg-beige md:hidden relative overflow-hidden">
        {/* Animated Background with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
              alt="Collection Isis - Egyptian inspiration"
              className="w-full h-full object-cover opacity-20 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/90 via-beige/95 to-beige"></div>
          </div>
        </motion.div>

        {/* Mystical Floating Elements */}
        <motion.div
          animate={isInView ? {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-36 right-12 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={isInView ? {
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.18, 0.08]
          } : {}}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-44 left-10 w-36 h-36 bg-orange-300/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-24 pb-8">

          {/* Top - Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 space-y-4"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100/40 to-orange-100/30 backdrop-blur-xl border-2 border-amber-300/40 rounded-full px-4 py-2.5 shadow-xl">
              <Clock className="w-3.5 h-3.5 text-amber-700" strokeWidth={2.5} />
              <span className="text-amber-800 text-[9px] tracking-[0.3em] uppercase font-bold">
                En Développement
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-dark-text/5 backdrop-blur-sm border border-dark-text/10 rounded-full px-4 py-2 shadow-sm">
              <Pyramid className="w-3 h-3 text-amber-600" strokeWidth={2.5} />
              <span className="text-dark-text/60 text-[8px] tracking-[0.3em] uppercase font-bold">
                Ankh • Scarabée • Cobra
              </span>
            </div>
          </motion.div>

          {/* Center - Title and Description */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-display text-[3.5rem] leading-[0.9] font-bold tracking-[-0.03em] text-dark-text mb-4">
                COLLECTION<br/>
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  ISIS
                </span>
              </h3>

              <motion.div
                className="w-24 h-[3px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 rounded-full mb-6 shadow-lg shadow-amber-400/50"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-dark-text/70 text-base leading-[1.75] font-light max-w-md"
            >
              Une <span className="text-dark-text font-medium">fusion audacieuse</span> entre
              l'héritage égyptien millénaire et l'excellence du design français.
              Des symboles sacrés réinterprétés avec modernité.
            </motion.p>

            {/* Coming Soon Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              <div className="bg-amber-50/60 border border-amber-200/40 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-700/80 text-[10px] font-sans font-medium">
                  Designs uniques
                </p>
              </div>
              <div className="bg-amber-50/60 border border-amber-200/40 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-700/80 text-[10px] font-sans font-medium">
                  Symboles égyptiens
                </p>
              </div>
              <div className="bg-amber-50/60 border border-amber-200/40 rounded-full px-3.5 py-1.5 shadow-sm">
                <p className="text-amber-700/80 text-[10px] font-sans font-medium">
                  Édition 2025
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom - Preview Card and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-shrink-0 space-y-5"
          >
            {/* Teaser Preview Card */}
            <motion.div
              className="relative group"
            >
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100/40 to-orange-50/30 shadow-2xl shadow-amber-900/10 border-2 border-amber-200/30">
                {/* Mystical Glow */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-amber-300/20 via-transparent to-orange-300/20"
                />

                <img
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80"
                  alt="Collection Isis Preview"
                  className="w-full h-full object-cover opacity-40 blur-[2px] scale-110"
                />

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-center space-y-3"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Pyramid className="w-12 h-12 text-amber-600/60 mx-auto" strokeWidth={1.5} />
                    </motion.div>
                    <p className="text-dark-text/50 text-sm font-sans tracking-[0.3em] uppercase font-bold">
                      Coming<br/>2025
                    </p>
                  </motion.div>
                </div>

                {/* Animated Border Pulse */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 border-2 border-amber-400/40 rounded-2xl"
                />
              </div>

              {/* Status Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full px-4 py-2 shadow-2xl shadow-amber-900/30 border-2 border-amber-300"
              >
                <p className="text-xs font-bold">Bientôt</p>
              </motion.div>
            </motion.div>

            {/* Disabled CTA Button */}
            <motion.button
              disabled
              className="w-full bg-gradient-to-r from-dark-text/20 to-dark-text/15 text-dark-text/40 px-8 py-5 font-sans text-[10px] tracking-[0.25em] uppercase font-bold
                         rounded-xl shadow-lg border-2 border-dark-text/10
                         flex items-center justify-center gap-3 cursor-not-allowed"
            >
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              <span>Collection à venir</span>
            </motion.button>

            {/* Newsletter Teaser */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center text-dark-text/50 text-xs font-sans leading-relaxed"
            >
              Inscrivez-vous à notre newsletter pour être informé du lancement
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
