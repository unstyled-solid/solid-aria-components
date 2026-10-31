import {flush} from 'solid-js';

// Native test boundary only: no Node SSR imports, timers or extra waits.
export function act<T>(fn: () => T): T extends PromiseLike<infer U> ? Promise<U> : T;
export function act(fn: () => unknown): unknown {
  let result = fn();
  if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
    return Promise.resolve(result).then(value => {
      flush();
      return value;
    });
  }
  flush();
  return result;
}
