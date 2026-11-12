import './generated/light.css';
import './generated/dark.css';
import './theme.css';
import './components.css';
export type Theme = 'light' | 'dark' | 'auto';
export type Tone = 'info' | 'success' | 'warning' | 'error';
/** Light, Midnight (dark), or follow the visitor's system. */
export declare function setTheme(theme: Theme): void;
/** The theme actually showing right now. */
export declare function currentTheme(): 'light' | 'dark';
/** Calm mode makes every transition and animation near-instant. */
export declare function setCalmMotion(on: boolean): void;
/** Turn calm mode on when the visitor's system asks for reduced motion. */
export declare function followSystemMotion(): void;
/** A glass message at the bottom of the screen that leaves on its own. Announced to screen readers. */
export declare function toast(message: string, tone?: Tone, ms?: number): void;
/** Wire up every interactive component inside scope (the whole page by default). Safe to call again. */
export declare function init(scope?: ParentNode): void;
export declare const PrismUI: {
    init: typeof init;
    toast: typeof toast;
    setTheme: typeof setTheme;
    currentTheme: typeof currentTheme;
    setCalmMotion: typeof setCalmMotion;
    followSystemMotion: typeof followSystemMotion;
};
export default PrismUI;
