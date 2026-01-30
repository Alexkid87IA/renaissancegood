import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Clock, Send, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';
import LocaleLink from '../components/LocaleLink';

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('contactPage.seo.title')}
        description={t('contactPage.seo.description')}
        url="/contact"
      />

      {/* HERO — Split éditorial */}
      <div className="h-[100dvh] lg:h-screen relative overflow-hidden">
        {/* DESKTOP */}
        <div className="relative h-full overflow-hidden hidden lg:flex">
          <div className="w-[42%] bg-[#000000] relative flex flex-col justify-center px-12 xl:px-20 2xl:px-28">
            <div className="absolute top-10 left-12 xl:left-20 2xl:left-28">
              <p className="font-sans text-white/25 text-[9px] tracking-[0.4em] font-medium uppercase">
                {t('contactPage.hero.label')}
              </p>
            </div>

            <motion.div
              ref={heroRef}
              variants={stagger}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.h1 variants={fade} className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-3 tracking-[-0.03em] leading-[0.9]">
                {t('contactPage.hero.titleLine1')}
                <br />{t('contactPage.hero.titleLine2')}
              </motion.h1>
              <motion.p variants={fade} className="font-display text-2xl xl:text-3xl font-light italic text-white/50 tracking-[-0.02em] leading-[1] mb-8 xl:mb-10">
                {t('contactPage.hero.subtitle')}
              </motion.p>

              <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8 xl:mb-10" />

              <motion.p variants={fade} className="font-sans text-white/35 text-[13px] xl:text-sm leading-[1.9] font-light max-w-md mb-10 xl:mb-14">
                {t('contactPage.hero.description')}
              </motion.p>

              <motion.div variants={fade}>
                <button
                  onClick={() => {
                    const section = document.querySelector('[data-contact-form]');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative overflow-hidden border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('contactPage.hero.cta')}
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-10 left-12 xl:left-20 2xl:left-28 flex items-center gap-3">
              <div className="w-8 h-px bg-white/15" />
              <span className="font-sans text-white/15 text-[9px] tracking-[0.3em] uppercase">{t('contactPage.hero.scroll')}</span>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/campgane.png"
              alt="Renaissance Paris - Contact"
              className="absolute inset-0 w-full h-full object-cover"
              fetchpriority="high"
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000]/20 to-transparent" />
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative h-full overflow-hidden lg:hidden flex flex-col">
          <div className="relative h-[50%] overflow-hidden">
            <img
              src="https://renaissance-cdn.b-cdn.net/campgane.png"
              alt="Renaissance Paris - Contact"
              className="w-full h-full object-cover object-center"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-transparent to-[#000000]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-24 left-6"
            >
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-sans font-medium">
                {t('contactPage.hero.label')}
              </p>
            </motion.div>
          </div>

          <div className="flex-1 bg-[#000000] px-6 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2 tracking-[-0.03em] leading-[0.9]">
                {t('contactPage.hero.titleMobile')}
              </h1>
              <p className="font-display text-lg sm:text-xl font-light italic text-white/50 tracking-[-0.02em] mb-5">
                {t('contactPage.hero.subtitle')}
              </p>
              <div className="w-10 h-px bg-white/15 mb-5" />
              <p className="text-white/35 text-sm font-sans leading-relaxed font-light mb-6">
                {t('contactPage.hero.descriptionMobile')}
              </p>
              <button
                onClick={() => {
                  const section = document.querySelector('[data-contact-form]');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden w-full border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60 active:scale-[0.98]"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  {t('contactPage.hero.cta')}
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTACT INFO CARDS */}
      <section className="bg-[#000000]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: t('contactPage.cards.emailTitle'),
                detail: t('contactPage.cards.emailDetail'),
                sub: t('contactPage.cards.emailSub'),
                href: 'mailto:contact@renaissance-eyewear.fr'
              },
              {
                icon: Phone,
                title: t('contactPage.cards.phoneTitle'),
                detail: t('contactPage.cards.phoneDetail'),
                sub: t('contactPage.cards.phoneSub'),
                href: 'tel:+33142868200'
              },
              {
                icon: Clock,
                title: t('contactPage.cards.hoursTitle'),
                detail: t('contactPage.cards.hoursDetail'),
                sub: t('contactPage.cards.hoursSub'),
                href: null
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#000000] py-12 lg:py-16 px-6 text-center flex flex-col items-center"
              >
                <item.icon className="w-5 h-5 text-bronze mb-6" strokeWidth={1.5} />
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mb-3">
                  {item.title}
                </p>
                {item.href ? (
                  <a href={item.href} className="block font-sans text-base lg:text-lg font-medium text-white mb-2 hover:text-bronze transition-colors duration-500">
                    {item.detail}
                  </a>
                ) : (
                  <p className="font-display text-xl lg:text-2xl font-bold text-white mb-2">
                    {item.detail}
                  </p>
                )}
                <p className="font-sans text-xs text-white/30 font-light">
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE + INFOS */}
      <section className="py-20 sm:py-28 lg:py-32" data-contact-form>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* LEFT — Formulaire */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-dark-text/30 text-[9px] tracking-[0.4em] font-medium uppercase mb-4">
                {t('contactPage.formSection.label')}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-3">
                {t('contactPage.formSection.title')}
              </h2>
              <p className="font-display text-lg lg:text-xl font-light italic text-dark-text/40 tracking-[-0.02em] mb-8">
                {t('contactPage.formSection.subtitle')}
              </p>
              <div className="w-12 h-px bg-dark-text/15 mb-10" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-2">
                      {t('contactPage.formSection.nameLabel')}
                    </label>
                    <input
                      type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      placeholder={t('contactPage.formSection.namePlaceholder')}
                      className="w-full px-0 py-3 border-0 border-b border-dark-text/15 bg-transparent font-sans text-sm text-dark-text placeholder:text-dark-text/25 focus:outline-none focus:border-bronze transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-2">
                      {t('contactPage.formSection.emailLabel')}
                    </label>
                    <input
                      type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      placeholder={t('contactPage.formSection.emailPlaceholder')}
                      className="w-full px-0 py-3 border-0 border-b border-dark-text/15 bg-transparent font-sans text-sm text-dark-text placeholder:text-dark-text/25 focus:outline-none focus:border-bronze transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-2">
                      {t('contactPage.formSection.phoneLabel')}
                    </label>
                    <input
                      type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={t('contactPage.formSection.phonePlaceholder')}
                      className="w-full px-0 py-3 border-0 border-b border-dark-text/15 bg-transparent font-sans text-sm text-dark-text placeholder:text-dark-text/25 focus:outline-none focus:border-bronze transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-2">
                      {t('contactPage.formSection.subjectLabel')}
                    </label>
                    <select
                      id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-0 py-3 border-0 border-b border-dark-text/15 bg-transparent font-sans text-sm text-dark-text focus:outline-none focus:border-bronze transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option value="general">{t('contactPage.formSection.subjectGeneral')}</option>
                      <option value="order">{t('contactPage.formSection.subjectOrder')}</option>
                      <option value="product">{t('contactPage.formSection.subjectProduct')}</option>
                      <option value="return">{t('contactPage.formSection.subjectReturn')}</option>
                      <option value="sav">{t('contactPage.formSection.subjectSav')}</option>
                      <option value="partner">{t('contactPage.formSection.subjectPartner')}</option>
                      <option value="other">{t('contactPage.formSection.subjectOther')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-sans text-[9px] tracking-[0.25em] font-bold text-dark-text uppercase mb-2">
                    {t('contactPage.formSection.messageLabel')}
                  </label>
                  <textarea
                    id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                    placeholder={t('contactPage.formSection.messagePlaceholder')}
                    className="w-full px-0 py-3 border-0 border-b border-dark-text/15 bg-transparent font-sans text-sm text-dark-text placeholder:text-dark-text/25 focus:outline-none focus:border-bronze transition-colors duration-300 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`group relative overflow-hidden border px-10 py-4 transition-all duration-500 ${
                      isSubmitted
                        ? 'border-green-600 bg-green-600'
                        : isSubmitting
                        ? 'border-dark-text/20 opacity-60 cursor-not-allowed'
                        : 'border-dark-text hover:border-dark-text'
                    }`}
                  >
                    <span className={`relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase flex items-center gap-2 transition-colors duration-500 ${
                      isSubmitted
                        ? 'text-white'
                        : isSubmitting
                        ? 'text-dark-text/50'
                        : 'text-dark-text group-hover:text-beige'
                    }`}>
                      {isSubmitted ? (
                        <>{t('contactPage.formSection.sent')}</>
                      ) : isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border border-dark-text/30 border-t-dark-text rounded-full animate-spin" />
                          {t('contactPage.formSection.sending')}
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          {t('contactPage.formSection.submit')}
                        </>
                      )}
                    </span>
                    {!isSubmitted && !isSubmitting && (
                      <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    )}
                  </button>
                </div>

                <p className="font-sans text-[10px] text-dark-text/30">
                  {t('contactPage.formSection.requiredFields')}
                </p>
              </form>
            </motion.div>

            {/* RIGHT — Infos complémentaires */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 lg:pt-20"
            >
              {/* Localisation */}
              <div className="border border-dark-text/8 p-8 lg:p-10">
                <MapPin className="w-5 h-5 text-bronze mb-5" strokeWidth={1.5} />
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/30 mb-3">
                  {t('contactPage.sidebar.locationLabel')}
                </p>
                <p className="font-display text-xl font-bold text-dark-text mb-2">
                  {t('contactPage.sidebar.locationTitle')}
                </p>
                <p className="font-sans text-xs text-dark-text/40 font-light leading-relaxed">
                  {t('contactPage.sidebar.locationDescription')}
                </p>
              </div>

              {/* Opticiens */}
              <div className="bg-[#0a0a0a] p-8 lg:p-10">
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/25 mb-4">
                  {t('contactPage.sidebar.networkLabel')}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-[-0.02em]">
                  {t('contactPage.sidebar.networkTitle')}
                </h3>
                <p className="font-sans text-white/35 text-sm leading-[1.8] font-light mb-8">
                  {t('contactPage.sidebar.networkDescription')}
                </p>
                <LocaleLink
                  to="/opticiens"
                  className="group relative overflow-hidden inline-block border border-white/15 px-8 py-3.5 transition-all duration-500 hover:border-bronze/60"
                >
                  <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                    {t('contactPage.sidebar.networkCta')}
                  </span>
                  <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </LocaleLink>
              </div>

              {/* Réseaux sociaux */}
              <div className="border border-dark-text/8 p-8 lg:p-10">
                <p className="font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-dark-text/30 mb-4">
                  {t('contactPage.sidebar.socialLabel')}
                </p>
                <p className="font-sans text-xs text-dark-text/40 font-light leading-relaxed mb-6">
                  {t('contactPage.sidebar.socialDescription')}
                </p>
                <div className="flex gap-3">
                  {[
                    { label: 'Instagram', href: 'https://instagram.com/renaissance.eyewear' },
                    { label: 'Facebook', href: 'https://facebook.com/renaissance.eyewear' }
                  ].map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden border border-dark-text/10 px-5 py-2.5 transition-all duration-500 hover:border-dark-text"
                    >
                      <span className="relative z-10 font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-dark-text/50 group-hover:text-beige transition-colors duration-500">
                        {social.label}
                      </span>
                      <span className="absolute inset-0 bg-dark-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
