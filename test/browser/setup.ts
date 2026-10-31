/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import './render';
import {afterEach, beforeEach} from 'vitest';

// Track console errors and warnings per test
let consoleErrors: Array<{message: unknown; args: unknown[]}> = [];
let consoleWarnings: Array<{message: unknown; args: unknown[]}> = [];

// Opt-in existing-test diagnostic collection; ordinary console behavior is unchanged.
function captureDiagnostic(level: string, values: unknown[]) {
  if (import.meta.env.VITE_TEST_DIAGNOSTICS !== '1') return;
  console.info('__TEST_DIAGNOSTIC__' + JSON.stringify({level, args: values.map(value =>
    value instanceof Error ? {name: value.name, message: value.message, stack: value.stack} :
      typeof value === 'string' ? value : (() => {
        try { return JSON.stringify(value) ?? String(value); } catch { return String(value); }
      })()), stack: new Error('console capture').stack}));
}

// Reset console error/warning tracking before each test
beforeEach(() => {
  consoleErrors = [];
  consoleWarnings = [];
});

// Fail test if there were any console errors
afterEach(() => {
  if (consoleErrors.length > 0) {
    const errorMessages = consoleErrors
      .map(e => (typeof e.message === 'string' ? e.message : String(e.message)))
      .join('\n');
    throw new Error(`Test failed due to console errors:\n${errorMessages}\n\n`);
  }
});

// Track console errors
const originalError = console.error;
console.error = function (message: unknown, ...args: unknown[]) {
  captureDiagnostic('error', [message, ...args]);
  consoleErrors.push({message, args});
  originalError.call(console, message, ...args);
};

// Track console warnings
const originalWarn = console.warn;
console.warn = function (message: unknown, ...args: unknown[]) {
  captureDiagnostic('warn', [message, ...args]);
  consoleWarnings.push({message, args});
  originalWarn.call(console, message, ...args);
};

// Mock process for browser environment
if (typeof process === 'undefined') {
  globalThis.process = {
    env: {},
    versions: {node: '0.0.0'} as NodeJS.ProcessVersions,
    browser: true
  } as unknown as NodeJS.Process;
}
