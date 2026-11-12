// The Prism UI docs site: live demos with their code, colour grades worked out from the real page,
// and a light lab that restyles everything.

import PrismUI, { currentTheme, setCalmMotion, setTheme, toast } from '../lib/index';
import { contrast, grade } from '../lib/contrast';
import './docs.css';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const root = document.documentElement;
const cssVar = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();

// Pin the theme from the start, so glass details that depend on it are always right.
setTheme(currentTheme());

// ---------- Demos: show the exact markup of each live preview, with a copy button ----------

function dedent(html: string): string {
  const lines = html.replace(/\s+data-pr-ready="1"/g, '').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)![0].length));
  return lines.map((l) => l.slice(indent)).join('\n');
}

function wireDemos(): void {
  document.querySelectorAll<HTMLElement>('.demo').forEach((demo, i) => {
    const stage = demo.querySelector<HTMLElement>('.demo-stage')!;
    const extra = demo.querySelector<HTMLTemplateElement>('template.code-extra');
    const code = dedent(stage.innerHTML) + (extra ? `\n\n<script type="module">${extra.innerHTML.trimEnd()}\n</script>` : '');
    const bar = document.createElement('div');
    bar.className = 'demo-bar';
    bar.innerHTML = `<button class="pr-btn pr-btn--ghost pr-btn--sm" aria-expanded="false" aria-controls="code-${i}">‹/› Show code</button>`;
    const pre = document.createElement('pre');
    pre.className = 'code';
    pre.id = `code-${i}`;
    pre.hidden = true;
    const codeEl = document.createElement('code');
    codeEl.textContent = code;
    const copy = document.createElement('button');
    copy.className = 'copy pr-btn pr-btn--glass pr-btn--sm';
    copy.textContent = 'Copy';
    copy.onclick = () => copyText(code);
    pre.append(codeEl, copy);
    demo.append(bar, pre);
    const toggle = bar.querySelector('button')!;
    toggle.onclick = () => {
      pre.hidden = !pre.hidden;
      toggle.setAttribute('aria-expanded', String(!pre.hidden));
      toggle.textContent = pre.hidden ? '‹/› Show code' : '‹/› Hide code';
    };
  });
  document.querySelectorAll<HTMLButtonElement>('[data-copy-from]').forEach((b) => {
    b.onclick = () => copyText($(b.dataset.copyFrom!).textContent ?? '');
  });
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied to your clipboard', 'success');
  } catch {
    toast('Select the code and press Ctrl+C', 'warning');
  }
}

// ---------- Colour: real values and live contrast grades ----------

const SWATCHES: [name: string, token: string, use: string, text: boolean][] = [
  ['Room', 'bg', 'page background', false],
  ['Surface', 'surface', 'solid colour behind glass', false],
  ['Ink', 'ink', 'text', true],
  ['Ink 2', 'ink-2', 'secondary text', true],
  ['Ink 3', 'ink-3', 'hints', true],
  ['Accent text', 'accent-text', 'links, eyebrows', true],
  ['Pink', 'pink', 'spectrum start', false],
  ['Violet', 'violet', 'spectrum middle', false],
  ['Cyan', 'cyan', 'spectrum end', false],
  ['Sun', 'sun', 'ring highlight', false],
  ['Mint', 'mint', 'success', true],
  ['Coral', 'coral', 'errors', true],
];

function toHex(color: string): string {
  if (color.startsWith('#')) return color.length === 4 ? `#${[...color.slice(1)].map((c) => c + c).join('')}` : color.slice(0, 7);
  const m = color.match(/\d+(\.\d+)?/g);
  if (!m) return '#000000';
  return `#${m.slice(0, 3).map((n) => Math.round(Number(n)).toString(16).padStart(2, '0')).join('')}`;
}

