import { motion } from 'framer-motion';
import type { ReactNode, Ref } from 'react';
import LocaleLink from './LocaleLink';
import { stagger, fade } from './shared';

interface HomeEditorialAction {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

interface HomeEditorialBlockProps {
  panelRef?: Ref<HTMLDivElement>;
  active?: boolean;
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  description?: string;
  theme?: 'dark' | 'light';
  actions?: HomeEditorialAction[];
  meta?: string;
  children?: ReactNode;
}

export default function HomeEditorialBlock({
  panelRef,
  active = true,
  label,
  title,
  subtitle,
  description,
  theme = 'dark',
  actions = [],
  meta,
  children,
}: HomeEditorialBlockProps) {
  const dark = theme === 'dark';
  const titleColor = dark ? 'text-white' : 'text-dark-text';
  const labelColor = dark ? 'text-white/[0.52]' : 'text-dark-text/[0.52]';
  const subtitleColor = dark ? 'text-white/[0.76]' : 'text-dark-text/[0.72]';
  const bodyColor = dark ? 'text-white/[0.70]' : 'text-dark-text/[0.66]';
  const lineColor = dark ? 'bg-bronze/[0.50]' : 'bg-dark-text/[0.22]';
  const primaryButton = dark
    ? 'border-white/80 bg-white text-[#0a0a0a] hover:border-bronze hover:bg-bronze'
    : 'border-dark-text/70 text-dark-text hover:bg-dark-text hover:text-beige';
  const secondaryButton = dark
    ? 'border-white/[0.32] text-white/[0.84] hover:border-bronze/70 hover:text-bronze'
    : 'border-dark-text/[0.16] text-dark-text/[0.52] hover:border-dark-text/[0.45] hover:text-dark-text';

  return (
    <motion.div
      ref={panelRef}
      variants={stagger}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      data-home-editorial-block
      className="relative z-10 w-full max-w-xl"
    >
      <motion.div variants={fade} className="mb-8 flex items-center gap-4">
        <span className={`h-px w-16 ${dark ? 'bg-bronze/[0.55]' : 'bg-bronze/[0.45]'}`} />
        <p className={`font-sans text-[9px] tracking-[0.42em] font-medium uppercase ${labelColor}`}>
          {label}
        </p>
      </motion.div>

      <motion.h2
        variants={fade}
        className={`font-display text-[clamp(3.3rem,5.3vw,6.7rem)] font-bold tracking-normal leading-[0.86] ${titleColor}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fade}
          className={`mt-3 font-display text-[clamp(1.9rem,3vw,3.35rem)] font-light italic tracking-normal leading-none ${subtitleColor}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div variants={fade} className={`mt-8 mb-8 h-px w-20 ${lineColor}`} />

      {description && (
        <motion.p
          variants={fade}
          className={`max-w-[34rem] font-sans text-[13px] md:text-sm xl:text-base leading-[1.9] font-light ${bodyColor}`}
        >
          {description}
        </motion.p>
      )}

      {children && (
        <motion.div variants={fade} className="mt-10">
          {children}
        </motion.div>
      )}

      {(actions.length > 0 || meta) && (
        <motion.div variants={fade} className="mt-10 xl:mt-12">
          {actions.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
              {actions.map((action, actionIndex) => {
                const isPrimary = (action.variant ?? (actionIndex === 0 ? 'primary' : 'secondary')) === 'primary';
                const className = `inline-flex min-w-[12rem] items-center justify-center border px-7 py-4 font-sans text-[9px] tracking-[0.28em] font-medium uppercase transition-all duration-500 ${isPrimary ? primaryButton : secondaryButton}`;
                return action.href ? (
                  <LocaleLink key={action.label} to={action.href} className={className}>
                    {action.label}
                  </LocaleLink>
                ) : (
                  <button key={action.label} type="button" className={className}>
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
          {meta && (
            <p className={`mt-7 font-sans text-[9px] tracking-[0.3em] font-medium uppercase ${dark ? 'text-white/[0.50]' : 'text-dark-text/[0.44]'}`}>
              {meta}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
