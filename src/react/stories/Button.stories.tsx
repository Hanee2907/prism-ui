import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../index';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Start building', variant: 'spectrum', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['spectrum', 'glass', 'ink', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: { description: { component: 'Pill buttons, at least 46px tall. The spectrum one sweeps a beam of light across itself on hover.' } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spectrum: Story = {};
export const Glass: Story = { args: { variant: 'glass', children: 'View components' } };
export const Ink: Story = { args: { variant: 'ink', children: 'Get Prism ✦' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Maybe later' } };
export const Disabled: Story = { args: { disabled: true, children: 'Disabled' } };
export const IconOnly: Story = { args: { variant: 'glass', iconOnly: true, children: '♡', 'aria-label': 'Favourite' } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
