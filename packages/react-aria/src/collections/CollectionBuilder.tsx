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

import {BaseCollection, CollectionNode} from './BaseCollection';
import {BaseNode, Document, ElementNode} from './Document';
import {CachedChildrenOptions, useCachedChildren} from './useCachedChildren';
import {FocusableContext} from '../interactions/FocusableContext';
import {Key, Node} from '@react-types/shared';
import {Hidden} from './Hidden';
import {children as resolveChildren, createContext, createEffect, createMemo, createRenderEffect, createSignal, For, isHydrating, merge, onCleanup, onSettled, useContext} from 'solid-js';
import type {Accessor, Ref as ForwardedRef, Element as ReactElement, Element as ReactNode} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {isServer} from '@solidjs/web';
import {CachedItemContext} from './useCachedChildren';
import {CollectionChildrenOutput} from './CollectionChildrenOutput';
import {useObjectRef, type Ref} from '../utils/useObjectRef';
import {useSyncRef} from '../utils/useSyncRef';
import {liveView} from 'react-stately/private/collections/useCollection';

const ShallowRenderContext = createContext(false);
const CollectionDocumentContext = createContext<Document<any, BaseCollection<any>> | null>(null);

export interface CollectionBuilderProps<C extends BaseCollection<any>> {
  content: ReactNode;
  children: (collection: C) => ReactNode;
  createCollection?: () => C;
}

/**
 * Builds a `Collection` from the children provided to the `content` prop, and passes it to the
 * child render prop function.
 */
export function CollectionBuilder<C extends BaseCollection<any>>(
  props: CollectionBuilderProps<C>
): ReactElement {
  // If a document was provided above us, we're already in a hidden tree. Just render the content.
  let doc = useContext(CollectionDocumentContext);
  if (doc) {
    // The React types prior to 18 did not allow returning ReactNode from components
    // even though the actual implementation since React 16 did.
    // We must return ReactElement so that TS does not complain that <CollectionBuilder>
    // is not a valid JSX element with React 16 and 17 types.
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return props.content as ReactElement;
  }

  // Otherwise, render a hidden copy of the children so that we can build the collection before constructing the state.
  // This should always come before the real DOM content so we have built the collection by the time it renders during SSR.

  // This is fine. CollectionDocumentContext never changes after mounting.
  // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
  let {collection, document, isReady} = useCollectionDocument(props.createCollection);
  return (
    <>
      <Hidden>
        <CollectionDocumentContext value={document}>
          {props.content}
        </CollectionDocumentContext>
      </Hidden>
      <CollectionInner render={props.children} collection={collection} isReady={isReady} />
    </>
  );
}

function CollectionInner<C extends object>(props: {collection: Accessor<C>; isReady: Accessor<boolean>; render: (collection: C) => ReactNode}) {
  // Snapshot changes update the value, not the lifetime of the real component.
  // Read the actual first snapshot before constructing its surviving owner.
  return <For each={props.isReady() ? [props.collection()] : []} keyed={false}>
    {current => props.render(liveView(current))}
  </For>;
}

interface CollectionDocumentResult<T, C extends BaseCollection<T>> {
  collection: Accessor<C>;
  document: Document<T, C>;
  isReady: Accessor<boolean>;
}

function useCollectionDocument<T extends object, C extends BaseCollection<T>>(
  createCollection?: () => C
): CollectionDocumentResult<T, C> {
  // The document instance is mutable, and should never change between renders.
  // useSyncExternalStore is used to subscribe to updates, which vends immutable Collection objects.
  let document = new Document<T, C>(createCollection?.() || (new BaseCollection() as C));
  let initialHydration = isHydrating();
  document.isSSR = isServer || initialHydration;
  // Notifications invalidate the snapshot; finalize only after the fake renderer's
  // mutation transaction, never from inside Document's subscription callback.
  let [revision, setRevision] = createSignal(0, {ownedWrite: true});
  onCleanup(document.subscribe(() => {
    if (!isServer) setRevision(n => n + 1);
  }));
  onSettled(() => {
    if (!isServer && document.isSSR) {
      // Unlike React's SSR-to-portal switch, native owners retain the same fake
      // nodes during hydration. Finalize them without clearing/recreating the tree.
      document.isSSR = false;
      document.getCollection();
      setRevision(n => n + 1);
    }
  });
  // Source client useSyncExternalStore observes the document before the hidden
  // renderer commits its nodes. Preserve that first image for state/history,
  // then publish the completed image through the existing subscription effect.
  // SSR and hydration instead consume the synchronously built server image.
  let initialSnapshot = isServer || initialHydration ? undefined : document.getCollection();
  let [snapshot, setSnapshot] = createSignal<C | undefined>(initialSnapshot as Exclude<C, Function> | undefined, {ownedWrite: true});
  createEffect(revision, () => {
    if (!isServer) {
      let next = document.getCollection();
      setSnapshot(() => next);
    }
  });
  let collection = () => isServer ? document.getCollection() : snapshot() ?? document.getCollection();
  // Hydration must claim the same first row as SSR. The hidden subtree builds
  // that initial image synchronously on both sides. Client-only mounts retain
  // their state owner across the source's initial→complete publication.
  let isReady = () => isServer || initialHydration || snapshot() !== undefined;
  return {collection, document, isReady};
}

