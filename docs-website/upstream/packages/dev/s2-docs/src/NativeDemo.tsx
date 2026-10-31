'use client';
import React, {useEffect, useRef} from 'react';
import {nativeModules} from './native-registry.ts';
import type {mountIsland} from './solid-mount';

export interface NativeDemoModule {
  mount?(element: HTMLElement, props?: object): () => void;
  title?: string;
  default?: (props: object) => unknown;
}

/** React owns only the empty host; Solid owns every descendant and its lifetime. */
export function NativeDemo({load, module: moduleName, title, props = {}}: {load?: () => Promise<NativeDemoModule>; module?: string; title?: string; props?: Record<string, unknown>}) {
  const host = useRef<HTMLDivElement>(null);
  const bridge = useRef<ReturnType<typeof mountIsland> | null>(null);
  const latestProps = useRef(props);
  latestProps.current = props;
  useEffect(() => {
    let active = true;
    const key = (moduleName || '').replace(/^\.\//, '');
    const loader = load || nativeModules[key];
    const promise = loader ? loader() : Promise.reject(new Error(`Unknown native island: ${moduleName}`));
    Promise.all([promise, import('./solid-mount.ts')]).then(([module, {mountIsland}]) => {
      if (active && host.current) bridge.current = mountIsland(module, host.current, latestProps.current);
    }).catch(error => {
      // An unavailable demo is an explicitly supported docs state, not a page
      // crash. Keep its cause inspectable without raising Parcel's error overlay.
      console.warn('Native Solid demo unavailable', moduleName, error);
      if (active && host.current) {
        host.current.dataset.unavailableDemo = '';
        host.current.dataset.demoError = error instanceof Error ? error.message : String(error);
        host.current.textContent = 'TO BE DONE LATER';
      }
    });
    return () => { active = false; bridge.current?.dispose(); bridge.current = null; };
  }, [load, moduleName]);
  useEffect(() => { bridge.current?.update(props); }, [props]);
  // The source demo's roots participate directly in the surrounding layout.
  // Keep the mount boundary without introducing a shrink-wrapped flex/grid item.
  return <div ref={host} style={{display: 'contents'}} data-native-solid-demo="" data-native-module={moduleName} aria-label={title} />;
}
