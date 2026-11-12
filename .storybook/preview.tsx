import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import '../src/lib/generated/light.css';
import '../src/lib/generated/dark.css';
import '../src/lib/theme.css';
import '../src/lib/components.css';
import { setTheme } from '../src/lib/index';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Day or Midnight',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Day' },
          { value: 'dark', title: 'Midnight' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme === 'dark' ? 'dark' : 'light';
      useEffect(() => {
        setTheme(theme);
        document.body.classList.add('pr');
      }, [theme]);
      return (
        <div style={{ position: 'relative', padding: 32, minWidth: 320 }}>
          <div className="pr-mesh" aria-hidden="true" />
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
