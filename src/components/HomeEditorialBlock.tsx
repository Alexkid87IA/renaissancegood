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
  index,
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
  const labelColor = dark ? 'text-white/34' : 'text-dark-text/38';
  const indexColor = dark ? 'text-bronze/85' : 'text-bronze/80';
  const ghostColor = dark ? 'text-white/[0.055]' : 'text-dark-text/[0.045]';
  const subtitleColor = dark ? 'text-white/58' : 'text-dark-text/66';
  const bodyColor = dark ? 'text-white/47' : 'text-dark-text/58';
  const lineColor = dark ? 'bg-white/16' : 'bg-dark-text/18';
  const primaryButton = dark
    ? 'border-white/80 bg-white text-[#0a0a0a] hover:border-bronze hover:bg-bronze'
    : 'border-dark-text/70 text-dark-text hover:bg-dark-text hover:text-beige';
  const secondaryButton = dark
    ? 'border-white/20 text-white/72 hover:border-bronze/70 hover:text-bronze'
    : 'border-dark-text/16 text-dark-text/52 hover:border-dark-text/45 hover:text-dark-text';

  return (
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
        className={`pointer-events-none absolute -right-8 -top-20 font-display text-[clamp(7rem,12vw,15rem)] leading-none ${ghostColor}`}
      >
        {index}
      </motion.div>

      <motion.div variants={fade} className="mb-8 flex items-center gap-4">
        <span className={`font-display text-3xl italic leading-none ${indexColor}`}>
          {index}
        </span>
        <span className={`h-px w-12 ${dark ? 'bg-white/20' : 'bg-bronze/35'}`} />
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
            <p className={`mt-7 font-sans text-[9px] tracking-[0.3em] font-medium uppercase ${dark ? 'text-white/22' : 'text-dark-text/28'}`}>
              {meta}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
