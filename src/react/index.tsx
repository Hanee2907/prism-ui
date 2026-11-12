// Prism UI for React: typed components over the same CSS as the plain-HTML version.
// Import once: `import 'prism-ui/react/prism-ui.css'`, put `className="pr"` on your app root, then use the components.

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { toast as showToast, type Tone } from '../lib/index';

export { setTheme, currentTheme, setCalmMotion, followSystemMotion } from '../lib/index';
export type { Theme, Tone } from '../lib/index';

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

// ---------- Type ----------

export function Eyebrow({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('pr-eyebrow', className)} {...rest} />;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** display is the hero size; 1 to 3 are section sizes. */
  size?: 'display' | 1 | 2 | 3;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

/** Instrument Serif headings. Wrap a word in <em> to light it with the spectrum. */
export function Heading({ size = 1, as, className, ...rest }: HeadingProps) {
  const Tag = as ?? (size === 'display' || size === 1 ? 'h1' : size === 2 ? 'h2' : 'h3');
  return <Tag className={cx(size === 'display' ? 'pr-display' : `pr-h${size}`, className)} {...rest} />;
}

/** The soft wash of light behind a page. Render once, near the top. */
export function Mesh() {
  return <div className="pr-mesh" aria-hidden="true" />;
}

export function Beam(props: HTMLAttributes<HTMLHRElement>) {
  return <hr className="pr-beam" {...props} />;
}

// ---------- Buttons ----------

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'spectrum' | 'glass' | 'ink' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** A square button for a single icon; give it an aria-label. */
  iconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'spectrum', size = 'md', iconOnly, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('pr-btn', `pr-btn--${variant}`, size !== 'md' && `pr-btn--${size}`, iconOnly && 'pr-btn--icon', className)}
      {...rest}
    />
  );
});

// ---------- Surfaces ----------

/** The signature card: a soft light and a rainbow edge follow the pointer. */
export function Lens({ className, onPointerMove, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  };
  return <div className={cx('pr-lens', className)} onPointerMove={move} {...rest} />;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'spectrum';
}

export function Card({ variant = 'glass', className, ...rest }: CardProps) {
  return <div className={cx(variant === 'glass' ? 'pr-card pr-glass' : 'pr-card--spectrum', className)} {...rest} />;
}

// ---------- Chips and badges ----------

export function Chip({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('pr-chip', className)} {...rest} />;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'spectrum' | 'ink' | 'mint' | 'coral';
}

export function Badge({ tone = 'spectrum', className, ...rest }: BadgeProps) {
  return <span className={cx('pr-badge', tone !== 'spectrum' && `pr-badge--${tone}`, className)} {...rest} />;
}

export function Pulse() {
  return <span className="pr-pulse" aria-hidden="true" />;
}

// ---------- Text fields ----------

interface FieldBits {
  label: ReactNode;
  hint?: ReactNode;
  /** Shows the field as invalid and replaces the hint with this message. */
  error?: ReactNode;
}

function Field({ id, label, hint, error, children }: FieldBits & { id: string; children: ReactNode }) {
  const msg = error ?? hint;
  return (
    <div className="pr-field" data-invalid={error ? '' : undefined}>
      <label className="pr-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {msg && (
        <span className="pr-hint" id={`${id}-hint`}>
          {error ? <>✕ {error}</> : msg}
        </span>
      )}
    </div>
  );
}

export type TextFieldProps = FieldBits & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, hint, error, id, className, ...rest }: TextFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <input
        id={fid}
        className={cx('pr-input', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-hint` : undefined}
        {...rest}
      />
    </Field>
  );
}

export type TextAreaProps = FieldBits & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, hint, error, id, className, ...rest }: TextAreaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <textarea
        id={fid}
        className={cx('pr-textarea', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-hint` : undefined}
        {...rest}
      />
    </Field>
  );
}

