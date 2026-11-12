// @ts-expect-error -- Node built-in, only used by the tests
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast, grade, PAIRS } from './contrast';

type TokenFile = { color: Record<string, { value: string }> };
const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf8');
const colours = (file: TokenFile) => Object.fromEntries(Object.entries(file.color).map(([k, t]) => [k, t.value]));

// The design tokens are the single source of truth: test them, not a copy.
const light: Record<string, string> = colours(JSON.parse(read('../../tokens/light.json')));
const dark: Record<string, string> = { ...light, ...colours(JSON.parse(read('../../tokens/dark.json'))) };

describe('contrast maths', () => {
  it('matches known WCAG values', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrast('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
    expect(grade(4.6)).toBe('AA');
    expect(grade(3.2)).toBe('AA large');
  });
});

describe.each([
  ['Day', light],
  ['Midnight', dark],
])('%s tokens', (_name, tokens) => {
  it.each(PAIRS)('%s on %s is readable (%s, %s)', (text, bg, min) => {
    expect(tokens[text], `missing color.${text}`).toMatch(/^#[0-9a-f]{6}$/i);
    expect(tokens[bg], `missing color.${bg}`).toMatch(/^#[0-9a-f]{6}$/i);
    expect(contrast(tokens[text], tokens[bg])).toBeGreaterThanOrEqual(min);
  });
});

describe('generated CSS is up to date with the tokens', () => {
  const lightCss = read('./generated/light.css');
  const darkCss = read('./generated/dark.css');

  it('every Day colour is in light.css with the same value', () => {
    for (const [name, value] of Object.entries(light)) expect(lightCss, name).toContain(`--pr-${name}: ${value};`);
  });

  it('every Midnight colour is in dark.css, for both the explicit theme and the system setting', () => {
    const overrides = colours(JSON.parse(read('../../tokens/dark.json')));
    for (const [name, value] of Object.entries(overrides)) {
      const hits = darkCss.split(`--pr-${name}: ${value};`).length - 1;
      expect(hits, name).toBe(2);
    }
  });
});
