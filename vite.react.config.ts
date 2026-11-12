import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The React package: dist/react/index.js (+ prism-ui.css and .d.ts types). React itself stays a peer.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist/react',
    emptyOutDir: false,
    lib: {
      entry: 'src/react/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { assetFileNames: 'prism-ui[extname]' },
    },
  },
});
