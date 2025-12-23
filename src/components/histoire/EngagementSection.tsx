import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const engagements = [
  { 
    number: '01',
    title: 'Durabilité', 
    description: "Nos grands-parents gardaient leurs affaires. Nos parents ont commencé à jeter. Nous, on choisit.",
    stat: "10 ans minimum",
    statLabel: "Garanti"
  },
  { 
    number: '02',
    title: 'Traçabilité', 
    description: "Chaque pièce a une origine. Design français. Fabrication coréenne. On te dit tout parce qu'on n'a rien à cacher.",
    stat: "100%",
    statLabel: "Transparent"
  },
  { 
    number: '03',
    title: 'Équité', 
    description: "200 partenaires. Certains depuis le premier jour. On construit des relations, pas des contrats.",
    stat: "200+",
    statLabel: "Partenaires"
  }
];

export default function EngagementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -20% 0px"
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen z-[90] relative bg-dark-text overflow-hidden"
    >
      {/* Fond avec gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-[#252525]" />
      
      {/* Effet radial bronze subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,115,85,0.08)_0%,transparent_60%)]" />
      
      {/* Lignes décoratives */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[25%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[75%] top-0 bottom-0 w-px bg-bronze" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ?
          { opacity: 1, y: 0 } :
          { opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full w-full relative flex flex-col"
      >
        {/* Header */}
        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">07</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">L'Engagement</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[7px] tracking-[0.25em] uppercase">Durabilité</p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="space-y-10 lg:space-y-12">
              
              {/* Citation d'accroche */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="space-y-6"
              >
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-light leading-[1.2]">
                  Avant, on réparait.<br />
                  Aujourd'hui, on jette.<br />
                  <span className="text-bronze">Nous, on répare.</span>
                </h2>
                <p className="font-sans text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                  On construit pour dix ans. On garantit deux ans. On fournit les pièces tant que la monture existe. On ajuste gratuitement. À vie.
                </p>
              </motion.div>

              {/* Les 3 engagements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12">
                {engagements.map((engagement, index) => (
                  <motion.div
                    key={engagement.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
                    className="group"
                  >
                    <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:bg-white/[0.05] hover:border-bronze/30 transition-all duration-500 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-display text-bronze/60 text-2xl md:text-3xl font-light group-hover:text-bronze transition-colors duration-500">
                          {engagement.number}
                        </span>
                        <div className="w-8 h-px bg-bronze/20 group-hover:w-12 group-hover:bg-bronze/40 transition-all duration-500" />
                      </div>
                      <h3 className="font-display text-white text-xl md:text-2xl font-light mb-3 tracking-wide">
                        {engagement.title}
                      </h3>
                      <p className="font-sans text-white/60 text-sm md:text-base font-light leading-[1.7] mb-6 flex-1">
                        {engagement.description}
                      </p>
                      <div className="border-t border-white/10 pt-4 mt-auto">
                        <p className="font-display text-bronze text-2xl md:text-3xl font-light">{engagement.stat}</p>
                        <p className="font-sans text-white/40 text-xs tracking-wider uppercase mt-1">{engagement.statLabel}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Citation finale */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="border-l-2 border-bronze/50 pl-8 py-4 mt-12"
              >
                <p className="font-display text-2xl md:text-3xl text-white font-light leading-[1.4]">
                  Ce qu'on vend, on l'assume.<br />
                  <span className="text-white/60">Aujourd'hui. Dans dix ans. Quand tu le transmettras.</span>
                </p>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pb-8 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-white text-base md:text-lg font-light">07</span>
                <span className="font-sans text-white/30 text-xs">/</span>
                <span className="font-sans text-white/40 text-xs">07</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 border border-bronze/50 rotate-45" />
                <span className="font-sans text-white/30 text-[6px] tracking-[0.4em] uppercase mt-2">Fin</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}