import { ReactNode, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { stagger, fade } from './shared';

interface LegalPageTemplateProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function LegalPageTemplate({ title, lastUpdated, children }: LegalPageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-beige">
      {/* HERO — Dark éditorial */}
      <section className="bg-[#000000] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Informations Légales
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {title.toUpperCase().replace(/ /g, '\n').split('\n').map((word, i, arr) => (
                <span key={i}>
                  {word}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>
            {lastUpdated && (
              <motion.div variants={fade} className="mt-8">
                <div className="w-12 h-px bg-white/15 mb-6" />
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25">
                  Dernière mise à jour : {lastUpdated}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="legal-content">
              {children}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
            Besoin d'aide
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
            Une question ?
          </h2>
          <p className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
            Nous sommes là pour vous.
          </p>
          <div className="w-12 h-px bg-white/15 mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
            >
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                Nous contacter
              </span>
              <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="mailto:contact@renaissance-eyewear.fr"
              className="group border border-white/8 px-10 py-4 transition-all duration-500 hover:border-white/20"
            >
              <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/35 group-hover:text-white/60 transition-colors duration-500">
                contact@renaissance-eyewear.fr
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Styles pour le contenu légal */}
      <style>{`
        .legal-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .legal-content h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #8b7355;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .legal-content p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.9;
          color: rgba(26, 26, 26, 0.55);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .legal-content ul, .legal-content ol {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.9;
          color: rgba(26, 26, 26, 0.55);
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          font-weight: 300;
        }

        .legal-content li {
          margin-bottom: 0.75rem;
        }

        .legal-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }

        .legal-content a {
          color: #8b7355;
          text-decoration: none;
          transition: color 0.3s;
        }

        .legal-content a:hover {
          color: #6b5335;
        }

        .legal-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }

        .legal-content th,
        .legal-content td {
          font-family: 'DM Sans', sans-serif;
          padding: 1rem;
          border: 1px solid rgba(26, 26, 26, 0.08);
          text-align: left;
          font-size: 0.875rem;
        }

        .legal-content th {
          background-color: rgba(26, 26, 26, 0.03);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
          color: rgba(26, 26, 26, 0.4);
        }
      `}</style>
    </div>
  );
}
