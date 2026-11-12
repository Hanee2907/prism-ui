/// <reference types="vitest" />
import { defineConfig } from 'vite';

// The docs site. Relative paths so it works on GitHub Pages (/prism-ui/).
export default defineConfig({
  base: './',
  test: {
    // Unit tests only; the browser tests in e2e/ run with Playwright.
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
