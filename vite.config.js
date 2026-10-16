import { defineConfig } from 'vite';

// Base relative : compatible avec GitHub Pages sur tout dépôt projet.
export default defineConfig({ base: './', build: { outDir: 'dist', emptyOutDir: true } });
