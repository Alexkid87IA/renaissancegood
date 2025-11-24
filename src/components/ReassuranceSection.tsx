import { motion } from 'framer-motion';

const guarantees = [
  {
    number: '01',
    title: 'Réseau National',
    description: '200+ opticiens partenaires sélectionnés pour leur expertise',
    svg: (
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <path d="M30 15 L30 30 L42 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="30" r="3" fill="currentColor"/>
        <path d="M20 20 L20 25 M40 20 L40 25 M20 40 L20 35 M40 40 L40 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Livraison Soignée',
    description: 'Offerte dès 500€ avec écrin premium et certificat d\'authenticité',
    svg: (
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        <rect x="15" y="25" width="30" height="20" stroke="currentColor" strokeWidth="1" rx="1"/>
        <path d="M15 30 L30 20 L45 30" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        <circle cx="25" cy="40" r="1.5" fill="currentColor"/>
        <circle cx="35" cy="40" r="1.5" fill="currentColor"/>
        <path d="M20 32 L40 32" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Garantie Excellence',
    description: '2 ans sur l\'ensemble de nos créations avec service après-vente dédié',
    svg: (
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        <path d="M30 15 L38 22 L38 35 L30 42 L22 35 L22 22 Z" stroke="currentColor" strokeWidth="1"/>
        <path d="M26 30 L29 33 L35 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="30" r="13" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      </svg>
    )
  },
  {
    number: '04',
    title: 'Paiement Sécurisé',
    description: 'Transactions cryptées SSL et paiement en 3x sans frais disponible',
    svg: (
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        <rect x="18" y="26" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1"/>
        <path d="M23 26 L23 22 C23 18 26 16 30 16 C34 16 37 18 37 22 L37 26" stroke="currentColor" strokeWidth="1"/>
        <circle cx="30" cy="35" r="2" fill="currentColor"/>
        <path d="M30 37 L30 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function ReassuranceSection() {
  return (
    <section className="relative z-[100] bg-gradient-to-b from-white to-beige/30 py-24 md:py-32 border-y border-dark-text/5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-bronze text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">
            Excellence & Engagement
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text tracking-[-0.02em]">
            Nos Piliers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-text/5">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group bg-white hover:bg-beige/20 transition-all duration-700"
            >
              <div className="p-10 md:p-12 lg:p-16 h-full flex flex-col">

                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 text-bronze/30 group-hover:text-bronze/50 transition-colors duration-700">
                    {guarantee.svg}
                  </div>
                  <span className="font-display text-6xl md:text-7xl text-dark-text/5 group-hover:text-bronze/10 transition-colors duration-700">
                    {guarantee.number}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-dark-text mb-4 tracking-tight">
                    {guarantee.title}
                  </h3>

                  <p className="font-sans text-dark-text/60 text-sm md:text-base leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-dark-text/5">
                  <div className="w-12 h-0.5 bg-bronze/20 group-hover:w-24 group-hover:bg-bronze/40 transition-all duration-700" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
