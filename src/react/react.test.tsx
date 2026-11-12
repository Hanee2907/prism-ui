// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { Badge, Button, Callout, Modal, Progress, Ring, Segmented, Switch, Tabs, TextField } from './index';

// jsdom has <dialog> but not its methods yet
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

afterEach(cleanup);

describe('Button', () => {
  it('maps variant and size to classes and defaults to type="button"', () => {
    render(
      <Button variant="glass" size="lg">
        Start
      </Button>,
    );
    const b = screen.getByRole('button', { name: 'Start' });
    expect(b.className).toBe('pr-btn pr-btn--glass pr-btn--lg');
    expect(b.getAttribute('type')).toBe('button');
  });

  it('passes clicks through', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('TextField', () => {
  it('links the label, and announces the error instead of the hint', () => {
    render(<TextField label="Email" hint="We never share it" error="Missing a domain" />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const hint = document.getElementById(input.getAttribute('aria-describedby')!);
    expect(hint?.textContent).toContain('Missing a domain');
    expect(screen.queryByText('We never share it')).toBeNull();
  });
});

describe('Tabs', () => {
  it('moves with the arrow keys and shows the matching panel', () => {
    render(
      <Tabs
        label="Report"
        items={[
          { label: 'One', content: 'first' },
          { label: 'Two', content: 'second' },
          { label: 'Three', content: 'third' },
        ]}
      />,
    );
    const [one, two] = screen.getAllByRole('tab');
    expect(one.getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(one, { key: 'ArrowRight' });
    expect(two.getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(two);
    expect(screen.getByText('second').hidden).toBe(false);
    expect(screen.getByText('first').hidden).toBe(true);
    fireEvent.keyDown(two, { key: 'End' });
    expect(screen.getAllByRole('tab')[2].getAttribute('aria-selected')).toBe('true');
  });
});

describe('Switch and Segmented', () => {
  it('switch is a real checkbox with role="switch"', () => {
    render(<Switch label="Night shift" defaultChecked />);
    const sw = screen.getByRole('switch', { name: 'Night shift' }) as HTMLInputElement;
    expect(sw.checked).toBe(true);
    fireEvent.click(sw);
    expect(sw.checked).toBe(false);
  });

  it('segmented reports the chosen value', () => {
    const onChange = vi.fn();
    render(
      <Segmented
        label="View"
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
        ]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText('Week'));
    expect(onChange).toHaveBeenCalledWith('week');
    expect((screen.getByLabelText('Week') as HTMLInputElement).checked).toBe(true);
  });
});

describe('Modal', () => {
  function Demo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Share theme?" actions={<Button onClick={() => setOpen(false)}>Done</Button>} />
      </>
    );
  }

  it('opens as a labelled dialog and closes again', () => {
    render(<Demo />);
    const dialog = document.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)?.textContent).toBe('Share theme?');
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    });
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});

describe('Feedback', () => {
  it('progress and ring expose their value, clamped to 0 to 100', () => {
    render(
      <>
        <Progress value={140} label="Upload" />
        <Ring value={64} label="Focus" />
      </>,
    );
    expect(screen.getByRole('progressbar', { name: 'Upload' }).getAttribute('aria-valuenow')).toBe('100');
    expect(screen.getByRole('img', { name: 'Focus: 64%' })).toBeTruthy();
  });

  it('error callouts are announced, and badges carry their tone', () => {
    render(
      <>
        <Callout tone="error">Couldn't save</Callout>
        <Badge tone="mint">Live</Badge>
      </>,
    );
    expect(screen.getByRole('alert').textContent).toContain("Couldn't save");
    expect(screen.getByText('Live').className).toBe('pr-badge pr-badge--mint');
  });
});
