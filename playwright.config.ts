import { defineConfig, devices } from '@playwright/test';

// Tests run against the built docs site. Locally they use the installed Microsoft Edge;
// in GitHub Actions they use Playwright's own Chromium.
const ci = Boolean(process.env.CI);

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  reporter: ci ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], ...(ci ? {} : { channel: 'msedge' }), viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'phone',
      use: { ...devices['Pixel 7'], ...(ci ? {} : { channel: 'msedge' }) },
    },
  ],
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !ci,
    timeout: 180_000,
  },
});
