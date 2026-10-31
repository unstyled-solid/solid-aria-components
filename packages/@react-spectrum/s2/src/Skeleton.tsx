/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {createContext, createEffect, createMemo, createSignal, onCleanup, useContext, type Accessor, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
type CSSProperties = JSX.CSSProperties;
type ReactNode = JSX.Element;
import {color, style} from '../style' with {type: 'macro'};
import {css} from '../style/style-macro' with {type: 'macro'};
import {inertValue} from 'react-aria/private/utils/inertValue';
import {mergeStyles} from '../style/runtime';
import {StyleString} from '../style/types';
import {useMediaQuery} from './useMediaQuery';

export function useLoadingAnimation(isAnimating: boolean | Accessor<boolean>): (element: Element | null) => void {
  let animationRef: Animation | null = null;
  let [element, setElement] = createSignal<HTMLElement | null>(null);
  let reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  createEffect(() => ({element: element(), isAnimating: typeof isAnimating === 'function' ? isAnimating() : isAnimating, reduceMotion: reduceMotion()}),
    ({element, isAnimating, reduceMotion}) => {
      if (
        isAnimating &&
        !animationRef &&
        element &&
        !reduceMotion &&
        typeof element.animate === 'function'
      ) {
        // Use web animation API instead of CSS animations so that we can
        // synchronize it between all loading elements on the page (via startTime).
        animationRef = element.animate(
          [{backgroundPosition: '100%'}, {backgroundPosition: '0%'}],
          {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
          }
        );
        animationRef.startTime = 0;
      } else if (!isAnimating && animationRef) {
        animationRef.cancel();
        animationRef = null;
      }
    }
  );
  onCleanup(() => animationRef?.cancel());
  return element => { setElement(element as HTMLElement | null); };
}

export type SkeletonElement = (overrides: SkeletonOverrides) => ReactNode;
export interface SkeletonOverrides {
  ref?: (element: Element | null) => void;
  className?: string;
  inert?: boolean;
}

export const SkeletonContext = createContext<boolean | null>(null);
export function useIsSkeleton(): Accessor<boolean> {
  return createMemo(() => useContext(SkeletonContext) || false);
}

export interface SkeletonProps {
  children: ReactNode;
  isLoading: boolean;
}

/**
 * A Skeleton wraps around content to render it as a placeholder.
 */
export function Skeleton(props: SkeletonProps): ReactNode {
  // Disable all form components inside a skeleton.
  return <SkeletonContext value={props.isLoading}>{props.children}</SkeletonContext>;
}

export const loadingStyle = css(
  `
  background-image: linear-gradient(to right, ${color('gray-100')} 33%, light-dark(${color('gray-25')}, ${color('gray-300')}), ${color('gray-100')} 66%);
  background-size: 300%;
  * {
    visibility: hidden;
  }
`,
  'L'
); // add to a separate layer so it overrides default style macro styles

export function useSkeletonText(
  children: Accessor<ReactNode>,
  style: Accessor<CSSProperties | undefined>
): [Accessor<ReactNode>, Accessor<CSSProperties | undefined>] {
  let isSkeleton = useIsSkeleton();
  return [() => isSkeleton() ? <SkeletonText>{children()}</SkeletonText> : children(), () => isSkeleton() ? {
      ...style(),
      // This ensures the ellipsis on truncated text is also hidden.
      // -webkit-text-fill-color overrides any `color` property that is also set.
      '-webkit-text-fill-color': 'transparent'
    } : style()];
}

// Rendered inside <Text> to create skeleton line boxes via box-decoration-break.
export function SkeletonText(props: {children: ReactNode}): ReactNode {
  return (
    <span
      // @ts-ignore - compatibility with React < 19
      inert={inertValue(true)}
      ref={useLoadingAnimation(true)}
      class={
        loadingStyle +
        style({
          color: 'transparent',
          boxDecorationBreak: 'clone',
          borderRadius: 'sm'
        })
      }>
      {props.children}
    </span>
  );
}

// Clones the child element and displays it with skeleton styling.
export function SkeletonWrapper(props: {children: SkeletonElement}): ReactNode {
  let isLoading = createMemo(() => useContext(SkeletonContext));
  let animation = useLoadingAnimation(() => isLoading() || false);
  const overrides: SkeletonOverrides = {
    get ref() { return isLoading() ? animation : undefined; },
    get className() { return isLoading() ? loadingStyle : undefined; },
    get inert() { return isLoading() ? true : undefined; }
  };
  return (
    <SkeletonContext value={null}>
      {props.children(overrides)}
    </SkeletonContext>
  );
}

// Adds default border radius around icons when displayed in a skeleton.
const skeletonIconStyle = style({borderRadius: 'sm'});
export function useSkeletonIcon(styles: StyleString): StyleString {
  return useContext(SkeletonContext) ? mergeStyles(skeletonIconStyle, styles) : styles || ('' as StyleString);
}
