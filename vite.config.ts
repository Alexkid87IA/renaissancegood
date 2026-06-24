import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le pré-rendu n'est PAS un plugin Vite : il tourne après le build via
// `scripts/prerender.mjs` (Puppeteer moderne contre `vite preview`).
// Voir le script `build` dans package.json.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
});
