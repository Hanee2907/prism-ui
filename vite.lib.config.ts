import { defineConfig } from 'vite';

// The library itself: dist/lib/prism-ui.js and dist/lib/prism-ui.css, so any project can link them.
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    lib: {
      entry: 'src/lib/index.ts',
      name: 'PrismUI',
      formats: ['es', 'iife'],
      fileName: (format) => (format === 'es' ? 'prism-ui.js' : 'prism-ui.iife.js'),
    },
    rollupOptions: {
      output: { assetFileNames: 'prism-ui[extname]', exports: 'named' },
    },
  },
});
