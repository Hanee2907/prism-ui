// WCAG 2.1 contrast, used by the tests and by the docs' colour page.

export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** "AAA", "AA", "AA large" (large text only) or "Fail". */
export function grade(ratio: number): 'AAA' | 'AA' | 'AA large' | 'Fail' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'Fail';
}

/** Every text-on-background pair the components use, and the contrast each must reach. */
export const PAIRS: [text: string, bg: string, min: number, where: string][] = [
  ['ink', 'bg', 4.5, 'body text'],
  ['ink', 'surface', 4.5, 'text on glass cards'],
  ['ink-2', 'bg', 4.5, 'secondary text'],
  ['ink-2', 'surface', 4.5, 'secondary text on cards'],
  ['ink-3', 'bg', 4.5, 'hints and placeholders'],
  ['ink-3', 'surface', 4.5, 'hints in inputs'],
  ['accent-text', 'bg', 4.5, 'links and eyebrows'],
  ['accent-text', 'surface', 4.5, 'links on cards'],
  ['on-deep', 'pink-deep', 4.5, 'spectrum buttons, pink end'],
  ['on-deep', 'violet-deep', 4.5, 'spectrum buttons, middle'],
  ['on-deep', 'cyan-deep', 4.5, 'spectrum buttons, cyan end'],
  ['bg', 'ink', 4.5, 'solid ink buttons and tooltips'],
  ['mint', 'surface', 4.5, 'success text'],
  ['coral', 'surface', 4.5, 'error text'],
];
