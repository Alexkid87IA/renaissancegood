import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostByHandle } from '../lib/shopify';
import { createSanitizedMarkup } from '../lib/sanitize';

// Interface pour l'article
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

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Charger l'article depuis Shopify
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bronze mb-4"></div>
          <p className="font-sans text-dark-text/60">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="font-display text-4xl text-dark-text mb-4">Article introuvable</h1>
          <p className="font-sans text-dark-text/60 mb-8">
            Cet article n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-text text-white font-sans hover:bg-dark-text/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Back Button */}
      <div className="bg-white border-b border-dark-text/10">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-dark-text/60 hover:text-bronze transition-colors font-sans text-sm"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Retour aux articles
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {article.image && (
        <div className="relative h-[60vh] bg-dark-text overflow-hidden">
          <img
            src={article.image.url}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-beige" />
        </div>
      )}

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-bronze/10 text-bronze font-sans text-xs tracking-wider uppercase font-bold">
              Le Manifeste
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-dark-text mb-6 leading-tight tracking-[-0.02em]">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="font-sans text-xl text-dark-text/70 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-dark-text/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center">
                <User className="w-6 h-6 text-bronze" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans font-medium text-dark-text">{article.author.name}</p>
                <p className="font-sans text-sm text-dark-text/60">Renaissance</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-dark-text/60 font-sans text-sm">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
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
                className="flex items-center gap-2 px-4 py-2 border border-dark-text/20 hover:border-bronze hover:text-bronze transition-colors font-sans text-sm"
              >
                <Share2 className="w-4 h-4" strokeWidth={2} />
                Partager
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-dark-text/10 shadow-lg p-2 z-50">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-dark-text/5 transition-colors font-sans text-sm text-left"
                  >
                    <Facebook className="w-4 h-4" strokeWidth={2} />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-dark-text/5 transition-colors font-sans text-sm text-left"
                  >
                    <Twitter className="w-4 h-4" strokeWidth={2} />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-dark-text/5 transition-colors font-sans text-sm text-left"
                  >
                    <Linkedin className="w-4 h-4" strokeWidth={2} />
                    LinkedIn
                  </button>
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
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={createSanitizedMarkup(article.contentHtml)}
        />

        {/* Author Bio */}
        <div className="mt-16 pt-12 border-t border-dark-text/10">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-bronze/10 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-bronze" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-2xl text-dark-text mb-2">
                {article.author.name}
              </h3>
              <p className="font-sans text-dark-text/70 leading-relaxed">
                Membre de l'équipe Renaissance, passionné par l'artisanat d'excellence 
                et le storytelling qui donne du sens à chaque création.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-dark-text py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-3xl md:text-4xl text-white mb-6">
              Découvrez Nos Collections
            </h3>
            <p className="font-sans text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Chaque symbole raconte une histoire. Explorez nos créations et 
              trouvez celle qui vous ressemble.
            </p>
            <Link
              to="/collections"
              className="inline-block px-8 py-4 bg-bronze text-white font-sans font-medium hover:bg-bronze/90 transition-colors"
            >
              Voir les Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Style pour le contenu HTML */}
      <style>{`
        .prose {
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        
        .prose h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .prose h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose strong {
          font-weight: 600;
          color: #8b7355;
        }
        
        .prose a {
          color: #8b7355;
          text-decoration: underline;
          transition: opacity 0.2s;
        }
        
        .prose a:hover {
          opacity: 0.7;
        }
        
        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }
        
        .prose blockquote {
          border-left: 4px solid #8b7355;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgba(26, 26, 26, 0.7);
        }
        
        .prose img {
          width: 100%;
          border-radius: 0;
          margin: 2rem 0;
        }
        
        .prose code {
          background: rgba(26, 26, 26, 0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}