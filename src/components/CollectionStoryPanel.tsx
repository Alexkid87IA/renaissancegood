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
  ctaLabel,
  href,
  onClick,
  disabled = false,
}: CollectionStoryPanelProps) {
  const ctaContent = (
    <>
      <span>{ctaLabel}</span>
      <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );

  const ctaClass = "group inline-flex items-center gap-3 border-b border-dark-text/[0.3] pb-1.5 font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-dark-text transition-colors duration-500 hover:text-bronze hover:border-bronze/[0.5] disabled:pointer-events-none disabled:opacity-50";

  return (
    <div data-collection-story-panel className="relative w-full md:w-[38%] overflow-hidden bg-[#fbfaf7] flex items-center justify-center px-8 py-10 md:px-12 lg:px-16 xl:px-20">
      <motion.div
        ref={panelRef}
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-xl"
      >
        <motion.div variants={fade} className="mb-8">
          <p className="font-sans text-dark-text/[0.48] text-[9px] tracking-[0.42em] font-medium uppercase">
            {label}
          </p>
        </motion.div>

        <div className="relative">
          <motion.h3
            variants={fade}
            className="font-display text-[clamp(2.8rem,4.4vw,5.6rem)] font-bold tracking-normal leading-[0.86] text-dark-text"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={fade}
            className="mt-3 font-display text-[clamp(1.7rem,2.6vw,2.9rem)] font-light italic tracking-normal leading-none text-dark-text/[0.66]"
          >
            {subtitle}
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
