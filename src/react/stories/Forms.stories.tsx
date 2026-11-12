import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Radio, Segmented, Select, Switch, TextArea, TextField } from '../index';

const meta = {
  title: 'Components/Forms',
  component: TextField,
  args: { label: 'Your name', placeholder: 'Hanee Patel', hint: 'As it should appear on your profile.' },
  parameters: {
    docs: { description: { component: 'Glass fields with real labels and hints. Errors say what went wrong in words, not just colour.' } },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'hanee@', error: 'That email is missing its domain, like gmail.com.' },
};

export const AllFields: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 260px)', gap: 20 }}>
      <TextField label="Your name" placeholder="Hanee Patel" />
      <Select label="Plan" defaultValue="Studio">
        <option>Starter</option>
        <option>Studio</option>
        <option>Pro</option>
      </Select>
      <TextArea label="Message" placeholder="Tell us what you're making" style={{ gridColumn: '1 / -1' }} />
    </div>
  ),
};

export const Choices: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', maxWidth: 640 }}>
      <Checkbox label="Email me updates" defaultChecked />
      <Checkbox label="Weekly digest" />
      <Radio name="billing" label="Monthly" defaultChecked />
      <Radio name="billing" label="Yearly" />
      <Switch label="Night shift" defaultChecked />
      <Segmented
        label="View"
        defaultValue="week"
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
    </div>
  ),
};
