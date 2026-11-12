import { type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { type Tone } from '../lib/index';
export { setTheme, currentTheme, setCalmMotion, followSystemMotion } from '../lib/index';
export type { Theme, Tone } from '../lib/index';
export declare function Eyebrow({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>): import("react/jsx-runtime").JSX.Element;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    /** display is the hero size; 1 to 3 are section sizes. */
    size?: 'display' | 1 | 2 | 3;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}
/** Instrument Serif headings. Wrap a word in <em> to light it with the spectrum. */
export declare function Heading({ size, as, className, ...rest }: HeadingProps): import("react/jsx-runtime").JSX.Element;
/** The soft wash of light behind a page. Render once, near the top. */
export declare function Mesh(): import("react/jsx-runtime").JSX.Element;
export declare function Beam(props: HTMLAttributes<HTMLHRElement>): import("react/jsx-runtime").JSX.Element;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'spectrum' | 'glass' | 'ink' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    /** A square button for a single icon; give it an aria-label. */
    iconOnly?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
/** The signature card: a soft light and a rainbow edge follow the pointer. */
export declare function Lens({ className, onPointerMove, ...rest }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'glass' | 'spectrum';
}
export declare function Card({ variant, className, ...rest }: CardProps): import("react/jsx-runtime").JSX.Element;
export declare function Chip({ className, ...rest }: HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: 'spectrum' | 'ink' | 'mint' | 'coral';
}
export declare function Badge({ tone, className, ...rest }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export declare function Pulse(): import("react/jsx-runtime").JSX.Element;
interface FieldBits {
    label: ReactNode;
    hint?: ReactNode;
    /** Shows the field as invalid and replaces the hint with this message. */
    error?: ReactNode;
}
export type TextFieldProps = FieldBits & InputHTMLAttributes<HTMLInputElement>;
export declare function TextField({ label, hint, error, id, className, ...rest }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
export type TextAreaProps = FieldBits & TextareaHTMLAttributes<HTMLTextAreaElement>;
export declare function TextArea({ label, hint, error, id, className, ...rest }: TextAreaProps): import("react/jsx-runtime").JSX.Element;
export type SelectProps = FieldBits & SelectHTMLAttributes<HTMLSelectElement>;
export declare function Select({ label, hint, error, id, className, children, ...rest }: SelectProps): import("react/jsx-runtime").JSX.Element;
type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: ReactNode;
};
export declare function Checkbox({ label, className, ...rest }: ChoiceProps): import("react/jsx-runtime").JSX.Element;
export declare function Radio({ label, className, ...rest }: ChoiceProps): import("react/jsx-runtime").JSX.Element;
/** An on/off switch: a real checkbox with role="switch". */
export declare function Switch({ label, className, ...rest }: ChoiceProps): import("react/jsx-runtime").JSX.Element;
export interface SegmentedProps<V extends string> {
    options: {
        value: V;
        label: ReactNode;
    }[];
    value?: V;
    defaultValue?: V;
    onChange?: (value: V) => void;
    /** Read by screen readers as the group's name. */
    label: string;
}
export declare function Segmented<V extends string>({ options, value, defaultValue, onChange, label }: SegmentedProps<V>): import("react/jsx-runtime").JSX.Element;
export interface TabsProps {
    items: {
        label: ReactNode;
        content: ReactNode;
    }[];
    defaultIndex?: number;
    onChange?: (index: number) => void;
    /** Read by screen readers as the tab list's name. */
    label: string;
}
/** Click or use the arrow keys, Home and End. */
export declare function Tabs({ items, defaultIndex, onChange, label }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface AccordionProps {
    items: {
        title: ReactNode;
        content: ReactNode;
        open?: boolean;
    }[];
}
export declare function Accordion({ items }: AccordionProps): import("react/jsx-runtime").JSX.Element;
declare const CALLOUT_ICONS: {
    readonly info: "✦";
    readonly success: "✓";
    readonly warning: "!";
    readonly error: "✕";
};
export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
    tone?: keyof typeof CALLOUT_ICONS;
}
/** The icon and words carry the meaning; the coloured edge backs them up. */
export declare function Callout({ tone, className, children, ...rest }: CalloutProps): import("react/jsx-runtime").JSX.Element;
export interface ProgressProps {
    /** 0 to 100 */
    value: number;
    label: string;
}
export declare function Progress({ value, label }: ProgressProps): import("react/jsx-runtime").JSX.Element;
export interface RingProps extends ProgressProps {
    /** Diameter in px (default 96). */
    size?: number;
}
export declare function Ring({ value, label, size }: RingProps): import("react/jsx-runtime").JSX.Element;
export interface AvatarProps {
    name: string;
    src?: string;
}
/** A photo or initials inside a spectrum halo. */
export declare function Avatar({ name, src }: AvatarProps): import("react/jsx-runtime").JSX.Element;
export declare function AvatarGroup({ label, children }: {
    label: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/** Wraps one element with a tooltip that also shows on keyboard focus. */
export declare function Tooltip({ tip, children }: {
    tip: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    eyebrow?: ReactNode;
    children?: ReactNode;
    actions?: ReactNode;
}
/** A glass modal on the native <dialog>: focus is trapped, Esc and the backdrop close it. */
export declare function Modal({ open, onClose, title, eyebrow, children, actions }: ModalProps): import("react/jsx-runtime").JSX.Element;
/** Returns a function that shows a glass toast, announced politely to screen readers. */
export declare function useToast(): (message: string, tone?: Tone) => void;
export interface NavProps extends HTMLAttributes<HTMLElement> {
    brand: ReactNode;
    links: {
        href: string;
        label: ReactNode;
        current?: boolean;
    }[];
    action?: ReactNode;
}
export declare function Nav({ brand, links, action, className, ...rest }: NavProps): import("react/jsx-runtime").JSX.Element;
