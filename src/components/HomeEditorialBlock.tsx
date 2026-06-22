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
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  theme?: 'dark' | 'light';
  titleSize?: 'lg' | 'md';
  decorLines?: boolean;
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
  titleSize = 'lg',
  decorLines = true,
  actions = [],
  meta,
  children,
}: HomeEditorialBlockProps) {
  const dark = theme === 'dark';
  const titleClass = titleSize === 'md'
    ? 'text-[clamp(2.5rem,3.6vw,4.4rem)]'
    : 'text-[clamp(3.3rem,5.3vw,6.7rem)]';
  const subtitleClass = titleSize === 'md'
    ? 'text-[clamp(1.5rem,2.2vw,2.4rem)]'
    : 'text-[clamp(1.9rem,3vw,3.35rem)]';
  const titleColor = dark ? 'text-white' : 'text-dark-text';
  const labelColor = dark ? 'text-white/[0.52]' : 'text-dark-text/[0.52]';
  const subtitleColor = dark ? 'text-white/[0.76]' : 'text-dark-text/[0.72]';
  const bodyColor = dark ? 'text-white/[0.70]' : 'text-dark-text/[0.66]';
  const lineColor = dark ? 'bg-bronze/[0.50]' : 'bg-dark-text/[0.22]';
  // Boutons unifies : transparents, texte clair, remplissage au survol (texte qui s'inverse).
  const buttonBorder = dark ? 'border-white/[0.55]' : 'border-dark-text/[0.45]';
  const buttonFill = dark ? 'bg-white' : 'bg-dark-text';
  const buttonText = dark ? 'text-white group-hover/btn:text-[#0a0a0a]' : 'text-dark-text group-hover/btn:text-beige';

  return (
    <motion.div
      ref={panelRef}
      variants={stagger}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      data-home-editorial-block
      className="relative z-10 w-full max-w-xl"
    >
      {label && (
        <motion.div variants={fade} className="mb-8 flex items-center gap-4">
          {decorLines && (
            <span className={`h-px w-16 ${dark ? 'bg-bronze/[0.55]' : 'bg-bronze/[0.45]'}`} />
          )}
          <p className={`font-sans text-[9px] tracking-[0.42em] font-medium uppercase ${labelColor}`}>
            {label}
          </p>
        </motion.div>
      )}

      <motion.h2
        variants={fade}
        className={`font-display ${titleClass} font-bold tracking-normal leading-[0.86] ${titleColor}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fade}
          className={`mt-3 font-display ${subtitleClass} font-light italic tracking-normal leading-none ${subtitleColor}`}
        >
          {subtitle}
        </motion.p>
      )}

      {decorLines ? (
        <motion.div variants={fade} className={`mt-8 mb-8 h-px w-20 ${lineColor}`} />
      ) : (
        <div className="mt-12" />
      )}

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
            <div className="flex flex-wrap items-center gap-6 lg:gap-10">
              {actions.map((action) => {
                const className = `group/btn relative overflow-hidden inline-flex min-w-[14rem] items-center justify-center rounded-2xl border px-9 py-4 ${buttonBorder} transition-colors duration-500`;
                const inner = (
                  <>
                    <span className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/btn:scale-x-100 ${buttonFill}`} />
                    <span className={`relative z-10 font-sans text-[9px] tracking-[0.28em] font-medium uppercase transition-colors duration-500 ${buttonText}`}>
                      {action.label}
                    </span>
                  </>
                );
                return action.href ? (
                  <LocaleLink key={action.label} to={action.href} className={className}>
                    {inner}
                  </LocaleLink>
                ) : (
                  <button key={action.label} type="button" className={className}>
                    {inner}
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
