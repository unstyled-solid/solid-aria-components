import {createContext, merge, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';

// MDX's real provider interface carries a heterogeneous named component map.
// Components are interpreted by generated MDX, never fabricated here.
export type MDXComponents = Record<string, unknown>;
const ComponentsContext = createContext<MDXComponents>({});

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return merge(useContext(ComponentsContext), components);
}

export function MDXProvider(props: {components: MDXComponents; children?: JSX.Element}) {
  const parent = useContext(ComponentsContext);
  return <ComponentsContext value={merge(parent, props.components)}>{props.children}</ComponentsContext>;
}
