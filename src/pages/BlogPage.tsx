import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '../lib/shopify';

// Interface pour les articles
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
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Charger les articles depuis Shopify
    async function loadArticles() {
      try {
        setLoading(true);
        const posts = await getBlogPosts('actualites-1');
        setArticles(posts);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-beige">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-dark-text flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-bronze/20 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-bronze text-xs tracking-[0.3em] uppercase font-bold mb-6"
          >
            Actualités & Culture
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-[-0.03em]">
            Le Manifeste
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Histoires, symboles et savoir-faire. Découvrez l'univers Renaissance 
            au-delà de l'objet.
          </motion.p>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bronze"></div>
            <p className="font-sans text-dark-text/60 mt-4">Chargement des articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 rounded-full bg-dark-text/5 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-bronze" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="font-display text-2xl text-dark-text mb-4">
              Les premiers articles arrivent bientôt
            </h3>
            <p className="font-sans text-dark-text/60 text-lg max-w-md mx-auto">
              Nous préparons du contenu exceptionnel sur nos symboles, notre savoir-faire 
              et l'univers Renaissance.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${article.handle}`} className="group block">
                  {/* Image */}
                  {article.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-dark-text/5 mb-6">
                      <img
                        src={article.image.url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/10 transition-colors duration-500" />
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-dark-text/60 font-sans">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      <time>
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" strokeWidth={1.5} />
                      <span>{article.author.name}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl text-dark-text mb-3 group-hover:text-bronze transition-colors duration-300">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-sans text-dark-text/70 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-bronze font-sans text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-dark-text py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
              Ne Manquez Aucun Article
            </h3>
            <p className="font-sans text-white/70 text-lg mb-8">
              Recevez nos nouveaux articles directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-bronze transition-colors font-sans"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-bronze text-white font-sans font-medium hover:bg-bronze/90 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}