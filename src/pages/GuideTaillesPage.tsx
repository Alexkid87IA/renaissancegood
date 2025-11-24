import { motion } from 'framer-motion';
import { Ruler, Eye, ArrowLeftRight } from 'lucide-react';

export default function GuideTaillesPage() {
  return (
    <div className="min-h-screen bg-beige pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark-text mb-4">
            Guide des Tailles
          </h1>
          <p className="font-sans text-dark-text/60 text-lg max-w-2xl mx-auto">
            Trouvez la monture parfaitement adaptée à votre morphologie
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-8 md:p-12 border border-bronze/10 mb-8"
        >
          <h2 className="font-serif text-3xl text-dark-text mb-6">
            Comprendre les dimensions
          </h2>

          <div className="relative mb-8">
            <div className="aspect-[2/1] bg-beige/30 border border-bronze/20 flex items-center justify-center">
              <div className="text-center">
                <Ruler className="text-bronze mx-auto mb-3" size={48} />
                <p className="font-sans text-dark-text/50 text-sm">
                  Schéma des mesures de lunettes
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border-l-4 border-bronze pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="text-bronze" size={20} />
                <h3 className="font-sans text-dark-text font-bold tracking-wide uppercase text-sm">
                  Largeur du verre
                </h3>
              </div>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-2">
                Distance horizontale d'un verre, mesurée à son point le plus large.
              </p>
              <p className="font-sans text-bronze text-xs font-bold">
                Généralement entre 45mm et 58mm
              </p>
            </div>

            <div className="border-l-4 border-bronze pl-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeftRight className="text-bronze" size={20} />
                <h3 className="font-sans text-dark-text font-bold tracking-wide uppercase text-sm">
                  Pont
                </h3>
              </div>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-2">
                Distance entre les deux verres, au niveau de l'arête du nez.
              </p>
              <p className="font-sans text-bronze text-xs font-bold">
                Généralement entre 14mm et 24mm
              </p>
            </div>

            <div className="border-l-4 border-bronze pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="text-bronze" size={20} />
                <h3 className="font-sans text-dark-text font-bold tracking-wide uppercase text-sm">
                  Branches
                </h3>
              </div>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-2">
                Longueur des branches, de la charnière à l'extrémité.
              </p>
              <p className="font-sans text-bronze text-xs font-bold">
                Généralement entre 135mm et 150mm
              </p>
            </div>
          </div>

          <div className="bg-bronze/5 p-6 border-l-4 border-bronze">
            <h3 className="font-sans text-dark-text font-bold tracking-wide uppercase text-sm mb-3">
              Format standard Renaissance
            </h3>
            <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
              Nos dimensions sont indiquées dans ce format : <strong>52-20-145</strong>
            </p>
            <ul className="font-sans text-dark-text/60 text-sm mt-3 space-y-1">
              <li>• <strong>52</strong> = Largeur du verre en mm</li>
              <li>• <strong>20</strong> = Pont en mm</li>
              <li>• <strong>145</strong> = Longueur des branches en mm</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 md:p-12 border border-bronze/10 mb-8"
        >
          <h2 className="font-serif text-3xl text-dark-text mb-6">
            Trouver votre taille
          </h2>

          <div className="space-y-6">
            <div className="border border-bronze/10 p-6">
              <h3 className="font-sans text-bronze font-bold tracking-wide uppercase text-sm mb-4">
                Taille S (Petite)
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-3">
                Idéal pour les visages fins et les morphologies délicates.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Verre</p>
                  <p className="font-sans text-bronze font-bold">45-50mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Pont</p>
                  <p className="font-sans text-bronze font-bold">16-18mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Branches</p>
                  <p className="font-sans text-bronze font-bold">135-140mm</p>
                </div>
              </div>
            </div>

            <div className="border border-bronze/10 p-6 bg-bronze/5">
              <h3 className="font-sans text-bronze font-bold tracking-wide uppercase text-sm mb-4">
                Taille M (Moyenne)
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-3">
                La taille la plus courante, convient à la majorité des morphologies.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Verre</p>
                  <p className="font-sans text-bronze font-bold">50-54mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Pont</p>
                  <p className="font-sans text-bronze font-bold">18-20mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Branches</p>
                  <p className="font-sans text-bronze font-bold">140-145mm</p>
                </div>
              </div>
            </div>

            <div className="border border-bronze/10 p-6">
              <h3 className="font-sans text-bronze font-bold tracking-wide uppercase text-sm mb-4">
                Taille L (Grande)
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed mb-3">
                Pour les visages larges et les morphologies imposantes.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Verre</p>
                  <p className="font-sans text-bronze font-bold">54-58mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Pont</p>
                  <p className="font-sans text-bronze font-bold">20-24mm</p>
                </div>
                <div>
                  <p className="font-sans text-dark-text text-xs uppercase mb-1">Branches</p>
                  <p className="font-sans text-bronze font-bold">145-150mm</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-8 md:p-12 border border-bronze/10 mb-8"
        >
          <h2 className="font-serif text-3xl text-dark-text mb-6">
            Choisir selon la forme du visage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-bronze pl-6 py-4">
              <h3 className="font-sans text-dark-text font-bold uppercase text-sm mb-3">
                Visage Ovale
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
                La forme la plus équilibrée. Toutes les formes de montures vous vont bien. Privilégiez les modèles qui ne sont ni trop grands ni trop petits pour maintenir les proportions.
              </p>
            </div>

            <div className="border-l-4 border-bronze pl-6 py-4">
              <h3 className="font-sans text-dark-text font-bold uppercase text-sm mb-3">
                Visage Rond
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
                Optez pour des montures rectangulaires ou géométriques pour affiner le visage. Évitez les formes trop rondes qui accentueraient la rondeur.
              </p>
            </div>

            <div className="border-l-4 border-bronze pl-6 py-4">
              <h3 className="font-sans text-dark-text font-bold uppercase text-sm mb-3">
                Visage Carré
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
                Les montures rondes ou ovales adoucissent les traits anguleux. Les formes papillon sont particulièrement flatteuses.
              </p>
            </div>

            <div className="border-l-4 border-bronze pl-6 py-4">
              <h3 className="font-sans text-dark-text font-bold uppercase text-sm mb-3">
                Visage Rectangulaire
              </h3>
              <p className="font-sans text-dark-text/70 text-sm leading-relaxed">
                Choisissez des montures avec une hauteur de verre importante pour raccourcir visuellement le visage. Les formes hexagonales fonctionnent bien.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-bronze/5 to-transparent p-8 border-l-4 border-bronze"
        >
          <h2 className="font-serif text-2xl text-dark-text mb-4">
            Besoin d'aide pour choisir ?
          </h2>
          <p className="font-sans text-dark-text/70 text-base leading-relaxed mb-6">
            Rendez-vous chez l'un de nos 200+ opticiens partenaires pour essayer nos collections et bénéficier de conseils personnalisés d'experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/store-locator"
              className="inline-block px-6 py-3 bg-bronze text-white font-sans text-sm tracking-wider uppercase hover:bg-bronze/90 transition-colors text-center"
            >
              Trouver un opticien
            </a>
            <a
              href="/contact"
              className="inline-block px-6 py-3 border border-bronze text-bronze font-sans text-sm tracking-wider uppercase hover:bg-bronze hover:text-white transition-colors text-center"
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
