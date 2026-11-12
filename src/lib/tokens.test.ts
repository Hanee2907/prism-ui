// @ts-expect-error -- Node built-in, only used by the tests
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast, grade, PAIRS, readTokens } from './contrast';

const css: string = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8');
const light = readTokens(css, ':root,');
const dark = { ...light, ...readTokens(css, "[data-pr-theme='dark'] {") };

describe('contrast maths', () => {
  it('matches known WCAG values', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrast('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
    expect(grade(4.6)).toBe('AA');
    expect(grade(3.2)).toBe('AA large');
  });
});

describe.each([
  ['light', light],
  ['midnight', dark],
])('%s theme', (_name, tokens) => {
  it.each(PAIRS)('%s on %s is readable (%s, %s)', (text, bg, min) => {
    expect(tokens[text], `missing --pr-${text}`).toBeDefined();
    expect(tokens[bg], `missing --pr-${bg}`).toBeDefined();
    expect(contrast(tokens[text], tokens[bg])).toBeGreaterThanOrEqual(min);
  });
});

describe('midnight follows the system too', () => {
  it('the prefers-color-scheme block matches the explicit dark block', () => {
    const auto = readTokens(css, ":root:not([data-pr-theme='light']) {");
    expect(Object.keys(auto).length).toBeGreaterThan(5);
    for (const key of Object.keys(auto)) expect(auto[key], key).toBe(dark[key]);
  });
});
