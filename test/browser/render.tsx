import {render as mount, type JSX} from '@solidjs/web';
import {afterEach} from 'vitest';
import {page, type Locator} from 'vitest/browser';
import {act} from './act';

let roots = new Set<() => void>();
let nextMountId = 0;

export async function render(factory: () => JSX.Element): Promise<{container: HTMLElement} & Pick<Locator, 'getByRole' | 'getByText' | 'getByTestId'>> {
  let container = document.createElement('div');
  // elementLocator synthesizes a selector from mutable descendant text/position.
  // Anchor remote queries to this mount's identity instead, not its contents.
  let mountId: string;
  do {
    mountId = `solid-browser-mount-${++nextMountId}`;
  } while (document.querySelector(`[data-testid="${mountId}"]`));
  container.setAttribute('data-testid', mountId);
  document.body.append(container);
  let dispose: (() => void) | undefined;
  try {
    act(() => { dispose = mount(factory, container); });
  } catch (error) {
    dispose?.();
    container.remove();
    throw error;
  }
  roots.add(() => {
    dispose!();
    container.remove();
  });
  let locator = page.getByTestId(mountId);
  return {
    container,
    getByRole: locator.getByRole.bind(locator),
    getByText: locator.getByText.bind(locator),
    getByTestId: locator.getByTestId.bind(locator)
  };
}

afterEach(() => {
  act(() => {
    try {
      for (let dispose of roots) dispose();
    } finally {
      roots.clear();
    }
  });
});
