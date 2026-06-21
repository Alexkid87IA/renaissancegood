import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';
import { useStackedScroll } from '../hooks/useStackedScroll';
import { useTranslation } from 'react-i18next';

const IMAGE = '/home-collections/allframes-1.jpg';

export default function CollectionAllFrames() {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation('home');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { sectionStyle, imageMotionStyle } = useStackedScroll(sectionRef);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/shop'), 300);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      onClick={handleNavigate}
      className="snap-section h-[100dvh] lg:h-screen sticky top-0 z-50 overflow-hidden bg-[#000000] cursor-pointer group"
      data-header-theme="dark"
      data-indicator-theme="light"
    >
      <motion.img
        src={IMAGE}
        alt={t('allFrames.title')}
        loading="lazy"
        style={imageMotionStyle}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />

      {/* voile bas pour tenir le texte, sans noyer l'image (Bible 7.6) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-[#000000]/15 to-[#000000]/25 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12%] px-6 pointer-events-none text-center [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
        <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.35em] font-medium uppercase text-white border-b border-white/30 pb-2 transition-colors duration-500 group-hover:border-white/60">
          {isLoading ? t('allFrames.loading') : t('allFrames.mobileLabel')}
        </span>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-[#000000]/90 flex items-center justify-center z-10">
          <div className="w-10 h-10 border border-bronze/30 border-t-bronze rounded-full animate-spin" />
        </div>
      )}
    </motion.section>
  );
}
