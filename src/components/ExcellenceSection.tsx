import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  {
    number: '01',
    title: 'Héritage Historique',
    description: 'Inspirées des symboles de la royauté française, nos collections célèbrent l\'excellence d\'un patrimoine unique.'
  },
  {
    number: '02',
    title: 'Savoir-Faire Franco-Coréen',
    description: 'L\'alliance du design parisien et de la précision coréenne pour une qualité d\'exécution irréprochable.'
  },
  {
    number: '03',
    title: 'Matériaux d\'Exception',
    description: 'Acétate Mazzucchelli, acier inoxydable haut grade et finitions premium pour des lunettes qui traversent le temps.'
  },
  {
    number: '04',
    title: 'Engagement Durable',
    description: 'Contre la fast fashion, nous créons des pièces pensées pour durer, avec transparence et responsabilité.'
  }
];

export default function ExcellenceSection() {
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
      className="min-h-screen laptop:h-screen sticky top-0 z-20 bg-white"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-beige/5 to-beige/10" />

        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute left-[25%] top-0 bottom-0 w-px bg-dark-text" />
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-dark-text" />
          <div className="absolute left-[75%] top-0 bottom-0 w-px bg-dark-text" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-20">
          <div className="max-w-[1600px] w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 md:mb-20 lg:mb-24"
            >
              <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                L'Excellence Renaissance
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-6">
                QUATRE PILIERS.
              </h2>
              <p className="font-sans text-dark-text/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Renaissance ne fabrique pas de simples lunettes. Nous créons des symboles
                d'une vision française du luxe, ancrée dans l'histoire et tournée vers l'avenir.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-12">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-beige/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative p-10 md:p-12 lg:p-14 flex flex-col h-full border-r border-dark-text/5 last:border-r-0">
                    <div className="mb-8">
                      <div className="font-display text-7xl md:text-8xl text-bronze/10 mb-6 leading-none group-hover:text-bronze/20 transition-colors duration-700">
                        {pillar.number}
                      </div>
                      <div className="w-12 h-px bg-bronze/30 mb-6 group-hover:w-24 transition-all duration-700" />
                      <h3 className="font-sans text-dark-text text-[11px] tracking-[0.25em] uppercase font-bold mb-4 leading-tight">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="font-sans text-dark-text/60 text-sm leading-[1.8] font-light">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-bronze rotate-45" />
                <p className="font-sans text-dark-text/40 text-xs tracking-[0.3em] uppercase">
                  Renaissance Paris
                </p>
                <div className="w-2 h-2 bg-bronze rotate-45" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
