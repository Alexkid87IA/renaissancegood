import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SignatureSection() {
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
      className="min-h-screen sticky top-0 z-[70] bg-beige"
    >
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl laptop:text-5xl xl:text-6xl font-bold text-dark-text mb-6 tracking-[-0.03em] leading-[1.1]">
              La Signature
            </h2>
            <p className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-8">
              Le Détail Qui Parle
            </p>

            <div className="space-y-6 mb-8">
              <p className="font-sans text-dark-text text-lg md:text-xl leading-[1.8] font-light">
                Un strass discret sur la branche gauche. Des gravures fines visibles seulement de près.
                Une signature pour les initiés.
              </p>
              <p className="font-sans text-dark-text/70 text-base md:text-lg leading-[1.8] font-light">
                Renaissance n'est pas fait pour crier. C'est fait pour être reconnu par ceux qui savent.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
                <p className="font-sans text-dark-text/70 text-base leading-[1.7] font-light">
                  <span className="font-semibold text-dark-text">Strass signature</span> serti à la main sur la branche gauche
                </p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
                <p className="font-sans text-dark-text/70 text-base leading-[1.7] font-light">
                  <span className="font-semibold text-dark-text">Gravures laser</span> ultra-précises invisibles à l'œil nu
                </p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-bronze mt-2.5 flex-shrink-0" />
                <p className="font-sans text-dark-text/70 text-base leading-[1.7] font-light">
                  <span className="font-semibold text-dark-text">Numérotation individuelle</span> de chaque pièce
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[60vh] lg:min-h-screen order-1 lg:order-2"
        >
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Détail strass signature"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Gravures fines"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden md:col-span-2">
              <img
                src="https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vue macro détails"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
