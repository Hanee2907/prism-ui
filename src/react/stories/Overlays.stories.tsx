import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion, Button, Callout, Modal, Nav, Tabs, Tooltip, useToast } from '../index';

const meta = {
  title: 'Components/Navigation & feedback',
  component: Tabs,
  args: {
    label: 'Report',
    items: [
      { label: 'Overview', content: 'You spent 2 hours in daylight today.' },
      { label: 'Light', content: 'Brightest at 1:20 pm. Golden hour starts at 4:31.' },
      { label: 'Sleep', content: '7h 40m, with the screen dimmed from 10 pm.' },
    ],
  },
  parameters: {
    docs: { description: { component: 'Tabs (arrow keys, Home, End), accordion, callouts, tooltip, a native-dialog modal, toasts and the glass nav.' } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = { name: 'Tabs' };

export const AccordionStory: Story = {
  name: 'Accordion',
  render: () => (
    <div style={{ width: 460 }}>
      <Accordion
        items={[
          { title: 'Is Prism UI free?', content: 'Yes. Link the stylesheet and start building.', open: true },
          { title: 'Does it work with React?', content: 'Yes, these are the React components.' },
          { title: 'Will glass be hard to read?', content: 'No. Every text colour is tested for contrast.' },
        ]}
      />
    </div>
  ),
};

export const Callouts: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 10, width: 520 }}>
      <Callout tone="info">
        <b>Tip:</b> layer glass over a colourful background.
      </Callout>
      <Callout tone="success">
        <b>Saved.</b> Your theme is ready to copy.
      </Callout>
      <Callout tone="warning">
        <b>Heads up:</b> very busy backgrounds make glass harder to read.
      </Callout>
      <Callout tone="error">
        <b>Couldn't save.</b> Check your connection and try again.
      </Callout>
    </div>
  ),
};

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip tip="Saved to your library">
        <Button variant="glass">Hover me</Button>
      </Tooltip>
      <Button variant="ink" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Button onClick={() => toast('Theme copied ✓', 'success')}>Show a toast</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Share"
        title="Send this theme to a friend?"
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Not now
            </Button>
            <Button onClick={() => setOpen(false)}>Copy link</Button>
          </>
        }
      >
        <p className="pr-muted">They'll get a link with your exact colours and roundness.</p>
      </Modal>
    </div>
  );
}

export const TooltipModalToast: Story = { name: 'Tooltip, modal & toast', render: () => <ModalDemo /> };

export const GlassNav: Story = {
  render: () => (
    <Nav
      aria-label="Demo"
      brand="Studio"
      links={[
        { href: '#home', label: 'Home', current: true },
        { href: '#work', label: 'Work' },
        { href: '#contact', label: 'Contact' },
      ]}
      action={<Button size="sm">Sign up</Button>}
    />
  ),
};
