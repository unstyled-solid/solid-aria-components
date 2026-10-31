import {render, type JSX} from '@solidjs/web';
import {createRoot, createSignal, merge} from 'solid-js';
export function mountComponent(Component: (props: object) => unknown, element: HTMLElement, props: object = {}) {
  return render(() => Component(props) as JSX.Element, element);
}

export function mountIsland(module: {mount?: (element: HTMLElement, props: object) => () => void; default?: (props: object) => unknown}, element: HTMLElement, initialProps: Record<string, unknown>) {
  const state = createRoot(disposeOwner => {
    const [props, setProps] = createSignal(initialProps);
    // Native memo-backed props views preserve changing key sets as well as
    // values. Compiler forwarding recognizes the view without enumerating a
    // foreign Proxy (and reading its signal) during component setup.
    const liveProps = merge(props);
    return {
      props: liveProps,
      update: (value: Record<string, unknown>) => { setProps(value); },
      dispose: disposeOwner
    };
  });
  // render() flushes initial effects. Run that imperative mount after root setup
  // returns, not while the bridge root is still an active owned scope.
  let disposeDemo: () => void;
  try {
    disposeDemo = module.mount ? module.mount(element, state.props) : mountComponent(module.default!, element, state.props);
  } catch (error) {
    state.dispose();
    throw error;
  }
  return {
    update: state.update,
    dispose: () => { try { disposeDemo(); } finally { state.dispose(); } }
  };
}
