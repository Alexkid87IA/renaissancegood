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
      className="min-h-screen lg:sticky lg:top-0 z-[90] bg-beige overflow-hidden relative"
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
        <div className="relative z-10 pt-24 md:pt-28 lg:pt-32 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-bronze text-[0.65rem] font-bold tracking-[0.4em] uppercase">09</span>
              <div className="w-5 h-px bg-bronze/30" />
              <span className="font-sans text-dark-text/40 text-[0.55rem] font-medium tracking-[0.3em] uppercase">L'Engagement</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-dark-text/30 text-[7px] tracking-[0.25em] uppercase">Responsabilité</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-[1300px] mx-auto w-full">
            <div className="space-y-12 lg:space-y-16">
              <div className="space-y-6">
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl text-dark-text font-light leading-[1.5]">
                  Une paire qu'on jette après deux ans, ce n'est pas une paire. C'est un déchet.
                </p>

                <p className="font-sans text-xl md:text-2xl lg:text-3xl text-dark-text/80 font-light leading-[1.5]">
                  Nous, on construit pour 10 ans minimum. On garantit 2 ans. On fournit les pièces tant que la monture existe. On ajuste gratuitement, à vie.
                </p>

                <p className="font-sans text-xl md:text-2xl lg:text-3xl text-dark-text/80 font-light leading-[1.5]">
                  L'engagement, c'est pas un mot. C'est un service après-vente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-12">
                {engagements.map((engagement) => (
                  <div
                    key={engagement.title}
                    className="border-2 border-bronze/30 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 hover:border-bronze/50 transition-all duration-500"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
                      <h3 className="font-sans text-dark-text text-xs tracking-[0.25em] uppercase font-bold">
                        {engagement.title}
                      </h3>
                    </div>
                    <p className="font-sans text-dark-text/70 text-sm font-light leading-[1.7]">
                      {engagement.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-bronze/40 pl-8 py-4">
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl text-dark-text font-light leading-[1.4]">
                  Ce qu'on vend, on l'assume. Pas un an. Pas deux. Aussi longtemps qu'il le faut.
                </p>
              </div>

              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-4">
                  <div className="w-2 h-2 bg-bronze rotate-45" />
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl text-dark-text font-bold tracking-tight">
                    Renaissance.
                  </p>
                  <div className="w-2 h-2 bg-bronze rotate-45" />
                </div>
                <p className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase mt-3">
                  Paris • 2019-2025
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-6 px-6 md:px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto border-t border-dark-text/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-dark-text text-base md:text-lg font-light">09</span>
                <span className="font-sans text-dark-text/30 text-xs">/</span>
                <span className="font-sans text-dark-text/40 text-xs">09</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-dark-text/30 text-[6px] tracking-[0.4em] uppercase">Fin</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-dark-text/20 text-[6px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}