const SSRContext = createContext<BaseNode<any> | null>(null);

export type CollectionNodeClass<T> = {
  new (key: Key): CollectionNode<T>;
  readonly type: string;
};

function createCollectionNodeClass(type: string): CollectionNodeClass<any> {
  let NodeClass = class extends CollectionNode<any> {
    static readonly type = type;
  };
  return NodeClass;
}

function useSSRCollectionNode<T extends Element>(
  CollectionNodeClass: CollectionNodeClass<T> | string,
  props: object,
  ref: ForwardedRef<T>,
  rendered?: any,
  children?: ReactNode,
  render?: (node: Node<any>) => ReactElement
) {
  // To prevent breaking change, if CollectionNodeClass is a string, create a CollectionNodeClass using the string as the type
  if (typeof CollectionNodeClass === 'string') {
    // oxlint-disable-next-line react/react-compiler
    CollectionNodeClass = createCollectionNodeClass(CollectionNodeClass);
  }

  // SSRContext supplies the fake parent node on both server and client. Native
  // owners retain these nodes during hydration and manage subsequent updates.
  let parentNode = useContext(SSRContext);
  if (!parentNode) throw new Error('Collection node requires a collection document.');
  let element = parentNode.ownerDocument.createElement(CollectionNodeClass.type);
  let NodeClass = CollectionNodeClass;
  // Resolve descendants first, matching the source renderer's child-before-parent
  // ref delivery (and therefore its generated key order).
  renderCollectionChildren(element, () => <SSRContext value={element}>{children}</SSRContext>);
  let updateProps = () => {
    let view = props as Record<string, unknown>;
    let snapshot = Object.fromEntries(Object.keys(view).filter(key => key !== 'children').map(key => [key, view[key]]));
    // Native JSX children must stay lazy until their consuming owner. Enumerating
    // this getter here would execute a branch's descendants a second time.
    if ('children' in view) {
      if (children == null) {
        // This compute is owned by the hidden leaf beneath its collection
        // providers. Resolve the native prop getter here, not a render factory:
        // dynamic plain strings have the same source metadata as literals.
        // Explicit textValue needs no implicit read. Non-string children remain
        // lazy for the real leaf's provider-owned renderer, without guessing text.
        let child = snapshot.textValue ? undefined : view.children;
        snapshot.children = typeof child === 'string' ? child : rendered;
      } else {
        // Source node.props retains the original branch children, independently
        // of useChildren's selected fake-tree descendants. Keep native elements
        // lazy: only the real branch renderer consumes e.g. the Popover at [1].
        Object.defineProperty(snapshot, 'children', {
          enumerable: true,
          configurable: true,
          get: () => view.children
        });
      }
    }
    return {props: snapshot, rendered};
  };
  createRenderEffect(updateProps, value => {
    element.setProps(value.props, ref, NodeClass, value.rendered, render);
  });
  onCleanup(() => element.parentNode?.removeChild(element));
  // This value is consumed by the collection renderer, never by the web renderer.
  return element as unknown as ReactElement;
}

/** Native renderer for the source fake DOM. Solid owns child lifetimes; the
 * Document still owns all mutation, dirty tracking and immutable snapshots. */
function renderCollectionChildren(parent: BaseNode<any>, content: () => ReactNode) {
  // Preserve native static/provider consumption, including discarded SSR probes.
  // Only dynamic lists opt into opaque independently resolved ranges.
  let children = resolveChildren(content);
  renderCollectionRange(new CollectionChildRange(parent), () => children.toArray());
  return children;
}

/** Non-reactive ordering metadata, like the source fake DOM's sibling links.
 * Each range's owned renderer observes its output; siblings never read it. */
class CollectionChildRange {
  children: CollectionChildRange[] = [];
  attached = false;

  constructor(readonly documentParent: BaseNode<any>, readonly parent?: CollectionChildRange, readonly element?: ElementNode<any>) {}

