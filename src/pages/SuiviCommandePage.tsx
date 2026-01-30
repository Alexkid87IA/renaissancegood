import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';
import LocaleLink from '../components/LocaleLink';

const FAQ_ITEM_KEYS = ['whereIsOrder', 'deliveryTimes', 'noConfirmation', 'modifyOrder', 'returnPolicy', 'refundDelay'];

const HERO_IMAGE = 'https://renaissance-cdn.b-cdn.net/Generated%20Image%20January%2029%2C%202026%20-%205_07AM.jpeg';

export default function SuiviCommandePage() {
  const { t } = useTranslation('contact');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, amount: 0.2 });

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderNumber.trim() || !email.trim()) {
      setError(t('suiviCommande.form.error'));
      return;
    }

    window.open(
      'https://renaissance-eyewear.myshopify.com/account/login',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('suiviCommande.seo.title')}
        description={t('suiviCommande.seo.description')}
        url="/suivi-commande"
      />

      {/* ═══════════════ HERO — DESKTOP SPLIT ═══════════════ */}
      <div className="hidden lg:flex h-screen relative overflow-hidden">
        {/* LEFT — Dark panel */}
        <div className="w-[44%] bg-[#000000] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
          {/* Top label */}
          <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
            <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase">
              {t('suiviCommande.hero.label')}
            </p>
          </div>

          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="relative z-10"
          >
            <motion.h1
              variants={fade}
              className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.9]"
            >
              {t('suiviCommande.hero.titleLine1')}
              <br />{t('suiviCommande.hero.titleLine2')}
            </motion.h1>
            <motion.p
              variants={fade}
              className="font-display text-2xl xl:text-3xl font-light italic text-white/45 tracking-[-0.02em] leading-[1] mb-10 xl:mb-12"
            >
              {t('suiviCommande.hero.subtitle')}
            </motion.p>

            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-10 xl:mb-12" />

            {/* ── Form ── */}
            <motion.form variants={fade} onSubmit={handleSubmit} className="max-w-sm space-y-6">
              <div className="relative">
                <label
                  htmlFor="orderNumber"
                  className={`block font-sans text-[9px] tracking-[0.25em] font-bold uppercase mb-2.5 transition-colors duration-300 ${
                    focusedField === 'order' ? 'text-bronze' : 'text-white/30'
                  }`}
                >
                  {t('suiviCommande.form.orderNumberLabel')}
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  onFocus={() => setFocusedField('order')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t('suiviCommande.form.orderPlaceholder')}
                  className="w-full px-0 py-3 border-0 border-b border-white/12 bg-transparent font-sans text-[15px] text-white placeholder:text-white/15 focus:outline-none focus:border-bronze/60 transition-colors duration-500"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block font-sans text-[9px] tracking-[0.25em] font-bold uppercase mb-2.5 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-bronze' : 'text-white/30'
                  }`}
                >
                  {t('suiviCommande.form.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t('suiviCommande.form.emailPlaceholder')}
                  className="w-full px-0 py-3 border-0 border-b border-white/12 bg-transparent font-sans text-[15px] text-white placeholder:text-white/15 focus:outline-none focus:border-bronze/60 transition-colors duration-500"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-[11px] text-red-400/80 font-light"
                >
                  {error}
                </motion.p>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="group relative overflow-hidden w-full bg-white py-4 transition-all duration-500 hover:bg-bronze"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-[#0a0a0a] flex items-center justify-center gap-2.5 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('suiviCommande.form.submit')}
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </motion.form>

            {/* Réassurance */}
            <motion.div variants={fade} className="mt-12 xl:mt-16">
              <div className="flex items-center gap-6">
                {[t('suiviCommande.reassurance.freeShipping'), t('suiviCommande.reassurance.warranty'), t('suiviCommande.reassurance.returns')].map((item, i) => (
                  <span key={item} className="flex items-center gap-6">
                    {i > 0 && <span className="w-px h-3 bg-white/10" />}
                    <span className="font-sans text-white/15 text-[9px] tracking-[0.12em] font-light">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom scroll indicator */}
          <div className="absolute bottom-10 left-12 xl:left-20 2xl:left-28 flex items-center gap-3">
            <div className="w-8 h-px bg-white/12" />
            <span className="font-sans text-white/12 text-[9px] tracking-[0.3em] uppercase">{t('suiviCommande.hero.scroll')}</span>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="flex-1 relative overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Renaissance Paris — Suivi de commande"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
          />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#000000] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000000]/30 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#000000]/20 to-transparent" />
        </div>
      </div>

      {/* ═══════════════ HERO — MOBILE ═══════════════ */}
      <div className="lg:hidden relative min-h-screen flex flex-col">
        {/* Image top */}
        <div className="relative h-[45vh] min-h-[280px] overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Renaissance Paris — Suivi de commande"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 via-transparent to-[#000000]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-24 left-6"
          >
            <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
              {t('suiviCommande.hero.label')}
            </p>
          </motion.div>
        </div>

        {/* Content bottom */}
        <div className="flex-1 bg-[#000000] px-6 py-8 sm:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="font-display text-[28px] sm:text-4xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.9]">
              {t('suiviCommande.hero.titleLine1')}
              <br />{t('suiviCommande.hero.titleLine2')}
            </h1>
            <p className="font-display text-lg sm:text-xl font-light italic text-white/45 tracking-[-0.02em] mb-6">
              {t('suiviCommande.hero.subtitle')}
            </p>
            <div className="w-10 h-px bg-white/15 mb-6" />

            {/* Form mobile */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="orderNumberMobile" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-white/30 uppercase mb-2.5">
                  {t('suiviCommande.form.orderNumberLabel')}
                </label>
                <input
                  type="text"
                  id="orderNumberMobile"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder={t('suiviCommande.form.orderPlaceholder')}
                  className="w-full px-0 py-3 border-0 border-b border-white/12 bg-transparent font-sans text-[15px] text-white placeholder:text-white/15 focus:outline-none focus:border-bronze/60 transition-colors duration-500"
                />
              </div>
              <div>
                <label htmlFor="emailMobile" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-white/30 uppercase mb-2.5">
                  {t('suiviCommande.form.emailLabel')}
                </label>
                <input
                  type="email"
                  id="emailMobile"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('suiviCommande.form.emailPlaceholder')}
                  className="w-full px-0 py-3 border-0 border-b border-white/12 bg-transparent font-sans text-[15px] text-white placeholder:text-white/15 focus:outline-none focus:border-bronze/60 transition-colors duration-500"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-[11px] text-red-400/80 font-light"
                >
                  {error}
                </motion.p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full bg-white py-4 transition-all duration-500 hover:bg-bronze active:scale-[0.98]"
                >
                  <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-[#0a0a0a] flex items-center justify-center gap-2.5">
                    {t('suiviCommande.form.submit')}
                    <ArrowRight size={11} />
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4">
              {[t('suiviCommande.reassurance.freeShipping'), t('suiviCommande.reassurance.warranty'), t('suiviCommande.reassurance.returns')].map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && <span className="w-px h-2.5 bg-white/10" />}
                  <span className="font-sans text-white/15 text-[8px] tracking-[0.1em] font-light">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════ SECTION FAQ — Accordion ═══════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 20 }}
            animate={infoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14"
          >
            <div>
              <p className="font-sans text-[9px] tracking-[0.35em] text-dark-text/35 uppercase mb-4 font-medium">
                {t('suiviCommande.faqSection.label')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-text tracking-[-0.03em] leading-[0.9]">
                {t('suiviCommande.faqSection.titleLine1')}
                <br />
                <span className="font-light italic tracking-[-0.02em]">{t('suiviCommande.faqSection.titleLine2')}</span>
              </h2>
            </div>
            <LocaleLink
              to="/faq"
              className="font-sans text-[9px] tracking-[0.2em] text-dark-text/40 uppercase hover:text-dark-text transition-colors duration-500 self-start sm:self-auto"
            >
              {t('suiviCommande.faqSection.allQuestions')} &rarr;
            </LocaleLink>
          </motion.div>

          {/* Accordion */}
          <div className="border-t border-dark-text/8">
            {FAQ_ITEM_KEYS.map((key, index) => (
              <FAQAccordionItem key={key} question={t(`suiviCommande.faqSection.questions.${key}.q`)} answer={t(`suiviCommande.faqSection.questions.${key}.a`)} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BOTTOM ═══════════════ */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('suiviCommande.ctaBottom.label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('suiviCommande.ctaBottom.title')}
            </h2>
            <p className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              {t('suiviCommande.ctaBottom.subtitle')}
            </p>
            <div className="w-12 h-px bg-white/15 mx-auto mb-10" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LocaleLink
                to="/contact"
                className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  {t('suiviCommande.ctaBottom.contactUs')}
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </LocaleLink>
              <LocaleLink
                to="/faq"
                className="group border border-white/8 px-10 py-4 transition-all duration-500 hover:border-white/20"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/35 group-hover:text-white/60 transition-colors duration-500">
                  {t('suiviCommande.ctaBottom.viewFaq')}
                </span>
              </LocaleLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FAQAccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
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
        onClick={() => setIsOpen(!isOpen)}
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
