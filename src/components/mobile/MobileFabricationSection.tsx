import { motion } from 'framer-motion';

interface MobileFabricationSectionProps {
  frame: string;
  lens: string;
}

export default function MobileFabricationSection({ frame, lens }: MobileFabricationSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[60vh] object-cover"
      >
        <source
          src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761874713/61822c99-1122-400c-aa3a-317de2674d17_zodmfx.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-dark-text/95 via-dark-text/70 to-dark-text/40" />

      <div className="absolute inset-0 flex flex-col justify-end px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
            FABRICATION
          </h2>

          <p className="font-sans text-sm text-white/90 leading-relaxed mb-6 max-w-md">
            Chaque paire de lunettes Renaissance est le fruit d'un savoir-faire exceptionnel,
            alliant l'excellence française et la précision coréenne.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-display text-3xl text-white font-bold">8-12</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Artisans par paire
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">250</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Étapes de fabrication
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">8-15h</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                De travail cumulé
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">2</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Pays d'excellence
              </p>
            </div>
          </div>

          <div className="space-y-2 text-white">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Studio parisien</span> pour la conception et le design
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Ateliers coréens</span> pour l'exigence et la précision
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Matériaux premium</span> : acétate Mazzucchelli
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
