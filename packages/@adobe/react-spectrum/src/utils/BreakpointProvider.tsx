import {createContext, createEffect, createMemo, createSignal, useContext, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useIsSSR} from 'react-aria/SSRProvider';

interface Breakpoints {
  S?: number;
  M?: number;
  L?: number;
  [custom: string]: number | undefined;
}

interface BreakpointContext {
  matchedBreakpoints: string[];
}

const Context = createContext<BreakpointContext | null>(null);

interface BreakpointProviderProps {
  children?: JSX.Element;
  matchedBreakpoints: string[];
}

export function BreakpointProvider(props: BreakpointProviderProps): JSX.Element {
  let value = {get matchedBreakpoints() {return props.matchedBreakpoints;}};
  return <Context value={value}>{props.children}</Context>;
}

export function useMatchedBreakpoints(breakpoints: Breakpoints | Accessor<Breakpoints>): Accessor<string[]> {
  let entries = () => Object.entries(typeof breakpoints === 'function' ? breakpoints() : breakpoints).sort(([, valueA], [, valueB]) => valueB! - valueA!);

  let supportsMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
  let getBreakpointHandler = () => {
    let matched: string[] = [];
    for (let [name, value] of entries()) {
      let query = `(min-width: ${value}px)`;
      if (window.matchMedia(query).matches) {
        matched.push(name);
      }
    }
    matched.push('base');
    return matched;
  };

  let [revision, setRevision] = createSignal(0);
  // Share the observed match list and retain identity on unrelated resize events.
  let breakpoint = createMemo(() => {revision(); return supportsMatchMedia ? getBreakpointHandler() : ['base'];}, {equals: (a, b) => a.length === b.length && a.every((value, i) => value === b[i])});

  createEffect(() => typeof breakpoints === 'function' ? breakpoints() : breakpoints, () => {
    if (!supportsMatchMedia) {
      return;
    }

    let onResize = () => {
      setRevision(value => value + 1);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // If in SSR, the media query should never match. Once the page hydrates,
  // this will update and the real value will be returned.
  let isSSR = useIsSSR();
  return () => isSSR() ? ['base'] : breakpoint();
}

export function useBreakpoint(): BreakpointContext | null {
  return useContext(Context);
}
