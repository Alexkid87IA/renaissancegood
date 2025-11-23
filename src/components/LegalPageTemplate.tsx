import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LegalPageTemplateProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function LegalPageTemplate({ title, lastUpdated, children }: LegalPageTemplateProps) {
  return (
    <div className="bg-beige min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl lg:text-6xl text-dark-text mb-6">
            {title}
          </h1>
          {lastUpdated && (
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-dark-text/60">
              Dernière mise à jour : {lastUpdated}
            </p>
          )}
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="legal-content">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Styles pour le contenu légal */}
      <style>{`
        .legal-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.875rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        .legal-content h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }

        .legal-content p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(26, 26, 26, 0.8);
          margin-bottom: 1.5rem;
        }

        .legal-content ul, .legal-content ol {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(26, 26, 26, 0.8);
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }

        .legal-content li {
          margin-bottom: 0.75rem;
        }

        .legal-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }

        .legal-content a {
          color: #8b7355;
          text-decoration: none;
          transition: color 0.3s;
        }

        .legal-content a:hover {
          color: #6b5335;
        }

        .legal-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }

        .legal-content th,
        .legal-content td {
          font-family: 'DM Sans', sans-serif;
          padding: 1rem;
          border: 1px solid rgba(139, 115, 85, 0.2);
          text-align: left;
        }

        .legal-content th {
          background-color: rgba(139, 115, 85, 0.05);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}