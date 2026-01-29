import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostByHandle } from '../lib/shopify';
import { createSanitizedMarkup } from '../lib/sanitize';
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

export default function BlogArticlePage() {
  const { handle } = useParams<{ handle: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadArticle() {
      if (!handle) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const post = await getBlogPostByHandle('actualites-1', handle);
        setArticle(post);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [handle]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-dark-text mb-4" />
          <p className="font-sans text-dark-text/30 text-[11px] tracking-[0.2em] uppercase font-medium">
            Chargement de l'article...
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
            Article introuvable
          </h1>
          <p className="font-sans text-white/35 text-sm leading-[1.8] font-light mb-8">
            Cet article n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/blog"
            className="group relative overflow-hidden inline-flex items-center gap-2 border border-white/15 px-8 py-4 transition-all duration-500 hover:border-bronze/60"
          >
            <ArrowLeft className="w-4 h-4 relative z-10 text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500" />
            <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
              Retour aux articles
            </span>
            <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Back bar */}
      <div className="bg-[#000000] border-b border-white/5">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-white/30 hover:text-bronze transition-colors duration-500"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            Retour aux articles
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {article.image && (
        <div className="relative h-[50vh] lg:h-[60vh] bg-[#000000] overflow-hidden">
          <img
            src={article.image.url}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-transparent to-beige" />
        </div>
      )}

      {/* Article Header */}
      <article className="max-w-[900px] mx-auto px-6 md:px-12 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <p className="font-sans text-[9px] tracking-[0.3em] font-bold text-bronze uppercase mb-6">
            Le Manifeste
          </p>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-text tracking-[-0.03em] leading-[0.95] mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="font-display text-lg lg:text-xl font-light italic text-dark-text/40 tracking-[-0.02em] mb-8">
              {article.excerpt}
            </p>
          )}

          <div className="w-12 h-px bg-dark-text/15 mb-8" />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-dark-text/8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-dark-text/[0.04] flex items-center justify-center">
                <User className="w-4 h-4 text-bronze" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-dark-text">{article.author.name}</p>
                <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-dark-text/30 font-medium">Renaissance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] uppercase text-dark-text/30 font-medium">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <time>
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>

            {/* Share Button */}
            <div className="ml-auto relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 border border-dark-text/10 hover:border-bronze/40 transition-colors duration-500 font-sans text-[9px] tracking-[0.2em] font-medium uppercase text-dark-text/40 hover:text-bronze"
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
                Partager
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-dark-text/8 shadow-lg z-50">
                  {[
                    { platform: 'facebook', icon: Facebook, label: 'Facebook' },
                    { platform: 'twitter', icon: Twitter, label: 'Twitter' },
                    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                  ].map(({ platform, icon: Icon, label }) => (
                    <button
                      key={platform}
                      onClick={() => handleShare(platform)}
                      className="flex items-center gap-3 w-full px-5 py-3 hover:bg-dark-text/[0.03] transition-colors duration-300 font-sans text-[10px] tracking-[0.1em] uppercase text-dark-text/50 hover:text-bronze text-left"
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="article-content"
          dangerouslySetInnerHTML={createSanitizedMarkup(article.contentHtml)}
        />

        {/* Author Bio */}
        <div className="mt-16 pt-12 border-t border-dark-text/8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-dark-text/[0.04] flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-bronze" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-dark-text tracking-[-0.02em] mb-2">
                {article.author.name}
              </h3>
              <p className="font-sans text-dark-text/40 text-sm leading-[1.8] font-light">
                Membre de l'équipe Renaissance, passionné par l'artisanat d'excellence
                et le storytelling qui donne du sens à chaque création.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-[#0a0a0a] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            ref={ctaRef}
            variants={stagger}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.p variants={fade} className="font-sans text-white/20 text-[9px] tracking-[0.4em] font-medium uppercase mb-6">
              Nos Créations
            </motion.p>
            <motion.h2 variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[0.95] mb-3">
              Découvrez nos collections.
            </motion.h2>
            <motion.p variants={fade} className="font-display text-lg lg:text-xl font-light italic text-white/35 tracking-[-0.02em] mb-8">
              Chaque symbole raconte une histoire.
            </motion.p>
            <motion.div variants={fade} className="w-12 h-px bg-white/15 mx-auto mb-10" />
            <motion.div variants={fade}>
              <Link
                to="/collections"
                className="group relative overflow-hidden inline-block border border-white/15 px-10 py-4 transition-all duration-500 hover:border-bronze/60"
              >
                <span className="relative z-10 font-sans text-[9px] tracking-[0.3em] font-medium uppercase text-white/70 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  Voir les collections
                </span>
                <span className="absolute inset-0 bg-bronze transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Style pour le contenu HTML */}
      <style>{`
        .article-content {
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.9;
          font-size: 0.9375rem;
          color: rgba(26, 26, 26, 0.55);
          font-weight: 300;
        }

        .article-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .article-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .article-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }

        .article-content a {
          color: #8b7355;
          text-decoration: none;
          transition: color 0.3s;
        }

        .article-content a:hover {
          color: #6b5335;
        }

        .article-content ul, .article-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: rgba(26, 26, 26, 0.55);
          font-weight: 300;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.9;
          font-size: 0.9375rem;
        }

        .article-content blockquote {
          border-left: 2px solid #8b7355;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.125rem;
          color: rgba(26, 26, 26, 0.5);
          line-height: 1.8;
        }

        .article-content img {
          width: 100%;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
