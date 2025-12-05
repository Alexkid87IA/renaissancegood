import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const engagements = [
  { title: 'Durabilité', description: "On construit pour durer. Pas pour être jeté après deux saisons." },
  { title: 'Traçabilité', description: "Tu sais d'où viennent tes lunettes. Fabrication, matériaux, tout est transparent." },
  { title: 'Équité', description: "On paie nos partenaires correctement. On respecte nos opticiens." }
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
      className="min-h-screen bg-beige overflow-hidden relative"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dafo6bvhc/image/upload/v1764957680/f366de3a-dd69-467c-8fa2-e6b083e71e3e_xlbj0l.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-white/85" />

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
        <div className="relative z-10 pt-12 md:pt-14 lg:pt-16 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-bronze text-[0.6rem] font-bold tracking-[0.4em] uppercase">09</span>
              <div className="w-4 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[0.5rem] font-medium tracking-[0.3em] uppercase">L'Engagement</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[6px] tracking-[0.25em] uppercase">Responsabilité</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-8 lg:px-12 py-6">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <p className="font-sans text-xl md:text-2xl lg:text-2xl text-dark-text font-light leading-[1.4]">
                  Une paire qu'on jette après deux ans, ce n'est pas une paire. C'est un déchet.
                </p>

                <p className="font-sans text-lg md:text-xl lg:text-xl text-dark-text/80 font-light leading-[1.4]">
                  Nous, on construit pour 10 ans minimum. On garantit 2 ans. On fournit les pièces tant que la monture existe. On ajuste gratuitement, à vie.
                </p>

                <p className="font-sans text-lg md:text-xl lg:text-xl text-dark-text/80 font-light leading-[1.4]">
                  L'engagement, c'est pas un mot. C'est un service après-vente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
                {engagements.map((engagement) => (
                  <div
                    key={engagement.title}
                    className="border border-bronze/30 bg-white/60 backdrop-blur-sm p-4 hover:bg-white/80 hover:border-bronze/50 transition-all duration-500"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-1 h-1 bg-bronze rotate-45" />
                      <h3 className="font-sans text-dark-text text-[0.65rem] tracking-[0.2em] uppercase font-bold">
                        {engagement.title}
                      </h3>
                    </div>
                    <p className="font-sans text-dark-text/70 text-xs font-light leading-[1.6]">
                      {engagement.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-bronze/40 pl-6 py-3">
                <p className="font-sans text-xl md:text-2xl lg:text-2xl text-dark-text font-light leading-[1.3]">
                  Ce qu'on vend, on l'assume. Pas un an. Pas deux. Aussi longtemps qu'il le faut.
                </p>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
                  <p className="font-display text-3xl md:text-4xl lg:text-5xl text-dark-text font-bold tracking-tight">
                    Renaissance.
                  </p>
                  <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
                </div>
                <p className="font-sans text-dark-text/40 text-[0.65rem] tracking-[0.3em] uppercase mt-2">
                  Paris • 2019-2025
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-4 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1400px] mx-auto border-t border-dark-text/10 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-dark-text text-sm md:text-base font-light">09</span>
                <span className="font-sans text-dark-text/30 text-[0.65rem]">/</span>
                <span className="font-sans text-dark-text/40 text-[0.65rem]">09</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-6 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[5px] tracking-[0.4em] uppercase">Fin</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[5px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}