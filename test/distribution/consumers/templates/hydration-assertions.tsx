import artifact from './ssr-result.json';
import '@testing-library/jest-dom/vitest';
import { hydrate, isServer } from '@solidjs/web';
import { it, expect, vi } from 'vitest';
import {fireEvent} from '@testing-library/dom';
import {flush} from 'solid-js';
import { HydrationFixture } from './app.js';

it('hydrates independently compiled server HTML, preserves IDs/nodes, isolates roots and disposes', async () => {
  expect(isServer).toBe(false);
  expect(artifact.isServer).toBe(true);
  const previousHydration = globalThis._$HY;
  const bootstrap = document.createElement('template');
  bootstrap.innerHTML = artifact.bootstrap;
  // Execute the actual server-emitted bootstrap, not a hand-written hydration registry mock.
  const scripts = bootstrap.content.querySelectorAll('script');
  expect(scripts.length).toBeGreaterThan(0);
  for (const script of scripts) new Function(script.textContent ?? '')();
  const roots: HTMLElement[] = [];
  const disposers: (() => void)[] = [];
  const ids: string[] = [];
  const disposed = vi.fn();
  const settled = vi.fn();
  try {
    for (const record of artifact.records) {
      const root = document.createElement('div');
      root.innerHTML = record.html;
      document.body.append(root); roots.push(root);
      const input = root.querySelector('input')!;
      const label = root.querySelector('label')!;
      const id = input.id; ids.push(id);
      const progress = root.querySelector('[role="progressbar"]')!;
      const meter = root.querySelector('[role="meter"]')!;
      const labelId = progress.getAttribute('aria-labelledby');
      disposers.push(hydrate(() => <HydrationFixture label={record.label} settled={settled} disposed={disposed} />, root, { renderId: record.renderId }));
      expect(root.querySelector('input')).toBe(input);
      expect(root.querySelector('label')).toBe(label);
      expect(input.id).toBe(id);
      expect(label.htmlFor).toBe(id);
      expect(label.textContent).toBe(record.label);
      expect(root.querySelector('[role="progressbar"]')).toBe(progress);
      expect(root.querySelector('[role="meter"]')).toBe(meter);
      expect(progress.getAttribute('aria-labelledby')).toBe(labelId);
      expect(root.querySelector(`[id="${labelId}"]`)).toHaveTextContent(record.label);
      expect(progress).toHaveAttribute('aria-valuenow', '25');
      expect(meter).toHaveAttribute('aria-valuenow', '25');
    }
    expect(new Set(ids).size).toBe(2);
    expect(settled).toHaveBeenCalledTimes(2);
    const progress = roots[0]!.querySelector('[role="progressbar"]');
    const meter = roots[0]!.querySelector('[role="meter"]');
    fireEvent.input(roots[0]!.querySelector('input')!, {target: {value: '60'}});
    flush();
    expect(roots[0]!.querySelector('output')!.textContent).toBe('60');
    expect(roots[1]!.querySelector('output')!.textContent).toBe('25');
    expect(roots[0]!.querySelector('[role="progressbar"]')).toBe(progress);
    expect(roots[0]!.querySelector('[role="meter"]')).toBe(meter);
    expect(progress).toHaveAttribute('aria-valuenow', '60');
    expect(meter).toHaveAttribute('aria-valuenow', '60');
    expect(roots[1]!.querySelector('[role="meter"]')).toHaveAttribute('aria-valuenow', '25');
  } finally {
    // Native hydration replay is queued; retain its real bootstrap until it settles.
    await Promise.resolve();
    disposers.forEach((dispose) => dispose());
    roots.forEach((root) => root.remove());
    if (previousHydration === undefined) Reflect.deleteProperty(globalThis, '_$HY');
    else globalThis._$HY = previousHydration;
  }
  expect(disposed).toHaveBeenCalledTimes(2);
});
