import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '../lib/shopify';
import { useLocale } from '../contexts/LocaleContext';
import LocaleLink from '../components/LocaleLink';
import SEO from '../components/SEO';
import { stagger, fade } from '../components/shared';

interface BlogArticle {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  image: {
    url: string;
  } | null;
  publishedAt: string;
  author: {
    name: string;
  };
}

export default function BlogPage() {
  const { t } = useTranslation('histoire');
  const { locale, shopifyLanguage } = useLocale();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-US';

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadArticles() {
      try {
        setLoading(true);
        const posts = await getBlogPosts('actualites-1', shopifyLanguage);
        setArticles(posts);
      } catch {
        // Articles loading error silently handled
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [shopifyLanguage]);

  return (
    <div className="min-h-screen bg-beige">
      <SEO
        title={t('blog.seoTitle')}
        description={t('blog.seoDescription')}
        url="/blog"
      />

      {/* HERO — Dark éditorial */}
      <section className="bg-[#000000] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={heroRef}
            variants={stagger}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('blog.heroLabel')}
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('blog.heroTitleLine1')}
              <br />{t('blog.heroTitleLine2')}
            </motion.h1>
            <motion.p variants={fade} className="font-display text-xl lg:text-2xl xl:text-3xl font-light italic text-white/40 tracking-[-0.02em] mb-8">
              {t('blog.heroSubtitle')}
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mb-8" />
            <motion.p variants={fade} className="font-sans text-white/30 text-[13px] lg:text-sm leading-[1.8] font-light max-w-lg">
              {t('blog.heroDescription')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-dark-text mb-4" />
              <p className="font-sans text-dark-text/30 text-[11px] tracking-[0.2em] uppercase font-medium">
                {t('blog.loading')}
              </p>
            </div>
          ) : articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Calendar className="w-8 h-8 text-bronze/40 mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-dark-text tracking-[-0.02em] mb-3">
                {t('blog.emptyTitle')}
              </h3>
              <p className="font-sans text-dark-text/40 text-sm leading-[1.8] font-light max-w-md mx-auto">
                {t('blog.emptyDescription')}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
                >
                  <LocaleLink to={`/blog/${article.handle}`} className="group block">
                    {/* Image */}
                    {article.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-dark-text/5 mb-6">
                        <img
                          src={article.image.url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-colors duration-500" />
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] uppercase text-dark-text/30 font-medium">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <time>
                          {new Date(article.publishedAt).toLocaleDateString(dateLocale, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] uppercase text-dark-text/30 font-medium">
                        <User className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span>{article.author.name}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl lg:text-2xl font-bold text-dark-text tracking-[-0.02em] mb-3 group-hover:text-bronze transition-colors duration-500">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="font-sans text-dark-text/40 text-sm leading-[1.8] font-light mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-bronze group-hover:gap-3 transition-all duration-500">
                      <span>{t('blog.readArticle')}</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </div>
                  </LocaleLink>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA NEWSLETTER */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              {t('blog.newsletterLabel')}
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              {t('blog.newsletterTitle')}
            </motion.h2>
            <motion.p variants={fade} className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              {t('blog.newsletterSubtitle')}
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-10" />
            <motion.form variants={fade} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.emailPlaceholder')}
                className="flex-1 px-5 py-4 border border-white/10 bg-white/5 font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-bronze/60 transition-colors duration-300"
              />
              <button
                type="submit"
                className="group relative overflow-hidden border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  {t('blog.subscribe')}
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