function renderSwatches(): void {
  const bg = toHex(cssVar('--pr-bg'));
  $('swatches').innerHTML = SWATCHES.map(([name, token, use, text]) => {
    const hex = toHex(cssVar(`--pr-${token}`));
    const ratio = contrast(hex, bg);
    const label = text ? `${ratio.toFixed(1)}:1 on the room · ${grade(ratio)}` : token === 'bg' || token === 'surface' ? 'background' : 'light only, no text';
    const textOn = contrast(hex, '#16123a') > contrast(hex, '#ffffff') ? '#16123a' : '#ffffff';
    return `<figure class="swatch pr-glass"><div style="background:${hex};color:${textOn}"><b>${hex}</b></div><figcaption><b>${name}</b><code>--pr-${token}</code><span>${use}</span><small>${label}</small></figcaption></figure>`;
  }).join('');
}

function renderSpaces(): void {
  $('spaces').innerHTML = [1, 2, 3, 4, 5, 6, 7, 8]
    .map((n) => `<div><i style="width:var(--pr-space-${n})"></i><code>space-${n}</code><span>${cssVar(`--pr-space-${n}`)}</span></div>`)
    .join('');
}

// ---------- Theme toggle in the nav ----------

function syncThemeButton(): void {
  const dark = currentTheme() === 'dark';
  $('theme-toggle').setAttribute('aria-pressed', String(dark));
  $('theme-icon').textContent = dark ? '☀' : '☾';
  $('theme-label').textContent = dark ? 'Day' : 'Midnight';
  document.querySelectorAll<HTMLInputElement>('input[name="mood"]').forEach((r) => (r.checked = r.value === (dark ? 'dark' : 'light')));
  applyLight();
  renderSwatches();
}

function applyMood(theme: 'light' | 'dark'): void {
  setTheme(theme);
  syncThemeButton();
}

// ---------- Light lab ----------

const PRESETS: [name: string, pink: string, violet: string, cyan: string][] = [
  ['Prism', '#ff5fb8', '#6a5cff', '#18b5e6'],
  ['Sunset', '#ff7a59', '#ff4f8b', '#ffb347'],
  ['Aurora', '#3ee0a8', '#2f9bff', '#8a6cff'],
  ['Ocean', '#00c2d1', '#3a7bff', '#6a5cff'],
  ['Bloom', '#ff6fa3', '#c86bff', '#ffb86b'],
];
let preset = PRESETS[0];

function mix(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

/** Moves a colour toward `toward` step by step until it reaches the contrast asked for against `against`. */
function readable(color: string, against: string, toward: string, min: number): string {
  for (let t = 0; t <= 1.0001; t += 0.03) {
    const c = mix(color, toward, t);
    if (contrast(c, against) >= min) return c;
  }
  return toward;
}

/** Sets the spectrum and every colour derived from it, so text on and around it stays readable. */
function applyLight(): void {
  const dark = currentTheme() === 'dark';
  const [, pink, violet, cyan] = preset;
  const bg = toHex(cssVar('--pr-bg'));
  const isDefault = preset === PRESETS[0];
  const vars: Record<string, string> = {
    '--pr-pink': pink,
    '--pr-violet': violet,
    '--pr-cyan': cyan,
    '--pr-pink-deep': readable(pink, '#ffffff', '#16123a', 4.6),
    '--pr-violet-deep': readable(violet, '#ffffff', '#16123a', 4.6),
    '--pr-cyan-deep': readable(cyan, '#ffffff', '#16123a', 4.6),
    '--pr-accent-text': dark ? readable(violet, bg, '#ffffff', 4.6) : readable(violet, bg, '#16123a', 4.6),
  };
  for (const [k, v] of Object.entries(vars)) {
    if (isDefault) root.style.removeProperty(k);
    else root.style.setProperty(k, v);
  }
  const deep = isDefault ? ['#c92a8e', '#5b46f0', '#0a78a8'] : [vars['--pr-pink-deep'], vars['--pr-violet-deep'], vars['--pr-cyan-deep']];
  const worst = Math.min(...deep.map((c) => contrast('#ffffff', c)));
  $('lab-grade').textContent = `White text on this spectrum: at least ${worst.toFixed(1)}:1 (${grade(worst)}). Colours under text are deepened automatically.`;
}

function wireLab(): void {
  $('presets').innerHTML = PRESETS.map(
    ([name, a, b, c], i) =>
      `<button type="button" role="radio" aria-checked="${i === 0}" data-i="${i}" style="--a:${a};--b:${b};--c:${c}"><i></i>${name}</button>`,
  ).join('');
  $('presets').onclick = (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!b) return;
    preset = PRESETS[Number(b.dataset.i)];
    $('presets')
      .querySelectorAll('button')
      .forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    applyLight();
    renderSwatches();
  };
  const round = $<HTMLInputElement>('roundness');
  round.oninput = () => {
    root.style.setProperty('--pr-round', round.value);
    $('roundness-out').textContent = `${Math.round(Number(round.value) * 100)}%`;
  };
  const blur = $<HTMLInputElement>('blur');
  blur.oninput = () => {
    root.style.setProperty('--pr-blur', `${blur.value}px`);
    $('blur-out').textContent = `${blur.value}px`;
  };
  document.querySelectorAll<HTMLInputElement>('input[name="mood"]').forEach((r) => (r.onchange = () => applyMood(r.value as 'light' | 'dark')));
  $<HTMLInputElement>('calm').onchange = (e) => setCalmMotion((e.target as HTMLInputElement).checked);
  $('copy-theme').onclick = () => {
    const keep = ['--pr-pink', '--pr-violet', '--pr-cyan', '--pr-pink-deep', '--pr-violet-deep', '--pr-cyan-deep', '--pr-accent-text', '--pr-round', '--pr-blur'];
    const lines = keep.map((k) => `  ${k}: ${root.style.getPropertyValue(k) || cssVar(k)};`);
    copyText(`/* My Prism UI theme (${preset[0]}) */\n:root {\n${lines.join('\n')}\n}\n`);
  };
  $('reset-theme').onclick = () => {
    round.value = '1';
    blur.value = '18';
    root.style.removeProperty('--pr-round');
    root.style.removeProperty('--pr-blur');
    $('roundness-out').textContent = '100%';
    $('blur-out').textContent = '18px';
    $<HTMLInputElement>('calm').checked = false;
    setCalmMotion(false);
    ($('presets').querySelector('button') as HTMLButtonElement).click();
  };
}

