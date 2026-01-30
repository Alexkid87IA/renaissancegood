import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';

const HERO_VIDEO = 'https://renaissance-cdn.b-cdn.net/bonne%20video.mp4';
const HERO_POSTER = 'https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2030%2C%202026%20-%2012_05AM.jpeg';
const VIDEO_SPEED = 0.85;

/** Détecte si la connexion est lente (2G/3G lent ou saveData activé) */
function useSlowConnection(): boolean {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const conn = (navigator as any).connection;
    if (!conn) return; // API non supportée → on suppose rapide

    const check = () => {
      const slow =
        conn.saveData === true ||
        conn.effectiveType === 'slow-2g' ||
        conn.effectiveType === '2g' ||
        conn.effectiveType === '3g';
      setIsSlow(slow);
    };

    check();
    conn.addEventListener?.('change', check);
    return () => conn.removeEventListener?.('change', check);
  }, []);

  return isSlow;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('home');
  const slowConnection = useSlowConnection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);

  // Applique la vitesse réduite dès que la vidéo est montée
  const handleVideoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      el.playbackRate = VIDEO_SPEED;
    }
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="h-[100dvh] lg:h-screen sticky top-0 z-10"
    >
      {/* DESKTOP VERSION */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        {slowConnection ? (
          <img
            src={HERO_POSTER}
            alt="Renaissance Paris"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <video
            ref={handleVideoRef}
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        <div className="absolute left-8 bottom-8 max-w-xl" style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}>
          <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">{t('hero.label')}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]">
            {t('hero.title1')}<br />
            <span className="font-light italic">{t('hero.title2')}</span>
          </h1>
          <p className="text-white text-sm mb-6 leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-dark-text font-bold hover:bg-white/90 transition-colors"
            >
              {t('hero.cta')}
            </button>
            <button
              onClick={() => navigate('/store-locator')}
              className="border-2 border-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-white hover:text-dark-text transition-colors"
            >
              {t('hero.ctaSecondary')}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE VERSION — Éditorial luxe */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <div className="absolute inset-0">
          {slowConnection ? (
            <motion.img
              src={HERO_POSTER}
              alt="RENAISSANCE Paris"
              className="w-full h-full object-cover object-[center_30%]"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <motion.video
              ref={handleVideoRef}
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-[center_30%]"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#000000]/70 to-transparent" />
        </div>

        {/* Contenu */}
        <div className="relative h-full flex flex-col justify-end px-7 pb-14">

          {/* Titre éditorial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-sans text-white/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-4"
            >
              {t('hero.mobileLabel')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              className="font-display text-[2.6rem] sm:text-5xl font-bold text-white tracking-[-0.04em] leading-[0.88] mb-2"
            >
              {t('hero.mobileTitle1')}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15 }}
              className="font-display text-[2.6rem] sm:text-5xl font-light italic text-white/80 tracking-[-0.04em] leading-[0.88]"
            >
              {t('hero.mobileTitle2')}
            </motion.h1>
          </motion.div>

          {/* Ligne de séparation fine */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-10 h-px bg-white/25 origin-left mb-5"
          />

          {/* CTA discret */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center gap-5"
          >
            <button
              onClick={() => navigate('/shop')}
              className="font-display text-[13px] italic text-white/70 tracking-[-0.01em] active:text-white transition-colors duration-300"
            >
              {t('hero.cta')}
            </button>
            <span className="w-px h-3 bg-white/15" />
            <button
              onClick={() => navigate('/store-locator')}
              className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium active:text-white/60 transition-colors duration-300"
            >
              {t('hero.mobileOpticians')}
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="w-px h-5 bg-gradient-to-b from-transparent to-white/30" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
