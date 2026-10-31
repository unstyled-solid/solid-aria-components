/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {hydrate, type JSX} from '@solidjs/web';
import {flush} from 'solid-js';

/** Source server→client test protocol, using physical native fixtures instead of eval/React. */
export async function testSSR(
  filename: string,
  exportName: string,
  renderFixture: () => JSX.Element,
  runAfterServer?: () => void,
  runAfterHydration?: () => void
): Promise<void> {
  const runner = resolve(process.cwd(), 'scripts/test/ssr-fixture.mjs');
  const artifact = JSON.parse(execFileSync(process.execPath, [runner, JSON.stringify({filename, exportName})], {encoding: 'utf8'}));
  if (!artifact.isServer) throw new Error('HARNESS_SERVER_CONDITIONS');
  const previousHydration = globalThis._$HY;
  const bootstrap = document.createElement('template');
  bootstrap.innerHTML = artifact.bootstrap;
  for (const script of bootstrap.content.querySelectorAll('script')) new Function(script.textContent ?? '')();
  const container = document.createElement('div');
  container.innerHTML = artifact.html;
  document.body.appendChild(container);
  let dispose: (() => void) | undefined;
  try {
    runAfterServer?.();
    dispose = hydrate(renderFixture, container);
    flush();
    await Promise.resolve();
    runAfterHydration?.();
  } finally {
    dispose?.();
    container.remove();
    if (previousHydration === undefined) Reflect.deleteProperty(globalThis, '_$HY');
    else globalThis._$HY = previousHydration;
  }
}
