import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LocaleLink from '../components/LocaleLink';
import SEO from '../components/SEO';

export default function ManifestePage() {
  const { t } = useTranslation('histoire');
  const paragraphs = t('manifestePage.paragraphs', { returnObjects: true }) as string[];
  const proofs = t('manifestePage.proofs', { returnObjects: true }) as string[];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-[#0a0a0a]" data-header-theme="dark">
      <SEO
        title={t('page.manifeste.seoTitle')}
        description={t('page.manifeste.seoDescription')}
        url="/manifeste"
      />

      {/* ACCROCHE — plein écran, les 3 premières secondes */}
      <section className="relative h-[100svh] flex items-center justify-center px-6 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="text-center font-display text-white text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.98] tracking-[-0.03em] whitespace-pre-line"
        >
          {t('manifestePage.hook')}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-bronze/[0.6] text-[9px] tracking-[0.42em] uppercase"
        >
          {t('manifestePage.label')}
        </motion.span>
      </section>

      {/* LE TEXTE */}
      <section className="mx-auto max-w-2xl px-6 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9 }}
          className="text-center font-display italic text-white/90 text-3xl md:text-[2.4rem] leading-[1.15] tracking-[-0.02em] mb-16 md:mb-20"
        >
          {t('manifestePage.devise')}
        </motion.p>

        <div className="space-y-10 md:space-y-12">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9 }}
              className="font-sans text-white/[0.78] text-[15px] md:text-lg leading-[1.95] font-light"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9 }}
          className="mt-16 md:mt-20 text-center font-display italic text-white/85 text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.02em]"
        >
          {t('manifestePage.closing')}
        </motion.p>
      </section>

      {/* LES PREUVES — le fossé, concret */}
      <section className="border-t border-white/[0.08] bg-[#0c0c0c]">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center font-sans text-bronze/[0.6] text-[9px] tracking-[0.42em] uppercase mb-12 md:mb-16"
          >
            {t('manifestePage.proofsLabel')}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14">
            {proofs.map((proof, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="font-display text-white/90 text-xl md:text-2xl leading-[1.25] tracking-[-0.01em]"
              >
                {proof}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* CLÔTURE — pont produit */}
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <LocaleLink to="/shop">
            <button className="group relative overflow-hidden rounded-2xl border border-white/[0.4] px-9 py-4 transition-all duration-500">
              <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white group-hover:text-[#0a0a0a] transition-colors duration-500">
                {t('manifestePage.cta')}
              </span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </LocaleLink>
        </motion.div>
      </section>
    </main>
  );
}