  get connected(): boolean {
    return !this.parent || this.attached && this.parent.connected;
  }

  *nodes(): Generator<ElementNode<any>> {
    if (this.element) yield this.element;
    else for (let child of this.children) yield* child.nodes();
  }

  nextNode(): ElementNode<any> | null {
    if (!this.parent) return null;
    let siblings = this.parent.children;
    for (let i = siblings.indexOf(this) + 1; i < siblings.length; i++) {
      let first = siblings[i].nodes().next().value;
      if (first) return first;
    }
    return this.parent.nextNode();
  }

  reconcile(next: CollectionChildRange[]) {
    let retained = new Set(next);
    for (let child of this.children) {
      if (!retained.has(child)) {
        child.attached = false;
        for (let node of child.nodes()) this.documentParent.removeChild(node);
      }
    }
    let reference = [...this.nodes()].find(node => node.parentNode === this.documentParent) ?? this.nextNode();
    this.children = next;
    for (let child of next) child.attached = true;
    if (!this.connected) return;
    if (!this.parent) {
      // Authoritative static consumption retains the original parent's complete
      // removal semantics. Snapshot iteration is necessary while unlinking.
      let nodes = new Set(this.nodes());
      for (let node of [...this.documentParent]) {
        if (!nodes.has(node)) this.documentParent.removeChild(node);
      }
      reference = this.documentParent.firstChild;
    }
    for (let node of this.nodes()) {
      if (node !== reference) this.documentParent.insertBefore(node, reference!);
      reference = node.nextSibling;
    }
  }
}

