import { useRef } from 'react';

const valeurs = [
  { 
    number: '01',
    title: 'La Justesse', 
    description: 'Chaque mot vrai. Chaque geste nécessaire. Chaque matière juste.',
    keyword: 'Vérité'
  },
  { 
    number: '02',
    title: 'Le Respect', 
    description: 'On ne traite personne comme un chiffre. Ni client, ni partenaire, ni artisan.',
    keyword: 'Dignité'
  },
  { 
    number: '03',
    title: 'Le Silence', 
    description: "La vraie élégance, c'est ne pas forcer l'attention. Être reconnu par ceux qui savent.",
    keyword: 'Discrétion'
  },
  { 
    number: '04',
    title: 'La Transmission', 
    description: "On construit pour que dans 20 ans, quelqu'un hérite d'une paire et la garde.",
    keyword: 'Héritage'
  },
  { 
    number: '05',
    title: 'La Maîtrise', 
    description: 'On ne fait pas vite. On fait bien. Le temps est un allié, pas un ennemi.',
    keyword: 'Excellence'
  }
];

export default function ValeursSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen lg:sticky lg:top-0 z-[60] relative bg-dark-text overflow-hidden"
    >
      {/* Fond avec gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-dark-text to-[#252525]" />
      
      {/* Effet radial bronze subtil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,115,85,0.06)_0%,transparent_50%)]" />
      
      {/* Lignes décoratives */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-bronze" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-bronze" />
      </div>

      <div className="h-full w-full relative flex flex-col">
        {/* Header */}
        <div className="relative z-10 pt-6 md:pt-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-bronze text-sm font-bold tracking-[0.4em] uppercase">05</span>
              <div className="w-8 h-px bg-bronze/30" />
              <span className="font-sans text-white/40 text-xs font-medium tracking-[0.3em] uppercase">Les Piliers</span>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.25em] uppercase">5 Valeurs</p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-16 py-6 lg:py-4">
          <div className="max-w-[1800px] mx-auto w-full">
            
            {/* Titre */}
            <div className="mb-8 lg:mb-10">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-4">
                NOS <span className="text-bronze">VALEURS.</span>
              </h2>
              <p className="font-sans text-base md:text-lg text-white/60 font-light leading-relaxed max-w-xl">
                Cinq piliers non-négociables. Ce qui nous guide depuis le premier jour.
              </p>
            </div>

            {/* Grid des valeurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
              {valeurs.map((valeur) => (
                <div
                  key={valeur.title}
                  className="group"
                >
                  <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 md:p-6 hover:bg-white/[0.05] hover:border-bronze/30 transition-all duration-500 h-full flex flex-col">
                    
                    {/* Numéro */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display text-bronze/50 text-2xl md:text-3xl font-light group-hover:text-bronze transition-colors duration-500">
                        {valeur.number}
                      </span>
                      <div className="flex-1 h-px bg-white/10 group-hover:bg-bronze/30 transition-colors duration-500" />
                    </div>
                    
                    {/* Keyword */}
                    <p className="font-sans text-bronze text-[9px] tracking-[0.25em] uppercase font-bold mb-2">
                      {valeur.keyword}
                    </p>
                    
                    {/* Titre */}
                    <h3 className="font-display text-white text-lg md:text-xl font-bold mb-3 tracking-wide leading-tight">
                      {valeur.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-sans text-white/50 text-sm font-light leading-[1.7] flex-1">
                      {valeur.description}
                    </p>

                    {/* Ligne décorative bas */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="w-6 h-0.5 bg-bronze/30 group-hover:w-full group-hover:bg-bronze/50 transition-all duration-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pb-4 md:pb-6 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-sans text-white text-lg md:text-xl font-light">05</span>
                <span className="font-sans text-white/30 text-sm">/</span>
                <span className="font-sans text-white/40 text-sm">07</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-bronze via-bronze/50 to-transparent" />
                <span className="font-sans text-white/30 text-[8px] tracking-[0.3em] uppercase">Défiler</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-sans text-white/20 text-[8px] tracking-wider">© 2019-2025 Renaissance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}