// ---------- Motion demo ----------

function wireMotion(): void {
  $('motion-play').onclick = () => document.querySelectorAll('.motion-demo .ball').forEach((b) => b.classList.toggle('go'));
}

// ---------- Sidebar: highlight the section in view ----------

function wireSidebar(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.side a')];
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.toggleAttribute('aria-current', l.getAttribute('href') === `#${en.target.id}`));
      }),
    { rootMargin: '-30% 0px -60% 0px' },
  );
  document.querySelectorAll('section.doc').forEach((s) => io.observe(s));
}

// ---------- Getting started ----------

const BASE = 'https://hanee2907.github.io/prism-ui/lib';
$('start-code').textContent = `<!-- 1. Fonts and Prism UI -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="${BASE}/prism-ui.css">

<!-- 2. Use it -->
<body class="pr">
  <div class="pr-mesh"></div>
  <p class="pr-eyebrow">Hello</p>
  <h1 class="pr-display">Made of <em>light.</em></h1>
  <button class="pr-btn pr-btn--spectrum">Start building</button>

  <!-- Optional: lens light, tabs, modals and toasts -->
  <script type="module">
    import PrismUI from '${BASE}/prism-ui.js';
    PrismUI.init();
  </script>
</body>`;

$('react-code').textContent = `import 'prism-ui/react/prism-ui.css';
import { Button, Lens, Heading, Switch, useToast } from 'prism-ui/react';

export function Card() {
  const toast = useToast();
  return (
    <Lens>
      <Heading size={2}>Morning <em>light</em></Heading>
      <Switch label="Notify me" defaultChecked />
      <Button variant="spectrum" onClick={() => toast('Saved ✓', 'success')}>
        Start building
      </Button>
    </Lens>
  );
}`;

// ---------- Start ----------

document.querySelectorAll('section.doc').forEach((s) => s.classList.add('pr-reveal'));
wireDemos();
PrismUI.init();
wireLab();
wireMotion();
wireSidebar();
renderSpaces();
syncThemeButton();
$('theme-toggle').onclick = () => applyMood(currentTheme() === 'dark' ? 'light' : 'dark');
$('toast-demo').onclick = () => toast('Theme copied. It glows the same everywhere.', 'success');
