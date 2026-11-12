import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/react/stories/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Served from /prism-ui/storybook/ on GitHub Pages, so keep asset paths relative.
  viteFinal: async (config) => ({ ...config, base: './' }),
};

export default config;