export type SelectProps = FieldBits & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ label, hint, error, id, className, children, ...rest }: SelectProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <select
        id={fid}
        className={cx('pr-select', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-hint` : undefined}
        {...rest}
      >
        {children}
      </select>
    </Field>
  );
}

// ---------- Choices ----------

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode };

export function Checkbox({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={cx('pr-check', className)}>
      <input type="checkbox" {...rest} /> {label}
    </label>
  );
}

export function Radio({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={cx('pr-check', className)}>
      <input type="radio" {...rest} /> {label}
    </label>
  );
}

/** An on/off switch: a real checkbox with role="switch". */
export function Switch({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={cx('pr-switch', className)}>
      <input type="checkbox" role="switch" {...rest} /> {label}
    </label>
  );
}

export interface SegmentedProps<V extends string> {
  options: { value: V; label: ReactNode }[];
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  /** Read by screen readers as the group's name. */
  label: string;
}

export function Segmented<V extends string>({ options, value, defaultValue, onChange, label }: SegmentedProps<V>) {
  const name = useId();
  const [own, setOwn] = useState<V | undefined>(defaultValue ?? options[0]?.value);
  const current = value ?? own;
  return (
    <div className="pr-seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <label key={o.value}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={current === o.value}
            onChange={() => {
              setOwn(o.value);
              onChange?.(o.value);
            }}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}

// ---------- Tabs ----------

export interface TabsProps {
  items: { label: ReactNode; content: ReactNode }[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  /** Read by screen readers as the tab list's name. */
  label: string;
}

/** Click or use the arrow keys, Home and End. */
export function Tabs({ items, defaultIndex = 0, onChange, label }: TabsProps) {
  const [index, setIndex] = useState(defaultIndex);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus = false) => {
    setIndex(i);
    onChange?.(i);
    if (focus) tabRefs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length;
    const to =
      e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    select(to, true);
  };
  return (
    <div className="pr-tabs">
      <div role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.label}
          </button>
        ))}
      </div>
      {items.map((it, i) => (
        <div key={i} role="tabpanel" id={`${base}-panel-${i}`} aria-labelledby={`${base}-tab-${i}`} hidden={i !== index}>
          {it.content}
        </div>
      ))}
    </div>
  );
}

// ---------- Accordion ----------

export interface AccordionProps {
  items: { title: ReactNode; content: ReactNode; open?: boolean }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="pr-accordion">
      {items.map((it, i) => (
        <details key={i} open={it.open}>
          <summary>{it.title}</summary>
          <div>{it.content}</div>
        </details>
      ))}
    </div>
  );
}

// ---------- Feedback ----------

const CALLOUT_ICONS = { info: '✦', success: '✓', warning: '!', error: '✕' } as const;

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof CALLOUT_ICONS;
}

/** The icon and words carry the meaning; the coloured edge backs them up. */
export function Callout({ tone = 'info', className, children, ...rest }: CalloutProps) {
  return (
    <div className={cx('pr-callout', `pr-callout--${tone}`, className)} role={tone === 'error' ? 'alert' : undefined} {...rest}>
      <b aria-hidden="true">{CALLOUT_ICONS[tone]}</b>
      <div>{children}</div>
    </div>
  );
}

export interface ProgressProps {
  /** 0 to 100 */
  value: number;
  label: string;
}

export function Progress({ value, label }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className="pr-progress"
      role="progressbar"
      aria-label={label}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ '--pr-value': `${v}%` } as CSSProperties}
    />
  );
}

export interface RingProps extends ProgressProps {
  /** Diameter in px (default 96). */
  size?: number;
}

export function Ring({ value, label, size }: RingProps) {
  const v = Math.max(0, Math.min(100, value));
  const style = { '--pr-value': v, ...(size ? { '--pr-size': `${size}px` } : {}) } as CSSProperties;
  return (
    <span className="pr-ring" role="img" aria-label={`${label}: ${v}%`} style={style}>
      <b aria-hidden="true">{Math.round(v)}%</b>
    </span>
  );
}

export interface AvatarProps {
  name: string;
  src?: string;
}

/** A photo or initials inside a spectrum halo. */
export function Avatar({ name, src }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return <span className="pr-avatar">{src ? <img src={src} alt={name} /> : <span role="img" aria-label={name}>{initials}</span>}</span>;
}

export function AvatarGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pr-avatar-group" role="group" aria-label={label}>
      {children}
    </div>
  );
}

/** Wraps one element with a tooltip that also shows on keyboard focus. */
export function Tooltip({ tip, children }: { tip: string; children: ReactNode }) {
  return (
    <span data-pr-tip={tip} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  );
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

/** A glass modal on the native <dialog>: focus is trapped, Esc and the backdrop close it. */
export function Modal({ open, onClose, title, eyebrow, children, actions }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="pr-modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {eyebrow && <p className="pr-eyebrow">{eyebrow}</p>}
      <h2 className="pr-h2" id={titleId}>
        {title}
      </h2>
      {children}
      {actions && <div className="pr-modal-actions">{actions}</div>}
    </dialog>
  );
}

/** Returns a function that shows a glass toast, announced politely to screen readers. */
export function useToast() {
  return (message: string, tone: Tone = 'info') => showToast(message, tone);
}

// ---------- Navigation ----------

export interface NavProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  links: { href: string; label: ReactNode; current?: boolean }[];
  action?: ReactNode;
}

export function Nav({ brand, links, action, className, ...rest }: NavProps) {
  return (
    <nav className={cx('pr-nav', className)} {...rest}>
      <a className="pr-logo" href={links[0]?.href ?? '#'}>
        <i aria-hidden="true" />
        {brand}
      </a>
      {links.map((l) => (
        <a key={l.href} href={l.href} aria-current={l.current ? 'page' : undefined}>
          {l.label}
        </a>
      ))}
      {action}
    </nav>
  );
}
