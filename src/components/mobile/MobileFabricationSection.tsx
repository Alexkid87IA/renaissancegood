import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function MobileFabricationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Forcer l'autoplay sur mobile
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Si autoplay échoue, on essaie au premier touch
        const playOnTouch = () => {
          video.play();
          document.removeEventListener('touchstart', playOnTouch);
        };
        document.addEventListener('touchstart', playOnTouch);
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        className="w-full h-[60vh] object-cover"
      >
        <source
          src="https://renaissance-cdn.b-cdn.net/FABRICATION-VIDEO.mp4"
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
            Dessinées à Paris. Usinées en Corée.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-display text-3xl text-white font-bold">18KT</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Or véritable, plaqué
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">Titane</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Léger, résistant
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">1849</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Acétate Mazzucchelli
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-white font-bold">2019</p>
              <p className="font-sans text-white/70 text-[10px] tracking-wide uppercase">
                Année de fondation
              </p>
            </div>
          </div>

          <div className="space-y-2 text-white">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Design Paris</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Fabrication Corée</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/60 mt-2 flex-shrink-0" />
              <p className="font-sans text-xs leading-relaxed">
                <span className="font-semibold">Acétate Mazzucchelli</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
