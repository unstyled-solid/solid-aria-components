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

import {ContextValue, SlotProps} from 'react-aria-components/slots';

import {createContext, createMemo, omit, untrack, useContext, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {DOMRefValue} from '@react-types/shared';
type ReactNode = JSX.Element;
import {inertValue} from 'react-aria/private/utils/inertValue';
import {Keyboard as KeyboardAria} from 'react-aria-components/Keyboard';
import {Header as RACHeader} from 'react-aria-components/Header';
import {Heading as RACHeading} from 'react-aria-components/Heading';
import {TextContext as RACTextContext, Text as TextAria} from 'react-aria-components/Text';
import {StyleString} from '../style/types';
import {UnsafeStyles} from './style-utils';
import {useDOMRef} from './useDOMRef';
import {useIsSkeleton, useSkeletonText} from './Skeleton';
import {useSpectrumContextProps} from './useSpectrumContextProps';

interface ContentProps extends UnsafeStyles, SlotProps {
  children: ReactNode;
  styles?: StyleString;
  isHidden?: boolean;
  id?: string;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  itemID?: string;
  itemRef?: string;
}

interface HeadingProps extends Omit<ContentProps, 'children'> {
  children: ReactNode;
  level?: number;
}

export const HeadingContext =
  createContext<ContextValue<Partial<HeadingProps>, DOMRefValue<HTMLHeadingElement>>>(null);

export const Heading = (
  // Wrapper around RAC Heading to unmount when hidden.
  function Heading(props: HeadingProps & {ref?: Ref<DOMRefValue<HTMLHeadingElement>>}) {
    let ref = props.ref;
    [props, ref] = untrack(() => useSpectrumContextProps(props, ref, HeadingContext));
    let domRef = useDOMRef(ref);
    let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');

    return (
      <>{!props.isHidden && <RACHeading
        {...otherProps}
        ref={domRef}
        className={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
        style={props.UNSAFE_style}
        slot={props.slot || undefined}
      />}</>
    );
  }
);

export const HeaderContext =
  createContext<ContextValue<Partial<ContentProps>, DOMRefValue<HTMLElement>>>(null);

export function Header(props: ContentProps & {ref?: Ref<DOMRefValue<HTMLElement>>}) {
  let ref = props.ref;
  [props, ref] = untrack(() => useSpectrumContextProps(props, ref, HeaderContext));
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');

  return (
    <>{!props.isHidden && <RACHeader
      {...otherProps}
      ref={domRef}
      class={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
      style={props.UNSAFE_style}
      slot={props.slot || undefined}
    />}</>
  );
}

export const ContentContext =
  createContext<ContextValue<Partial<ContentProps>, DOMRefValue<HTMLDivElement>>>(null);

export function Content(props: ContentProps & {ref?: Ref<DOMRefValue<HTMLDivElement>>}) {
  let ref = props.ref;
  [props, ref] = untrack(() => useSpectrumContextProps(props, ref, ContentContext));
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
  return (
    <>{!props.isHidden && <div
      {...otherProps}
      ref={domRef}
      class={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
      style={props.UNSAFE_style}
      slot={props.slot || undefined}
    />}</>
  );
}

export const TextContext = createContext<ContextValue<Partial<ContentProps>, DOMRefValue>>(null);

export function Text(props: ContentProps & {ref?: Ref<DOMRefValue>}) {
  let ref = props.ref;
  [props, ref] = untrack(() => useSpectrumContextProps(props, ref, TextContext));
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'children', 'ref');
  let racContext = createMemo(() => useContext(RACTextContext));
  let isSkeleton = useIsSkeleton();
  let [children, skeletonStyle] = useSkeletonText(() => props.children, () => props.UNSAFE_style);

  const RenderText = () => (
    <TextAria
      {...otherProps}
      ref={domRef}
      inert={inertValue(isSkeleton())}
      class={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
      style={skeletonStyle()}
      slot={props.slot || undefined}
      data-rsp-slot="text">
      {children()}
    </TextAria>
  );

  const clearContext = () => { const ctx = racContext(); return props.slot && ctx && 'slots' in ctx && !ctx.slots?.[props.slot]; };
  return <>{!props.isHidden && (clearContext() ? <RACTextContext value={null}><RenderText /></RACTextContext> : <RenderText />)}</>;
}

export const KeyboardContext = createContext<ContextValue<Partial<ContentProps>, DOMRefValue>>({});

export function Keyboard(props: ContentProps & {ref?: Ref<DOMRefValue>}) {
  let ref = props.ref;
  [props, ref] = untrack(() => useSpectrumContextProps(props, ref, KeyboardContext));
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
  return (
    <>{!props.isHidden && <KeyboardAria
      {...otherProps}
      ref={domRef}
      className={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
      style={props.UNSAFE_style}
      slot={props.slot || undefined}
    />}</>
  );
}

export const FooterContext = createContext<ContextValue<Partial<ContentProps>, DOMRefValue>>({});

export function Footer(props: ContentProps & {ref?: Ref<DOMRefValue>}) {
  let ref = props.ref;
  [props, ref] = untrack(() => useSpectrumContextProps(props, ref, FooterContext));
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'isHidden', 'slot', 'ref');
  return (
    <>{!props.isHidden && <footer
      {...otherProps}
      ref={domRef}
      class={(props.UNSAFE_className ?? '') + (props.styles ?? '')}
      style={props.UNSAFE_style}
      slot={props.slot || undefined}
    />}</>
  );
}
