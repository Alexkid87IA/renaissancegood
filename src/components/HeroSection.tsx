import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useStackedScroll } from '../hooks/useStackedScroll';

// Hero accueil = la vidéo TRIO ISIS (21 juin 2026), hébergée sur Bunny CDN (videos/).
const HERO_VIDEO_DESKTOP = 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_ISIS_web.mp4';
const HERO_VIDEO_MOBILE = 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_ISIS_web.mp4';
// Posters HD (21 juin 2026) : photo trio ISIS pleine résolution, remplace la frame vidéo basse def.
const HERO_POSTER = 'https://renaissance-cdn.b-cdn.net/videos/HERO_16_9_ISIS_poster_v2.jpg';
const HERO_POSTER_MOBILE = 'https://renaissance-cdn.b-cdn.net/videos/HERO_9_16_ISIS_poster_v2.jpg';
const VIDEO_SPEED = 0.7;

type TransitionPhase = 'video' | 'blackout' | 'shimmer' | 'reveal';

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g' | string;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
}

/** Détecte si la connexion est lente (2G/3G lent ou saveData activé) */
function useSlowConnection(): boolean {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
    if (!conn) return;

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
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('home');
  const slowConnection = useSlowConnection();

  const [phase, setPhase] = useState<TransitionPhase>('video');
  const [mobileEnded, setMobileEnded] = useState(false);
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const videos = section.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach((v) => {
      v.playbackRate = VIDEO_SPEED;
    });
  }, [slowConnection]);

  // Desktop : la vidéo joue une fois puis enchaîne la transition cinématique vers le poster.
  const handleDesktopEnded = () => {
    setPhase('blackout');
    setTimeout(() => setPhase('shimmer'), 1200);
    setTimeout(() => setPhase('reveal'), 2800);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-10"
      data-header-theme="dark"
    >
      {/* DESKTOP VERSION */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        {slowConnection ? (
          <motion.img
            src={HERO_POSTER}
            alt="Renaissance Eyewear"
            style={imageMotionStyle}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <motion.video
            src={HERO_VIDEO_DESKTOP}
            poster={HERO_POSTER}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleDesktopEnded}
            style={imageMotionStyle}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        {/* Transition cinématique */}
        <AnimatePresence>
          {phase !== 'video' && (
            <>
              {/* Fond noir progressif */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-[1] bg-black"
              />

              {/* Ligne dorée horizontale — centre vers les bords */}
              {(phase === 'shimmer' || phase === 'reveal') && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] z-[5] origin-center"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(199,170,120,0.1), rgba(199,170,120,0.6), rgba(199,170,120,0.6), rgba(199,170,120,0.1), transparent)',
                    boxShadow: '0 0 30px 8px rgba(199,170,120,0.08)',
                  }}
                />
              )}

              {/* Halo doré central pendant le shimmer */}
              {(phase === 'shimmer' || phase === 'reveal') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
                  transition={{ duration: 2.2, ease: 'easeOut' }}
                  className="absolute inset-0 z-[4] pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(199,170,120,0.12) 0%, transparent 60%)',
                  }}
                />
              )}

              {/* Image poster — reveal avec zoom settle + brightness */}
              {phase === 'reveal' && (
                <motion.img
                  src={HERO_POSTER}
                  alt="Renaissance Eyewear"
                  initial={{ opacity: 0, scale: 1.06, filter: 'brightness(0.3)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  style={imageMotionStyle}
                  className="absolute inset-0 w-full h-full object-cover object-center z-[2]"
                />
              )}
            </>
          )}
        </AnimatePresence>

        <div className="absolute left-12 bottom-12 max-w-xl z-[4]" style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}>
          <p className="text-white text-xs tracking-[0.2em] uppercase font-sans mb-2">{t('hero.label')}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-[-0.03em] leading-[0.95]">
            {t('hero.title1')}<br />
            <span className="font-light italic">{t('hero.title2')}</span>
          </h1>
          <p className="text-white text-sm mb-6 leading-relaxed">
            {t('hero.description')}
          </p>
          <div>
            <button
              onClick={() => navigate('/shop')}
              className="group/btn relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-9 py-4 transition-colors duration-500"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
              <span className="relative z-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
                {t('hero.cta')}
              </span>
            </button>
          </div>
        </div>

        {/* CTA secondaire — bas droite, pour laisser respirer le hero */}
        <div
          className="absolute right-12 bottom-12 z-[4]"
          style={{ filter: 'drop-shadow(0 2px 20px rgba(0,0,0,0.8)) drop-shadow(0 4px 40px rgba(0,0,0,0.5))' }}
        >
          <button
            onClick={() => navigate('/opticiens')}
            className="group/btn relative overflow-hidden inline-flex items-center justify-center rounded-2xl border border-white/[0.55] px-9 py-4 transition-colors duration-500"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
            <span className="relative z-10 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-white group-hover/btn:text-[#0a0a0a] transition-colors duration-500">
              {t('hero.ctaSecondary')}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE VERSION — Éditorial luxe */}
      <div className="relative h-full overflow-hidden lg:hidden">
        <motion.div className="absolute inset-0" style={imageMotionStyle}>
          <motion.video
            src={HERO_VIDEO_MOBILE}
            poster={HERO_POSTER_MOBILE}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => setMobileEnded(true)}
            className="w-full h-full object-cover object-[center_30%]"
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* La vidéo joue une fois, puis se fige sur le poster HD (comme desktop). */}
          <AnimatePresence>
            {mobileEnded && (
              <motion.img
                src={HERO_POSTER_MOBILE}
                alt="Renaissance Eyewear"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#000000] via-[#000000]/[0.62] to-transparent" />
        </motion.div>

        {/* Contenu */}
        <div className="relative h-full flex flex-col items-center text-center justify-end px-7 pb-14">

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

          {/* CTA — deux boutons aux extremites */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center justify-between gap-3 w-full"
          >
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-5 py-3.5 font-sans text-[8.5px] tracking-[0.22em] font-medium uppercase text-white hover:bg-white hover:text-[#0a0a0a] active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
            >
              {t('hero.cta')}
            </button>
            <button
              onClick={() => navigate('/opticiens')}
              className="inline-flex items-center justify-center rounded-2xl border border-white/[0.45] px-5 py-3.5 font-sans text-[8.5px] tracking-[0.22em] font-medium uppercase text-white hover:bg-white hover:text-[#0a0a0a] active:bg-white active:text-[#0a0a0a] transition-colors duration-300"
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