function renderCollectionRange(range: CollectionChildRange, content: () => unknown) {
  let constructor = createMemo(content, {lazy: true});
  // Resolve one structural layer, leaving nested row accessors independently
  // tracked. The cache also retains constructor identity across source reads.
  let read = createMemo(() => {
    let value = constructor();
    while (typeof value === 'function') value = value();
    return Array.isArray(value) ? value.flat(Infinity) : value == null ? [] : [value];
  }, {lazy: true, sync: true});
  let output = For({
    get each() { return read(); },
    children: value => {
      let child = new CollectionChildRange(range.documentParent, range, value instanceof ElementNode ? value : undefined);
      if (value instanceof CollectionChildrenOutput) {
        renderCollectionRange(child, () => value.output);
      } else if (typeof value === 'function' || Array.isArray(value)) {
        renderCollectionRange(child, () => value);
      }
      return child as unknown as ReactNode;
    }
  });
  let readOutput = () => typeof output === 'function' ? (output as () => unknown)() : output;
  createRenderEffect(readOutput, next => range.reconcile(next as CollectionChildRange[]));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createLeafComponent<T, P extends object, E extends Element>(
  CollectionNodeClass: CollectionNodeClass<any> | string,
  render: (props: P, ref: ForwardedRef<E>) => ReactElement | null
): (props: P & {ref?: ForwardedRef<E>}) => ReactElement | null;
export function createLeafComponent<T, P extends object, E extends Element>(
  CollectionNodeClass: CollectionNodeClass<any> | string,
  render: (props: P, ref: ForwardedRef<E>, node: Node<T>) => ReactElement | null
): (props: P & {ref?: ForwardedRef<E>}) => ReactElement | null;
export function createLeafComponent<P extends object, E extends Element>(
  CollectionNodeClass: CollectionNodeClass<any> | string,
  render: (props: P, ref: ForwardedRef<E>, node?: any) => ReactElement | null
): (props: P & {ref?: ForwardedRef<E>}) => ReactElement | null {
  let Component = ({node}: {node: Node<any>}) => {
    let props = merge(() => node.props);
    let ref = useObjectRef<E>();
    useSyncRef(props, ref);
    return render(props, ref, node);
  };
  let Result = (input: P & {ref?: ForwardedRef<E>}) => {
    let item = useContext(CachedItemContext);
    let props = merge(input, item ? {
      get id() { return (input as {id?: Key}).id ?? item.id; },
      get value() { return item.value; }
    } : {}) as P & {ref?: ForwardedRef<E>};
    let ref = useObjectRef<E>();
    useSyncRef(props, ref);
    let focusableProps = useContext(FocusableContext);
    let isShallow = useContext(ShallowRenderContext);
    if (!isShallow) {
      if (render.length >= 3) {
        throw new Error(render.name + ' cannot be rendered outside a collection.');
      }
      return render(props, ref);
    }

    return useSSRCollectionNode(
      CollectionNodeClass,
      props,
      ref,
      // Resolving a native static-children getter can itself build JSX. Read it
      // in a tracked, consumer-owned list; invoke a render factory only in its
      // identity-owned row setup. Replacement callbacks still replace content.
      (value: unknown, ...args: unknown[]) => <For each={[(props as {children?: any}).children]}>
        {child => {
          let defaultChildren = () => (value as {defaultChildren?: ReactNode} | undefined)?.defaultChildren;
          if (typeof child === 'function' && child.length === 0) {
            return <>{child(value, ...args) ?? defaultChildren()}</>;
          }
          return <>{(typeof child === 'function' ? child(value, ...args) : child) ?? defaultChildren()}</>;
        }}
      </For>,
      null,
      node => (
        // Forward FocusableContext to real DOM tree so tooltips work.
        <FocusableContext value={focusableProps}>
          <Component node={node} />
        </FocusableContext>
      )
    );
  };
  // @ts-ignore
  Result.displayName = render.name;
  return Result;
}

export function createBranchComponent<T, P extends {children?: any}, E extends Element>(
  CollectionNodeClass: CollectionNodeClass<any> | string,
  render: (props: P, ref: ForwardedRef<E>, node: Node<T>) => ReactElement | null,
  useChildren: (props: P) => ReactNode = useCollectionChildren
): (props: P & {ref?: Ref<E>}) => ReactElement | null {
  let Component = ({node}: {node: Node<T>}) => {
    let props = merge(() => node.props);
    let ref = useObjectRef<E>();
    useSyncRef(props, ref);
    return render(props, ref, node);
  };
  let Result = (input: P & {ref?: Ref<E>}) => {
    let item = useContext(CachedItemContext);
    let props = merge(input, item ? {
      get id() { return (input as {id?: Key}).id ?? item.id; },
      get value() { return item.value; }
    } : {}) as P & {ref?: Ref<E>};
    let ref = useObjectRef<E>();
    useSyncRef(props, ref);
    // Invoke the hook in native setup below this branch's own SSR/fake parent,
    // rather than lazily caching a renderer under a disposable flatten scope.
    let Descendants = () => <CachedItemContext value={null}>
      {useChildren === useCollectionChildren
        ? <CollectionChildren render={() => useChildren(props)} />
        : useChildren(props)}
    </CachedItemContext>;
    let children = Descendants as unknown as ReactNode;
    return (
      useSSRCollectionNode(CollectionNodeClass, props, ref, null, children, node => (
        <Component node={node} />
      )) ?? <></>
    );
  };
  // @ts-ignore
  Result.displayName = render.name;
  return Result;
}

function useCollectionChildren<T>(options: CachedChildrenOptions<T>) {
  let renderDynamic = useContext(SSRContext)
    ? (output: ReactNode) => new CollectionChildrenOutput(output) as unknown as ReactNode
    : undefined;
  return useCachedChildren(merge(options, {addIdAndValue: true}), renderDynamic);
}

function CollectionChildren(props: {render: () => ReactNode}): JSX.Element {
  return props.render();
}

export interface CollectionProps<T> extends CachedChildrenOptions<T> {}

const CollectionContext = createContext<CachedChildrenOptions<unknown> | null>(null);

/** A Collection renders a list of items, automatically managing caching and keys. */
export function Collection<T>(props: CollectionProps<T>): JSX.Element {
  let ctx = useContext(CollectionContext)!;
  let options = merge(props, {
    get dependencies() { return (ctx?.dependencies || []).concat(props.dependencies || []); },
    get idScope() { return props.idScope ?? ctx?.idScope; }
  });
  let doc = useContext(CollectionDocumentContext);

  // Propagate dependencies and idScope to child collections.
  let value = {
    get dependencies() { return options.dependencies; },
    get idScope() { return options.idScope; }
  };
  return <CollectionContext value={value}>
    {doc ? <CollectionRoot><CollectionChildren render={() => useCollectionChildren(options)} /></CollectionRoot>
      : <CollectionChildren render={() => useCollectionChildren(options)} />}
  </CollectionContext>;
}

function CollectionRoot(props: {children: ReactNode}) {
  let doc = useContext(CollectionDocumentContext);
  if (!doc) throw new Error('CollectionRoot requires a collection document.');
  renderCollectionChildren(doc, () => (
    <CollectionDocumentContext value={null}>
      <ShallowRenderContext value>
        <SSRContext value={doc}>{props.children}</SSRContext>
      </ShallowRenderContext>
    </CollectionDocumentContext>
  ));
  // During SSR, we render the content directly, and append nodes to the document during render.
  // The collection children return null so that nothing is actually rendered into the HTML.
  return null;
}
