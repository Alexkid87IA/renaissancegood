import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';
import LocaleLink from '../components/LocaleLink';

const FAQ_QUESTION_KEYS = [
  'paymentMethods', 'modifyOrder', 'invoice',
  'deliveryTimes', 'freeShipping', 'trackOrder', 'internationalShipping',
  'returnPolicy', 'howToReturn', 'refundDelay', 'exchangeFrame',
  'chooseSize', 'prescriptionLenses', 'cleanGlasses', 'warranty',
  'tryBeforeBuy', 'findOptician', 'samePrices',
  'contactService', 'responseDelay', 'customization',
];

const FAQ_CATEGORY_KEYS = [
  { key: 'orderPayment', questionKeys: ['paymentMethods', 'modifyOrder', 'invoice'] },
  { key: 'delivery', questionKeys: ['deliveryTimes', 'freeShipping', 'trackOrder', 'internationalShipping'] },
  { key: 'returnsExchanges', questionKeys: ['returnPolicy', 'howToReturn', 'refundDelay', 'exchangeFrame'] },
  { key: 'productsCare', questionKeys: ['chooseSize', 'prescriptionLenses', 'cleanGlasses', 'warranty'] },
  { key: 'partnerOpticians', questionKeys: ['tryBeforeBuy', 'findOptician', 'samePrices'] },
  { key: 'contactSupport', questionKeys: ['contactService', 'responseDelay', 'customization'] },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-dark-text/8"
    >
      <button
        id={`faq-question-${index}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full py-6 flex items-center justify-between gap-6 text-left group"
      >
        <span className="font-sans text-dark-text text-sm lg:text-base font-medium leading-relaxed flex-1">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} className="text-bronze" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-dark-text/50 text-sm leading-[1.8] font-light pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const { t } = useTranslation('faq');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allFaqItems = useMemo(() => {
    return FAQ_QUESTION_KEYS.map(key => ({
      question: t(`questions.${key}.q`),
      answer: t(`questions.${key}.a`),
    }));
  }, [t]);

  const totalQuestions = allFaqItems.length;

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        url="/faq"
        faqItems={allFaqItems}
      />

      {/* HERO */}
      <section className="bg-[#000000] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('hero.label')}
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('hero.titleLine1')}
              <br />{t('hero.titleLine2')}
            </motion.h1>
            <motion.p variants={fade} className="font-display text-xl lg:text-2xl xl:text-3xl font-light italic text-white/40 tracking-[-0.02em] mb-8">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />
            <motion.div variants={fade} className="flex items-center gap-6">
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-white leading-none">{totalQuestions}</p>
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mt-1">{t('hero.answers')}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-display text-2xl lg:text-3xl font-bold text-white leading-none">{FAQ_CATEGORY_KEYS.length}</p>
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mt-1">{t('hero.categoriesCount')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="space-y-12 lg:space-y-16">
            {FAQ_CATEGORY_KEYS.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.05 }}
              >
                {/* Category header */}
                <div className="mb-6">
                  <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-2">
                    {String(catIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em]">
                    {t(`categoryNames.${category.key}`)}
                  </h2>
                  <div className="w-8 h-px bg-dark-text/15 mt-4" />
                </div>

                {/* Questions */}
                <div>
                  {category.questionKeys.map((qKey, idx) => (
                    <FAQItem key={qKey} question={t(`questions.${qKey}.q`)} answer={t(`questions.${qKey}.a`)} index={idx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('cta.label')}
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('cta.title')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              {t('cta.subtitle')}
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-8" />
            <motion.p variants={fade} className="font-sans text-white/30 text-[13px] lg:text-sm leading-[1.8] font-light mb-10 max-w-lg mx-auto">
              {t('cta.description')}
            </motion.p>
            <motion.div variants={fade} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LocaleLink
                to="/contact"
                className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  {t('cta.contactUs')}
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </LocaleLink>
              <a
                href="tel:+33142868200"
                className="group border border-white/8 px-10 py-4 transition-all duration-500 hover:border-white/20"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  {t('cta.callUs')}
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
