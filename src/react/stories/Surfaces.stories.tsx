import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup, Badge, Button, Card, Chip, Eyebrow, Heading, Lens, Progress, Pulse, Ring, Switch } from '../index';

const meta = {
  title: 'Components/Surfaces',
  component: Lens,
  parameters: {
    docs: {
      description: {
        component: 'Lens is the signature card: move the pointer over it and a soft light and a rainbow edge follow. Cards, chips, badges, progress and avatars share the same glass.',
      },
    },
  },
} satisfies Meta<typeof Lens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LensCard: Story = {
  render: () => (
    <Lens style={{ width: 320, display: 'grid', gap: 10 }}>
      <Eyebrow>Studio</Eyebrow>
      <Heading size={2} as="h3">
        Morning light
      </Heading>
      <p className="pr-muted" style={{ margin: 0 }}>
        Sunrise at 6:52, golden hour at 4:31.
      </p>
      <Switch label="Notify me" defaultChecked />
    </Lens>
  ),
};

export const Cards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 280px)', gap: 20 }}>
      <Card style={{ display: 'grid', gap: 8 }}>
        <Eyebrow>Weekly report</Eyebrow>
        <Heading size={2} as="h3">
          You slept 7h 40m
        </Heading>
        <p className="pr-muted" style={{ margin: 0 }}>
          18 minutes more than last week.
        </p>
      </Card>
      <Card variant="spectrum" style={{ display: 'grid', gap: 8 }}>
        <Eyebrow>Featured</Eyebrow>
        <Heading size={2} as="h3">
          Prism Pro
        </Heading>
        <Button variant="glass" size="sm" style={{ color: '#16123a', justifySelf: 'start' }}>
          Upgrade ✦
        </Button>
      </Card>
    </div>
  ),
};

export const ChipsAndBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <Badge>New</Badge>
      <Badge tone="mint">Live</Badge>
      <Badge tone="coral">Sold out</Badge>
      <Badge tone="ink">v1.0</Badge>
      <Chip>
        <Pulse /> Recording
      </Chip>
      <Chip>✦ Light, bent beautifully</Chip>
    </div>
  ),
};

export const ProgressAndAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Ring value={82} label="Focus" />
      <div style={{ width: 220 }}>
        <Progress value={65} label="Upload" />
      </div>
      <Avatar name="Hanee Patel" />
      <AvatarGroup label="3 people in this studio">
        <Avatar name="Aria" />
        <Avatar name="Ravi" />
        <Avatar name="Mei" />
      </AvatarGroup>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
      <Heading size="display">
        Made of <em>light.</em>
      </Heading>
      <Heading size={1} as="h2">
        Bend it <em>beautifully</em>
      </Heading>
      <Heading size={2}>Stay in the glow</Heading>
      <p className="pr-lead">Frosted glass layers and one rainbow that runs through everything.</p>
    </div>
  ),
};
