import { motion } from 'framer-motion';
import type { Ref } from 'react';
import LocaleLink from './LocaleLink';
import { stagger, fade } from './shared';

interface CollectionStoryPanelProps {
  panelRef?: Ref<HTMLDivElement>;
  active?: boolean;
  index: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CollectionStoryPanel({
  panelRef,
  active = true,
  index,
  label,
  title,
  subtitle,
  description,
  ctaLabel,
  href,
  onClick,
  disabled = false,
}: CollectionStoryPanelProps) {
  const ctaContent = (
    <>
      <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-beige">
        {ctaLabel}
      </span>
      <span className="relative z-10 ml-4 h-px w-8 bg-current opacity-35 transition-all duration-500 group-hover:w-12 group-hover:opacity-70" />
    </>
  );

  const ctaClass = "group relative inline-flex min-w-[13rem] items-center justify-center overflow-hidden border border-dark-text/65 px-8 py-4 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text transition-all duration-500 hover:border-dark-text disabled:pointer-events-none disabled:opacity-50";

  return (
    <div data-collection-story-panel className="relative w-full md:w-1/2 overflow-hidden bg-[#f7f4ee] flex items-center justify-center px-8 py-10 md:px-14 lg:px-20 xl:px-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(26,26,26,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.035)_1px,transparent_1px)] [background-size:76px_76px]"
      />
      <div aria-hidden="true" className="absolute inset-6 md:inset-8 border border-dark-text/[0.055]" />
      <div aria-hidden="true" className="absolute bottom-10 right-10 h-px w-24 bg-dark-text/10" />

      <motion.div
        ref={panelRef}
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-xl"
      >
        <motion.div
          variants={fade}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-20 font-display text-[clamp(7rem,12vw,15rem)] leading-none text-dark-text/[0.045]"
        >
          {index}
        </motion.div>

        <motion.div variants={fade} className="mb-8 flex items-center gap-4">
          <span className="font-display text-3xl italic leading-none text-bronze/80">
            {index}
          </span>
          <span className="h-px w-12 bg-bronze/35" />
          <p className="font-sans text-dark-text/38 text-[9px] tracking-[0.42em] font-medium uppercase">
            {label}
          </p>
        </motion.div>

        <div className="relative">
          <motion.h3
            variants={fade}
            className="font-display text-[clamp(3.2rem,5.2vw,6.6rem)] font-bold tracking-normal leading-[0.86] text-dark-text"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={fade}
            className="mt-3 font-display text-[clamp(1.9rem,3vw,3.25rem)] font-light italic tracking-normal leading-none text-dark-text/66"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fade} className="mt-8 mb-8 h-px w-20 bg-dark-text/18" />

          <motion.p
            variants={fade}
            className="max-w-[34rem] font-sans text-dark-text/58 text-[13px] md:text-sm xl:text-base leading-[1.9] font-light"
          >
            {description}
          </motion.p>

          <motion.div variants={fade} className="mt-10 xl:mt-12 flex items-center gap-5">
            {href ? (
              <LocaleLink to={href} className={ctaClass}>
                {ctaContent}
              </LocaleLink>
            ) : (
              <button type="button" onClick={onClick} disabled={disabled} className={ctaClass}>
                {ctaContent}
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
