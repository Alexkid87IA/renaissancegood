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

  const ctaClass = "group relative inline-flex min-w-[13rem] items-center justify-center overflow-hidden border border-dark-text/[0.65] px-8 py-4 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text transition-all duration-500 hover:border-dark-text disabled:pointer-events-none disabled:opacity-50";

  return (
    <div data-collection-story-panel className="relative w-full md:w-1/2 overflow-hidden bg-[#fbfaf7] flex items-center justify-center px-8 py-10 md:px-14 lg:px-20 xl:px-24">
      <motion.div
        ref={panelRef}
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-xl"
      >
        <motion.div variants={fade} className="mb-8 flex items-center gap-4">
          <span className="h-px w-14 bg-bronze/[0.48]" />
          <p className="font-sans text-dark-text/[0.48] text-[9px] tracking-[0.42em] font-medium uppercase">
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
            className="mt-3 font-display text-[clamp(1.9rem,3vw,3.25rem)] font-light italic tracking-normal leading-none text-dark-text/[0.66]"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fade} className="mt-8 mb-8 h-px w-20 bg-dark-text/[0.18]" />

          <motion.p
            variants={fade}
            className="max-w-[34rem] font-sans text-dark-text/[0.58] text-[13px] md:text-sm xl:text-base leading-[1.9] font-light"
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
