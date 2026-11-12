// Prism UI behaviour: the few pieces that need JavaScript (lens light, tabs, modals, toasts,
// reveal-on-scroll, theme and motion). Everything else is plain CSS. Call init() once after the page loads.

import './generated/light.css';
import './generated/dark.css';
import './theme.css';
import './components.css';

export type Theme = 'light' | 'dark' | 'auto';
export type Tone = 'info' | 'success' | 'warning' | 'error';

const root = () => document.documentElement;

/** Light, Midnight (dark), or follow the visitor's system. */
export function setTheme(theme: Theme): void {
  if (theme === 'auto') root().removeAttribute('data-pr-theme');
  else root().setAttribute('data-pr-theme', theme);
}

/** The theme actually showing right now. */
export function currentTheme(): 'light' | 'dark' {
  const pinned = root().getAttribute('data-pr-theme');
  if (pinned === 'light' || pinned === 'dark') return pinned;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Calm mode makes every transition and animation near-instant. */
export function setCalmMotion(on: boolean): void {
  if (on) root().setAttribute('data-pr-motion', 'calm');
  else root().removeAttribute('data-pr-motion');
}

/** Turn calm mode on when the visitor's system asks for reduced motion. */
export function followSystemMotion(): void {
  const q = matchMedia('(prefers-reduced-motion: reduce)');
  setCalmMotion(q.matches);
  q.addEventListener('change', () => setCalmMotion(q.matches));
}

/** Lens cards: the light and the rainbow edge follow the pointer. */
function wireLenses(scope: ParentNode): void {
  scope.querySelectorAll<HTMLElement>('.pr-lens').forEach((el) => {
    if (el.dataset.prReady) return;
    el.dataset.prReady = '1';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/** Tabs: click or use the arrow keys, Home and End. Markup: .pr-tabs > [role=tablist] > [role=tab] + [role=tabpanel]. */
function wireTabs(scope: ParentNode): void {
  scope.querySelectorAll<HTMLElement>('.pr-tabs').forEach((tabsEl) => {
    if (tabsEl.dataset.prReady) return;
    tabsEl.dataset.prReady = '1';
    const tabs = [...tabsEl.querySelectorAll<HTMLElement>('[role="tab"]')];
    const panels = [...tabsEl.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    const select = (i: number, focus = false) => {
      tabs.forEach((t, j) => {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
      });
      panels.forEach((p, j) => (p.hidden = i !== j));
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const n = tabs.length;
        const to =
          e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
        if (to < 0) return;
        e.preventDefault();
        select(to, true);
      });
    });
    select(Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')));
  });
}

/** Modals: any button with data-pr-open="dialog-id" opens that dialog; data-pr-close closes it. */
function wireModals(scope: ParentNode): void {
  scope.querySelectorAll<HTMLElement>('[data-pr-open]').forEach((btn) => {
    if (btn.dataset.prReady) return;
    btn.dataset.prReady = '1';
    btn.addEventListener('click', () => {
      const dlg = document.getElementById(btn.dataset.prOpen ?? '');
      if (dlg instanceof HTMLDialogElement) dlg.showModal();
    });
  });
  scope.querySelectorAll<HTMLDialogElement>('dialog.pr-modal').forEach((dlg) => {
    if (dlg.dataset.prReady) return;
    dlg.dataset.prReady = '1';
    dlg.addEventListener('click', (e) => {
      const close = (e.target as HTMLElement).closest('[data-pr-close]');
      if (close || e.target === dlg) dlg.close();
    });
  });
}

/** Elements with .pr-reveal fade up out of a soft blur when they scroll into view. */
function wireReveal(scope: ParentNode): void {
  const els = scope.querySelectorAll<HTMLElement>('.pr-reveal:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
}

const ICONS: Record<Tone, string> = { info: '✦', success: '✓', warning: '!', error: '✕' };

/** A glass message at the bottom of the screen that leaves on its own. Announced to screen readers. */
export function toast(message: string, tone: Tone = 'info', ms = 2800): void {
  let shelf = document.querySelector<HTMLElement>('.pr-toasts');
  if (!shelf) {
    shelf = document.createElement('div');
    shelf.className = 'pr-toasts';
    shelf.setAttribute('role', 'status');
    shelf.setAttribute('aria-live', 'polite');
    document.body.append(shelf);
  }
  const el = document.createElement('div');
  el.className = `pr-toast pr-toast--${tone}`;
  const icon = document.createElement('i');
  icon.textContent = ICONS[tone];
  icon.setAttribute('aria-hidden', 'true');
  el.append(icon, document.createTextNode(message));
  shelf.append(el);
  setTimeout(() => {
    el.classList.add('pr-toast--leaving');
    setTimeout(() => el.remove(), 400);
  }, ms);
}

/** Wire up every interactive component inside scope (the whole page by default). Safe to call again. */
export function init(scope: ParentNode = document): void {
  wireLenses(scope);
  wireTabs(scope);
  wireModals(scope);
  wireReveal(scope);
}

export const PrismUI = { init, toast, setTheme, currentTheme, setCalmMotion, followSystemMotion };
export default PrismUI;
