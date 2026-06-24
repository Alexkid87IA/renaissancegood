import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { createRequire } from 'node:module';

// Le build ESM du plugin (index.mjs) appelle `require` et casse en contexte ESM
// ("type": "module"). On force l'entrée CommonJS (index.cjs) via createRequire.
const require = createRequire(import.meta.url);
const vitePrerender = require('vite-plugin-prerender');
const PuppeteerRenderer = vitePrerender.PuppeteerRenderer;

// Routes pré-rendues au build (FR, sans préfixe de langue = canonical / x-default).
// Exclues : /product/:id (piloté par Shopify, handles non énumérables au build),
// /cart, /checkout(/confirmation) (transactionnel), /blog (orphelin), les redirections.
const PRERENDER_ROUTES = [
  '/',
  '/collections/heritage',
  '/collections/versailles',
  '/collections/isis',
  '/shop',
  '/histoire',
  '/manifeste',
  '/fabrication',
  '/opticiens',
  '/faq',
  '/contact',
  '/garantie',
  '/guide-tailles',
  '/livraison',
  '/suivi-commande',
  '/mentions-legales',
  '/confidentialite',
  '/cgv',
  '/cookies',
];

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    // Pré-rendu uniquement au build : le dev (`vite`) n'instancie jamais Puppeteer.
    ...(command === 'build'
      ? [
          vitePrerender({
            staticDir: path.resolve(process.cwd(), 'dist'),
            routes: PRERENDER_ROUTES,
            renderer: new PuppeteerRenderer({
              // Le contenu de la route signale sa fin de montage (cf. PrerenderReady.tsx),
              // après que react-helmet a posé title/meta/canonical/JSON-LD.
              renderAfterDocumentEvent: 'x-prerender-ready',
              maxConcurrentRoutes: 4,
              timeout: 60000,
              headless: true,
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }),
          }),
        ]
      : []),
  ],
  server: {
    host: '0.0.0.0',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          // mapbox-gl chargé uniquement via lazy-load des pages store
          'vendor-shopify': ['@shopify/hydrogen-react'],
        },
      },
    },
    // Increase chunk size warning limit slightly
    chunkSizeWarningLimit: 600,
  },
}));
