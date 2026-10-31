'use client';
import {createSignal, createContext, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {mergeProps} from 'react-aria/mergeProps';

// This is a fake router for documentation purposes. In a real app, you would
// use a routing library like React Router or a framework like Next.js.
const NavigateContext = createContext<(href: string) => void>(() => {});

export function Link(props: JSX.IntrinsicElements['a'] | JSX.IntrinsicElements['span']) {
  let navigate = useContext(NavigateContext);

  let onClick = (e: MouseEvent) => {
    if ('href' in props && typeof props.href === 'string' && props.href) {
      e.preventDefault();
      navigate(props.href);
    }
  };

  let onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && 'href' in props && typeof props.href === 'string' && props.href) {
      e.preventDefault();
      navigate(props.href);
    }
  };

  // The source router always renders an anchor, including the span-capable Link
  // renderer branch. Its forwarded ref attaches to this actual anchor.
  return <a {...mergeProps(props as JSX.IntrinsicElements['a'], {onClick, onKeyDown})} />;
}

export function Router(props: {
  children: ({selectedRoute}: {selectedRoute: string}) => JSX.Element;
  defaultSelectedRoute: string;
}) {
  let [selectedRoute, setSelectedRoute] = createSignal(props.defaultSelectedRoute);
  return (
    <NavigateContext value={setSelectedRoute}>
      <RouteContent render={props.children} route={{get selectedRoute() { return selectedRoute(); }}} />
    </NavigateContext>
  );
}

function RouteContent(props: {render: (route: {selectedRoute: string}) => JSX.Element; route: {selectedRoute: string}}) {
  return props.render(props.route);
}
